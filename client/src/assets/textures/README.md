# Ground textures

## What is here

`dirt-seamless.png` is sourced CC0 art used around `VILLAGE_CENTER`.

The 14 `biome-NN-<slug>.png` files are 250×250 seamless, full-colour terrain textures.
They are colour-graded derivatives of four CC0 OpenGameArt textures (grass, grit, rock,
and snow); exact source pages and byte URLs are recorded in `DATA-PLAN.md`.

## Runtime pipeline

`BIOME_TEXTURE_URLS` in `App.tsx` keys textures by region id, loads them lazily, builds
16 flip/rotate variants, and calls `resetGroundChunkCache()` after each load. The final
blit uses `source-over` because these are full-colour assets.

All final images passed the edge-difference seam check used by
`scripts/gen-placeholder-textures.py`. The placeholder generator remains available as a
diagnostic/reference utility, but running it will overwrite this sourced art.

## Replacement requirements

- Keep the exact filenames and 250×250 PNG dimensions.
- Use seamless art with commercial-compatible provenance; this build requires CC0.
- Own the bytes locally under this directory. Do not hotlink assets.
- For grayscale replacements, reconsider the composite mode and alpha rather than
  assuming the current full-colour tuning is appropriate.

## Tuning

| Constant | Current effect |
|---|---|
| `BIOME_TEXTURE_STRIDE` | 192 world units between blits; a multiple of the 48-unit terrain tile, reducing draw calls versus 144. |
| `BIOME_TEXTURE_SPAN` | `STRIDE * 1.18`; overlaps neighboring blits to hide boundaries. |
| `BIOME_TEXTURE_ALPHA_BASE` / `_RANGE` | `.28` plus up to `.10` deterministic per-tile jitter. |

Each texture blit is one draw call during incremental chunk construction. Toggle
**Ground tex** in the profiler effect row (Minimal Mode also disables it) to compare the
WORST FRAME readout with textures on and off. The driving build budget remains capped by
`GROUND_CHUNK_DRIVING_DRAW_BUDGET`.
