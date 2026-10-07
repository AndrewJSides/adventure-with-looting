# Ground textures

## What is here

`dirt-seamless.png` is sourced CC0 art used around `VILLAGE_CENTER`.

The 14 `biome-NN-<slug>.png` files are 250×250 seamless, full-colour terrain textures.
They are colour-graded derivatives of four CC0 OpenGameArt textures (grass, grit, rock,
and snow); exact source pages and byte URLs are recorded in `DATA-PLAN.md`.

## Runtime pipeline

`BIOME_TEXTURE_URLS` in `App.tsx` keys textures by region id, loads them lazily, builds
normalized canvas copies, and calls `resetGroundChunkCache()` after each load. Ground
chunks use one fixed orientation on a world-aligned 192-unit lattice: adjacent copies
meet edge-to-edge, without random offsets, rotations, alpha changes, or overlap bands.
The final blit uses `source-over` because these are full-colour assets.

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
| `BIOME_TEXTURE_STRIDE` | 192 world units between blits; the texture is normalized to the same size so edges meet exactly. |
| `BIOME_TEXTURE_ALPHA` | Uniform `.32` across every tile; avoiding per-tile alpha changes removes visible rectangular blocks. |

The Hearthglen camp uses the same normalized texture as a single repeating canvas
pattern clipped to the camp ellipse, rather than overlapping randomized rectangles.

Each texture blit is one draw call during incremental chunk construction. Toggle
**Ground tex** in the profiler effect row (Minimal Mode also disables it) to compare the
WORST FRAME readout with textures on and off. The driving build budget remains capped by
`GROUND_CHUNK_DRIVING_DRAW_BUDGET`.
