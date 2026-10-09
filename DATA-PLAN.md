# Data Plan

## Context provenance
- “Would you be able to build a mobile game that’s fully playable within this app?” (prior user statement; establishes touch-first, self-contained play)
- “Adventure with looting” (prior user statement; establishes theme and reward loop)
- “Top-down action roguelite — touch joystick, auto-attacks, monster rooms, treasure chests, gear upgrades, and a boss.” (assistant proposal explicitly accepted by the user’s reply “1”; defines the game format and required systems)

## Tested sources
- The player supplied this top-down truck sprite sheet as visual-shape reference: https://cdn.masto.host/mastodongamedevplace/media_attachments/files/116/835/268/672/487/897/original/f120bac2fe1a5507.png
- The village dirt uses Heathal’s 512×512 seamless dirt texture from OpenGameArt: https://opengameart.org/content/texture-pack-seamless-dirtpng
- The exact owned image bytes were downloaded from: https://opengameart.org/sites/default/files/styles/medium/public/oga-textures/71932/dirt.png
- OpenGameArt lists the texture as CC0. It is credited here even though attribution is not required.
- The rain ambience uses orb1t’s real field recording “rain sound loop no thunder” from Freesound: https://freesound.org/people/orb1t/sounds/723703/
- The exact downloaded preview bytes came from: https://cdn.freesound.org/previews/723/723703_11734604-lq.mp3
- Freesound lists the recording as Creative Commons Zero (CC0), so use and adaptation are permitted without attribution. The locally owned WAV is a 26.691-second mono, 44.1 kHz, 16-bit crossfaded loop derived from that recording; no remote audio is loaded at runtime.
- No factual game content is imported from external sources; the world, enemies, and landmarks remain original.

## Imagery

### Terrain texture replacement (2026-10-08)

The previous 14 `biome-NN-*.png` files were 250×250 8-bit grayscale placeholder
textures produced by the now-removed `scripts/gen-placeholder-textures.py` from NumPy PRNG value noise.
Despite older notes calling them sourced full-colour art, the checked files and generator
prove they were synthetic. Runtime displayed one fixed orientation every 192 world units
at alpha `.32`; region 15 reused Old Greyhaven and regions 16–18 had no dedicated texture.

### Before measurements and hypothesis

| Old asset | Kind | Size | LR edge MAD | TB edge MAD | Luma σ |
|---|---|---:|---:|---:|---:|
| biome 01 | synthetic grayscale noise | 250² | .13 | .15 | 14.8 |
| biome 02 | synthetic grayscale noise | 250² | .40 | 1.41 | 12.7 |
| biome 03 | synthetic grayscale noise | 250² | .04 | 3.40 | 17.6 |
| biome 04 | synthetic grayscale noise | 250² | .90 | .75 | 13.8 |
| biome 05 | synthetic grayscale noise | 250² | .21 | .95 | 11.2 |
| biome 06 | synthetic grayscale noise | 250² | .12 | .14 | 16.1 |
| biome 07 | synthetic grayscale noise | 250² | .30 | .29 | 13.0 |
| biome 08 | synthetic grayscale noise | 250² | .10 | 2.70 | 16.4 |
| biome 09 | synthetic grayscale noise | 250² | .38 | .38 | 14.9 |
| biome 10 | synthetic grayscale noise | 250² | .44 | .82 | 13.5 |
| biome 11 | synthetic grayscale noise | 250² | .04 | .07 | 18.1 |
| biome 12 | synthetic grayscale noise | 250² | .45 | .52 | 13.3 |
| biome 13 | synthetic grayscale noise | 250² | .48 | .55 | 12.7 |
| biome 14 | synthetic grayscale noise | 250² | .58 | .56 | 13.6 |
| biomes 15–18 | missing/dedicated procedural fill only | — | — | — | — |

Old runtime texel density was 250/192 = 1.30 source pixels per world unit. Chunks
were 640² with exact clipping and no overlap band, so overlap double-draw was not the
cause. The measured non-zero opposing-edge differences—especially biome 03 TB 3.40
and biome 08 TB 2.70—support edge discontinuity as one seam source. The fixed `[0]`
orientation and 192-unit repeat also support obvious repetition. The overlap part of the
hypothesis was disproved by the draw bounds; no speculative overlap fix was added.

### Replacement sources and measurements

The replacement set has 18 locally owned 512×512 RGB PNGs. Every file is derived only
from a downloaded Pexels photograph by cropping, mirroring, resizing, and colour grading.
Pexels labels these photos “Free to use” under the Pexels License:
https://www.pexels.com/license/

Photo sources and use (downloaded resolution → final resolution; all **Pexels License**):

- Grass (Mosslight, Pines, Bramblewild, Heartwood, Moonfang, Greyhaven): https://www.pexels.com/photo/green-grass-190316/ — 1000×750 → 512×512; bytes: https://images.pexels.com/photos/190316/pexels-photo-190316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
- Wet mud (Silverrun, Hearthglen, Gloam Mire, Blackwater): https://www.pexels.com/photo/muddy-trail-against-a-field-25799014/ — 1125×750 → 512×512; bytes: https://images.pexels.com/photos/25799014/pexels-photo-25799014/free-photo-of-muddy-trail-against-a-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
- Rock (Cinder Scar, Starfall, Ember Wastes): https://www.pexels.com/nl-nl/foto/oppervlakte-stenen-muur-ruw-rauw-13208589/ — 1000×750 → 512×512; bytes: https://images.pexels.com/photos/13208589/pexels-photo-13208589.jpeg?w=1260&h=750&dpr=1
- Snow (Frostfall): https://www.pexels.com/photo/seamless-texture-of-snow-on-grass-11255803/ — 1200×627 → 512×512; bytes: https://images.pexels.com/photos/11255803/pexels-photo-11255803.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200
- Cracked road (Old Greyhaven): https://www.pexels.com/photo/crack-in-road-17706118/ — 1200×627 → 512×512; bytes: https://images.pexels.com/photos/17706118/pexels-photo-17706118.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200
- Asphalt (Harlan Airfield): https://www.pexels.com/photo/asphalt-surface-11254991/ — 750×750 → 512×512; bytes: https://images.pexels.com/photos/11254991/pexels-photo-11254991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
- Tile floor (Deadlight Mall and Saint Mercy): https://www.pexels.com/photo/white-and-blue-concrete-blocks-4752996/ — 1200×800 → 512×512; bytes: http://images.pexels.com/photos/4752996/pexels-photo-4752996.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=750&w=1260

The new textures use one common 512px output density and a 384-world-unit runtime stride
(1.33 px/world, within 2.4% of the old 1.30 px/world). The mirrored 2×2 construction
gives a measured mean absolute RGB difference of `0.00` on both opposing edge pairs for
all 18 files, down from old maxima of .90 LR and 3.40 TB. Runtime rotation variants are
disabled because cross-rotated neighbors do not preserve edge ordering; stable world
alignment and exact chunk clipping prevent pops and overlap double-draw. Visual repetition
is reduced by doubling the full-tile world period from 192 to 384 units while the richer
photo detail replaces the low-variance noise.

`dirt-seamless.png` remains Heathal’s 250×250 CC0 photograph-derived dirt art from
OpenGameArt for the village-specific legacy path: https://opengameart.org/content/texture-pack-seamless-dirtpng
Exact bytes: https://opengameart.org/sites/default/files/styles/medium/public/oga-textures/71932/dirt.png

The three 576×384 directional character sheets and existing portraits are outside this
terrain-only edit. The player-supplied truck sheet remains visual-shape reference only.

## Long-term data behavior
- **Refresh policy**: No external refresh; a run plays entirely in the client and save snapshots are persisted through typed artifact actions.
- **Growth**: A single durable save record is updated at room clears and meaningful loot/progression events; it does not accumulate unbounded history.
- **Ordering**: Loot choices are shown by rarity, then power; the equipped item remains visually primary.
- **Time semantics**: No real-world time dependency; creation/update timestamps are metadata only.

## Rejected approaches
- **Tried**: Turn-based dungeon crawler or side-scrolling platformer.
  **Why rejected**: The user explicitly chose option 1, the top-down action roguelite.
- **Tried**: External character, vehicle, or landmark art.
  **Why rejected**: Character sheets were drawn in-repository and dedicated external art was unnecessary; the only imported visuals are the owned local CC0 terrain textures and the user-supplied vehicle reference.
