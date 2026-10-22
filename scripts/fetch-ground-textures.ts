#!/usr/bin/env bun
// Replaces the 18 ground textures with real photo-scanned textures from
// Poly Haven (https://polyhaven.com, every asset CC0, every texture scanned
// from a real surface). Nothing here is generated or painted.
//
//   bun install
//   bun scripts/fetch-ground-textures.ts            # download, process, write
//   bun scripts/fetch-ground-textures.ts --dry-run  # only check the picks exist
//
// Options:
//   --from <dir>   use already-downloaded files instead of the network:
//                  <dir>/<slug>_diff_1k.jpg, optional <slug>_ao_1k.jpg and
//                  <slug>.json (the /info response, for real-world size)
//   --out <dir>    write somewhere other than client/src/assets/textures
//   --only <text>  only process files whose name contains <text>
//
// Output is a drop-in replacement: same file names, 512x512 RGB PNG, edges
// that tile exactly, so App.tsx needs no import changes. Every texture gets
// the same treatment, which is what makes the set look consistent:
//   1. 1k colour map from Poly Haven (already seamless; no mirroring needed)
//   2. its ambient-occlusion map multiplied in at half strength, for depth
//   3. repeated 1x, 2x or 4x so ground detail is at a similar scale in every
//      region (a 1 m scan of ash and a 20 m drone scan of dirt read alike)
//   4. box-filtered down to 512 px
//   5. brightness nudged toward a per-region target, within limits, so no
//      region is a lot darker or brighter than its neighbours
// It also writes SOURCES.md (asset, authors, licence, link) next to the files
// and an HTML contact sheet to review the result.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import jpeg from "jpeg-js";
import { PNG } from "pngjs";

const ROOT = join(import.meta.dirname, "..");
const API = "https://api.polyhaven.com";
const USER_AGENT = "adventure-with-looting ground-texture script (github.com/AndrewJSides/adventure-with-looting)";
const SIZE = 512;
const AO_STRENGTH = 0.5;

type Pick = {
  file: string;
  region: string;
  /** Poly Haven ids, best first. Every id here was checked against the API on 2026-10-09. */
  slugs: string[];
  /** Target mean luminance (0..1) after processing. */
  luma: number;
  saturation?: number;
  /** Per-channel multiplier applied last, e.g. a cold cast for moonlight. */
  tint?: [number, number, number];
};

export const PICKS: Pick[] = [
  { file: "biome-01-mosslight-meadow", region: "Mosslight Meadow", slugs: ["aerial_grass_rock", "grass_path_2", "rocky_terrain_02"], luma: 0.3 },
  { file: "biome-02-sunspoke-pines", region: "Sunspoke Pines", slugs: ["forrest_ground_03", "forrest_sand_01", "forest_leaves_04"], luma: 0.27 },
  { file: "biome-03-silverrun-ford", region: "Silverrun Ford", slugs: ["ganges_river_pebbles", "river_small_rocks", "coast_sand_03"], luma: 0.36 },
  { file: "biome-04-bramblewild", region: "Bramblewild", slugs: ["forrest_ground_01", "forest_floor", "leaves_forest_ground"], luma: 0.28 },
  { file: "biome-05-heartwood", region: "Heartwood", slugs: ["forest_leaves_02", "brown_mud_leaves_01", "forest_leaves_03"], luma: 0.24 },
  { file: "biome-06-hearthglen", region: "Hearthglen", slugs: ["dirt_aerial_02", "dirt_floor", "dirt"], luma: 0.34 },
  { file: "biome-07-cinder-scar", region: "Cinder Scar", slugs: ["burned_ground_01", "dirt_aerial_03"], luma: 0.17, saturation: 0.8 },
  { file: "biome-08-gloam-mire", region: "Gloam Mire", slugs: ["brown_mud_03", "brown_mud_02", "aerial_mud_1"], luma: 0.2 },
  { file: "biome-09-starfall-expanse", region: "Starfall Expanse", slugs: ["aerial_ground_rock", "dry_ground_rocks", "dirt_aerial_03"], luma: 0.38 },
  { file: "biome-10-ember-wastes", region: "Ember Wastes", slugs: ["dry_riverbed_rock", "rock_ground", "gray_rocks"], luma: 0.14, saturation: 0.65, tint: [1.08, 0.97, 0.9] },
  { file: "biome-11-moonfang-clearing", region: "Moonfang Clearing", slugs: ["sparse_grass", "grass_ground", "forest_ground_04"], luma: 0.22, saturation: 0.85, tint: [0.92, 0.98, 1.08] },
  { file: "biome-12-frostfall-peaks", region: "Frostfall Peaks", slugs: ["snow_02", "snow_01", "snow_field_aerial"], luma: 0.78 },
  { file: "biome-13-greyhaven", region: "Greyhaven", slugs: ["grassy_cobblestone", "cobblestone_04", "gravel_ground_01"], luma: 0.36 },
  { file: "biome-14-old-greyhaven", region: "Old Greyhaven", slugs: ["road_damaged", "asphalt_02", "road_damaged_2"], luma: 0.3 },
  { file: "biome-15-deadlight-mall", region: "Deadlight Mall", slugs: ["asphalt_01", "asphalt_06", "asphalt_03"], luma: 0.32 },
  { file: "biome-16-saint-mercy-infirmary", region: "Saint Mercy Infirmary", slugs: ["concrete_pavement", "square_concrete_pavers", "concrete_pavers_02"], luma: 0.46 },
  { file: "biome-17-blackwater-bay", region: "Blackwater Bay", slugs: ["coast_sand_01", "coast_sand_02", "aerial_beach_02"], luma: 0.38 },
  { file: "biome-18-harlan-airfield", region: "Harlan Airfield", slugs: ["aerial_asphalt_01", "asphalt_pit_lane", "hangar_concrete_floor"], luma: 0.34 },
];

// ---------------------------------------------------------------- plumbing

type Info = { name?: string; type?: number; dimensions?: number[]; authors?: Record<string, string> };
type FileEntry = { url?: string };
type Files = Record<string, Record<string, Record<string, FileEntry>> | undefined>;
type Image = { width: number; height: number; data: Uint8Array };

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(name);
const option = (name: string) => {
  const at = args.indexOf(name);
  return at >= 0 ? args[at + 1] : undefined;
};
const DRY = flag("--dry-run");
const FROM = option("--from");
const OUT = resolve(option("--out") ?? join(ROOT, "client/src/assets/textures"));
const ONLY = option("--only");

async function getJson<T>(url: string): Promise<T | null> {
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`${url} -> HTTP ${response.status}`);
  const body = (await response.json()) as T | Record<string, never>;
  return body && Object.keys(body).length ? (body as T) : null;
}

async function getBytes(url: string): Promise<Uint8Array> {
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw new Error(`${url} -> HTTP ${response.status}`);
  return new Uint8Array(await response.arrayBuffer());
}

/** Pull the 1k JPG urls out of a /files/<slug> response. */
export function mapUrls(files: Files): { diffuse: string | null; ao: string | null } {
  const url = (key: string) => files[key]?.["1k"]?.jpg?.url ?? null;
  return { diffuse: url("Diffuse"), ao: url("AO") };
}

function decode(bytes: Uint8Array): Image {
  const image = jpeg.decode(bytes, { useTArray: true, formatAsRGBA: true, maxMemoryUsageInMB: 1024 });
  return { width: image.width, height: image.height, data: image.data };
}

// ---------------------------------------------------------------- image work

/** Shrink by box filtering. Wraps at the edges so a seamless input stays seamless. */
export function shrink(image: Image, size: number): Image {
  const out = new Uint8Array(size * size * 4);
  const fx = image.width / size;
  const fy = image.height / size;
  for (let y = 0; y < size; y += 1) {
    const y0 = y * fy, y1 = y0 + fy;
    for (let x = 0; x < size; x += 1) {
      const x0 = x * fx, x1 = x0 + fx;
      let r = 0, g = 0, b = 0, weight = 0;
      for (let sy = Math.floor(y0); sy < Math.ceil(y1); sy += 1) {
        const wy = Math.min(sy + 1, y1) - Math.max(sy, y0);
        if (wy <= 0) continue;
        const row = ((sy % image.height) + image.height) % image.height;
        for (let sx = Math.floor(x0); sx < Math.ceil(x1); sx += 1) {
          const wx = Math.min(sx + 1, x1) - Math.max(sx, x0);
          if (wx <= 0) continue;
          const col = ((sx % image.width) + image.width) % image.width;
          const at = (row * image.width + col) * 4, w = wx * wy;
          r += (image.data[at] ?? 0) * w;
          g += (image.data[at + 1] ?? 0) * w;
          b += (image.data[at + 2] ?? 0) * w;
          weight += w;
        }
      }
      const to = (y * size + x) * 4;
      out[to] = r / weight;
      out[to + 1] = g / weight;
      out[to + 2] = b / weight;
      out[to + 3] = 255;
    }
  }
  return { width: size, height: size, data: out };
}

/** How many times the scan repeats across one 512 px tile, from its real-world width in metres. */
export function copiesFor(widthMetres: number): 1 | 2 | 4 {
  if (widthMetres <= 1.6) return 4;
  if (widthMetres <= 4.5) return 2;
  return 1;
}

const luma = (r: number, g: number, b: number) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

export function processTexture(diffuse: Image, ao: Image | null, widthMetres: number, pick: Pick): { image: Image; copies: number; gain: number } {
  const copies = copiesFor(widthMetres);
  const cell = SIZE / copies;
  const colour = shrink(diffuse, cell);
  const occlusion = ao ? shrink(ao, cell) : null;
  const px = colour.data;
  let total = 0;
  for (let i = 0; i < px.length; i += 4) {
    if (occlusion) {
      const shade = 1 - AO_STRENGTH * (1 - (occlusion.data[i] ?? 255) / 255);
      px[i] = (px[i] ?? 0) * shade;
      px[i + 1] = (px[i + 1] ?? 0) * shade;
      px[i + 2] = (px[i + 2] ?? 0) * shade;
    }
    total += luma(px[i] ?? 0, px[i + 1] ?? 0, px[i + 2] ?? 0);
  }
  const mean = total / (cell * cell);
  const gain = Math.max(0.55, Math.min(1.8, pick.luma / Math.max(mean, 0.01)));
  const saturation = pick.saturation ?? 1;
  const [tr, tg, tb] = pick.tint ?? [1, 1, 1];
  for (let i = 0; i < px.length; i += 4) {
    let r = (px[i] ?? 0) * gain, g = (px[i + 1] ?? 0) * gain, b = (px[i + 2] ?? 0) * gain;
    const l = luma(r, g, b) * 255;
    r = (l + (r - l) * saturation) * tr;
    g = (l + (g - l) * saturation) * tg;
    b = (l + (b - l) * saturation) * tb;
    px[i] = Math.max(0, Math.min(255, Math.round(r)));
    px[i + 1] = Math.max(0, Math.min(255, Math.round(g)));
    px[i + 2] = Math.max(0, Math.min(255, Math.round(b)));
  }
  const out = new Uint8Array(SIZE * SIZE * 4);
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const from = ((y % cell) * cell + (x % cell)) * 4, to = (y * SIZE + x) * 4;
      out[to] = px[from] ?? 0;
      out[to + 1] = px[from + 1] ?? 0;
      out[to + 2] = px[from + 2] ?? 0;
      out[to + 3] = 255;
    }
  }
  return { image: { width: SIZE, height: SIZE, data: out }, copies, gain };
}

/**
 * Mean |difference| across the wrap seams (left/right and top/bottom), relative
 * to the difference between ordinary neighbouring pixels. About 1.0 means the
 * seam is as invisible as any other pixel boundary.
 */
export function seamRatio(image: Image): number {
  const { width: w, height: h, data } = image;
  const at = (x: number, y: number, c: number) => data[(y * w + x) * 4 + c] ?? 0;
  let seam = 0, inner = 0;
  for (let i = 0; i < h; i += 1) {
    for (let c = 0; c < 3; c += 1) {
      seam += Math.abs(at(0, i, c) - at(w - 1, i, c)) + Math.abs(at(i, 0, c) - at(i, h - 1, c));
      inner += Math.abs(at(0, i, c) - at(1, i, c)) + Math.abs(at(i, 0, c) - at(i, 1, c));
    }
  }
  return seam / Math.max(inner, 1);
}

function writePng(path: string, image: Image): void {
  const png = new PNG({ width: image.width, height: image.height });
  png.data = Buffer.from(image.data);
  writeFileSync(path, PNG.sync.write(png, { colorType: 2 }));
}

// ---------------------------------------------------------------- main

type Done = { pick: Pick; slug: string; info: Info; copies: number; gain: number; seam: number; path: string };

async function resolveSlug(pick: Pick, used: Set<string>): Promise<{ slug: string; info: Info } | null> {
  for (const slug of pick.slugs) {
    if (used.has(slug)) continue;
    if (FROM) {
      if (!existsSync(join(FROM, `${slug}_diff_1k.jpg`))) continue;
      const infoPath = join(FROM, `${slug}.json`);
      return { slug, info: existsSync(infoPath) ? (JSON.parse(readFileSync(infoPath, "utf8")) as Info) : {} };
    }
    const info = await getJson<Info>(`${API}/info/${slug}`);
    if (info?.type === 1 && info.name) return { slug, info }; // type 1 = texture
    console.warn(`  ${slug} not found on Poly Haven, trying the next pick`);
  }
  return null;
}

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const used = new Set<string>();
  const done: Done[] = [];
  const failed: string[] = [];
  for (const pick of PICKS) {
    if (ONLY && !pick.file.includes(ONLY)) continue;
    try {
      await one(pick, used, done, failed);
    } catch (error) {
      failed.push(`${pick.file}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  report(done, failed);
}

async function one(pick: Pick, used: Set<string>, done: Done[], failed: string[]): Promise<void> {
  const found = await resolveSlug(pick, used);
  if (!found) { failed.push(`${pick.file}: none of ${pick.slugs.join(", ")} available`); return; }
  used.add(found.slug);
  const widthMetres = (found.info.dimensions?.[0] ?? 2000) / 1000;
  console.log(`${pick.file.padEnd(32)} <- ${found.slug} (${widthMetres.toFixed(1)} m)`);
  if (DRY) return;
  let diffuseBytes: Uint8Array, aoBytes: Uint8Array | null = null;
  if (FROM) {
    diffuseBytes = new Uint8Array(readFileSync(join(FROM, `${found.slug}_diff_1k.jpg`)));
    const aoPath = join(FROM, `${found.slug}_ao_1k.jpg`);
    aoBytes = existsSync(aoPath) ? new Uint8Array(readFileSync(aoPath)) : null;
  } else {
    const files = await getJson<Files>(`${API}/files/${found.slug}`);
    const urls = files ? mapUrls(files) : { diffuse: null, ao: null };
    if (!urls.diffuse) { failed.push(`${pick.file}: ${found.slug} has no 1k colour map`); return; }
    diffuseBytes = await getBytes(urls.diffuse);
    aoBytes = urls.ao ? await getBytes(urls.ao) : null;
  }
  const result = processTexture(decode(diffuseBytes), aoBytes ? decode(aoBytes) : null, widthMetres, pick);
  const path = join(OUT, `${pick.file}.png`);
  writePng(path, result.image);
  const seam = seamRatio(result.image);
  done.push({ pick, slug: found.slug, info: found.info, copies: result.copies, gain: result.gain, seam, path });
  console.log(`  ${result.copies}x${result.copies} · brightness x${result.gain.toFixed(2)} · seam ${seam.toFixed(2)}`);
}

function report(done: Done[], failed: string[]): void {
  if (failed.length) {
    console.error(`\n${failed.length} region(s) failed:\n  ${failed.join("\n  ")}`);
    process.exitCode = 1;
  }
  if (DRY || !done.length) return;

  const rows = done.map(({ pick, slug, info, copies }) => {
    const authors = Object.keys(info.authors ?? {}).join(", ") || "see asset page";
    const size = info.dimensions?.[0] ? `${(info.dimensions[0] / 1000).toFixed(1)} m` : "?";
    return `| \`${pick.file}.png\` | ${pick.region} | [${info.name ?? slug}](https://polyhaven.com/a/${slug}) | ${authors} | ${size} | ${copies}x${copies} |`;
  });
  writeFileSync(join(OUT, "SOURCES.md"), [
    "# Ground texture sources",
    "",
    "Every file below is processed by `scripts/fetch-ground-textures.ts` from a photo-scanned texture on",
    "[Poly Haven](https://polyhaven.com). Poly Haven assets are CC0 (public domain): free for any use, no",
    "attribution required, credited here anyway. Nothing is generated or hand-painted.",
    "",
    "| File | Region | Poly Haven asset | Scanned by | Real width | Repeats per tile |",
    "| --- | --- | --- | --- | --- | --- |",
    ...rows,
    "",
  ].join("\n"));

  const review = join(tmpdir(), "ground-textures-review.html");
  writeFileSync(review, `<!doctype html><meta charset="utf-8"><title>Ground textures</title>
<body style="background:#222;color:#eee;font:14px system-ui;margin:16px">
<p>Each texture is shown 2x2 so seams would be visible.</p>
<div style="display:flex;flex-wrap:wrap;gap:16px">${done.map(({ pick, slug, path }) =>
    `<figure style="margin:0"><div style="width:384px;height:384px;background:url('${pathToFileURL(path).href}') 0 0/192px 192px"></div>
<figcaption>${pick.region}<br><small>${slug}</small></figcaption></figure>`).join("")}</div></body>`);
  console.log(`\nWrote ${done.length} textures to ${OUT}\nSources: ${join(OUT, "SOURCES.md")}\nReview: ${review}`);
}

if (import.meta.main) await main();
