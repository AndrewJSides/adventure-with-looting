#!/usr/bin/env python3
"""Generate seamless grayscale grain placeholders, one per biome.

These are PLACEHOLDERS. They exist so the biome ground-texture pipeline in
App.tsx has something real to load, and so swapping in proper art is a
file-drop with no code change. Replace the PNGs, keep the filenames.

They are deliberately grayscale and light-valued, because drawGroundTile
blits them with globalCompositeOperation="multiply". That adds surface grain
without shifting any biome's hue, so dropping these in cannot change the
existing art direction -- only the flatness.

Everything here is generated from numpy's PRNG with a fixed seed. No external
asset is used, so there is nothing to attribute.

Seamlessness: value noise on lattices that divide the texture size exactly,
sampled with wraparound indexing, so opposite edges match by construction.

    python3 scripts/gen-placeholder-textures.py
"""
import numpy as np
from PIL import Image
from pathlib import Path

SIZE = 250  # matches dirt-seamless.png
OUT = Path(__file__).resolve().parent.parent / "client/src/assets/textures"

# (region id, slug, octave cells, roughness, streak strength, crack strength)
BIOMES = [
    (1,  "mosslight-meadow", [5, 10, 25], 0.55, 0.00, 0.00),
    (2,  "sunspoke-pines",   [5, 10, 50], 0.60, 0.18, 0.00),
    (3,  "silverrun-ford",   [2,  5, 10], 0.45, 0.30, 0.00),
    (4,  "bramblewild",      [5, 25, 50], 0.70, 0.00, 0.10),
    (5,  "heartwood",        [2, 10, 25], 0.58, 0.10, 0.00),
    (6,  "hearthglen",       [5, 10, 25], 0.50, 0.00, 0.06),
    (7,  "cinder-scar",      [5, 10, 25], 0.62, 0.00, 0.34),
    (8,  "gloam-mire",       [2,  5, 25], 0.50, 0.26, 0.00),
    (9,  "starfall-expanse", [2, 25, 50], 0.40, 0.00, 0.00),
    (10, "ember-wastes",     [5, 10, 50], 0.58, 0.12, 0.26),
    (11, "moonfang-clearing",[2,  5, 10], 0.42, 0.00, 0.00),
    (12, "frostfall-peaks",  [10, 25, 50], 0.52, 0.00, 0.00),
    (13, "greyhaven",        [5, 25, 50], 0.46, 0.00, 0.20),
    (14, "old-greyhaven",    [5, 10, 50], 0.66, 0.00, 0.30),
]


def smooth(t):
    return t * t * (3.0 - 2.0 * t)


def value_noise(size, cells, rng):
    """Bilinear value noise, wrapping at the edges so the tile is seamless."""
    grid = rng.random((cells, cells))
    coord = np.arange(size) * cells / size
    i0 = np.floor(coord).astype(int) % cells
    i1 = (i0 + 1) % cells
    frac = smooth(coord - np.floor(coord))
    # rows then columns
    top = grid[i0][:, i0] * (1 - frac)[None, :] + grid[i0][:, i1] * frac[None, :]
    bot = grid[i1][:, i0] * (1 - frac)[None, :] + grid[i1][:, i1] * frac[None, :]
    return top * (1 - frac)[:, None] + bot * frac[:, None]


def fbm(size, cells_list, roughness, rng):
    out = np.zeros((size, size))
    amp, total = 1.0, 0.0
    for cells in cells_list:
        out += value_noise(size, cells, rng) * amp
        total += amp
        amp *= roughness
    return out / total


def build(region_id, slug, cells, roughness, streak, crack):
    rng = np.random.default_rng(region_id * 9973 + 17)
    field = fbm(SIZE, cells, roughness, rng)

    if streak:
        # Horizontal banding, wrapped: suggests water flow / needle litter.
        rows = np.sin(np.arange(SIZE) / SIZE * np.pi * 2 * 6) * 0.5 + 0.5
        field = field * (1 - streak) + rows[:, None] * streak

    if crack:
        # Ridged noise: |2n-1| inverted gives thin dark seams.
        ridge = 1.0 - np.abs(fbm(SIZE, [10, 25], 0.5, rng) * 2 - 1)
        field = field * (1 - crack) + (ridge ** 3) * crack

    # Normalise, then compress into a light band so `multiply` only grazes it.
    field = (field - field.min()) / max(1e-9, float(np.ptp(field)))
    grey = 168 + field * 82  # ~168..250
    img = Image.fromarray(grey.astype(np.uint8), mode="L")
    path = OUT / f"biome-{region_id:02d}-{slug}.png"
    img.save(path, optimize=True)
    return path, path.stat().st_size


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    for region_id, slug, cells, roughness, streak, crack in BIOMES:
        path, size = build(region_id, slug, cells, roughness, streak, crack)
        total += size
        print(f"{path.name:38s} {size/1024:6.1f} KiB")
    print(f"{'total':38s} {total/1024:6.1f} KiB")
    # Seams would tile visibly, and these are drawn edge-to-edge, so verify
    # rather than trust. Compare each seam against interior steps along THE SAME
    # axis: a left/right seam is one horizontal step, so averaging both axes
    # understates the baseline for anisotropic textures like the banded ones.
    # A seamless tile lands near 1.0. The ceiling is 2.0 because a sinusoid's
    # steepest step is pi/2 ~ 1.57x its mean step, so a seam falling on a steep
    # part of the banding is legitimately above 1.0 without being a seam.
    worst = 0.0
    for path in sorted(OUT.glob("biome-*.png")):
        a = np.asarray(Image.open(path).convert("L"), dtype=float)
        checks = (
            (np.abs(a[:, -1] - a[:, 0]).mean(), np.abs(np.diff(a, axis=1)).mean()),
            (np.abs(a[-1, :] - a[0, :]).mean(), np.abs(np.diff(a, axis=0)).mean()),
        )
        for seam, interior in checks:
            ratio = seam / max(1e-9, interior)
            worst = max(worst, ratio)
            # Absolute escape hatch: a sub-1-level seam cannot be seen at 8bpp.
            if ratio > 2.0 and seam > 1.0:
                raise SystemExit(f"NOT SEAMLESS: {path.name} seam {seam:.2f} vs interior {interior:.2f}")
    print(f"seamless check passed (worst seam/interior step ratio {worst:.2f}; 1.0 = a normal step)")
