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

### Full-world coverage correction (2026-10-09)

The player’s reference screenshot showed the photo-derived Mosslight texture on the right,
but the flat procedural base on the left. Inspection confirmed the cause: the texture pass
skipped every 384-unit lattice cell whose center fell outside a named region. It also
silently redirected region IDs 15–18 to Old Greyhaven (14), leaving four downloaded,
licensed biome photographs unused.

The runtime now uses the owned Mosslight grass photograph as the fallback for every
unnamed world cell and resolves all 18 region IDs directly. The Hearthglen village overlay
also no longer paints an opaque flat-color radial fill over its downloaded photo; its
photo-derived dirt layer remains beneath structures and authored detail. This makes photo
texture coverage continuous across the world while preserving each named biome’s dedicated
photo, the existing measured seam continuity, tile size, opacity, cache behavior, and
mobile draw-call count. No generated or synthetic texture was added; the fallback reuses
the same locally owned Pexels grass photograph and license already documented below.

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

The final textures use one common 1024px output density and a 1024-world-unit runtime
stride (1 px/world). Each photo derivative is sampled once across that larger period with
a smooth periodic displacement, moving the repeat outside the normal play view without
introducing non-photo pixels. Opposing edges remain byte-identical: measured maximum
per-channel difference is `0` on both edge pairs for all 18 files. The renderer uses one
world-aligned lattice, exact chunk clipping, and a 180-world-unit world-coordinate feather
where named biome photos replace the Mosslight fallback. This prevents grid-shaped biome
boundaries, chunk seams, overlap double-draw, and phase pops during movement.

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


## Recorded-audio replacement pass (2026-10-09)

### Before: synthesized Web Audio inventory

| Sound path | Previous synthesis | Trigger and preserved level/spatial behavior |
|---|---|---|
| Swing, gun, crossbow, reload, hit, headshot, death, hurt | 2–3 square/triangle oscillators per cue, 46–1560 Hz, 130 ms envelopes | Existing combat/reload/player-damage calls; `.06` peak; no distance attenuation |
| Thunder | Generated 1.35 s noise buffer plus 64→31 Hz sine rumble | Lightning event; `.13` noise peak + `.07` rumble |
| Harvester scythe | 1700→3150 Hz saw + 940→1850 Hz square through 2800 Hz bandpass | Telegraph; 1500-unit cutoff; `.055 × (1 − distance/1700)`, floor `.006`; stereo pan clamped ±`.75` |
| Sunwraith chime | Three staggered sine oscillators at 523.25/659.25/783.99 Hz | Spawn cue; `.055` peak, 1.8 s decay |
| Fogmariner bell | Two sine fundamentals plus triangle harmonics | Maritime event; `.08` peak, 2.8 s decay |
| Fire, water, wind, village proximity beds | Generated random-noise buffers, filters, and a 148 Hz village oscillator | Same live falloff: fire `.065` / 300 units; water `.045` / 540; wind `.032` / 480; village `.024` / 620 |
| Footsteps | 90 ms generated noise burst through terrain-dependent bandpass | Moving on foot; `.055` dirt / `.038` other; unchanged 215–470 ms cadence |
| Vehicle engine/start/exhaust | Per-vehicle tone + rumble oscillators, synthesized starter, pulse modulation, synthesized exhaust thump | Mount/start and throttle updates; same per-vehicle profile volumes, throttle gain, low-pass cutoff, motorcycle/mustang pulse timing, start duration, and exhaust cadence |
| Distant threat | 72→36 Hz saw rumble plus optional 330→105 Hz screech | Threat ≥ `.28`; 2800 ms throttle; `.045 + threat × .06` |
| Ambient bed/phrases | 55/82.41/110 Hz oscillators, generated filtered wind, repeating triangle-note phrase | First-touch unlock; existing ambient master and day/night gain updates |
| Chainsaw rev | 94 Hz saw + 188 Hz square through 780 Hz bandpass | Chainsaw weapon fire; `.12` peak, 200 ms |

No synthesized dog bark or UI click path existed. Pickup, chest/victory, roar, zombie vocalizations, night drone, and rain were already routed to recorded files and were preserved.

### After: locally owned recorded files

| Local file | Source recording | License | Duration | Format | Size |
|---|---|---|---:|---|---:|
| `swing-cc0.ogg` | https://freesound.org/people/velcronator/sounds/733888/ | CC0 1.0 | 0.541 s | OGG Vorbis, mono 44.1 kHz | 7,134 B |
| `gun-cc-by.ogg` | https://freesound.org/people/Geoff-Bremner-Audio/sounds/698687/ | CC BY 4.0 | 1.100 s | OGG Vorbis, mono 44.1 kHz | 10,917 B |
| `crossbow-cc0.ogg` | https://freesound.org/people/Lunevix/sounds/246015/ | CC0 1.0 | 0.558 s | OGG Vorbis, mono 44.1 kHz | 7,222 B |
| `reload-cc0.ogg` | https://freesound.org/people/Filmsounduser/sounds/804823/ | CC0 1.0 | 1.020 s | OGG Vorbis, mono 44.1 kHz | 10,520 B |
| `scythe-scrape-cc0.ogg` | https://freesound.org/people/HOrvi64/sounds/832317/ | CC0 1.0 | 0.800 s | OGG Vorbis, mono 44.1 kHz | 9,483 B |
| `sun-bells-cc-by.ogg` | https://freesound.org/people/UncleSigmund/sounds/245767/ | CC BY 4.0 | 1.800 s | OGG Vorbis, mono 44.1 kHz | 19,841 B |
| `fog-bell-cc-by.ogg` | https://freesound.org/people/PeteBarry/sounds/464856/ | CC BY 4.0 | 2.800 s | OGG Vorbis, mono 44.1 kHz | 18,759 B |
| `thunder-cc0.ogg` | https://freesound.org/people/nick121087/sounds/319122/ | CC0 1.0 | 2.300 s | OGG Vorbis, mono 44.1 kHz | 18,284 B |
| `footstep-cc-by.ogg` | https://freesound.org/people/Mossy4/sounds/388289/ | CC BY 4.0 | 0.140 s | OGG Vorbis, mono 44.1 kHz | 4,674 B |
| `fire-loop-cc0.ogg` | https://freesound.org/people/Sauron974/sounds/204348/?page=5 | CC0 1.0 | 7.500 s | OGG Vorbis, mono 44.1 kHz | 58,768 B |
| `water-loop-cc0.ogg` | https://freesound.org/people/SamsterBirdies/sounds/578524/ | CC0 1.0 | 7.500 s | OGG Vorbis, mono 44.1 kHz | 63,932 B |
| `wind-loop-cc-by.ogg` | https://freesound.org/people/JavierSerrat/sounds/488360/?page=1 | CC BY 4.0 | 7.500 s | OGG Vorbis, mono 44.1 kHz | 51,940 B |
| `village-loop-cc0.ogg` | https://freesound.org/people/KikeVilaplana/sounds/566891/ | CC0 1.0 | 7.500 s | OGG Vorbis, mono 44.1 kHz | 51,684 B |
| `engine-loop-cc0.ogg` | https://freesound.org/people/hikkanen/sounds/659093/ | CC0 1.0 | 4.500 s | OGG Vorbis, mono 44.1 kHz | 38,342 B |
| `engine-start-cc-by.ogg` | https://freesound.org/people/tim.kahn/sounds/106014/ | CC BY 4.0 | 1.150 s | OGG Vorbis, mono 44.1 kHz | 12,454 B |
| `chainsaw-cc0.ogg` | https://freesound.org/people/Vocalphobic/sounds/149293/ | CC0 1.0 | 0.240 s | OGG Vorbis, mono 44.1 kHz | 5,029 B |

Existing real zombie hit/death recordings are reused for generic hit, hurt, and death cues; the rifle recording is reused for headshots. The recorded thunder excerpt is reused for the distant-threat cue at its original threshold, cooldown, and gain formula. The existing CC0 night drone replaces the synthesized ambient bed and repeating note phrase.

Exact public preview derivatives downloaded for this pass:

- https://cdn.freesound.org/previews/733/733888_6703998-lq.mp3
- https://cdn.freesound.org/previews/698/698687_10643461-lq.mp3
- https://cdn.freesound.org/previews/246/246015_4517415-lq.mp3
- https://cdn.freesound.org/previews/804/804823_16580571-lq.mp3
- https://cdn.freesound.org/previews/832/832317_14023482-lq.mp3
- https://cdn.freesound.org/previews/245/245767_95609-lq.mp3
- https://cdn.freesound.org/previews/464/464856_5696249-lq.mp3
- https://cdn.freesound.org/previews/319/319122_3840537-lq.mp3
- https://cdn.freesound.org/previews/388/388289_2064400-lq.mp3
- https://cdn.freesound.org/previews/204/204348_152878-lq.mp3
- https://cdn.freesound.org/previews/578/578524_5487341-hq.mp3
- https://cdn.freesound.org/previews/488/488360_3518208-lq.mp3
- https://cdn.freesound.org/previews/566/566891_8938826-lq.mp3
- https://cdn.freesound.org/previews/659/659093_14437982-lq.mp3
- https://cdn.freesound.org/previews/106/106014_7037-lq.mp3
- https://cdn.freesound.org/previews/149/149293_2513936-lq.mp3

All files are bundled under `client/src/assets/audio/`; no runtime request goes to Freesound. Long recordings were reduced to compact mono OGG excerpts. Fire, water, wind, village, and engine loops were crossfaded locally. One-shot windows were selected by measured RMS/peak analysis, not generated or synthesized.
