# Ground textures

## Replacement in progress: photo-scanned Poly Haven textures

`bun scripts/fetch-ground-textures.ts` replaces all 18 `biome-NN-*.png` files with
CC0 photo-scans from [Poly Haven](https://polyhaven.com) (one distinct scan per region,
mostly top-down), processed identically: native seamless tile (no mirroring), ambient
occlusion at half strength, 1x/2x/4x repeats so ground detail is at a similar scale in
every region, box-filtered to 512x512, brightness nudged toward a per-region target. It
writes `SOURCES.md` (asset, scanner, licence, link) beside the files. Same file names
and size, so `App.tsx` imports do not change. Needs internet access to api.polyhaven.com
and dl.polyhaven.org. Once it has run, the sections below describe the old files.

## Runtime assets

The 18 `biome-NN-*.png` files are 512×512 full-colour derivatives of downloaded
Pexels photographs. Each derivative keeps only photo pixels (crop, mirror, resize,
colour grade); no AI or procedural synthesis is used. The exact source pages, downloaded
byte locators, and Pexels license are recorded in `DATA-PLAN.md`.

## Runtime pipeline

`BIOME_TEXTURE_URLS` maps every world region (1–18) to its own texture. Assets load
lazily and reset the ground chunk cache when ready. The world layer uses 384-world-unit
square blits on a world-aligned lattice. Each 512px asset is a mirrored 2×2 construction,
so every outer edge matches exactly. The mirrored construction enlarges the visual repeat period while exact world alignment keeps
texture phase stable across chunk boundaries. Rotation variants are intentionally disabled: a
90°-rotated neighbor does not share the same edge ordering and can reopen a seam.

Chunks clip to their exact 640×640 bounds and are blitted once, so no overlap band is
used. Deadlight Mall, Saint Mercy, Blackwater interiors, and Harlan Airfield also use
their matching owned photo texture beneath existing authored structure detail.

## Measured seam checks

All 18 final files are 512×512 RGB PNGs. Mean absolute RGB difference is `0.00` for
both left/right and top/bottom outer-edge comparisons on every file. The runtime stride
is 384 world units and ground texture opacity is `.44`.

## Do not regress

- Do not add procedural texture generators; the former placeholder generator was removed.
- Replacement texture input must be a downloaded real photo with verified free-use license.
- Keep identical 512×512 output dimensions and exact edge continuity.
- Own all bytes locally; never hotlink runtime texture assets.
