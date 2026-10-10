# Ground textures

## Runtime assets

The 18 `biome-NN-*.png` files are 1024×1024 full-colour derivatives of downloaded Pexels photographs. Each derivative contains only photo pixels transformed by crop, mirror, resize, colour grade, and a smooth periodic displacement; no AI or procedural image synthesis is used. Exact per-file source pages and licenses are recorded in `ATTRIBUTION.md`, with byte locators retained in `DATA-PLAN.md`.

## Runtime pipeline

`BIOME_TEXTURE_URLS` maps every world region (1–18) to its own texture. Assets load lazily and reset the ground chunk cache when ready. The world layer uses 512-world-unit square blits on one world-aligned lattice, increasing photo detail while keeping one consistent scale across all biomes.

Every image has byte-identical opposing edges. A photographed Mosslight texture covers unnamed terrain; named biome photos are composited above it through a 180-world-unit radial feather. The feather is calculated in world coordinates on the chunk scratch canvas, so adjacent 640×640 ground chunks render the same boundary pixels without overlap, gaps, double draw, or phase changes. Interiors retain their matching photo texture beneath authored structure detail.

## Measured seam checks

All 18 files are 1024×1024 RGB PNGs. Maximum per-channel difference is `0` for both left/right and top/bottom outer-edge comparisons on every file. Runtime stride is 512 world units, base photo opacity is `.85`, and biome replacement opacity is `1` with a 180-world-unit feather.

## Do not regress

- Do not add procedural texture generators or generated images.
- Replacement input must be a downloaded real photo with a verified free-use license.
- Keep identical 1024×1024 output dimensions, exact opposing edges, and one consistent world scale.
- Keep texture phase and biome feathering world-aligned across chunk boundaries.
- Own all bytes locally; never hotlink runtime texture assets.
