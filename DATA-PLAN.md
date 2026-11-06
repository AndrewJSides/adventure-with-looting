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

## AI portrait inventory + replacement candidates (2026-10-27, diagnosis only — no swap)

Gate: App.tsx SHA-256 df0904a379b8a8b7590930b859ebbf4d0a8732ce8fc4d859eb3e22c8514d9dfb, 3082 lines — matched before work.

All three AI-generated portraits are Blackwater Bay (region 17) NPCs. They share
exactly ONE render site: App.tsx line 3067, `<img className="npc-portrait">` inside
`.dialogue-portrait-frame` in `.dialogue-shell`, shown only in `mode==="dialogue"`
with that NPC selected. None render in any shop (none of the three NPCs has a shop
mode), quest UI, character screen, or title menu. The in-world NPC is a canvas
sprite, not the portrait.

Slot geometry (theme.css 611–614, 632): `.npc-portrait` is `object-fit: cover;
object-position: center top`, filling the frame. At 390×844 the shell is
min(72%, 520px) tall with a 112px portrait column (max-width:430px breakpoint),
so the frame is ~112 × ~490 CSS px — aspect ~0.23:1, a tall sliver. Only the
horizontal center of the source shows: ~23% of a 1:1 source's width, ~46% of a
1:2 source's width. Any replacement must be face-centered horizontally and near
the top, or pre-cropped to ~0.23:1, or the face will be cut.

| NPC | Import (App.tsx) | Shipped file | Intrinsic | NPC def |
|---|---|---|---|---|
| Old Warden Cobb, "Blackwater lighthouse keeper", (27020, 9060) | L33 `cobbPortrait` | media-generation-old-warden-cobb-0-3b159f1e-1b89-46c2-b948-31e27dbcb64a.webp (600 KB) | 1600×1600, 1:1 | L1154 |
| Tide Runner Sel, "Blackwater dock survivor", (25000, 10360) | L34 `selPortrait` | media-generation-tide-runner-sel-0-21aa86b2-67d4-4338-82cc-504bda7252c2.webp (461 KB) | 1600×1600, 1:1 | L1155 |
| The Drowned Preacher, "Eccentric of the rotting piers", (26140, 11320) | L35 `preacherPortrait` | media-generation-drowned-preacher-0-c44c94e2-fed0-4419-9b38-c7733e26df6f.webp (639 KB) | 1120×2240, 1:2 | L1156 |

Provenance in source: NONE licensed. Filenames carry the `media-generation-`
prefix; each has a sidecar `media-generation-*-<id>.json` holding only a
generation `snapshot_id` and an expiring CDN URL — no license, no attribution.
No portrait entry exists in any ATTRIBUTION.md. Two further AI alternates sit
on disk un-imported (not shipped): cobb `…-d68e9ad1-…webp` 1600×1600 405 KB;
sel `…-1d0f1058-…webp` 1120×2240 686 KB. Content viewed 2026-10-27: Cobb =
painted elderly white-bearded keeper in yellow oilskin holding a lantern,
lighthouse behind; Sel = painted short-dark-haired dock survivor in a red
patched life vest holding a boat hook; Preacher = illustrated seaweed-and-shell
encrusted preacher in a tall hat with driftwood cross, waist-deep at the piers.

Live capture (audit hooks): `__AWL_SHOW_BAY_NPCS__("dialogue")` stages Sel's
dialogue directly — Sel is the only one of the three with a hook-driven live
dialogue path. Cobb is staged only in the world scene (canvas sprite + the
Preacher as chatter text); neither Cobb's nor the Preacher's portrait has an
audit-hook dialogue path, so theirs are source-verified only unless reached by
manual Blackwater travel + interact.

Replacement candidates (NOT downloaded, NOT swapped this run; item-level URL
and pixel dimensions must be re-verified at swap time — this run had no public
web read, so no item URL is asserted here):

| Slot | Candidate source | License terms | Fit |
|---|---|---|---|
| Cobb | Pexels — real photograph, search target: elderly bearded fisherman / lighthouse keeper portrait | Pexels License (https://www.pexels.com/license/, already recorded above for terrain): free to use, personal and commercial, attribution not required | Pexels originals are multi-thousand-px; pick a portrait-orientation, face-centered frame so the 0.23:1 center-top crop keeps the face |
| Sel | Pixabay — real photograph, search target: woman dock / harbour worker portrait | Pixabay Content License: free to use and modify for personal and commercial purposes, attribution not required; unaltered-stock resale and trademark-identifiable uses excluded | Same crop rule as Cobb; a head-and-shoulders harbour shot survives the sliver crop, a wide dock scene does not |
| Preacher | OpenGameArt / Kenney — hand-drawn character portrait pack (matches the current illustrated style, unlike the other two painted portraits) | CC0 1.0 Universal on Kenney assets and on CC0-flagged OpenGameArt submissions: public-domain dedication, any personal/commercial use, no attribution required — verify the individual submission's CC0 flag at download | Pack portraits are typically square and face-centered by construction — the best geometric fit for the 0.23:1 slot of the three |

Decision deferred: swap run picks the exact items, downloads the bytes into
`client/src/assets/portraits/`, records each item URL + license in this file,
and re-captures all three live in dialogue at 390×844.

## Frame-loop allocation pass (2026-11-01)

Gate: App.tsx SHA-256 `2bfe4992a6230e00d55085c2c853aa246baa1f66ae3cbe5705164b5fb51a2b56`
matched before editing. All seven measured per-frame allocations in `frame()`
were eliminated, behavior-identical: (1) `subsystemFrame` is now one object
created once per effect run and zeroed per frame via `resetSubsystemValues`
(the frame tail only copies its numbers into histories/perf frames, so reuse
is safe; MINIMAL MODE subsystem readouts verified live after the change);
(2) `dayCycleState` is memoized on a 1/2048-cycle quantum (~0.23 s of the
480 s cycle; max darkness deviation ≈0.005 inside dawn/dusk bands);
(3) the three roaming `enemies.find` scans became `roamingSpecial()`, a
single-pass cache keyed on world identity + enemy-array identity/length, so
it refreshes exactly on structural transitions (spawn pushes, death
compaction, dawn/night filter removals) and returns the live enemy object,
whose x/y/hp the 90-frame save spread reads; (4) the vehicles mounted-find
and nearest-reduce became plain loops with identical first-wins-tie and
nearest-within-180 semantics; (5) the buff-key array is the module constant
`BUFF_KEYS`; (6) both `refreshEnemyFrameSets` sort comparators are the
module functions `compareEnemyFrameDistance`/`compareEnemyY`;
(7) the blood-moon `[...Set].some(...)` living check became
`world.bloodMoonLivingCount`, incremented on guarded set-add in
`spawnBloodMoonWave`, decremented in the central defeated-enemy processing
(the same pass that compacts the dead out of `world.enemies`, so the count
is exact at the point of the check), and zeroed at `beginBloodMoon`, the
dawn reward clear, and world creation. No save-schema change (the counter
is in-memory world state only).

Measured with the in-game profiler on the same scene (audit session,
390×844, F9 driveClean Rustbucket route, ~25 s recordings):
- Before (recording id 14, previous build): n=571 — median 16.70 ms,
  mean 17.48 ms, p95 16.80 ms, max 66.70 ms, 1 frame ≥50 ms.
  Drive ring: frame p50/p95 16.70/33.30 ms.
- After (recording id 15): n=543 — median 16.70 ms, mean 17.07 ms,
  p95 16.80 ms, max 66.70 ms, 2 frames ≥50 ms.
- After, second sample (recording id 16): n=510 — median 16.70 ms,
  mean 16.96 ms, p95 16.80 ms, max 50.10 ms, 1 frame ≥50 ms.
  Drive ring: frame p50/p95 16.70/16.80 ms.
Verdict: neutral-to-better — median/p95 identical, mean improved
~0.4–0.5 ms in both after-samples, ring p95 improved, and the ≥50 ms
count (1–2 per ~550 frames, vsync-quantized capture timings) is within
run-to-run noise. No sub-change regressed, so none was reverted.
Recordings 14–16 live in the audit sandbox database only.

## Defeated-scan gating pass (2026-11-01)

Gate: App.tsx SHA-256 `d20b9c2c35bdbfe41234810fef330e64ee427490d888598870217d306662a767`
matched before editing; post-edit SHA-256
`f6dd93787818068f2b840c099525cb8fd3b50d6b08266644e2485d0678e68add`.
The frame loop's per-frame `world.enemies.filter(e=>e.hp<=0)` scan now runs
only when the new runtime-only `world.killDirty` flag is set (initialized
`true` in createWorld) or every 300 frames as a backstop
(`world.frameNo%300===0`); the flag is cleared after each gated scan and the
zone-clear `REGIONS` loop after it stays ungated. The flag is set at all 15
enemy `.hp-=` damage sites (NPC melee, snare, player melee, dog, lightning,
Mirrorplate reflect, pipe bomb, outpost spikes, bleed, burn, bile infighting,
vehicle ram, spirit wolf, projectile, shock chain) and all 8 `.hp=0`
kill-assignment sites (harvester/sunwraith/fogmariner/tailspin audit kills,
holdout milestone + F5 wave clear, two audit boss strikes). Deliberately
unflagged: the `__AWL_SHOW_LOOT_JUICE__` staged corpse (line ~2733) — that
enemy is created, decal-stamped manually, and never pushed into
`world.enemies`, so the scan could never see it. No save-schema change (the
flag is in-memory world state only). Edit verified insertion-only: removing
the inserted fragments reproduces the pre-edit file byte-for-byte.

Measured with the in-game profiler on the same scene (audit session,
390×844, MINIMAL MODE, F9 driveClean Rustbucket route, ~26 s recordings):
- Before (sandbox recording): n=517 — median 16.70 ms, mean 20.98 ms,
  p95 50.00 ms, max 100.10 ms, 14 frames ≥50 ms.
  Drive ring: 600 frames, frame p50/p95 16.70/33.40 ms, 11 frames ≥50 ms.
- After (sandbox recording): n=523 — median 16.70 ms, mean 17.04 ms,
  p95 16.80 ms, max 50.00 ms, 0 frames ≥50 ms.
  Drive ring: 600 frames, frame p50/p95 16.70/16.80 ms, 4 frames ≥50 ms.
Verdict: neutral-to-better (the before run carried extra environment noise;
median identical, mean/p95/tails improved) — no regression, nothing reverted.
The structural win is 60 fewer throwaway array allocations + 60 fewer filter
closures per second at 60 fps. Kill verification (F7 driveDecals, same
session): HUD coins 184 → 423 from ram-kill gold, a plank drop label and
LOOT count visible, gore decals stamped (DECAL 2 live, gore visible at route
end), staged bodies compacted (drive completed at max speed 300.0), zero
console errors. Kills processed same-tick via the flag — no backstop delay
observed. Recordings live in the audit sandbox database only.

## Minimap memoization pass (2026-11-01)

The always-visible world-map button was extracted from the main game
component into a `React.memo`'d `WorldMapButton` whose props are only what
the map displays (map window, camera, player position, explored set +
size, cleared-region set + size, region id/name, outpost-claimed key,
box/yarrow names + positions, harvester/fogmariner positions,
wreckmother flag, inside/sewer flags, stable open callback), so the 100 ms
HUD tick no longer rebuilds its SVG/fog/pin subtree when nothing it shows
changed. The fog-reveal ellipse list is now built by `fogRevealPoints`,
which caches the parsed explored-cell list keyed on explored-set size
(cells are only ever added) and only re-projects positions onto the
current window. Dungeon/city pin data arrays are hoisted module constants.
No visual, layout, or interaction changes; no save-schema changes.

Measured with the in-game profiler (audit session, 390×844):
- Before (stored baseline recording id 7, previous build): 919 samples /
  51.5 s — mean frame 16.11 ms, p95 23 ms, worst 39 ms, 11 frames ≥ 50 ms.
- After (recording id 14, this build, ~25 s of live night boss-fight play
  at Blackwater Bay): 511 samples — median 16.70 ms, mean 16.73 ms,
  p95 16.70 ms, max 33.40 ms, 0 frames ≥ 50 ms. Live panel at capture:
  56 FPS, terrain/stream/enemy subsystems ≈ 0.00 ms.
Scenes differ (baseline was a mixed session), so the mean is not a clean
A/B; the tail improvement (p95 23 → 16.7 ms, ≥50 ms stalls 11 → 0) is the
signal, plus the structural guarantee that idle HUD ticks skip the subtree.

## AI portrait swap — completed (2026-10-27)

Gate: App.tsx SHA-256 matched the handoff value
`df0904a379b8a8b7590930b859ebbf4d0a8732ce8fc4d859eb3e22c8514d9dfb` (3082 lines)
before any edit. Only imports L33–L35 were repointed; the render slot,
theme.css, and the old AI files on disk are unchanged.

All three replacements are real photographs from Pexels, each verified on its
live item page (photographer, camera EXIF, dimensions, "Free" license badge)
before download. License for all three: **Pexels License**
(https://www.pexels.com/license/) — free to use for personal and commercial
purposes; **attribution is not required** under that license (recorded per
item, not assumed). Full-size bytes were downloaded from images.pexels.com
and pre-cropped to the dialogue sliver aspect (8:35 ≈ 0.2286:1, shipped at
336×1470 WebP) with the face centered near the top, located by visual
grounding on the full-size file, and each crop was visually inspected.

| Slot | Item page (verbatim final URL) | Photographer | Source dims | Bytes URL | Crop applied (from full-size) | Shipped file |
|---|---|---|---|---|---|---|
| Old Warden Cobb | https://www.pexels.com/photo/34712848/ | Eslam Mohammed Abdelmaksoud (Canon EOS R6 EXIF) | 5472×3648 | https://images.pexels.com/photos/34712848/pexels-photo-34712848.jpeg | 686×3000 @ (2459,648), face bbox x 453–571 / y 255–474 (0–1000) | `cobb-pexels-34712848.webp` |
| Tide Runner Sel | https://www.pexels.com/photo/38828583/ | Hữu Quyền Nguyễn (Canon EOS R8 EXIF) | 5554×3703 | https://images.pexels.com/photos/38828583/pexels-photo-38828583.jpeg | 847×3703 @ (1668,0), face bbox x 298–455 / y 168–468 (0–1000) | `sel-pexels-38828583.webp` |
| The Drowned Preacher | https://www.pexels.com/photo/17527466/ | Mehmet Turgut Kirkgoz | 5156×3867 | https://images.pexels.com/photos/17527466/pexels-photo-17527466.jpeg | 754×3300 @ (2201,567), face bbox x 428–572 / y 312–505 (0–1000) | `preacher-pexels-17527466.webp` |

Deviations from the original directions, recorded plainly:

- Sel's direction named Pixabay. pixabay.com was blocked to the browsing
  tool in this environment (policy denial on the search page), so no Pixabay
  item could be verified at item level; per the standing rule that an
  unverified asset never ships, Sel uses a verified Pexels photograph
  instead (fish-market fisherwoman, head-and-shoulders). A second verified
  Pexels candidate (32943722, fisherwoman with a red crate, 3728×5592) was
  rejected because the subject's torso is covered in a repeating brand
  monogram pattern.
- The Preacher's direction preferred a free CC0 hand-drawn portrait
  (Kenney/OpenGameArt). No CC0 illustrated portrait that fits the sliver
  crop was verified in this pass (OpenGameArt surfaced only a large
  uncurated CC0-portraits collection; no fitting item was item-verified),
  so the brief's explicit fallback — a real Pexels photograph — was used:
  an elderly white-bearded man praying with rosary beads in a graveyard,
  which matches the character's death-haunted eccentric brief.

## 2026-11-03/04 — Old Greyhaven city-drive staging hook (audit-only)

Concurrency gate: `client/src/App.tsx` SHA-256 verified
`0718a40460b13ada70a7e6122f812db8d1bd2a41726fdfd85f459a67501552ea`
before any edit (2026-11-03). Hook + Drive probe button + compact probe
style landed at `7edb4c5395efa48a27775feba799df72f0d3464a858d7509e34919827637a577`.
A second edit (route-keeper fix, below) landed at
`e955dd40c0b3bebfc605e8c9236bf16feed972fb11bc4e9997f8bd51afd3f0e5`
(verified by re-hash after editing; build typechecks clean, 0 console errors).

Corridor: the y=19600 line is blocked by North Apartments, Market Arcade, and
Hotel Ruin. The drivable line is the north street at y=19300: 110 clear of
Civic Records' south edge (19190) and 65 clear of Market Arcade's north edge
(19365), truck radius 48. Seeded-tree check (exact `seededTrees()` extracted
and run in Node, 7,038 trees) leaves one tree within r+68 on x 23800–27300
at (26727,19187,r47): clearance +18.1 at y=19300 (would clip at y=19278).
Route: `CITY_DRIVE_ROUTE_START {24600,19300}` → `CITY_DRIVE_ROUTE_END
{27300,19300}`; the feathered ruin edge x=26700 is crossed ~7 s after staging
at Rustbucket speed 300. Clean run ends before the stall tree at x≈27444.

Hook: `__AWL_SHOW_OLD_GREYHAVEN_DRIVE__`, audit-path-gated
(`/hatch-audit-` only, mirroring `__AWL_SHOW_OLD_GREYHAVEN__`), placed
immediately after the Old Greyhaven hook. It relocates the Rustbucket +
player/camera to the route start, clears dungeon/interior/enemies/projectiles,
forces playing, sets day/clear weather, joystick input east, applies vehicle +
decal effect flags, expanded profiler, and arms the existing `driveClean`
diagnostic (rings readable via `__AWL_READ_DRIVE_DIAGNOSTIC__`). It calls no
`persist`, touches no save field (keys/dog untouched), and changes no
terrain/blend/feather, chunk-streaming, or gameplay-balance code. A `Drive`
button (aria-label `Stage Old Greyhaven drive`) on the existing
`#old-greyhaven-probe` panel is the probe affordance (the probe tool has no
JS-eval verb); compact panel styling is scoped to that panel only.

Diagnosis that unblocked the run: the first probe session showed meadow
grass/road after staging, with notices/outputs confirming the hook ran. The
cause was the frame-loop diagnostic route-keeper (App.tsx ~L3146): while
`forcedDiagnosticScenario` is set it snaps the truck back to the hardcoded
meadow `DIAGNOSTIC_ROUTE_START` whenever lateral > 150 or progress is out of
[-.02,.96], so the city staging was teleported back every frame. Fix, all
inside diagnostic tooling: module-level `activeDiagnosticRouteStart/End`
(defaulting to the meadow constants), the keeper now follows the active
route, `resetDiagnosticRings()` restores the meadow defaults, the city hook
sets the active route to the city route after resetting, and the drive
effect's cleanup restores the defaults. Meadow F9 behavior is unchanged by
construction (keeper arithmetic is identical when the active route is the
meadow route); its live frame in the final session was occluded by a pending
relic-claim modal from the sandbox save, not re-probed visually. Note for
future runs: staging Drive arms the keeper; boundary/interior hooks staged
after a Drive click in the same session will be snapped back unless the
diagnostic is reset first.

Evidence (audit `2026-11-04T00-08-04Z-850586993`, mobile 390×844, 0 console
errors on every probe response): staged city frames `observe-001.png`
(staging frame: dark ruin ground, ruined buildings, truck on the street,
REGION 14/18, Old Greyhaven, CLEAR, 300 SPD), `observe-008.png` (mid-city),
`observe-017.png` (pale feather-zone ground east of the ruin core),
`observe-026.png` (later loop pass, back in the city core). Profiler overlay
visible throughout: FPS 51–60, AVG 16.8–19.6 ms, P95 16.8–33.4 ms, WORST
49.9–83.4 ms steady (333.3 ms staging spike in the first frame only), CHUNKS
645–678, CANVAS 24–60, vehicle speed 300, fuel 100→99% per pass with keeper
refills. The x=26700 crossing itself is inferred from keeper loop cycling
(fuel refills, day advance 09:09→10:10, return to the city core), not from a
coordinate readout — no coordinate readout exists in the UI. The driveClean
ring summary JSON was not dumped: the probe tool cannot evaluate JS, so
`__AWL_READ_DRIVE_DIAGNOSTIC__` was verified by code path only (scenario
stays `driveClean`; ring push untouched). Audit-path HUD occlusion note: on
audit paths only, probe panels overlay the bottom HUD (`Exit Rustbucket`,
`Dash`, etc. reported occluded); the player route has no probe panels.

## 2026-11-03 — Old Greyhaven ruin-edge feather regression re-check (no fix shipped)

SHA gate: `client/src/App.tsx` SHA-256 recorded BEFORE any work and re-verified
after measurement, unchanged:
`e955dd40c0b3bebfc605e8c9236bf16feed972fb11bc4e9997f8bd51afd3f0e5`
(1,057,941 bytes). Gate value `e955dd40` matched, so the run proceeded.
No game code, save schema, or asset was changed in this run; `App.tsx`
remains byte-identical. Only this DATA-PLAN record was added. No vehicle-drive
measurement was run (separate mobile-perf slice).

Source confirmation (current source, lines cited): `RUINED_CITY_CENTER`
`{x:25200,y:19600}` (App.tsx L519), so the ruin rect is x 23700–26700,
y 18150–21050. L2513 sets `ruinFeather=180, ruinSteps=18`. L2517 draws the
concentric ground rings on all four edges, ramping base alpha 0 at the outer
edge to full `.76` at 180 world units in (four `fillRect` calls per step:
top, bottom, left, right). L2519 feathers the east–west street-grid bands at
their left/right ends only, and L2520 feathers the north–south bands at
their top/bottom ends only, over the same 180 units. The 180-unit feather
on all four edges and the feathered band ends are still present.

Method (stated exactly; same strip/threshold for boundary and control):
scripted staged gameplay in the audit probe session — NOT the title menu —
mobile viewport 390×844, screenshot DPR 1, full-resolution canvas
390×540 CSS px at canvas bbox y 101–641, textures active (photo grass/ruin
ground visible), day/clear weather via `__AWL_SHOW_OLD_GREYHAVEN__`
(`boundary`: player 26750,19600; camera x 26390, y 19100). World x=26700
maps to screenshot column 168: (26700−26390)/720×390 = 167.9. Per row,
step = |Rec.601 luma at column xc+2 − luma at xc−2| (a 5 px strip,
columns xc−2…xc+2); a hit is step > 30/255. Denominator = rows analysed.
Black/missing-tile count = pixels with max(R,G,B) < 10 in canvas rows
101–425. This differs from the 12:34 run's capture geometry (its
denominators differed between before/after), so the comparison here is
against a same-session interior control at identical geometry, not only
against the 12:34 percentages.

Results, same session (audit `2026-11-04T00-45-31Z-178263123`):

| Strip | Hits / denominator | Longest run | Median step | Mean step | Max step |
|---|---|---:|---:|---:|---:|
| Boundary, x=26700 (col 168), rows 101–425 | 12/325 (3.7%) | 4 rows | 7.4 | 9.4 | 44.1 |
| Boundary, x=26700 (col 168), rows 180–425 (excludes top tree/HUD zone) | 7/246 (2.8%) | 2 rows | 9.0 | 10.5 | 39.4 |
| Interior control, ground gap col 360 (world 25505, inside ruin, east of Market Arcade), rows 180–425 | 0/246 (0.0%) | 0 | 0.9 | 1.3 | 7.7 |
| Interior, same column 168 (Market Arcade building floor), rows 180–425 | 0/246 (0.0%) | 0 | 0.0 | 4.3 | 24.0 |

Boundary hit rows (full range): 141–144 (the feather-edge tree canopy at
world 26727,19187), 159, 211, 220, 375, 376, 405, 419, 420 — scattered
singles and one 4-row tree cluster, not a continuous vertical edge. A
repeat boundary frame (`observe-008.png`, re-staged after the interior
frame) reproduced the full-range result exactly: 12/325, longest run 4,
same hit rows. Black/missing-tile pixels: 0/126,750 in both the boundary
and interior frames, and 0/126,750 in the repeat boundary frame.

Verdict: NO REGRESSION. Boundary density 3.7% (2.8% in the clean row
range) is at the 12:34 post-fix level (4.2%, longest run 4) and far below
the 12:34 pre-fix level (231/710, 32.5%, continuous clusters, 30–60 luma
step); it sits just above the same-session interior control (0.0%) with
no long continuous run, consistent with texture variation plus the tree
canopy, not a hard continuous edge. Per the fix-if gate, no feather
restore was made.

Frames/overhead in the same session: profiler recording over the static
staged boundary scene (sandbox recording, n=263 frames): median 16.70 ms,
mean 16.67 ms, p95 16.70 ms, max 16.80 ms, over-50 ms frames 0,
chunkLoads 0. Console errors: 0 on every probe response in the session.
Typecheck: `bun x tsc --noEmit -p client/tsconfig.json && bun x tsc
--noEmit -p server/tsconfig.json` exited 0 (clean).

Captures (staged gameplay frames in audit `2026-11-04T00-45-31Z-178263123`,
mobile 390×844): `observe-003.png` (boundary, player 26750,19600 —
darker ruin ground left of the soft edge, bright grass right, street band
across the middle, feather-edge tree top-centre), `observe-004.png`
(interior, player 25200,19600, inside Market Arcade), `observe-008.png`
(repeat boundary frame with the profiler-record summary visible).
Audit-path HUD occlusion note (unchanged): probe panels overlay the
bottom HUD on audit paths only; the player route has no probe panels.

## 2026-11-03 — Old Greyhaven moving-camera vehicle drive: feather-edge crossing cost (measurement only, no fix shipped)

SHA gate: `client/src/App.tsx` SHA-256 recorded BEFORE any work and
re-verified after measurement, unchanged:
`e955dd40c0b3bebfc605e8c9236bf16feed972fb11bc4e9997f8bd51afd3f0e5`
(1,057,941 bytes). Gate value `e955dd40` matched, so the run proceeded.
No game code, save schema, asset, terrain/feather, chunk-streaming,
player-route, or balance change was made in this run; `App.tsx` remains
byte-identical. Only this DATA-PLAN record was added. The rebuild
regenerated `client/src/generated-build.ts` only (BUILD_ID
`7019e14085b8`, timestamp `20261104T023905687Z`, visible in the probe
frames) — build-only metadata churn, no gameplay effect.

Method (same session throughout; staged gameplay, NOT the title menu):
mobile viewport 390×844, canvas 390×540 CSS px at y 101–641, textures
active (photo ruin/grass ground visible in every frame), day/clear
weather, minimal mode OFF, render scale 1 by construction
(`targetRenderScale` is `DRIVING_RENDER_SCALE = 1` while driving and 1
otherwise — no dynamic-resolution path exists). Staging used the
existing audit-only `__AWL_SHOW_OLD_GREYHAVEN_DRIVE__` hook and its
`Drive` button (`/hatch-audit-` only): Rustbucket + player/camera to
`CITY_DRIVE_ROUTE_START {24600,19300}`, due east at forced speed 300
through the feathered ruin edge at x=26700 (feather band 26520–26700),
looping back at route end. Each window is one profiler recording made
with the existing audit `Record` / `Stop + save` toggle; the recording
summary line is computed from the probe session's own saved recording
(median/mean/p95/max/over-50/chunkLoads) and read from the probe DOM.
Windows were bracketed by screenshots fired in single probe batches
with no reads between start and stop, so the truck's phase at each
bracket is visible in the saved frames. Instruments and their limits:
the probe tool has no JS-eval verb, so `__AWL_READ_DRIVE_DIAGNOSTIC__`
ring JSON could not be dumped; the DRIVE PROBE ring summary sits below
the fold of the profiler scrollport and could not be reached by probe
scrolling (attempted, no movement), so subsystem evidence is the
per-frame diagnostic strip visible in the window frames plus the
recording chunk-load counts. Raw recording samples were not read
(they live in the probe session's scratch database; the delivered
numbers are the UI-rendered recording summaries). The day clock was
NOT used for position: it advances on clamped frame deltas, so its
rate varies with frame rate. Position is proven by scene bracketing
plus the pixel measurement below, on the deterministic route/speed.

Position proof: `observe-014.png` (R3 pre-record bracket) shows 0%
green ground pixels across the visible canvas at four sampled rows —
pure interior ruin ground, no feather/grass in view, so the truck was
west of the feather band. `observe-015.png` (inside the R3 recording)
shows a clean vertical dark→green ground transition at screen column
~254–274 on three rows (a ground edge, not a tree/building — it spans
rows 280–400 at the same columns), with the truck sprite west of it:
at driving zoom 0.86 (view 837 world units over 390 px, camera centre
lagging the truck ~33 units), column C maps to world
X = truck.x − 451.5 + C/0.466, so the transition at C≈260 puts the
truck at x≈26410–26590 for a flip inside the 26520–26700 feather band
— the x=26700 edge visible in-frame, crossing imminent. `act-010.png`
(R3 stop frame) is all green ground across the visible canvas with no
ruin ground and no loop-teleport staging spike: the truck is east of
the edge. The crossing therefore falls strictly inside the R3
recording, which started after the interior bracket and stopped at the
east frame. R2's brackets (`observe-009.png`, `act-007.png`) both show
dark ruin ground with ruined buildings flanking the street and no
grass: a pure interior control window, ≥600 units clear of the feather
band (route start 24600, ~2 s of driving at speed 300).

Results, same session (audit `2026-11-04T02-39-36Z-373463904`,
0 console errors on every probe response):

| Recording | Window | n (50 ms samples) | Median | Mean | P95 | Max | Over 50 ms | Chunk loads |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| id 15 (R2) | Interior control, city ground, x≈24600–25600 | 42 | 66.65 ms | 54.31 ms | 150.00 ms | 166.60 ms | 22 (52%) | 3 |
| id 16 (R3) | Feather-edge crossing, approach → x=26700 → just east | 36 | 66.65 ms | 53.71 ms | 100.00 ms | 116.60 ms | 21 (58%) | 3 |
| id 14 (R1) | Full route, staging + ~2 loop passes (mixed) | 431 | 66.60 ms | 54.13 ms | 100.00 ms | 183.30 ms | 236 (55%) | 12 |

Subsystem strip (per-frame diagnostic timings visible in the window
frames; latest-frame values, not window aggregates): control frame
`observe-009.png` — TERRAIN 0.10, STAMP 0.00/0, DECAL 0.00, STREAM
0.00/0, VEHICLE 0.09, ENEMY 0.00, RENDER PASS 16.69 ms. Crossing frame
`observe-015.png` — TERRAIN 0.20, STAMP 0.00/0, DECAL 0.00, STREAM
0.00/0, VEHICLE 0.09, ENEMY 0.00, RENDER PASS 16.69 ms. Chunks cached
657 (control) vs 644 (crossing); chunk-stream cost 0.00 ms in both
frames; no decal stamps in either (clean drive, no kills).

Verdict: NO REGRESSION. Median identical (66.65 vs 66.65 ms), mean
slightly lower at the crossing (53.71 vs 54.31 ms), p95 lower (100 vs
150 ms), max lower (116.60 vs 166.60 ms), chunk loads identical (3 vs
3). The over-50 rate is 6 points higher at the crossing (58% vs 52%)
on n=36/42 — within sampling noise (SE ≈ 8 points) and bounded by the
lower crossing max; there is no sustained p95 / over-50 enrichment at
the crossing, and no subsystem signal tied to the feather rings
(terrain +0.10 ms on one instantaneous frame, stream/decal unchanged).
Per the fix-if gate, no fix was shipped — no stacked speculative
changes, no quality degradation, no terrain/feather code touched.

Session-condition caveat: absolute frame times in this headless audit
session are depressed (steady 15–21 FPS, ~50–65 ms averages; medians
quantized at the 66.65 ms frame quantum) versus the earlier
`2026-11-04T00-08-04Z` session (51–60 FPS). The harness conditions
differ between sessions, so only the same-session crossing-vs-control
comparison above is claimed. Staging spikes (2416 ms first staging,
383 ms re-staging; chunk-cache reset + first-frame upload) sit outside
both windows by sequencing (recordings start after staging).

Frames (staged gameplay drive frames in audit
`2026-11-04T02-39-36Z-373463904`, mobile 390×844): `act-001.png`
(staging frame, truck at 24600,19300, dark ruin ground, staging spike
visible in profiler), `act-008.png` (R3 staging, R2 summary line
visible), `observe-009.png` + `act-007.png` (control window brackets,
interior city street, truck moving, 300 SPD), `observe-014.png`
(crossing approach, interior ground, R2 summary line visible),
`observe-015.png` (edge in frame, dark→green transition at col ~260,
truck west of it), `act-010.png` (stop frame, all grass east of the
edge), `observe-016.png` (R3 summary line visible, truck looping east
of the edge). Audit-path HUD occlusion note (unchanged): probe panels
overlay the bottom HUD on audit paths only; the player route has no
probe panels. Touch path: the drive ran through the existing joystick
input (input east at full speed) with the game surface untouched.

Console errors: 0 on every probe response in the session (audit
envelope and all probe calls). Typecheck: `bun x tsc --noEmit -p
client/tsconfig.json && bun x tsc --noEmit -p server/tsconfig.json`
exited 0 (clean).

## 2026-11-03 — Greyhaven town-border ground seam probe (no fix shipped)

SHA gate: `client/src/App.tsx` SHA-256 recorded BEFORE any work and
re-verified after measurement, unchanged:
`e955dd40c0b3bebfc605e8c9236bf16feed972fb11bc4e9997f8bd51afd3f0e5`
(1,057,941 bytes). Gate value `e955dd40` matched, so the run proceeded.
No game code, save schema, asset, terrain/feather, chunk-streaming,
player-route, or balance change was made in this run; `App.tsx` remains
byte-identical. Only this DATA-PLAN record was added. The rebuild
regenerated `client/src/generated-build.ts` only (BUILD_ID/timestamp) —
build-only metadata churn, no gameplay effect.

Source confirmation (current source): Greyhaven is region 13,
`FRONTIER_CENTER {x:5300,y:6400}`, radius 1450 (App.tsx L1032). Its ground
is two overlapping feathers, not a rect edge like Old Greyhaven: the
biome texture layer (`drawBiomeTextureLayer`, L2059) replaces the
Mosslight fallback under a radial mask with feather
`min(radius*.42, BIOME_EDGE_FEATHER=720)` = 609 world units (band
841–1450 from the town centre), and the town dirt patch
(`frontierGround`, L2161) is an irregular 1800×1520 blob with a 230-unit
blur feather drawn over it (`drawCityDistricts`, L2507). The crossing
therefore has no single straight edge x=…; the visible transition is a
broad diagonal soft blend where the dirt patch and the radial biome
feather overlap, running roughly x = 266 − 0.33·y in screen space in the
crossing frame below.

Method (stated exactly; same strip/threshold as the Old Greyhaven
x=26700 method, adapted to the diagonal band): scripted staged gameplay
in the audit probe session — NOT the title menu — mobile viewport
390×844, screenshot DPR 1, full-resolution canvas 390×540 CSS px at
canvas bbox y 63–603, textures active (photo dirt/grass ground visible),
rain weather (Greyhaven default cycle; thunderstorm at staging, rain by
the crossing — same weather for border and control frames in the
crossing window). Staging used the existing audit-only terrain probe
`Show terrain probe Greyhaven yard` (player 5300,6400, interior control
frame), then the existing `=` joystick pin drove due east at y=6400.
The due-east line passes within 1 unit of the Boarding House door
(5720,6401), whose frame-loop auto-entry radius is 32, so the first walk
entered the interior (as in the prior audit's interrupted border walk);
a second walk deadlocked against the patrolling Tamsin Vale NPC in the
door corridor. The successful crossing used the existing audit `0` key
to exit the Boarding House interior to door+34 (5720,6435), just outside
the 32-unit auto-entry radius, with the joystick pin still held east, so
the player walked out at y=6435 through the clear corridor between the
Boarding House and the Watch House, across the border, onto Mosslight
grass — on foot throughout the crossing frames, no vehicle mount, no
loot-clear overlay (only transient chatter/rule toasts). Per-row step =
|Rec.601 luma at band+2 − luma at band−2| (a 5 px strip); a hit is step
> 30/255. Analysis window is a verified ground-only window, rows
170–265, cols 150–360, below the minimap/quest HUD panels and above the
player/chatter/probe-panel zones; the band line x = 266 − 0.33·y was
read from the enlarged crossing frame, and a free band-following
argmax (x 150–260) was run as a check. Black/missing-tile count =
pixels with max(R,G,B) < 10 in canvas rows 101–425.

Results, same session (audit `2026-11-04T04-37-56Z-702938780`):

| Strip | Hits / denominator | Longest run | Median step | Mean step | Max step |
|---|---|---:|---:|---:|---:|
| Border band, fitted line, `observe-086.png`, rows 170–265 | 1/96 (1.0%) | 1 | 6.0 | 7.6 | 30.3 |
| Border band, free band-follow, same frame/rows | 0 hits at argmax; step median 6.5, mean 7.7, max 28.5; argmax x stdev 29.4 (wanders — no consistent edge) | — | 6.5 | 7.7 | 28.5 |
| Grass control, col 330, same frame/rows | 0/96 (0.0%) | 0 | 3.8 | 5.9 | 29.8 |
| Dirt control, col 155, same frame/rows | 1/96 (1.0%) | 1 | 5.3 | 7.2 | 34.2 |
| Earlier crossing frame, fitted line, `observe-085.png` | 0/96 (0.0%) | 0 | 5.2 | 5.8 | 19.9 |
| Post-crossing frame, fitted line, `observe-087.png` | 0/96 (0.0%) | 0 | 5.4 | 6.9 | 27.6 |

Black/missing-tile pixels: 0/126,750 in both the border frame
(`observe-086.png`) and the interior control frame (`observe-025.png`).
The post-crossing col-330 strip shows 18/96 hits in two runs — the tree
canopy at the frame's right edge, confirming the method does detect
real edges; the band line in the same frame shows none.

Verdict: NO DEFECT. The border band sits at texture-noise level (1.0%,
longest run 1, median step 6.0) against the same-frame grass (0.0%) and
dirt (1.0%) controls, far below the Old Greyhaven pre-fix level (32.5%,
continuous runs) and at/below its post-fix level (4.2%, longest run 4).
The transition reads as a wide soft blend, not a hard continuous edge.
Per the fix-if gate, no feather change was made. Probe hazards
documented for future runs: letter keys are audit shortcuts in this
harness (`w` stages the Deadlight Mall interior, `e` stages the
frontier quest, `0` exits an interior) — use only clicks, `=`, `0`, and
`Space` for movement staging; the Boarding House door auto-enters
within 32 units, and the Tamsin Vale patrol can deadlock a due-east
joystick walk in the door corridor.

Frames (staged gameplay frames in audit
`2026-11-04T04-37-56Z-702938780`, mobile 390×844): `observe-002.png`
(interior control, Greyhaven yard, thunderstorm), `observe-025.png`
(interior control, rain, town dirt + Tamsin's Supply), `observe-078.png`
(door approach, Tamsin Vale clear of the lane), `observe-082.png`
(inside Boarding House), `observe-084.png` ("Boarding House exited",
town dirt), `observe-085.png` (crossing approach, dirt→grass blend
entering frame), `observe-086.png` (border band in frame, diagonal soft
blend, Bria Stone + zombie, no vehicle/loot overlay), `observe-087.png`
+ `observe-089.png` (all grass east of the border), `observe-091.png`
(final stopped frame, pin released). Audit-path HUD occlusion note
(unchanged): probe panels overlay the bottom HUD on audit paths only;
the player route has no probe panels. Touch path: the walk ran through
the existing joystick pin (input east) with the game surface untouched;
`touch-action: none` / `user-select: none` and tap-to-shoot/melee/
driving paths were not modified.

Console errors: 0 on every probe response in the session (audit
envelope and all probe calls). Typecheck: `bun x tsc --noEmit -p
client/tsconfig.json && bun x tsc --noEmit -p server/tsconfig.json`
exited 0 (clean). Durable rows paired pre/post: the audit scope counted
14 durable rows (`game_save` 1, `perf_recordings` 13) before this edit;
no durable row was written by this run — all staging/persist side
effects stayed in the sandbox database.

## 2026-11-04 — Capture-pipeline diagnosis: staged gameplay frames exist on disk but the delivered capture set is title-menu-only (no fix shipped)

SHA gate: `client/src/App.tsx` SHA-256 recorded BEFORE any work and
re-verified after this diagnosis, unchanged:
`4e07329bab1f0eb733aa1b6f87479545c1a907b8c49363680cec1faa2ea3537c`
(1,062,291 bytes). Gate prefix `4e07329b` matched, so the run proceeded.
No game code, save schema, asset, terrain, probe-panel, or staging-hook
change was made; `App.tsx` remains byte-identical. Only this DATA-PLAN
record was added. The rebuild regenerated
`client/src/generated-build.ts` only (BUILD_ID/timestamp) — build-only
metadata churn, no gameplay effect.

Question: three consecutive Tamsin shop-panel attempts (Nov 4 00:34,
01:34-adjacent, 02:34) reported staged 390x844 gameplay frames, yet the
attested delivered capture set showed only the title menu ("Beyond the
Wildwood", New Game/Options) with audit probe panels visible.

Reproduction (this run, audit session `1400e716-bb9c-401b-95ea-deb2184d59a5`,
audit dir `2026-11-04T11-37-39Z-616991228`, mobile viewport 390x844,
full-resolution canvas, no reload, no viewport switch): hid the five
visible probe panels first (census, Cinder Scar, Old Greyhaven, wayfire,
terrain lattice — each by its distinct "Hide audit … panel" button; the
sixth, "Hide audit profiler panel", had no visible node at the title
menu, so it could not be hidden there and its panel never appeared in
this session), clicked New Game, clicked Skip intro, pressed `b`
(the audit key that invokes `__AWL_SHOW_TAMSIN_SHOP__`). The shop
opened: `observe-004.png` shows Tamsin's Frontier Supply, 999 gold,
Greyhaven Plate 180 / Snare Trap 55 / Iron Key 85 / Gold Key 160, Close
shop, no probe panels visible. Console errors: 0 on every probe
response. The probe session DID leave the title menu, in this run and
in the baseline run below.

Pipeline trace: the harness writes the three canonical captures
(`screenshot.png`, `screenshot-full.png`, `screenshot-mobile.png`) at
audit start, on initial load — before any probe interaction can stage
gameplay. Probe screenshots (`act-*.png`, `observe-*.png`) are written
later, into the same audit directory, but `report.json`'s `viewports`
section names only the three canonical files, and neither `act-001`
nor `observe-004` (nor any probe filename) appears anywhere in
`report.json`. The handoff/attestation reads the canonical files (the
spawn metadata's before-screenshot is `screenshot-full.png`). No
session reset or reload happens before export: the canonical files'
mtimes (11:38:05–11:38:11) precede every probe frame (11:39:20+), and
none was rewritten after staging. Cause (b) is confirmed — gameplay
frames exist on disk but are not attached to the delivered set — and
(d) in its within-directory form: the right directory, the wrong
files. Causes (a) (never left title), (c) (reset to title before
export), and wrong-directory (d) are rejected on this file/session
evidence. The panels visible in the canonical captures are there
because they render at menu load, before any hide click can run.

Reconciliation, this session's audit dir
`2026-11-04T11-37-39Z-616991228` (taken = on disk; delivered = named
in `report.json` viewports / spawn before-screenshot):

| File | Taken (mtime) | State at capture | In delivered set? |
|---|---|---|---|
| `screenshot-mobile.png` | 11:38:05 | Title menu + probe panels | YES — title only |
| `screenshot.png` / `screenshot-full.png` | 11:38:09 / 11:38:11 | Title menu + probe panels (desktop) | YES — title only |
| `observe-001.png` | 11:39:20 | Title menu + probe panels (probe start) | NO |
| `act-001.png` … `act-005.png` | 11:39:27–11:39:33 | Title menu, panels hiding one by one | NO |
| `act-005.png` | 11:39:33 | Clean title menu, all visible panels hidden | NO |
| `act-006.png` / `observe-002.png` | 11:39:45 / 11:39:46 | Story intro 1/3 after New Game | NO |
| `act-007.png` / `observe-003.png` | 11:39:54 / 11:39:55 | Gameplay, Hearthglen, FPS 22, no panels | NO |
| `observe-004.png` / `observe-005.png` | 11:40:04 / 11:40:06 | Tamsin shop open, 999 gold, no panels | NO |

Baseline audit dir `2026-11-04T10-37-11Z-542174977` (same pattern;
states classified by direct viewing of `screenshot-mobile.png`,
`act-007.png` (Hearthglen gameplay), `act-010.png` (Greyhaven,
"Tamsin's frontier supply" dialogue) plus 16x16 average-hash distance
to the title frame — title-like ≤28, gameplay ≥86): canonical three
are title-only; `act-001.png`…`act-005.png`, `observe-001.png`,
`observe-002.png` are title-like; `act-006.png`…`act-013.png` and
`observe-003.png`…`observe-009.png` (15 files) are gameplay frames,
none in the delivered set.

FIX-IF verdict: NO code fix shipped. No `App.tsx` change within the
gates can make the delivered set include staged gameplay: the
canonical captures fire at initial load, before any interaction, and
auto-staging gameplay (or auto-opening the shop) at load would break
the title menu for real players and violate zero probe residue. Hiding
the probe panels by default would only yield a clean title-menu
capture, still not gameplay. The fix belongs harness-side: the
handoff must promote the probe session's `act-`/`observe-` frames
(or re-capture the canonical files after staging). Until that lands,
the Tamsin shop-panel row/Close measurement stays blocked as a
delivered-evidence matter — the measurement itself reproduces fine in
the probe session, as `observe-004.png` proves. No shop-panel, probe,
terrain, or HUD defect was fixed in this slice; none was found beyond
the absent-at-menu profiler hide control noted above.

Typecheck: `bun x tsc --noEmit -p client/tsconfig.json && bun x tsc
--noEmit -p server/tsconfig.json` exited 0 (clean). Durable rows
paired pre/post: the audit scope counted 14 durable rows
(`game_save` 1, `perf_recordings` 13) before this edit; durable
`app.db` is byte-untouched since 2026-11-01 (mtime unchanged), the
sandbox listed the same 13 recordings (ids 1–13, all Oct 6), and all
New Game / staging side effects stayed in the sandbox database.

## 2026-11-04 — Saint Mercy Infirmary ground texture integrity probe (no fix shipped)

SHA gate: `client/src/App.tsx` SHA-256 recorded BEFORE any work and
re-verified after measurement, unchanged:
`dccd741658398fe4b33401aa537178b03b3422e05fb50d6022d26c90b0250ce2`
(1,063,564 bytes). Gate prefix `dccd7416` matched, so the run proceeded.
No game code, save schema, asset, terrain/feather, chunk-streaming,
player-route, or balance change was made; `App.tsx` remains byte-identical.
Only this DATA-PLAN record was added. The build run regenerated
`client/src/generated-build.ts` only (`BUILD_TIMESTAMP`/`BUILD_ID` to
`2026-11-04T15:39:47.093Z`; `BUILD_HASH` unchanged) — build-only metadata
churn, no gameplay effect. Durable `app.db` byte-untouched (mtime Nov 1);
all staging/recording side effects stayed in the sandbox database
(recordings id 14–16 are sandbox-only).

Source confirmation (current source): region 16, `HOSPITAL_CENTER
{x:15600,y:4400}`, radius 1300. Ground is the radial biome layer
(`drawBiomeTextureLayer`): biome-16 texture over the Mosslight fallback
under a radial mask, feather `min(radius*.42, BIOME_EDGE_FEATHER=720)` =
546 world units (band radius 754–1300; due-east outer edge x=16900).
`HOSPITAL_INSIDE` is 1800×1300 (x 14700–16500, y 3750–5050); the building
apron rect in `drawCityDistricts` is 1800×1400 centred on the hospital.
Interior door is (15600,4796); `0` exits an interior to (15600,5012).

Method (stated exactly; same strip/threshold as prior biome probes):
scripted staged gameplay in the audit probe session — NOT the title menu —
mobile viewport 390×844, screenshot DPR 1 (PNG 390×844), full-resolution
canvas 390×540 CSS px at canvas bbox y 63–603, textures active. Per-row
step = |Rec.601 luma at band+2 − luma at band−2| (a 5 px strip); a hit is
step > 30/255. Black/missing-tile count = pixels with max(R,G,B) < 10 in
screenshot rows 101–425 (primary) and full canvas rows 63–602. Staging
used the existing audit keys F12 (boss interior) and `0` (exit), plus the
ENTER button (re-entry). F8 (exterior) and F11 (ward) are UNREACHABLE in
this build in the probe session — see hazards below — so no day exterior
stage and no ward stage were obtained; both interior stages run at
timeOfDay .88 (night, clear) and the entry stage ran at dawn 06:50, clear.
No due-east walk to the r=1300 outer edge was possible (see hazards), so
the outer edge itself was never framed; the exterior transition evidence
below is the building-apron square edge and the feather-zone scan in the
static exit frames, plus the interior controls. Frame times are the
profiler recording summaries read from the probe DOM (same-session,
sandbox recordings).

Results, same session (audit `2026-11-04T15-45-38Z-143951536`, session
`2376835c-0831-4723-9e99-99926eed27b5`, 0 console errors on every probe
response):

| Strip | Hits / denominator | Longest run | Median step | Mean step | Max step |
|---|---|---:|---:|---:|---:|
| Interior boss, full lattice scan, `observe-013.png`, rows 440–530, cols 60–330 (V pooled + H pooled) | 0/24661 + 1/24661 (0.00%) | 1 | 0.6–0.9 | 0.6–1.2 | 35.2 (single px) |
| Interior boss repeat, `observe-018.png`, same window | 0/24661 + 1/24661 (0.00%) | 1 | — | — | — |
| Interior entry, HUD-excluded clean window, `observe-094.png`, rows 450–530, cols 70–350 (V + H) | 0/22761 + 0/22761 (0.00%) | 0 | 0.0 | 0.0–0.4 | <30 |
| Interior entry, tighter window rows 475–530, cols 70–350 | 0/15736 + 0/15736 (0.00%) | 0 | — | — | — |
| Exterior apron edge, geometric row 380, `observe-020.png` + repeat `observe-087.png`, cols 40–190 | 4/151 + 4/151 (2.6% pooled) | 4 | 1.1 | 3.2 | 32.9 |
| Exterior apron band, fitted rows 371–375, `observe-020.png` | 9–16/151 per row (6–11%) | 8–10 | 1.0–1.9 | 4.6–9.6 | 64.5 |
| Exterior control band, rows 300–315, `observe-020.png` | 359/3171 pooled (11.3%) | 22 | 1.7–7.7 | 11.8–16.0 | 80.8 |
| Exterior feather zone, `observe-087.png` (toast-free), rows 478–491, cols 130–260 | 24–38/131 per row (18–29%) | 27 | — | — | 228.7 |
| Exterior chunk/stride cols 65/250/342, `observe-087.png`, rows 460–535 | 0/76 each | 0 | 0.2–0.4 | 0.3–1.1 | 18.5 |

Attribution (checked by hit positions + enlarged crop, not assumed): the
raw entry-frame scan (HUD included) showed 60 V + 116 H hits — every one
traces to the FPS profiler HUD box corner at (cols 59–63, rows 468–472)
and bottom-button tops at row 535, both DOM overlays; the HUD-excluded
window is 0 throughout. The apron-band hits cluster at cols 110–131 and
155–170 (tree canopies / sprites), never a full-width line; the apron
edge sits at/below the same-frame control clutter (2.6% vs 11.3%). The
feather-zone rows' hits are 2–4 clusters per row (zombie/tree sprite
edges, longest run 27/131 cols) with no continuous arc line; chunk and
stride columns are 0. Mean luma: interior boss window 31.2, interior
entry window 11.9 (near-flat dark floor — little texture signal to seam),
exterior apron zone 38.5, feather zone 29.4 (night frames).

Black/missing-tile pixels: 0/126,750 (rows 101–425) and 0/210,600 (full
canvas) in `observe-013.png`, `observe-094.png`, `observe-020.png`, and
`observe-087.png`.

Frame times (profiler recordings, sandbox): interior boss id 14 — n=32,
median 16.70 ms, mean 28.63 ms, p95 66.70 ms, max 83.30 ms, over-50 2,
chunkLoads 0. Exterior exit id 15 — n=81, median 33.20 ms, mean 40.94 ms,
p95 83.40 ms, max 133.30 ms, over-50 28, chunkLoads 0. Interior entry id
16 — n=31, median 16.70 ms, mean 17.74 ms, p95 33.40 ms, max 33.40 ms,
over-50 0, chunkLoads 0. Small-n caveat on id 14/16 (short windows); no
crossing-vs-control frame comparison exists because no crossing window
was stageable. Live FPS overlays: 33 (boss), 35 (exit), 43–49 (entry).

Verdict: NO DEFECT FOUND within what could be staged. No hard square
edge, no seam banding above control levels, and no missing/black tiles at
any staged Infirmary location. Per the fix-if gate, no fix was shipped.
LIMIT STATED PLAINLY: the r=1300 outer-edge crossing frame was NOT
obtained and is not in the evidence set; the feather gradient's outer edge
was not measured. The delivered canonical captures for this audit are
title-menu-only (harness captures at initial load, before staging — see
the 2026-11-04 capture-pipeline diagnosis); the staged gameplay frames
below exist only as probe frames in the audit directory above, not in the
delivered set.

Frames (staged gameplay frames in audit
`2026-11-04T15-45-38Z-143951536`, mobile 390×844): `observe-012.png` +
`observe-013.png` (F12 boss interior, player 15600,3970, Subject Zero,
night 21:09–21:12 clear, REGION 16/18), `observe-018.png` (same interior,
post-recording), `observe-020.png` (`0` exit exterior, player 15600,5012,
night 23:37 clear, ENTER button visible), `observe-026.png` (exterior,
post-recording, 23:58), `observe-087.png` (exterior after 60 ArrowRight
presses, no movement, night 02:58, toast-free), `observe-089.png` +
`observe-094.png` (ENTER re-entry interior, dawn 06:50 clear).
Hazard/contamination frames in the same dir: `observe-003.png` /
`observe-004.png` (diagnostic drive after F8), `observe-007.png`
(drive + storm after F11).

Probe hazards documented for future runs (all verified in source + in
this session): F8 is claimed by the drive-diagnostic capture handler
(F8 = `driveDecalsOff`, stops propagation — it mounts the Rustbucket and
drives the meadow route; the truck keeps driving after Reset rings, which
only zeroes rings/scenario, it does not stop the truck); F11 is claimed
by the audio-probe capture handler (F11 = storm weather, stops
propagation); `=` is a hardcore fatal strike in `/spaces/v2/hatch-audit-`
sessions AND the joystick-pin key — do NOT press it (it sets hp=0);
letter keys `w`/`e`/`q`/`1`–`9` are audit waypoints/quests in this
session, so WASD movement is unavailable; probe `key` is a press
(down+up), and 60 ArrowRight presses produced zero camera shift (best
shift 0 px, mean luma diff 10.4 = enemy/HUD animation only) — there is
no held-input path in the probe tool, and dash requires held movement
input, so walking/driving to a boundary is impossible without a new
audit-only staging hook or joystick-drag probe support. A dedicated
Infirmary boundary staging hook (player just outside x=16900, day/clear)
is the missing affordance for a future outer-edge run; adding it was
outside this run's fix-if gate. Touch path: no joystick, tap-to-shoot,
melee, driving, SAVE, autosave, banner, shop, probe-panel, terrain,
chunk, glow, audio, night-mask, HUD, key-binding, save-schema, or
drawTailspin code was touched.

Console errors: 0 on every probe response in the session. Typecheck:
`bun x tsc --noEmit -p client/tsconfig.json && bun x tsc --noEmit -p
server/tsconfig.json` exited 0 (clean).

## 2026-11-04 — Saint Mercy Infirmary r=1300 outer-edge ground seam probe (no fix shipped)

SHA gate: `client/src/App.tsx` SHA-256 recorded BEFORE any work and
re-verified after measurement, unchanged:
`e1867ea162e21ad3cd65fe2ad5d3f7931f677e3bb2b149f1e302379a4ea24ba0`
(1,067,339 bytes). Gate prefix `e1867ea1` matched, so the run proceeded.
No game code, save schema, asset, terrain/feather, chunk-streaming,
player-route, probe-tooling, or balance change was made; `App.tsx`
remains byte-identical. Only this DATA-PLAN record was added. The
rebuild regenerated `client/src/generated-build.ts` only
(`BUILD_TIMESTAMP`/`BUILD_ID`; `BUILD_HASH` unchanged at
`8043732018dd…`) — build-only metadata churn, no gameplay effect.
Durable rows paired pre/post: the audit scope counted 14 durable rows
(`game_save` 1, `perf_recordings` 13) before this edit; no durable row
was written by this run — the profiler recording below (id 14) is
sandbox-only.

Source confirmation (current source): region 16, `HOSPITAL_CENTER
{x:15600,y:4400}`, radius 1300. Ground is the radial biome layer
(`drawBiomeTextureLayer`, L2059): biome-16 texture over the Mosslight
fallback under a radial mask, feather `min(radius*.42,
BIOME_EDGE_FEATHER=720)` = 546 world units (band radius 754–1300;
due-east outer edge x=16900). The staging hook shipped in the baseline
(`__AWL_SHOW_INFIRMARY_EDGE__`, L2755) puts the player exactly at
(16900,4400), zone 16, `timeOfDay` .38 (day), clear, camera
(16540,3900), zoom 1, ground-chunk cache reset, enemies cleared. The
built-in biome seam probe (`__AWL_RUN_BIOME_SEAM_PROBE__`) covers only
Ember/Silverrun/Frostfall/Hearthglen — no Saint Mercy border — so this
run measured from staged PNG frames with the prior seam-density method,
as the Greyhaven and earlier Infirmary probes did.

Method (stated exactly): scripted staged gameplay in the audit probe
session — NOT the title menu — mobile viewport 390×844, DPR 1
(PNG 390×844), full-resolution canvas 390×540 CSS px at canvas bbox
y 63–603, textures active (photo grass/tile ground visible), day/clear.
Screen geometry from source constants: VIEW_W 720, VIEW_H 1000, so
scale 0.5417 px/wu (x) and 0.54 (y); the r=1300 circle is the ellipse
centred at screen (−509.2, canvas row 270), radii (704.2, 702.0); the
due-east crossing is canvas x=195.0 at the player row, and the arc
stays within x 191.3–195.0 over the clean window, so an arc-following
strip is used. Per-row step (Method A, Greyhaven PNG method) =
|Rec.601 luma at arc+2 − luma at arc−2| (a 5 px strip); a hit is step
> 30/255. Method B (built-in probe sampler adapted to the arc): at
each arc point and each normal offset −2…+2, gradient
|L(offset+1) − L(offset−1)| along the normal; a hit is > 30/255.
Clean window: canvas rows 170–250 (screenshot rows 233–313), below the
quest/minimap HUD, above the player sprite and bottom controls, clear
of tree foliage/shadows. Controls in the same frames: interior strip
x=120 (inside the feather annulus) and exterior strip x=310 (outside
the region, pure fallback). Black/missing-tile count = pixels with
max(R,G,B) < 10 in the full canvas and in screenshot rows 101–425.
Ground pixels were verified stable: observe-004/005/006 agree to 0.1
in every reported statistic, and the re-staged observe-011 canvas is
99.90% pixel-identical to observe-006 (remainder is clock/FPS text).

Results, same session (audit `2026-11-04T18-38-21Z-645478262`, session
`20e6d26d-037f-4dc2-b35e-8afec265decb`, 0 console errors on every probe
response), primary frame `observe-006.png`:

| Strip (clean window, rows 170–250) | Method A hits | Longest run | Median step | Mean step | Max step |
|---|---|---:|---:|---:|---:|
| Border arc, x 191.3–195.0 | 0/81 (0.0%) | 0 | 9.3 | 10.0 | 26.3 |
| Interior control, x=120 | 3/81 (3.7%) | 1 | 7.6 | 9.4 | 33.4 |
| Exterior control, x=310 | 4/81 (4.9%) | 2 | 11.0 | 12.8 | 45.9 |

| Strip (same window) | Method B hits | Rows with ≥1 hit | Longest row run | Median | Mean | Max |
|---|---|---:|---:|---:|---:|---:|
| Border arc | 8/405 (2.0%) | 7 | 2 | 8.6 | 10.3 | 36.0 |
| Interior control, x=120 | 9/405 (2.2%) | 8 | 3 | 6.7 | 9.1 | 40.8 |
| Exterior control, x=310 | 18/405 (4.4%) | 15 | 2 | 9.6 | 11.3 | 44.3 |

Wide scan (canvas rows 100–400, Method A): border 14/301 (4.7%,
longest run 9) — the only hits cluster at rows 114–118 (tree
foliage/shadow at x≈178; mean RGB 102,98,47) and rows 317–325 (player
shadow/sprite zone; mean luma 59.5), both outside the clean window and
attributable to sprites, not ground. Same wide scan: interior 12/301,
exterior 8/301. Free band-follow check (per-row argmax of the 5 px step
over x 150–260, clean window): argmax median x=230, mean 216.5, stdev
34.4, range 150–260 — it wanders across the whole search range with no
concentration at the border (x≈193–195). Fixed-x sensitivity: a
straight x=195 strip gives 2/81, still below the exterior control.
Mean luma in the clean window: border zone (x 150–240) 101.5, interior
zone (x 60–140) 91.2, exterior zone (x 260–350) 105.0 — no step; by
construction the whole visible window lies inside the feather annulus
(nearest visible ground is 940 wu from the region centre, feather band
754–1300), so the transition is a broad ramp, not a localised edge.

Black/missing-tile pixels: 0/210,600 (full canvas) and 0/126,750
(rows 101–425) in `act-007.png`, `observe-004.png`, `observe-005.png`,
`observe-006.png`, re-staged `observe-011.png`, and interior
`observe-008.png`.

Interior control frames (same session, panels hidden): F12 staged the
Saint Mercy boss interior (night 21:09, player 15600,3970, Subject
Zero, FPS 58) — `observe-008.png` + `observe-009.png`. Lattice scan,
screenshot rows 440–530, cols 60–330: vertical 0/24,479 + horizontal
1/24,119 hits, median 0.3–0.4, mean 0.56–0.63, max 35.2, window mean
luma 31.0 (near-flat dark floor — little texture signal, as in the
prior probe). The day exterior stage (F8) remains unreachable in this
build: F8 is claimed by the drive-diagnostic and combo handlers and
F11 by the audio probe (both stop propagation), verified in source;
`=` was not pressed (fatal strike in audit sessions, per prior record).

Frame times: profiler recording saved id 14 (sandbox) — n=390, median
16.70 ms, mean 16.71 ms, p95 16.70 ms, max 33.40 ms, over-50 0,
chunkLoads 0. The recording window spans reload/title/staging/edge
gameplay (mixed), not the edge alone. Live FPS overlay readings at the
staged edge: 31 (`act-007.png`), 32 (`observe-006.png`), 36
(`observe-011.png`); interior 58 (`observe-008.png`). Both are
reported as observed; no over-50 frame and no chunk load occurred in
the recording window.

Verdict: NO DEFECT. The r=1300 outer-edge band sits at/below texture
noise on both samplers (Method A 0.0% vs interior 3.7% / exterior
4.9%; Method B 2.0% vs 2.2% / 4.4%), the band-follow finds no
consistent edge, and there are no missing/black tiles. This closes the
gap left by the 07:34 probe: the outer-edge crossing frame was obtained
and measured. Per the fix-if gate, no feather change was shipped — a
feather fix on the Old Greyhaven code path would change a gradient
that already measures clean, and interior alpha/coverage is unchanged.
The delivered canonical captures for this audit are title-menu-only
(harness captures at initial load, before staging — see the 2026-11-04
capture-pipeline diagnosis); the staged gameplay frames below exist
only as probe frames in the audit directory above, not in the
delivered set.

Frames (staged gameplay frames in audit
`2026-11-04T18-38-21Z-645478262`, mobile 390×844): `observe-002.png`
(staged edge, panels visible, day 09:11, REGION 16/18), `act-007.png`
+ `observe-004.png` + `observe-005.png` + `observe-006.png` (edge,
panels hidden, day 09:59–12:44), `observe-008.png` +
`observe-009.png` (F12 boss interior control, night 21:09, panels
hidden), `observe-011.png` (re-staged edge after reload, panels
hidden, day 09:20, Method A reproduced exactly),
`observe-014.png`…`observe-017.png` + `act-015.png`…`act-017.png`
(profiler recording cycle at the edge, panels visible),
`observe-018.png`…`observe-020.png` + `observe-022.png` (recording
stop and saved-summary status). Hazard/contamination notes: the
profiler panel's "Hide audit profiler panel" button has no visible
node in gameplay in this session (its panel never renders a hideable
node here, as in the prior diagnosis) — the FPS box and the "Stage
Tamsin shop" button remain visible but lie outside the canvas /
measurement window. Touch path: no joystick, tap-to-shoot, melee,
driving, SAVE, autosave, banner, shop, probe-panel, terrain, chunk,
glow, audio, night-mask, HUD, key-binding, save-schema, or
drawTailspin code was touched.

Console errors: 0 on every probe response in the session. Typecheck:
`bun x tsc --noEmit -p client/tsconfig.json && bun x tsc --noEmit -p
server/tsconfig.json` exited 0 (clean).

Audit-panel collapse (Nov 4, 2026): on `/hatch-audit-` paths the seven
diagnostic panels (census, Cinder Scar, Old Greyhaven, Saint Mercy edge,
wayfire, terrain lattice, profiler) now start collapsed — a
`body.awl-audit-panels-collapsed` stylesheet rule hides them so they no
longer cover New Game / Options or the joystick and context buttons on a
390x844 phone. One 44px toggle, "Show audit panels" (top-left, below the
status rail), reveals them; every staging button, window hook, and
per-panel "Hide panel" button is unchanged, so probe staging still works
after one toggle tap. No player-route, save, or gameplay code touched.

## 2026-11-04 — Cross-region vehicle-drive cost comparison: Mosslight open ground vs Old Greyhaven interior (measurement only, no fix shipped)

SHA gate: `client/src/App.tsx` SHA-256 recorded BEFORE any work and
re-verified after measurement, unchanged:
`9cf762c0099471d7bc137cc0f145ec3b4d46d1c159ac2f29311e29dda5279759`
(1,069,417 bytes). Gate prefix `9cf762c0` matched, so the run proceeded.
No game code, save schema, asset, terrain, chunk-streaming, player-route,
or balance change was made; `App.tsx` remains byte-identical. Only this
DATA-PLAN record was added. The rebuild regenerated
`client/src/generated-build.ts` only (BUILD_ID `a8086470f10e-20261104T204133612Z`
— build-only metadata churn, no gameplay effect).

Method (same probe session throughout; staged gameplay, NOT the title
menu): mobile viewport 390x844, full-resolution canvas, textures active
(photo grass/ruin ground visible in every drive frame), day/clear weather,
minimal mode OFF, render scale 1 by construction (no dynamic-resolution
path exists). Audit panels collapsed via the shipped "Show audit panels"
toggle during each drive window and re-expanded only to stop/save. Same
Rustbucket, same settings, same session for both legs; each leg used the
identical 7-step probe batch (stage, Record, collapse panels, observe,
expand panels, Stop + save, observe). Staging: Mosslight via the existing
audit-only F9 `driveClean` hook (`__AWL_SETUP_DRIVE_DIAGNOSTIC__`,
(8600,29000)->(13000,31600), "DRIVE · NO KILLS"); Old Greyhaven interior
via the existing audit-only Drive button (`__AWL_SHOW_OLD_GREYHAVEN_DRIVE__`,
(24600,19300) due east on the y=19300 north street). Contamination note:
the first Mosslight attempt was voided — staging the Old Greyhaven
interior on foot first triggered a pending "REGION CLEARED · Choose one
relic" modal, so F9/Record were ignored ("not in gameplay"); the relic
was claimed (in-session only), the drive re-staged fresh from F9, and the
void attempt saved nothing. The city window was kept interior-only: the
identical short batch held the truck west of the 26520-26700 feather
band — both city frames (`observe-014.png`, `observe-015.png`) show pure
dark ruin ground with ruined buildings flanking the street and no grass
transition in view, unlike the 2026-11-03 crossing frame where the edge
was visible at column ~260. Instruments and limits: the probe tool has
no JS-eval verb, so `__AWL_READ_DRIVE_DIAGNOSTIC__` ring JSON and the
below-fold profiler recording detail (window-aggregate chunk-build steps
and draw calls) could not be dumped; subsystem evidence is the audit
recording summary line plus the per-frame diagnostic strip visible in
the drive frames (latest-frame values, not window aggregates). Raw
samples were not read: recordings live in the probe session's sandbox
database only — `getPerfRecording` id 14 in the builder sandbox returned
"not found" and its list still tops out at the pre-existing id 13.

Results, same session (audit `2026-11-04T20-41-59Z-002529504`,
0 console errors on every probe response):

| Recording | Window | n (50 ms samples) | Median | Mean | P95 | Max | Over 50 ms | Chunk loads |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| id 14 | Mosslight open ground, Rustbucket 300 SPD | 38 | 16.70 ms | 17.12 ms | 16.80 ms | 33.30 ms | 0 (0%) | 6 |
| id 15 | Old Greyhaven interior street, Rustbucket 300 SPD, west of x=26700 edge | 36 | 16.70 ms | 18.99 ms | 33.40 ms | 49.90 ms | 0 (0%) | 3 |

Subsystem strip, latest drive frame (Mosslight `observe-008.png`):
FPS 56, AVG 17.7 ms, P95 16.8 ms, WORST 116.6 ms, DRAW 127, ENEMIES 56,
TERRAIN 0.10, STAMP 0.00/0, DECAL 0.00, STREAM 0.00/0, VEHICLE 0.19,
ENEMY 0.00, RENDER PASS 10.00 ms. City interior (`observe-014.png`):
FPS 58, AVG 17.2 ms, P95 16.8 ms, WORST 33.4 ms, DRAW 663, ENEMIES 96,
TERRAIN 0.10, STAMP 0.00/0, DECAL 0.00, STREAM 0.00/0, VEHICLE 0.09,
ENEMY 0.00, RENDER PASS 10.00 ms. DRAW is a single-frame value and
volatile (796 on an earlier Mosslight frame, `act-007.png`); no
window-aggregate draw-call or chunk-build-step total is claimed.

Verdict: NO FIX SHIPPED. Median identical (16.70 vs 16.70 ms), over-50
rate identical (0% vs 0%), chunk loads lower in the city leg (3 vs 6),
and the subsystem strips are indistinguishable (terrain +0.00 ms,
stream 0.00/0 in both, render pass 10.00 ms in both). The city p95/max
elevation (+16.6/+16.6 ms, one vsync quantum) rests on ~1-2 frames in
n=36-38 windows and is not an over-50 enrichment; no subsystem ties any
cost to terrain, streaming, or any other subsystem. Per the fix-if gate,
nothing was shipped — no quality degradation, no dynamic resolution, no
terrain/feather code touched. Recordings 14-15 live in the probe
session's sandbox database only; the durable save / perf store was not
touched (no save action invoked, no migration, no post-submit action).

Console errors: 0 on every probe response in the session. Typecheck:
`bun x tsc --noEmit -p client/tsconfig.json && bun x tsc --noEmit -p
server/tsconfig.json` exited 0 (clean).

## 2026-11-04 — Driving restoration after Resume from the pause menu (measurement only, no fix shipped)

SHA gate: `client/src/App.tsx` SHA-256 recorded BEFORE any probe work and
re-verified after measurement, unchanged:
`9cf762c0099471d7bc137cc0f145ec3b4d46d1c159ac2f29311e29dda5279759`
(1,069,417 bytes). Gate prefix `9cf762c0` matched, so the run proceeded.
No game code, save schema, asset, terrain, chunk-streaming, player-route,
or balance change was made; `App.tsx` remains byte-identical. Only this
DATA-PLAN record was added. The rebuild regenerated
`client/src/generated-build.ts` only (BUILD_ID
`a8086470f10e-20261105T003811157Z` — build-only metadata churn, no
gameplay effect).

Method (same probe session throughout; staged gameplay, NOT the title
menu): mobile viewport 390x844, full-resolution canvas 390x540 CSS px at
y 101-641, textures active (photo grass/ruin ground visible in every drive
frame), night/rain by the time of the pause window, minimal mode OFF,
render scale 1 by construction (no dynamic-resolution path exists).
Staging used the existing audit-only F9 `driveClean` hook
(`__AWL_SETUP_DRIVE_DIAGNOSTIC__`, audit-path-gated): Rustbucket mounted
at the player, forced speed 300 on the Mosslight route. The story intro
(3 cards) was dismissed by tapping the dialog node; Save / Save & exit
were never clicked, the persisted joystick/WASD toggle was never touched
(the staging hook sets only the in-memory scheme; the pause menu still
showed JOYSTICK pressed), and all writes stayed in the probe session's
sandbox database — the durable save was not touched (no save action
invoked, no migration, no post-submit action). The probe tool has no
JS-eval verb, so `__AWL_READ_DRIVE_DIAGNOSTIC__` ring JSON could not be
dumped; ring/strip numbers below are the UI-rendered values from the
probe DOM. Frames: pre-pause driving `observe-009.png`/`observe-012.png`,
pause menu `observe-014.png`, post-Resume driving `observe-015.png`/
`observe-016.png` (audit `2026-11-05T00-38-36Z-050329393`, 0 console
errors on every probe response).

Pre-pause (observe-012): joystick [2,535,104,104]; Exit Rustbucket
[186,537,47,48]; Dash [186,589,47,48]; Aim Pipe Bomb [288,537,47,48];
healing [237,589,47,48]; Cargo [157,210,78,44]; Pause [342,14,44,44];
no Swing/Reload while driving. HUD: RUSTBUCKET 300 SPD, FUEL 97%,
HP 98, RAM READY; notice "Audit Rustbucket · 300 speed · DRIVE · NO
KILLS". Drive-probe ring (rolling 600 frames): FRAME P50 16.70 / P95
33.40, OVER50 4, CLAMPED 11, MAX SPEED 300.0. Profiler strip: FPS 56,
AVG 17.9 ms, P95 33.3 ms, WORST 50.1 ms.

Pause menu (observe-014): RUN PAUSED / Loadout & stats overlay; Resume,
Options, Save, Save & exit present in the overlay (Resume only was
clicked). Post-Resume (observe-015/016): overlay dismissed; every box
above byte-identical (joystick, Exit, Dash, Pipe Bomb, healing, Cargo,
Pause — same coordinates and sizes). HUD: RUSTBUCKET 300 SPD, FUEL 99%,
HP 180 (route-loop reset by the staging hook's own rule when the route
completed, not a resume effect), RAM READY; still mounted/driving, EXIT
present, no Swing/Reload. Ring: FRAME P50 16.70 / P95 16.80, OVER50 2,
CLAMPED 10, MAX SPEED 300.0 — the ring kept recording driving frames
after Resume with no new over-50 enrichment. Strip: FPS 58, AVG 17.2 ms,
P95 16.8 ms, WORST 33.4 ms. Scene position advanced between the
pre-pause and post-Resume frames (Wilderness/Starfall Expanse to
Mosslight Meadow, headlight cone visible), so the truck kept moving
after Resume.

Verdict: NO FIX SHIPPED. Driving restores correctly after Resume:
mounted state, drive UI, and all control boxes identical pre/post, speed
300 maintained, and frame times improved rather than degraded across the
pause. Per the fix-if gate, nothing was shipped. Limitation, stated
plainly: the F9 staging hook re-applies drive input every playing tick
while its forced scenario is active, so this run proves restoration of
the staged drive (mounted state + drive UI + movement + frame times),
not a fresh unforced joystick hold after Resume. A pure joystick-hold
check was not safely probeable: the probe has no drag verb, and the
`__AWL_PIN_JOYSTICK__` "=" key shares a binding with a hardcore
fatal-strike audit key on the `/spaces/v2/hatch-audit-` path, so "="
was deliberately never pressed. Code check supports the rest: `changeMode`
clears only transient input/joystick state and never touches
`world.vehicle.mounted`, and the joystick pointer handlers re-establish
`inputRef` on fresh input.

Console errors: 0 on every probe response in the session. Typecheck:
`bun x tsc --noEmit -p client/tsconfig.json && bun x tsc --noEmit -p
server/tsconfig.json` exited 0 (clean).

Platform v27 guest-access inspection (2026-11-04, same run): no source
change needed. `loadGame` returns no save + `canSave: false` + a sign-in
message for a missing viewer (rows stay partitioned by `viewerKey`;
no fabricated identity); `saveGame`/`resetGame` reject a missing viewer
with an `ok: false` message, and the client never shows "saved" on
failure (`persist` maps guest failure to "local" and keeps session
state; New Game for guests starts a local-only run without calling
`resetGame`; the hardcore wipe call is skipped client-side for guests).
Perf recordings are global by design (migration 0021) with no private
data — listing/saving them is the same for guests as for signed-in
non-owners. No action calls inference, tools, agents, or privileged
callbacks, so there is nothing to gate on shared pages; this artifact
has no scheduled refreshes to preserve. Upgrade completed by inspection.

## 2026-11-04 (late) — Ground chunk-streaming frame cost during sustained high-speed driving (measurement only, NO FIX SHIPPED)

SHA gate: `client/src/App.tsx` SHA-256 recorded BEFORE any probe work and
re-verified after measurement, unchanged:
`5afcb9bebce6d8342ccababf0f36f25c743204df7dae997b2006c8f3e01bea4e`
(1,075,068 bytes). Gate prefix `5afcb9be` matched pre and post, so the run
proceeded. No game code, save schema, asset, terrain, chunk-streaming,
player-route, or balance change was made; `App.tsx` remains byte-identical.
Only this DATA-PLAN record and the v28 server change below were made.

Hypothesis (from the brief): chunk builds during sustained driving cause
the residual frame spikes seen in earlier drive legs. Before numbers
(08:34 post-kill bisection, driveClean leg, same fixed route, Rustbucket
speed 300, n=600): FRAME p50 16.70 / p95 33.30, OVER50 5, STREAM 0.00/0.00,
55 chunk build steps.

Method (same probe session throughout; audit
`2026-11-05T06-38-52Z-803613257`, 0 console errors on every probe
response): mobile viewport 390x844, full-resolution canvas, live gameplay
(NOT the title menu). New Game, story intro dismissed by tapping the
dialog (3 cards), profiler opened, MINIMAL MODE enabled (all 10 effect
flags off), then F9 `driveClean` staging
(`__AWL_SETUP_DRIVE_DIAGNOSTIC__`, (8600,29000)->(13000,31600),
"DRIVE · NO KILLS", Rustbucket speed 300, cold chunk cache via
`resetGroundChunkCache()`). Note: staging forces vehicles+decals back on,
so the profiler toggle reads MINIMAL MODE OFF during the drive with the
other 8 flags still off — the same staging the 08:34 baseline used. The
diagnostic ring is a rolling 600-frame window, reset at staging; ring
values below are read from the profiler's DRIVE PROBE region in the probe
aria tree. The probe has no JS-eval verb, so `__AWL_READ_DRIVE_DIAGNOSTIC__`
ring JSON could not be dumped and no profiler recording was started (the
RECORD button sits below the fold inside the scrollable profiler overlay
and is not addressable). Save / Save & exit were never clicked, the
persisted joystick/WASD toggle was never touched (staging sets only the
in-memory scheme), and all writes stayed in the probe session's sandbox
database — the durable save was not touched. Two legs were driven for
stability; leg 2 was re-staged with F9 for a fresh cold-cache window.

Results (STREAM = per-frame chunk-build cost; `chunkStreamMs` is the
chunk-build timer, `chunkStreamEvents` the build-step count):

| Leg | Window | FRAME p50 / p95 | OVER50 | STREAM p50 / p95 | STREAM MAX | STREAM EVENTS TOTAL | UNACCOUNTED p50 / p95 |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| 08:34 baseline | 600 fr | 16.70 / 33.30 | 5 | 0.00 / 0.00 | — | 55 steps | — |
| Leg 1 | 600 fr | 33.30 / 83.40 | 190 | 0.00 / 0.00 | 0.30 ms | 30 | 33.10 / 83.20 |
| Leg 2 cold-cache | 188 fr | 33.30 / 99.90 | 87 | 0.00 / 0.00 | 4.60 ms | 110 | 33.10 / 99.30 |
| Leg 2 full ring | 600 fr | 33.30 / 83.40 | 237–238 | 0.00 / 0.00 | 0.30 ms | 40 | 33.10 / 83.30 |

Supporting reads: profiler strip at the leg-2 full-ring read — 24 FPS, AVG
42.3 ms, P95 83.4 ms, WORST 166.7 ms (later read 21 FPS / AVG 47.1 /
P95 100.0 / WORST 216.6); TERRAIN 0.10/0.40, VEHICLE 0.00/0.10, ENEMY
0.00/0.10, ACCOUNTED 0.20/1.10, CLAMPED 0–2, MAX SPEED 300.0 in every
window. Latest-frame chunk detail repeatedly read "chunk 0.00 ms / 0
steps / 0 finished" while the strip average sat at 42–47 ms — slow frames
with zero chunk work. Chunk cache line: 6 chunks cached, queue 3
(peak 5), build budget 3.5 ms; strip CHUNK/S (rebuilds/sec) 64 in leg 1.

Verdict: NO FIX SHIPPED — hypothesis refuted by the numbers. Chunk
streaming costs at most 0.30 ms in the worst frame of a full 600-frame
sustained-drive window (4.60 ms worst frame in the cold-cache burst
window, when the queue was draining after a cache reset), with p95 0.00
in every window, while 39.5% of frames exceed 50 ms and unaccounted time
sits at 33.10 ms p50. A per-frame chunk-build budget already exists
(`GROUND_CHUNK_DRIVING_BUDGET_MS=2.0` while driving, `3.5` otherwise), so
the suggested fix is already in place; no prefetch-radius or budget tweak
is justified by these numbers. The spikes live in the unaccounted bucket
(frame time minus the seven timed subsystems), not in streaming.

Honest confound, stated plainly: this run's frames are much slower than
the 08:34 baseline (p50 33.30 vs 16.70 ms, OVER50 237 vs 5) for reasons
this item did not bisect. Visible in-session state: 773 total enemies
accumulated across route loops, boss bars (Sunwraith, Fallen Seer),
region crossings past the route end, coins 8→216 from ram pickups. The
ring's RENDER (112.00/112.00, identical in every read) and WORK
(1216–1728 ms) fields are not cited as evidence: a per-frame render/work
value cannot be 112 ms / ~1300 ms while frames median 33 ms, so those two
fields are treated as uninterpretable instrumentation rather than a
render cost. Nothing here licenses a fix for the unaccounted cost; that
is a separate item, not this one.

Typecheck: `bun x tsc --noEmit -p client/tsconfig.json && bun x tsc
--noEmit -p server/tsconfig.json` exited 0 (clean), run after the v28
server edit below. Console errors: 0 on every probe response.

Platform v28 upgrade (2026-11-03 Cloudflare viewer identity removal,
applied in this run): `server/src/actions.ts` `viewerKey` no longer reads
`viewerFbid` (no `viewerFbid`/`ownerFbid`/`displayName` reads remain
anywhere in `server/src` or `client/src`). Owner check unchanged
(`ctx.viewer?.isOwner === true` → `"owner"`); local viewers keep their
unchanged `local:${userId}` key. Cloudflare shared-link non-owners can no
longer be keyed to a private save row (no per-viewer identity exists), so
they now return `null` and take the existing guest/session-only path
(`loadGame` → no save + `canSave: false`; `saveGame`/`resetGame` →
`ok: false` message) instead of a per-viewer row: no guard removed, no
row identities merged, no caller-supplied ID substituted. The owner path
(Andrew in the app) and the local non-owner path are unaffected. Owner /
non-owner paths could not be exercised as distinct authenticated viewers
in the sandbox probe (single local guest session), so the non-owner
Cloudflare behavior is recorded as verified by code inspection +
typecheck, not by a live non-owner probe.

## 2026-11-05 (morning) — Bisect UNACCOUNTED frame time vs live enemy count / region crossings during vehicle driving (measurement only, NO FIX SHIPPED)

SHA gate: `client/src/App.tsx` SHA-256 recorded BEFORE any probe work and
re-verified after measurement, unchanged:
`5afcb9bebce6d8342ccababf0f36f25c743204df7dae997b2006c8f3e01bea4e`
(1,075,068 bytes). Gate prefix `5afcb9be` matched pre and post, so the run
proceeded. No game code, save schema, asset, terrain, chunk-streaming,
player-route, or balance change was made; `App.tsx` remains byte-identical.
Only this DATA-PLAN record was added.

Hypothesis (from the brief): the unaccounted frame time during sustained
driving scales with live enemy count and/or region-crossing load, not with
steady-state rendering.

Method (same probe session throughout; audit
`2026-11-05T07-36-32Z-477909358`, 0 console errors on every probe response):
mobile viewport 390x844, full-resolution canvas, live gameplay (NOT the
title menu). New Game, story intro dismissed by tapping the dialog (3
cards), profiler opened and expanded, MINIMAL MODE enabled (all 10 effect
flags off), then F9 `driveClean` staging
(`__AWL_SETUP_DRIVE_DIAGNOSTIC__`, (8600,29000)->(13000,31600),
"DRIVE · NO KILLS", Rustbucket speed 300). Note: staging forces
vehicles+decals back on, so the profiler toggle reads MINIMAL MODE OFF
during the drive with the other 8 flags still off — the same staging the
08:34 baseline and the 22:51 run used. The diagnostic ring is a rolling
600-frame window, reset at staging; the diagnostic loop auto-teleports the
truck back to the route start past progress 0.96, so each leg covers
repeated route loops. Ring values below are read from the profiler's DRIVE
PROBE region in the probe aria tree; enemy counts from the profiler's
"active / visible / total enemies" line. The probe has no JS-eval verb, so
`__AWL_READ_DRIVE_DIAGNOSTIC__` ring JSON could not be dumped and no
profiler recording was started. Save / Save & exit were never clicked, the
persisted joystick/WASD toggle was never touched (staging sets only the
in-memory scheme), and all writes stayed in the probe session's sandbox
database — the durable save was not touched (durable rows unchanged: 1
`game_save`, 13 `perf_recordings`, 14 total). Live-gameplay capture with
the perf HUD: `audits/2026-11-05T07-36-32Z-477909358/observe-015.png`
(Rustbucket at 300 SPD, profiler strip FPS 23 / AVG 44.3 / P95 83.4 /
WORST 200.0, MINIMAL MODE OFF after staging, Fallen Seer boss bar active,
REGION 9/18, Day 15:41 Starfall Expanse).

Results:

| Leg | Window | Active / total enemies | FRAME p50 / p95 | OVER50 | STREAM p50 / max | STREAM EVENTS TOTAL | ENEMY p50 / p95 | UNACCOUNTED p50 / p95 |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 08:34 baseline | 600 fr | ? | 16.70 / 33.30 | 5 | — / — | 55 steps | ? | — |
| 22:51 Leg 1 | 600 fr | ~773 total | 33.30 / 83.40 | 190 | 0.00 / 0.30 | 30 | ? | 33.10 / 83.20 |
| 22:51 Leg 2 full ring | 600 fr | 773 total | 33.30 / 83.40 | 237–238 | 0.00 / 0.30 | 40 | ? | 33.10 / 83.30 |
| This run Leg A (fresh session) | 600 fr | 0–8 active / 779–785 total | 33.40 / 100.00 | 254 | 0.00 / 1.30 | 95 | 0.10 / 0.50 | 33.10 / 99.60 |
| This run Leg B mid (first half) | 286 fr | 1 active / 774 total | 33.40 / 100.00 | 132 | 0.00 / 12.70 | 125 | 0.10 / 0.30 | 33.30 / 99.70 |
| This run Leg B full ring | 600 fr | 2 active / 771 total | 33.30 / 83.40 | 247 | 0.00 / 0.40 | 35 | 0.00 / 0.20 | 33.10 / 83.30 |

Supporting reads: pre-leg baseline (fresh session, standing in
Hearthglen before any driving): 0 active / 0 visible / 785 total enemies
— a fresh world already spawns ~785 enemies, so the 22:51 run's "773
total enemies accumulated across route loops" was not accumulation at all.
Strip at leg-A full-ring read: 20 FPS / AVG 50.3 / P95 100.0 /
WORST 183.3. Strip at leg-B full-ring read: 23 FPS / AVG 44.3 /
P95 83.4 / WORST 200.0. TERRAIN 0.10/1.00 (A) and 0.10/0.60 (B full);
VEHICLE 0.00/0.20 both legs; ACCOUNTED 0.30/3.20 (A) and 0.20/1.80
(B full). Latest-frame chunk detail repeatedly "chunk 0.00 ms / 0 steps /
0 finished"; chunk cache 30–32 chunks / 46.9–54.7 MiB by leg end. The
ring's RENDER (112.00/112.00, identical in every read) and WORK
(1184–1920 ms) fields are again not cited as evidence: a per-frame
render/work value cannot be 112 ms / ~1300 ms while frames median 33 ms,
so those two fields are treated as uninterpretable instrumentation rather
than a render cost, as in the 22:51 run.

Verdict: NO FIX SHIPPED — hypothesis refuted by the numbers on both
halves. (1) Enemy count: the fresh-session leg A ran with 0 active / 0
visible enemies for most of the leg (max 8 active at the end read) and
still showed UNACCOUNTED 33.10/99.60 with 254/600 frames over 50 ms —
indistinguishable from the 22:51 legs. The ring's own ENEMY timer is
0.00–0.10 ms p50 / 0.20–0.50 ms p95 in every window, and the per-frame
frame-set refresh over all ~785 world enemies is bounded by the profiler's
Enemy AI strip (~16.0 ms cumulative over its 300-frame window, ≈0.05
ms/frame). Active enemies while driving are hard-capped by design
(`MAX_ACTIVE_ENEMIES_DRIVING = 24`, visible 32) and never approached
(0–8) on this route — the truck outruns spawns in the sparse meadow.
(2) Region crossings: leg B crossed from Mosslight Meadow (REGION 1/18)
into Starfall Expanse (REGION 9/18 by the end read, Fallen Seer boss bar
active in the final capture) with UNACCOUNTED 33.30/99.70 in the
pre-crossing 286-frame partial ring vs 33.10/83.30 in the full ring that
includes the crossing — no step change. There is no enemy-count-driven
per-frame cost to reduce, so the FIX-IF gate does not open.

Structural finding (for the next bisect, not a fix): the ring's ACCOUNTED
sum covers only seven update timers (terrain, decal stamp/draw, chunk
build, vehicle update, enemy update, lighting). The main canvas draw
(`drawWorld`, 162–295 draw calls/frame), HUD, collision, camera, and
audio are NOT in it — and the ring's RENDER PASS field is actually the
lighting timer (`renderPassMs: activeLightingMs`), which reads 0.00/0.00
with lighting off. So the ~33 ms "unaccounted" bucket most plausibly
holds the untimed draw plus rAF/present scheduling; frame times are
quantized to ~16.67 ms multiples (33.30, 83.40, 100.00, 200.00 worst)
consistent with the probe's ~30 fps cadence. The 08:34 baseline (FRAME
p50 16.70) remains unexplained by any game-side variable measured here —
same route, same staging, same fresh-world enemy totals — and looks like
a probe-environment cadence difference, not game code (SHA identical).
Nothing here licenses a fix for the unaccounted cost; the next item is to
time the draw pass itself, not to re-test enemies, chunk streaming, or
decals.

Typecheck: `bun x tsc --noEmit -p client/tsconfig.json && bun x tsc
--noEmit -p server/tsconfig.json` exited 0 (clean). Console errors: 0 on
every probe response.

## 2026-11-05 (midday) — Time the main canvas draw pass during sustained driving (instrumentation + measurement, NO FIX SHIPPED)

SHA gate: pre-edit `client/src/App.tsx` SHA-256
`5afcb9bebce6d8342ccababf0f36f25c743204df7dae997b2006c8f3e01bea4e`
(1,075,068 bytes) — prefix `5afcb9be` matched, run proceeded. Post-edit
SHA-256 `1228c4018cea80c6d839bb1a69fc2763ff69ed22f197bf6dd16e8a05c1125f95`
(1,076,827 bytes); the delta is only the additive diagnostic instrumentation
below. Typecheck `bun x tsc --noEmit -p client/tsconfig.json && bun x tsc
--noEmit -p server/tsconfig.json` exited 0. Console errors: 0 on every probe
response. Durable store untouched (audit scope: sandbox {game_save:1,
perf_recordings:13} = durable {game_save:1, perf_recordings:13}); Save /
Save & exit never clicked; persisted joystick/WASD toggle never touched.

Instrumentation added (the brief's step-3 allowance — minimal, additive,
through the existing perf HUD ring; no gameplay, terrain, texture, decal,
audio, save-schema, or probe-tooling change): `DiagnosticFrame` gains
`drawCalls` (the frame's instrumented canvas call count), `presentMs`
(callback-to-callback hi-res frame time minus in-callback JS work — the
rAF/present-scheduling remainder), and `unaccountedAfterDrawMs` (frame time
minus the seven update timers minus the drawWorld render time).
`DiagnosticSummary` gains `renderMax`, `drawCalls` p50/p95 + `drawCallsMax`,
`present` p50/p95, and `unaccountedAfterDraw` p50/p95, surfaced in the DRIVE
PROBE aria-label export and as four additive readout spans (UNACCT AFTER
DRAW, DRAW MAX, DRAW CALLS, PRESENT) in the profiler's diagnostic grid —
the only channel the probe can read; the gameplay HUD and canvas rendering
are byte-identical in behavior.

Method (audit `2026-11-05T10-40-38Z-742630988`): mobile viewport 390x844,
full-resolution canvas, live gameplay. New Game, intro tapped through (3
cards), profiler opened + expanded, MINIMAL MODE on (RENDER PASS 0.00 =
lighting off), F9 `driveClean` staging ((8600,29000)->(13000,31600),
Rustbucket speed 300; staging re-enables vehicles+decals as in prior runs).
Two sessions measured: session 1 on the pre-grid build (ring fields read
from the same DRIVE PROBE region) and session 2 on the final build with
the new fields live. Live-gameplay captures with the profiler HUD:
`observe-031.png` (leg A) and `observe-032.png` (leg B — Rustbucket on the
Mosslight Meadow road in rain, Sunwraith boss bar, strip FPS 60 / AVG 16.7 /
P95 16.7 / WORST 33.4).

Results (600-frame rings):

| Leg | Enemies active (start→end read) / total | FRAME p50 / p95 | OVER50 | DRAW (renderMs) p50 / p95 / max | Draw calls p50 / max | STREAM p50 / max · events | ACCOUNTED p50 / p95 | UNACCOUNTED p50 / p95 | UNACCT AFTER DRAW p50 / p95 | PRESENT p50 / p95 | WORK p50 / p95 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| S1 Leg A (fresh session) | 0 → 14 / 779 | 16.70 / 16.80 | 1 | 112.00 / 112.00 / — | — / — | 0.00 / 0.50 · 55 steps | — | 16.40 / 16.70 | — | — | 1280 / 1504 |
| S2 Leg A (fresh session) | 0 → 3 / 780 | 16.70 / 16.80 | 0 | 112.00 / 112.00 / 112.00 | 75 / 248 | 0.00 / 0.40 · 40 steps | 0.20 / 0.50 | 16.40 / 16.60 | 0.00 / 0.00 | 0.00 / 0.00 | 1376 / 1632 |
| S2 Leg B (region-crossing loops, rain) | 3 → 1 / 771 | 16.70 / 16.80 | 0 | 112.00 / 112.00 / 112.00 | 69 / 267 | 0.00 / 0.30 · 30 steps | 0.20 / 0.40 | 16.50 / 16.70 | 0.00 / 0.00 | 0.00 / 0.00 | 1216 / 1472 |

HI-RES CHECK p50/p95: 16.70/20.50 (S2 A), 16.70/19.30 (S2 B). Chunk cache
32 chunks / 54.7 MiB in both S2 legs; latest-frame chunk line repeatedly
"0.00 ms / 0 steps / 0 finished", queue 0. Leg B's ring spans repeated
route loops (Mosslight Meadow REGION 1/18 → Starfall Expanse and back via
the diagnostic teleport reset) including a weather change to rain — no
step change in any metric vs leg A: region-crossing frames are
indistinguishable from steady-state frames in this data.

Verdict: NO FIX SHIPPED — the FIX-IF gate does not open, for two reasons.
(1) Neither session reproduced the 33.30 ms cadence: FRAME p50 was 16.70
with 0–1 frames over 50 ms in 600, matching the Oct 22 08:34 baseline on
the same route/staging. The 33.30 legs in the Nov 4/5 runs remain a
probe-cadence phenomenon, not game code (same conclusion as the morning
run; SHA-gated code is identical apart from the additive fields above).
(2) The draw-pass timer itself is not a usable cost measure in the probe
environment: `renderMs` reads a constant 112.00 ms (p50 = p95 = max) in
every frame of every session and build, and WORK reads 1216–1632 ms,
while 600 frames complete in ~10–22 s of wall time and the rAF interval
medians 16.70 ms — a synchronous in-callback segment cannot exceed the
frame interval that contains it, so these two `performance.now()` brackets
are measuring something other than wall-clock JS duration in this
environment (most plausibly the probe's virtualized/coarsened clock
interacting with canvas raster waits). Because the draw timer alone
over-accounts the whole frame, UNACCT AFTER DRAW and PRESENT clamp to
0.00 — reported as measured, not interpreted as "draw costs nothing."
What IS solid: per-frame draw-call counts are real (p50 69–75, max
248–267/frame while driving, live strip 42–49 in rain at leg-B read,
vs 162–295 cited in the Nov 4 brief), chunk streaming stays ≤0.50 ms max,
the seven update timers stay ≤0.50 ms p95 accounted, and at the probe's
60 fps cadence the frame budget is met with 0 over-50 frames. No genuine
reproducible defect is proven by these numbers, so no draw-pass
optimization, dynamic resolution, or quality change is licensed. Next
bisect, if pursued, needs a clock the probe cannot distort (e.g. draw
timing accumulated over many frames against `Date.now()` wall time, or a
real-device session) — the current `performance.now()` per-frame brackets
around drawWorld and the frame callback cannot arbitrate the 33 ms
question inside the audit probe.

## 2026-11-05 — Tamsin shop panel measurement, staged frames delivered (no fix shipped)

SHA gate: `client/src/App.tsx` SHA-256 prefix `4d24e011` verified BEFORE
measurement (`4d24e011da2b06e6c87926bd7020136c12421fc35fb274713fa5daafe5fa6c4e`)
and re-verified after; byte-identical, gate passed both times. No game
code, CSS, save schema, asset, terrain, or probe change was made.

Live session (audit `2026-11-05T15-37-16Z-266532955`, mobile viewport
390x844, full-resolution canvas): New Game → "Stage Tamsin shop" audit
control opened Tamsin's Frontier Supply in the sandbox session (999
gold staged). STAGED LIVE FRAMES of the open panel, in this audit dir:
`act-002.png` (shop opens), `observe-003.png` / `observe-004.png` …
`observe-009.png` (panel open, identical geometry), `observe-011.png`
(after Close shop, back in Greyhaven gameplay — Close verified working).
This closes the standing attestation gap: the open-shop frames now exist
in a delivered audit capture set alongside this record.

Measured panel geometry (probe DOM bboxes [x,y,w,h], 390x844 CSS px;
glyph bands from pixel scans of `observe-003.png`, cross-checked: the
orange Close-button pixel rows y533–584 match the DOM box exactly):

- Dialog `.tamsin-shop`: [0,63,390,540] (bottom edge y603, pixel-confirmed)
- Eyebrow "TAMSIN'S FRONTIER SUPPLY" glyphs: x22–215, y80–87
- "999 GOLD" glyphs: x308–366, y83–90 (horizontally disjoint from eyebrow)
- h2 "Armor, traps, and keys.": [22,102,262,28]
- Scroll area `.merchant-scroll` (derived): x≈20–370, y136–533 (h≈397)
- h3 "Town stock": [22,136,344,23]
- Greyhaven Plate row: [22,165,344,62] — height 62
- Snare Trap row: [22,233,344,77] — height 77 (detail wraps to 2 lines)
- Iron Key row: [22,317,344,62] — height 62
- Gold Key row: [22,385,344,62] — height 62
- h3 "Why this stock?": [22,457,344,23]
- Sentence paragraph: top border rule y485 (full width x22–366);
  line 1 glyphs y500–510, x41–347 ("Maro travels light. Greyhaven keeps
  siege gear and keys for"); line 2 glyphs y517–527, x156–230
  ("the city blocks.")
- Close shop button: [35,533,320,52] — height 52

Hypothesis checks: (1) tap-target heights — all four stock rows
62/77/62/62 and Close 52, every one ≥44px: PASS. (2) Clipped-text check
— the full sentence "Maro travels light. Greyhaven keeps siege gear and
keys for the city blocks." is painted completely on two lines, final
period and descenders intact, glyph bottom y527, 6px clear of the
scrollport's visible bottom edge (y533); probe `clipped_nodes` lists no
panel element (only the off-canvas 1x1 status toast present on every
frame) and `text_issues` is empty: PASS. (3) Pairwise overlap matrix —
55 pairs across the 11 measured panel elements, 0 intersections with
area >0 (vertical gaps: rows separated by 6–7px; paragraph visible
bottom y533 exactly touches Close top y533, zero-area contact between
different containers, not an overlap): PASS. (4) Close control 52px
≥44: PASS. The audit-only "Show audit panels" button [8,104,105,44]
overlays the h2 in audit-path frames only; it does not exist on the
player route (unchanged standing note).

One disclosure, measured not hidden: the sentence paragraph's
decorative 1px bottom border rule (`.merchant-empty` border-block) sits
at ≈y540, ~7px below the scrollport's visible bottom edge at the open
state — inside the panel's designed scroll overflow (`.merchant-scroll`
is `overflow-y:auto`); no text, control, or content is below the fold
with it. The probe's scroll action did not move the scrollport
(`needs_inner_scroll: 0` reported; same probe-scroll limitation noted
in earlier entries), so scroll-reachability was established from the
CSS/geometry, not from a probe scroll. This is not a clipped sentence,
not an overlap, and not an undersized target, so the FIX-IF gate does
not open.

FIX-IF verdict: NO FIX SHIPPED. The hypothesis holds on every measured
claim; `App.tsx` and `theme.css` remain byte-identical. Console errors:
0 on the audit envelope and on every probe response in the session.
Durable rows paired pre/post: `game_save` 1, `perf_recordings` 13
(total 14) before and after; all staging stayed in the sandbox
database; no Save / Save & exit click, no control-scheme toggle, no
profiler recording.

## 2026-11-05 14:36 PT — Native-clock draw cost measured (diagnosis only, no fix)

SHA gate: `client/src/App.tsx` SHA-256
`7f4852b6f606e08722c8998250f4282f0b922b3fc6078961ab097b2821c46130`
verified BEFORE and AFTER the run; byte-identical, gate passed both
times. No game code, CSS, save schema, or asset change was made.

Timer confirmation (brief step 1): `diagnosticNow()` returns
`NATIVE_PERFORMANCE_NOW.call(performance)` where
`NATIVE_PERFORMANCE_NOW = Performance.prototype.now` is captured at
module load, bypassing any probe-clock override;
`DIAGNOSTIC_CLOCK_SOURCE = "Performance.prototype.now"`. All 54
`diagnosticNow()` reads — draw bracket (`drawStarted`/`renderMs`),
lighting sub-timer, terrain/camera/entities/streaming/enemy/vehicle/
HUD timers, and the frame bracket — go through it. The remaining
`performance.now()` calls are gameplay timestamps, not profiler reads.
No draw-timing read still uses a probe clock, so no fix was applied.
Live DRIVE PROBE footer confirms: "Clock: Performance.prototype.now ·
0.1000 ms observed resolution."

Method (audit `2026-11-05T22-37-47Z-486944285`): mobile viewport
390x844 DPR 1, full-resolution canvas. New Game, intro tapped through
(3 cards), profiler opened + expanded, F9 `driveClean` staging
((8600,29000)->(13000,31600), Rustbucket speed 300, no kills; staging
re-enables vehicles+decals, MINIMAL MODE ends OFF as in prior runs).
An earlier staging attempt in this session was discarded (truck
wrecked at 315 frames after a mid-leg MINIMAL toggle); the legs below
are from a clean re-stage with no post-staging toggles. Leg A =
first full 600-frame ring (steady-state). Leg B = next 600-frame ring
from continued driving over repeated route loops (Mosslight Meadow
REGION 1/18 → Starfall Expanse and back via the diagnostic teleport
reset, rain). Staged frames (handoff copies in
`audits/handoff-2026-11-05T22-37-47Z/`):
`legA-steady-state-driveClean-600f.png` (audit observe-012.png;
Rustbucket at 300 SPD in Mosslight Meadow rain, Sunwraith bar, strip
FPS 20 / AVG 50.7) and `legB-region-crossing-driveClean-600f.png`
(audit observe-013.png; same drive later, coins 122 → 239 across the
two reads).

Results (600-frame rings, native clock):

| Leg | FRAME p50/p95 | HI-RES p50/p95 | DRAW (renderMs) p50/p95/max | Draw calls p50/max | STREAM p50/max · events total | TERRAIN p50/p95 | VEHICLE p50/p95 | ENEMY p50/p95 | ACCOUNTED p50/p95 | UNACCOUNTED p50/p95 | UNACCT AFTER DRAW p50/p95 | PRESENT p50/p95 | WORK p50/p95 | OVER50 | CLAMPED |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A steady-state | 50.00/100.00 | 47.30/103.50 | 1.30/52.00/88.20 | 56/200 | 0.00/0.70 · 65 | 0.10/1.20 | 0.00/0.20 | 0.00/0.20 | 0.30/3.40 | 42.80/99.80 | 32.40/98.70 | 36.00/97.40 | 2.50/61.40 | 287 | 6 |
| B region-crossing | 33.40/100.00 | 30.10/96.80 | 1.10/13.00/94.60 | 50/256 | 0.00/0.60 · 40 | 0.10/0.60 | 0.00/0.10 | 0.00/0.20 | 0.20/1.30 | 33.20/99.60 | 32.20/84.20 | 25.20/90.80 | 2.30/57.60 | 269 | 2 |

Verdict: DRAW COST IS NOW REAL AND SMALL AT THE MEDIAN. The fixed
timer produces varying, physically possible values — draw p50
1.10–1.30 ms (vs the broken constant 112.00 at 02:34), draw max
88.20–94.60 ms on spike frames, WORK p50 2.30–2.50 ms (vs the broken
1216–1632). Draw does NOT dominate FRAME. What dominates FRAME in
this session is PRESENT (p50 25.20–36.00 ms) / UNACCOUNTED
(32.20–42.80 ms p50): this probe session ran at ~20 FPS (strip FPS
20, FRAME p50 33.40–50.00 vs 16.70 at 02:34), while in-callback JS
work stayed at 2.30–2.50 ms p50 — the frame interval is consumed
outside the game's JS, in rAF/present scheduling of the probe
environment, not in draw or update code. Cross-checks vs 02:34 all
hold: draw calls p50 50–56 / max 200–256 (02:34: 69–75 / 248–267 —
same range), STREAM max 0.60–0.70 (02:34: ≤0.50 max; same order),
update timers ≤0.20 ms p95 (02:34: ≤0.50 p95). The FRAME/OVER50
regression vs 02:34 (269–287 over 50 vs 0–1) tracks the PRESENT
term, not any game timer. Per the brief, NO optimization is stacked
here. Scoped for a later run, if pursued: the draw tail (p95
13.00–52.00, max ~95 ms) lands on chunk-streaming frames (65/40
stream events per ring) — candidate: first-blit cost of newly built
chunk canvases; measure on a 60 FPS session (real device or a
non-throttled probe) before touching draw code, because at p50 the
entire draw pass costs ~1.2 ms.

Typecheck `bun x tsc --noEmit -p client/tsconfig.json && bun x tsc
--noEmit -p server/tsconfig.json` exited 0. Console errors: 0 on the
audit envelope and every probe response. Durable store untouched
(audit scope: sandbox {game_save:1, perf_recordings:13} = durable
{game_save:1, perf_recordings:13}); Save / Save & exit never clicked;
joystick/WASD toggle never touched; no profiler recording started
(diagnostic rings only, as briefed).

## 2026-11-05 16:36 PT — Draw-tail first-blit split on a clean 60 FPS session (diagnosis only, no fix)

SHA gate: `client/src/App.tsx` SHA-256 BEFORE
`c8781844f2cdaab9f033f75a1d5775fdef869b0f7029d16be9ad99bc039d7d60`
(prefix `c8781844` confirmed — gate passed). AFTER (instrumentation
only): `17e49146a6bd384c82f54632d8f93c7ff62ea430bedd97b38f804722d7ed07d1`.
The delta is measurement-only: per-frame `firstBlitMs/Count/MaxMs/
Durations` on the diagnostic frame; a pending-first-blit key set fed
by `noteChunkLoad`, with the first `drawImage` of each newly built
chunk canvas timed in `drawGroundTexture` (native clock); a
streaming/steady split in `summarizeDiagnosticRing` (streaming =
frame contains a STREAM event or follows one within 2 frames); an
audit-only `__AWL_READ_FIRST_BLIT_LOG__` hook; six readout rows in
the profiler DRIVE PROBE panel. No gameplay, visual, quality, save,
or draw-path behaviour changed; the only added cost on the draw path
is one Set lookup per visible chunk blit plus a clock read on a
canvas's first-ever blit. Client + server typecheck exit 0.

Clean-session check (brief step 2): this probe session DID reach
~60 FPS — strip FPS 57–60 while driving, FRAME p50 16.70 ms on both
legs (vs 33.40–50.00 at 14:34). The 14:34 ~20 FPS session does NOT
reproduce; with WORK p50 1.50–2.20 ms, the earlier shortfall was
environmental (probe rAF/present scheduling), not game JS.

Method (audit `2026-11-06T00-48-31Z-000419596`): mobile viewport
390x844 DPR 1, full-resolution canvas. New Game, intro tapped
through (3 cards), profiler opened + expanded, F9 `driveClean`
staging ((8600,29000)->(13000,31600), Rustbucket speed 300, no
kills, MINIMAL MODE OFF, no post-staging toggles). Leg A = first
full 600-frame ring (steady-state). Leg B = next disjoint 600-frame
ring from continued driving over repeated route loops (Mosslight
Meadow REGION 1/18 → Starfall Expanse REGION 9/18 and back via the
diagnostic teleport reset, rain; coins 133 → 224 across the two
reads). Staged frames (handoff copies in
`audits/handoff-2026-11-06T00-48-31Z/`):
`legA-steady-state-driveClean-600f.png` (audit observe-009.png;
Rustbucket at 300 SPD in Starfall Expanse rain, Fallen Seer bar)
and `legB-region-crossing-driveClean-600f.png` (audit
observe-012.png; same drive back in Mosslight Meadow, strip FPS 57).

Results (600-frame rings, native clock; DRAW = renderMs wall clock):

| Leg | FRAME p50/p95 | WORK p50/p95 | PRESENT p50/p95 | UNACCOUNTED p50/p95 | UNACCT AFTER DRAW p50/p95 | OVER50 | STREAM events total · max |
|---|---|---|---|---|---|---|---|
| A steady-state | 16.70/66.70 | 2.20/12.20 | 15.10/69.10 | 16.50/66.50 | 15.50/65.50 | 99 | 40 · 71.20 |
| B region-crossing | 16.70/16.80 | 1.50/3.50 | 15.20/19.60 | 16.50/16.70 | 15.60/16.00 | 0 | 35 · 10.10 |

| Leg | Split frames (stream/steady) | STREAM DRAW p50/p95/max | STEADY DRAW p50/p95/max | STREAM CALLS p50/max | STEADY CALLS p50/max | FIRST BLIT canvases · mean/p50/p95/max · frames |
|---|---|---|---|---|---|---|
| A | 17/583 | 1.60/72.50/87.90 | 1.20/4.40/70.00 | 92/304 | 75/604 | 9 · 9.24/0.00/7.60/75.60 · 5 |
| B | 14/586 | 1.60/11.40/17.20 | 0.90/2.40/35.40 | 73/352 | 65/382 | 5 · 2.94/0.00/6.90/7.80 · 4 |

Overall DRAW p50/p95/max: A 1.20/5.70/87.90, B 0.90/2.50/35.40.
Draw calls p50/max overall: A 76/604, B 65/382.

Verdict: (1) THE 60 FPS SESSION REPRODUCED — FRAME p50 16.70 ms on
both legs; leg B is fully clean (FRAME p95 16.80, OVER50 0). Leg A's
p95/OVER50 elevation (99 frames) sits in PRESENT (p95 69.10) during
the post-staging warm-up window, not in WORK (p50 2.20). (2) THE
DRAW TAIL IS FIRST-BLIT-CONCENTRATED, with one refinement: at the
median a first blit is free (per-canvas p50 0.00 ms at the 0.1 ms
clock resolution), but the expensive minority lands on/around
streaming frames — streaming-split draw p95 is 72.50 (A) / 11.40 (B)
vs steady 4.40 / 2.40, and the single worst first blit cost 75.60 ms
(A warm-up burst; leg A draw max 87.90 is a streaming frame). In
settled driving (leg B) first blits cap at 7.80 ms and the streaming
draw max is 17.20. Two honest caveats: leg A's steady split still
holds a 70.00 ms max (one spike outside the +2-frame window), and
leg B's worst draw frame (35.40) is in the steady split, not
explained by a timed first blit — a residual non-blit spike source
remains. Per the brief, NO optimization is stacked here. Scoped for
a later run, if pursued: pre-blit/upload newly built chunk canvases
during the build budget (or a 1px offscreen warm blit at completion)
so the first on-screen blit never pays the upload; ALSO chase the
residual steady-split spike (35–70 ms) separately — first-blit work
alone will not remove it.

Typecheck `bun x tsc --noEmit -p client/tsconfig.json && bun x tsc
--noEmit -p server/tsconfig.json` exited 0. Console errors: 0 on the
audit envelope and every probe response. Durable store untouched
(audit scope: sandbox {game_save:1, perf_recordings:13} = durable
{game_save:1, perf_recordings:13}); Save / Save & exit never clicked;
joystick/WASD toggle never touched; no profiler recording started
(diagnostic rings only, as briefed).

## 2026-11-05 19:05 PT — First-blit pre-blit fix: gate (b) FAILED, optimization reverted

SHA gate: `client/src/App.tsx` SHA-256 BEFORE
`17e49146a6bd384c82f54632d8f93c7ff62ea430bedd97b38f804722d7ed07d1`
(prefix `17e49146` confirmed — gate passed). The fix (pre-blit each
newly completed chunk canvas once into a shared offscreen scratch
inside `processGroundChunkQueue`, cost charged to streaming/build
totals) built as `75aa66dd…` / build `fa571a827ccc-20261106T023917264Z`,
was measured, FAILED the gate, and was REVERTED in this same edit:
AFTER SHA is again `17e49146a6bd…` byte-exact (post-gate check
passed — the shipped source is identical to the 16:36
instrumentation build; no gameplay, visual, quality, or save change
ships from this run).

Method (audit `2026-11-06T02-39-38Z-830570801`): mobile viewport
390x844 DPR 1, full-resolution canvas. New Game, story intros tapped
through, F9 `driveClean` staging ((8600,29000)->(13000,31600),
Rustbucket speed 300, no kills, MINIMAL MODE OFF). Clean 60 FPS
session (FRAME p50 16.70 in every window; strip FPS 54–57). Leg A
measured twice from fresh-cache stagings (A′, A″); leg B as the
next disjoint 600-frame ring (B″) plus one overlay-free settled
daylight window. Full numbers + frames in
`audits/handoff-2026-11-06T02-39-38Z/` (`gate-numbers.txt`,
`legA-warmup-driveClean-600f.png` = observe-014,
`legB-region-crossing-driveClean-600f.png` = observe-020,
`staged-driving-frame-night-rain.png` = act-005).

Results (600-frame rings, native clock; DRAW = renderMs):

| Leg | Split (stream/steady) | STREAM DRAW p50/p95/max | STEADY DRAW p50/p95/max | FIRST BLIT canvases · mean/max | STREAM events · max | OVER50 | FRAME p50/p95 |
|---|---|---|---|---|---|---|---|
| Before A | 17/583 | 1.60/72.50/87.90 | 1.20/4.40/70.00 | 9 · 9.24/75.60 | 40 · 71.20 | 99 | 16.70/66.70 |
| After A′ | 33/567 | 4.30/13.50/23.20 | 0.80/1.50/22.30 | 15 · 0.02/0.10 | 80 · 16.80 | 0 | 16.70/33.30 |
| After A″ | 32/568 | 3.90/14.40/18.70 | 1.10/2.80/66.20 | 16 · 0.00/0.00 | 80 · 14.00 | 5 | 16.70/33.40 |
| Before B | 14/586 | 1.60/11.40/17.20 | 0.90/2.40/35.40 | 5 · 2.94/7.80 | 35 · 10.10 | 0 | 16.70/16.80 |
| After B″ | 16/584 | 3.10/17.00/31.80 | 0.90/1.90/47.30 | 7 · 0.03/0.10 | 40 · 29.80 | 11 | 16.70/33.40 |
| After settled (day) | 10/590 | 2.10/11.50/12.00 | 1.00/2.40/46.10 | 3 · 0.00/0.00 | 30 · 10.30 | 5 | 16.70/33.30 |

Gate: (a) PASS — leg A streaming p95 13.50/14.40 vs 72.50 (under
half, 36.25). (b) FAIL — leg B streaming p95 17.00 (night
region-crossing ring) and 11.50 (settled daylight window) vs the
required < 11.40. (c) PASS — steady p50/p95 and FRAME p50 16.70
never regressed. Verdict per the brief's FIX-IF gate: REVERT.

DISPROOF, for the record: the pre-blit worked mechanically — first
blits cost 0.00–0.10 ms in every after window (before: mean 9.24,
worst 75.60) — and the warm-up leg's streaming tail collapsed with
it. But in settled region-crossing driving the streaming-split draw
tail persists with first blits at zero: it is NOT first-blit GPU
upload. It tracks streaming-frame draw-call volume (B″ STREAM CALLS
p50 193 vs before 73) and chunk-stream spikes (STREAM MAX 29.80 vs
before 10.10 — the pre-blit also pushed cost into STREAM). The
known residual steady-split spikes persist unchanged (A″ steady max
66.20, B″ 47.30; before 70.00/35.40) with all first blits at 0.00 —
a separate non-blit source, not chased here per the brief. Caveats:
after windows ran dusk→night in rain (before legs daytime; before B
also rain) and a story card overlay (THE RELICS) was up during the
A′/A″/B″ reads with the canvas rendering beneath it; the
overlay-free daylight settled window also misses gate (b), so the
verdict does not hinge on the night window.

Typecheck on the reverted source is the previously shipped
`17e49146` build (client + server tsc exited 0 during this run's
fixed build; the revert restores that exact file). Console errors:
0 on the audit envelope and every probe response. Durable store
untouched (audit scope: sandbox {game_save:1, perf_recordings:13} =
durable {game_save:1, perf_recordings:13}); Save / Save & exit never
clicked; joystick/WASD toggle never touched; no profiler recording
started (diagnostic rings only, as briefed).


## 2026-11-05 20:35 PT — Per-category draw-call split of the streaming tail (instrumentation only, NO FIX SHIPPED)

SHA gate: `client/src/App.tsx` SHA-256 BEFORE
`211983506a4afcdf86ea75b26850706ae58bacb49f1a012eb1fe475f1dde2960`
(prefix `21198350` confirmed — gate passed; the stale Oct 22 SHA in
AGENTS.md was NOT used and AGENTS.md was not edited). AFTER
(instrumentation shipped):
`401f34d04b1b4fad11187b12b033201b316051118e752061150c9e0e4b762c7f`.
Client tsc `--noEmit` exited 0 (twice: before and after the panel
span widening). Console errors: 0 on both audit envelopes and every
probe response.

WHAT SHIPPED (probe tooling only, like the first-blit probe):
per-category draw-call instrumentation in the existing diagnostic
frame pipeline. Categories are the passes the renderer already
distinguishes — terrain (chunk blits + scenery, the drawWorld
"terrain" block), decals (drawGoreDecals), entities (the drawWorld
"entities" block, incl. the dungeon renderer's entity section),
lighting (lighting/overlay tail: day/night overlay, tints, weather,
vignettes), other. The instrumented canvas wrapper attributes each
counted call to the current category and `setDrawCategory` at the
pass boundaries accumulates wall ms per category — both ONLY while
`forcedDiagnosticScenario` is set (the existing probe flag set by
`__AWL_SETUP_DRIVE_DIAGNOSTIC__`); with the probe off they are no-ops
beyond a flag check. `DiagnosticFrame` gained
`categoryCalls`/`categoryMs`; each STREAM/STEADY split now reports
per-category calls and ms (p50/p95/max), and the summary carries
`worstStreamingFrame`/`worstSteadyFrame` with the full category
split of each split's worst-render frame. The profiler panel shows
four CAT lines (STREAM/STEADY × CALLS/MS, p50/p95/max per category)
plus WORST STREAM CAT / WORST STEADY CAT lines. No gameplay,
terrain, texture, audio, save-schema, or probe-method change; no
optimization applied (audit/diagnosis-only per the FIX-IF gate).

MEASUREMENT — two 600-frame driveClean legs, 390×844 DPR 1,
sandbox probe session, read at the first full 600-frame ring
(first-pass window; a later settled-loop read is noted separately):

LEG A (600 frames; 38 streaming / 562 steady): FRAME p50/p95
16.70/33.40; RENDER 1.00/8.60; DRAW CALLS p50/p95 79/678; STREAM
MAX (chunk stream) 58.20; stream events total 95; first blits 21
canvases, mean 0.40, p95 0.10, max 8.10 (8 frames). STREAM DRAW
p50/p95/max 2.80/35.50/62.60; STEADY DRAW 1.00/3.90/58.70. STREAM
CALLS p50/max 95/678; STEADY CALLS 75/625. STREAM CAT CALLS
p50/p95/max — terrain 32/68/81, decals 0/1/1, entities 66/591/624,
lighting 4/12/12, other 0/1/1. STREAM CAT MS p50/p95/max — terrain
0.60/31.70/60.40, decals 0.00/0.10/0.20, entities 0.90/2.80/3.80,
lighting 0.00/0.10/6.60, other 0.00/0.10/0.30. STEADY CAT CALLS —
terrain 29/32/32, decals 0/1/1, entities 49/213/604, lighting
4/11/12, other 0/1/1. STEADY CAT MS — terrain 0.20/0.30/7.80,
decals 0.00/0.10/4.20, entities 0.80/3.00/58.50, lighting
0.00/0.10/0.30, other 0.00/0.10/1.60. WORST STREAM frame 62.60 ms:
calls T22 D1 E592 L12 O1; ms T60.4 D0.0 E2.1 L0.1 O0.0. WORST
STEADY frame 58.70 ms: calls T10 D0 E42 L4 O0; ms T0.2 D0.0 E58.5
L0.0 O0.0.

LEG B (600 frames; 39 streaming / 561 steady): FRAME p50/p95
16.70/33.40; RENDER 1.10/6.20; DRAW CALLS p50/p95 72/952; STREAM
MAX 39.70; stream events total 100; first blits 21 canvases, mean
0.42, p95 0.10, max 8.70 (8 frames). STREAM DRAW p50/p95/max
1.70/25.50/40.90; STEADY DRAW 1.00/3.00/43.00. STREAM CALLS p50/max
99/399; STEADY CALLS 72/952. STREAM CAT CALLS — terrain 32/76/113,
decals 1/3/3, entities 47/271/277, lighting 6/13/13, other 0/1/1.
STREAM CAT MS — terrain 0.50/24.60/40.10, decals 0.00/0.10/0.10,
entities 0.80/2.00/4.60, lighting 0.10/0.10/0.20, other
0.00/0.10/0.20. STEADY CAT CALLS — terrain 29/32/32, decals 1/3/3,
entities 45/431/906, lighting 6/13/14, other 0/1/1. STEADY CAT MS —
terrain 0.20/0.30/3.50, decals 0.00/0.10/1.10, entities
0.70/2.40/42.80, lighting 0.10/0.20/34.00, other 0.00/0.10/1.10.
WORST STREAM frame 40.90 ms: calls T39 D0 E36 L6 O0; ms T40.1
D0.0 E0.8 L0.0 O0.0. WORST STEADY frame 43.00 ms: calls T27 D0
E35 L6 O0; ms T0.1 D0.0 E42.8 L0.0 O0.1.

READING (next fix candidates, logged only — no fix this run):
(1) STREAM DRAW p95 is TERRAIN wall time: terrain CAT MS p95
31.70/24.60 against STREAM DRAW p95 35.50/25.50 (~90–96%), and the
worst streaming frames are 96–98% terrain ms, tracking the chunk
stream maxima (58.20/39.70). It is NOT blit volume (terrain calls
p95 only 68/76) and NOT first blits (p95 0.10 ms, mean ~0.4): the
cost is the chunk stream/build work that lands inside the terrain
pass window. (2) Entity draw VOLUME is the streaming call-count
story (entities CAT CALLS p95 591/271, max 624 — the largest call
category on streaming frames) but entity ms stays low (p95
2.80/2.00), so entities inflate STREAM CALLS without driving
STREAM DRAW time. (3) The previously unexplained steady-split
residual spikes are now named: both legs' worst STEADY frames are
~100% ENTITIES ms (58.5 of 58.7; 42.8 of 43.0) with LOW entity
call counts (42; 35) — a single-stall signature inside the
entities pass (consistent with a first-use sprite-cache
rasterization), not call volume. One secondary outlier: leg B
steady lighting ms max 34.00 on a non-worst frame. (4) Decals are
negligible in driveClean (no kills): calls ≤3, ms p95 ≤0.10
everywhere.

Settled-loop cross-check (leg A window read ~26 s after staging,
ring holding later route loops, 6 streaming / 594 steady): STREAM
DRAW p50/p95/max 1.40/15.20/19.10, STEADY DRAW max 57.70 with the
same entities signature (worst steady ms T0.2 D0.0 E57.4 L0.1
O0.0) — the steady entities stall recurs on settled loops too.

Staged probe frames (audit dir
`audits/2026-11-06T04-51-14Z-554968495/`):
`probe-legA-driveclean-mid-drive.png` (leg A mid-drive),
`probe-legA-driveclean-600f-panel.png` (leg A 600-frame panel),
`probe-legB-driveclean-mid-drive.png` (leg B mid-drive),
`probe-legB-driveclean-600f-panel.png` (leg B 600-frame panel).

Durable store untouched: before AND after, perf_recordings = 13
rows (ids 1–13) and game_save load = null in sandbox scope; audit
scope reports sandbox {game_save:1, perf_recordings:13} = durable
{game_save:1, perf_recordings:13}. Save / Save & exit never
clicked; joystick/WASD toggle never clicked (pause menu opened
once to verify presence only: joystick toggle present and pressed,
WASD option present, one-slot Save and Save & exit present); no
profiler recording started (diagnostic rings only, as briefed).
Preserved behaviors verified in session: driving on the diagnostic
route, full-resolution textured canvas, touch joystick + context
buttons with reserved slots, no center banner.

## 2026-11-05 22:35 PT — Frostfall strip analysis (diagnosis only, NO FIX SHIPPED)

Follow-up to the 19:34 lattice probe (grid-density 1.7125% vs offset-density
1.6703% — square-look elevation NOT lattice-specific). This run tests the
strip hypothesis directly: do visible hard edges align to (a) ground-chunk
edges (640u), (b) the feathered texture lattice (512u grid,
BIOME_TEXTURE_STRIDE), or (c) the raw texture lattice (same 512u grid offset
256u, drawn under the feathered pass in `drawTextureLattice`)?

Method (stated exactly; same strip/threshold as prior biome probes):
scripted staged gameplay in the audit probe session — NOT the title menu —
mobile viewport 390×844, screenshot DPR 1 (PNG 390×844), full-resolution
canvas 390×540 CSS px at canvas bbox [0,101,390,540], textures active,
timeOfDay .38 (day), clear. Staging used the existing audit-only
`__AWL_SHOW_FROSTFALL_DEEP__` hook: center (21600,4700), northwest
(21000,4100), southeast (22200,5300); all audit panels hidden before
capture; 0 console errors on every probe response. Camera = player −
(360,500), zoom 1; screen scale 390/720 = 0.5417 px/unit (x), 540/1000 =
0.54 px/unit (y). Step at a line = |Rec.601 luma at band+2 − luma at
band−2| (5 px strip); a hit is step > 30/255. Per candidate line: hit
count/% over a clean row/col band, median/mean/p90/max step, vs control
lines offset ±28 px. Family lines were chosen per stage so the three
families land on distinct screen lines (NW stage separates all three in
x: raw col 52, feathered col 191, chunk col 260). Pitch measured by
autocorrelation of the mean-step column/row profiles (lags 40–379 /
40–499 px); candidate pitches: chunk 640u = 347 px, stride 512u = 277 px,
half-stride 256u = 139 px. Staged frames in audit dir
`audits/2026-11-06T06-37-00Z-225743420/`: `probe-frostfall-strip-center.png`,
`probe-frostfall-strip-northwest.png`, `probe-frostfall-strip-southeast.png`,
plus `probe-frostfall-strip-nw-chunk-col260-crop.png` (attribution crop).

Geometry first: all three staged views lie entirely inside the Frostfall
replacement-mask plateau. Region radius 2200, feather
min(radius*.42, 720) = 720, so mask alpha is saturated inside radius 1480
of (21600,4700); the farthest staged view corner sits 1460 from center.
Biome-boundary strips crossing the staged frames: 0 by construction — the
boundary feather (1480–2200 annulus) never enters any staged view, so no
boundary hard-edge segments exist to count in-frame.

Vertical candidates (hits over clean rows; controls = ±28 px lines):
- Center: raw x=21248 col 4 — 15/232 (6.5%), median 1.6 vs controls 0.7 /
  hit% 9.5. Feathered x=21504 col 143 — 12/232 (5.2%), median 0.6 vs 0.3 /
  6.7%. Raw+chunk x=21760 col 282 (confounded) — 0/232 (0.0%), median 0.6.
- Northwest: raw x=20736 col 52 — 18/261 (6.9%), median 0.4 vs 0.6 / 1.1%.
  Feathered x=20992 col 191 — 0/71 (0.0%), median 0.3, max step 1.0 (the
  cleanest line measured). Chunk x=21120 col 260 — 17/71 (23.9%), median
  1.0, mean 13.4, p90 44.4 — ATTRIBUTED, not a seam: the attribution crop
  shows this column's measurement band (canvas rows 360–430) crosses the
  waterfall icicle tips and a snow pine's foliage/snow-cap/shadow edges;
  the open snow at that column in the crop shows no vertical line.
  Raw x=21248 col 329 — 9/261 (3.4%), median 0.6 vs 0.6 / 2.5%.
- Southeast: feathered x=22016 col 95 — 26/292 (8.9%), median 0.0 vs 0.2 /
  7.9%. Raw x=22272 col 234 — 25/292 (8.6%), median 1.0 vs 0.9 / 18.3%.
  Chunk x=22400 col 303 — 4/292 (1.4%), median 0.7 vs controls median 3.0 /
  16.8% (line BELOW its controls). Feathered x=22528 col 373 — 25/292
  (8.6%), median 0.9 (frame-edge content: status rail + pine).

Horizontal candidates:
- Center: raw y=4352 — 2/231 (0.9%). Chunk y=4480 — 0/231 (0.0%), median
  0.0, max 22.0. Feathered y=4608 — 5/231 (2.2%) vs controls 8.0%. Raw
  y=4864 — 0/231 (0.0%). Feathered+chunk y=5120 (confounded) — 9/117
  (7.7%) vs controls 7.3% (parity).
- Northwest: raw+chunk y=3840 (confounded) — 0/161 (0.0%), max 2.0.
  Feathered y=4096 — 0/161 (0.0%). Raw y=4352 — 0/161 (0.0%). Chunk
  y=4480 — 0/71 (0.0%), max 1.5.
- Southeast: raw y=4864 — 10/161 (6.2%) vs controls 24.5%. Feathered+chunk
  y=5120 (confounded) — 8/161 (5.0%), median 0.1. Raw y=5376 — 7/161
  (4.3%) vs controls 18.0%. Feathered y=5632 — 12/161 (7.5%), median 1.0.
  Chunk y=5760 — 0/51 (0.0%), max 2.0.

Pitch (autocorrelation of mean-step profiles): NO peak at any candidate
pitch in any stage — nothing at 347 px (chunk 640u), 277 px (stride
512u), or 139 px (half-stride 256u) above r = 0.05 in either axis.
Column-profile top peaks: center lag 129 px (238u) r = 0.24; NW lag
228 px (421u) r = 0.19; SE lag 129 px (238u) r = 0.23 — mutually
inconsistent, none matches a tiling pitch. Row-profile top peak is the
same in all three stages: lag 42–44 px = 78–81 world units, r = 0.40 /
0.29 / 0.27 (center / NW / SE). Striping index (share of columns with
mean step > 2× the profile median): center 24.4%, NW 34.1%, SE 11.0%;
rows: 27.2% / 36.3% / 31.9% — feature content (drifts, arcs, trees,
waterfall), not aligned strips, per the candidate-line results above.

READING: the strip hypothesis is REFUTED as the square-look source. No
chunk edge, feathered-lattice line, or raw-lattice line carries a
reproducible hard-edge elevation over its ±28 px controls in any stage;
the single elevated candidate (NW chunk col 260) is proven feature
content by crop. Strip width/pitch vs tile size: the tiling system's
only pitches are 512u (stride) and 640u (chunk) with a 256u raw/feathered
phase offset, and none imprints on the rendered pixels. The one
reproducible periodic signal is a ~80u ROW rhythm (lag 42–44 px,
r 0.27–0.40, all stages) that matches NO renderer pitch (not 512/256/
640, not the 61.4u feather ramp, not the 32u tint cell) — logged as an
open signal, not a proven cause: it has no candidate-line expression
(every measured family row is flat), so there is nothing to aim a
feather fix at.

FIX-IF gate: NOT met — no single proven cause. NO FIX SHIPPED; App.tsx
byte-identical (SHA-256 401f34d04b1b… pre AND post). Planned next probe
(logged only): isolate the ~80u row rhythm — stage the same Frostfall
view with the special-terrain overlay phase excluded vs included (the
rhythm is rows-only, and `drawFrostfallTerrain`'s 44 snow-drift ellipses
and ice arcs are the only row-structured overlay), and repeat the row
autocorrelation in a non-Frostfall biome to test whether the rhythm is
Frostfall-overlay-specific or texture-photo-internal. No feathering
change is attempted until one cause is proven by numbers.

Durable store untouched: before AND after, perf_recordings = 13 rows
(ids 1–13) and game_save load = null in sandbox scope; audit scope
reports sandbox {game_save:1, perf_recordings:13} = durable
{game_save:1, perf_recordings:13}. Typecheck `tsc --noEmit -p
client/tsconfig.json` exit 0. Save / Save & exit never clicked;
joystick/WASD toggle never clicked; no profiler recording started
(diagnostic staging only, as briefed). Preserved behaviors verified in
session: full-resolution textured canvas, touch joystick + context
buttons with reserved slots, no center banner, pause-menu control
scheme toggle untouched.

## 2026-11-05 23:36 PT — Chunk-build pump relocation: STREAM DRAW gate passed, FRAME p95 clause failed in this environment, fix REVERTED

SHA gate: `client/src/App.tsx` SHA-256 BEFORE
`401f34d04b1b4fad11187b12b033201b316051118e752061150c9e0e4b762c7f`
(prefix `401f34d0` confirmed — gate passed; the stale Oct 22 SHA in
AGENTS.md was NOT used). The fix built as
`0fbecb634ba33b23937d818eba2e0f61da41d4b834aa4ff06e3e850b8631f5c0`
was measured, the FRAME p95 clause of the FIX-IF gate could not be
cleared in this environment, and the fix was REVERTED in this same
edit: AFTER SHA is again `401f34d04b1b…` byte-exact (post-revert
check passed — the shipped source is identical to the 20:35
per-category instrumentation build; nothing ships from this run).

THE FIX (as built and measured): `drawGroundTexture` no longer
calls `processGroundChunkQueue(fastDriving)` inside the terrain
pass; the frame loop instead pumps the queue once per frame after
the per-frame diagnostic accumulator reset and immediately before
`drawWorld`, gated `!world.dungeon && biomeTexturesReady`, with
the same budget semantics (2.0 ms driving / 3.5 ms otherwise, draw
budgets 72/180 — unchanged inside `processGroundChunkQueue`).
Queueing, priorities, cache trim, and blitting are untouched, so
chunk contents and the rendered output per chunk are identical;
newly queued chunks take their first build step on the next
frame's pump instead of the same frame's terrain pass. Because the
pump sits after the accumulator reset, its steps still land in the
same frame's `chunkStreamMs`/`chunkStreamEvents` (streaming-frame
classification unchanged) and its draw calls still count in the
frame total; its wall time is attributed to draw category "other"
instead of "terrain". No dynamic resolution, no quality change,
full-resolution canvas kept.

METHOD: two audit probe sessions were needed. Session 1
(`audits/2026-11-06T07-39-51Z-589127103/`) ran throttled
throughout (~20 FPS, PRESENT p50 51.70 — the 14:34 environmental
signature) and its window is NOT gate evidence; it did confirm the
attribution mechanism under load (STREAM MAX 54.70 reappears as
CAT-other MS max 54.70). Session 2
(`audits/2026-11-06T07-48-49Z-424818419/`) started clean (59 FPS at
village idle, FRAME p50 16.70) and degraded over ~10 minutes of
driving. Mobile viewport 390×844 DPR 1, New Game, intro tapped
through (3 cards), profiler opened + expanded, F9 `driveClean`
staging ((8600,29000)->(13000,31600), Rustbucket speed 300, no
kills, MINIMAL MODE OFF, no post-staging toggles). Console errors:
0 on both audit envelopes and every probe response.

RESULTS (600-frame rings, native clock; DRAW = renderMs):

LEG A — first full ring, clean window (35 streaming / 565 steady):
FRAME p50/p95 16.70/66.80; RENDER p50/p95 1.20/7.00; WORK
2.20/24.40; PRESENT 15.40/72.10; UNACCOUNTED 16.50/66.60; OVER50
116; CLAMPED 9; STREAM MAX 64.40; stream events total 80; first
blits 19 canvases, mean 0.76, p50 0.00, p95 6.70, max 7.60
(9 frames). STREAM DRAW p50/p95/max 1.20/8.20/46.30; STEADY DRAW
1.20/6.50/66.00. STREAM CALLS p50/max 91/556; STEADY CALLS 79/507.
STREAM CAT CALLS — terrain 7/32/32, decals 1/2/2, entities
68/470/503, lighting 6/11/11, other 11/49/54. STREAM CAT MS —
terrain 0.20/0.60/7.80, decals 0.00/0.10/2.70, entities
0.80/3.10/45.90, lighting 0.10/0.30/0.30, other 0.40/35.60/64.40.
STEADY CAT MS — terrain 0.20/0.40/51.40, decals 0.00/0.10/1.30,
entities 0.90/4.40/62.00, lighting 0.00/0.20/58.90, other
0.00/0.10/64.40. WORST STREAM frame 46.30 ms: calls T7 D1 E454
L11 O12; ms T0.2 D0.0 E45.9 L0.1 O17.3. WORST STEADY frame 66.00:
ms T0.2 D0.1 E1.3 L0.0 O64.4.
→ vs before A (STREAM DRAW p95 35.50, terrain CAT MS p95 31.70):
STREAM DRAW p95 8.20 (−77%), terrain CAT MS p95 0.60 (−98%).
Worst streaming frame is now entities-dominated (the known
first-use sprite stall), terrain 0.2 ms of 46.3.

SETTLED WINDOW — next ring from continued driving (6 streaming /
594 steady; thin streaming sample, reported for completeness):
FRAME 16.70/83.30; STREAM MAX 71.80; events total 15. STREAM DRAW
3.10/3.80/5.00; STEADY DRAW 1.20/4.70/81.00. STREAM CAT MS terrain
0.20/0.20/0.20, other 2.10/15.90/71.90. WORST STREAM 5.00 ms:
ms T0.2 D0.0 E0.7 L0.0 O14.3 (note: the frame's renderMs is 5.00
while its "other" category window shows 14.3 — the pump ran
before the draw bracket, so category wall time and renderMs
diverge by design on pump frames).

LEG B — re-staged F9 (rings reset by staging), first full ring
(64 streaming / 536 steady), window partially throttled (FRAME
p50 already 49.90): FRAME p50/p95 49.90/116.60; RENDER 1.20/18.30;
WORK 2.60/50.30; ACCOUNTED p95 8.30; PRESENT 31.80/97.60; OVER50
269; STREAM MAX 77.10; events total 186; first blits 37 canvases,
mean 1.83, p95 7.10, max 39.70 (15 frames). STREAM DRAW
p50/p95/max 1.20/14.40/65.30; STEADY DRAW 1.20/18.10/95.10.
STREAM CALLS p50/max 102/381. STREAM CAT CALLS — terrain
29/32/32, decals 0/1/1, entities 41/225/265, lighting 6/6/6,
other 11/64/81. STREAM CAT MS — terrain 0.20/3.20/46.90, decals
0.00/0.10/0.40, entities 0.70/5.80/65.00, lighting 0.00/0.20/3.90,
other 0.50/16.50/77.20. STEADY CAT MS — terrain 0.20/2.70/50.70,
entities 0.80/12.00/94.70, lighting 0.00/0.10/63.90. WORST STREAM
frame 65.30 ms: calls T29 D0 E84 L6 O0; ms T0.3 D0.0 E65.0 L0.0
O0.0. WORST STEADY 95.10: ms T0.2 D0.0 E94.7 L0.2 O0.0.
→ vs before B (STREAM DRAW p95 25.50, terrain CAT MS p95 24.60):
STREAM DRAW p95 14.40 (−44%), terrain CAT MS p95 3.20 (−87%).

LATE SETTLED WINDOW (session fully throttled, strip FPS 21;
environment-dominated, not gate evidence): FRAME 33.40/100.00;
STREAM DRAW 1.50/15.70/68.60; STREAM CAT MS terrain p95 14.30,
other p95 68.90; WORST STREAM 68.60 ms is T67.1 — under heavy
contention the category windows themselves stall, blurring
attribution; recorded only to show the degradation.

GATE: STREAM DRAW p95 PASS both legs (8.20 < 35.50; 14.40 <
25.50, thin settled window 3.80). Terrain CAT MS p95 down in step
PASS both legs (0.60 vs 31.70; 3.20 vs 24.60). FRAME p95 FAIL /
UNVERIFIABLE: 66.80 (leg A) and 116.60 (leg B window) vs before
33.40 in both before legs. The elevation is entirely
PRESENT/UNACCOUNTED (leg A PRESENT p95 72.10 with WORK p95 24.40
and FRAME p50 16.70; the identical FRAME 16.70/66.70 +
PRESENT-p95-69.10 signature appears in the 16:36 clean-session
leg A on pre-fix code, and leg B's window was throttled at the
median), and the relocation cannot mechanically add present time
(same budgeted work, same frame callback; RENDER and WORK
medians at before levels). But the brief's gate is absolute —
"no FRAME p95 regression; otherwise REVERT" — and no post-fix
window in this environment demonstrates FRAME p95 at or below
33.40, so per the gate the fix was reverted. The mechanism is
proven and the two primary metrics pass with wide margins;
re-dispatch in a session whose present path is stable (FRAME p50
16.70 sustained through both legs, as in the 20:34 before-session)
is the scoped next step if the FRAME clause is to be judged on
game-attributable time (WORK/ACCOUNTED) rather than probe
present scheduling.

Staged probe frames (audit dir
`audits/2026-11-06T07-48-49Z-424818419/`):
`probe-legA-driveclean-mid-drive.png` (leg A mid-drive, Mosslight
Meadow, observe-010), `probe-legA-driveclean-600f-panel.png`
(leg A ring read frame, observe-011),
`probe-legB-driveclean-mid-drive.png` (leg B re-staged mid-drive,
rain, observe-016), `probe-legB-driveclean-600f-panel.png`
(observe-017), `probe-settled-window-driveclean.png`
(observe-018).

Durable store untouched: before AND after, perf_recordings = 13
rows (ids 1–13) and game_save load = null in sandbox scope; audit
scope reports sandbox {game_save:1, perf_recordings:13} = durable
{game_save:1, perf_recordings:13}. Typecheck: fixed build passed
`web_artifacts.build` (typecheck incl.); reverted source —
`bun x tsc --noEmit -p client/tsconfig.json` and
`-p server/tsconfig.json` both exit 0. Save / Save & exit never
clicked; joystick/WASD toggle never clicked; no profiler
recording started (diagnostic rings only, as briefed). Preserved
behaviors verified in session: driving on the diagnostic route
with fully textured streamed terrain at full resolution, touch
joystick + context buttons with reserved slots, no center banner.

## 2026-11-06 00:36 PT — Frostfall row-rhythm isolation probe (diagnosis only, NO FIX SHIPPED)

Executes the planned probe logged at the end of the 22:35 strip analysis:
isolate the open ~80 world-unit row rhythm (row-profile autocorrelation top
peak lag 42–44 px = 78–81u, r = 0.40 / 0.29 / 0.27 center / NW / SE) by
staging the same three Frostfall views with the special-terrain overlay
phase excluded vs included, plus one non-Frostfall control.

SHA gate: App.tsx SHA-256 BEFORE
`401f34d04b1b4fad11187b12b033201b316051118e752061150c9e0e4b762c7f`
(prefix `401f34d0` confirmed — gate passed; the stale Oct 22 SHA in
AGENTS.md was not used). POST `0820364acd1d826db0d921a8f405d756b8036297a9b5d4b435dd5120997d2575`:
the delta is ONLY the minimal audit-only instrumentation below, shipped as
briefed. No terrain/texture/gameplay/HUD/audio/save-schema change; no
feathering change.

Instrumentation shipped (audit-only, gated to artifact-capture.invalid OR
/hatch-audit-, never installed on the player route, inert in normal play):
(1) module flag `auditExcludeFrostfallOverlay` (default false) beside
`auditFrostfallDeepBypass`; (2) one guard in `stepGroundChunk`'s special
phase — `else if(!auditExcludeFrostfallOverlay)drawFrostfallTerrain(ctx)` —
so chunk building skips the whole overlay (ice gradient, 14 ice arcs,
waterfall, 44 snow-drift ellipses) only while the flag is set; (3) probe
hook `__AWL_RUN_ROW_RHYTHM_PROBE__` / `__AWL_READ_ROW_RHYTHM_PROBE__` /
`__AWL_SET_FROSTFALL_OVERLAY_EXCLUDED__` plus a small panel (Run / Overlay
off / Overlay on / Hide) mirroring the lattice-density probe panel. The run
stages center (21600,4700), NW (21000,4100), SE (22200,5300) via the
existing `__AWL_SHOW_FROSTFALL_DEEP__` hook in both overlay states, then
Ember Wastes interior (23400,31400) as the non-Frostfall control, settling
180 frames per leg (same settle as the lattice probe).

Method note (differs from the 22:35 run in one respect, stated exactly):
the 22:35 autocorrelation was computed offline on captured 390×844
screenshots; this run samples the canvas element directly in-page
(390×540, canvas rows 2..537, profile n = 536), Rec.601 luma, per-row mean
of |L(y+2) − L(y−2)| over all canvas columns (same 5 px strip), Pearson
autocorrelation lags 40–499 px, viewport 390×844 DPR 1, timeOfDay .38,
clear. Absolute r magnitudes are therefore not directly comparable across
runs; the controlled comparisons are within-run (overlay in vs out per
view; Frostfall vs Ember).

Results (topLag / topR = max r over lags 40–499; r42–r44 = r at the prior
run's peak lags):
- Center IN: top 499 / 0.474; r42 0.230, r43 0.209, r44 0.188.
  Center OUT: top 276 / 0.827; r42 0.011, r43 −0.048, r44 −0.088.
  ΔtopR (out − in) = +0.353.
- NW IN: top 437 / 0.472; r42 0.012, r43 0.027, r44 0.037.
  NW OUT: top 276 / 0.866; r42 −0.083, r43 −0.175, r44 −0.217.
  ΔtopR = +0.394.
- SE IN: top 481 / 0.442; r42 0.037, r43 0.063, r44 0.086.
  SE OUT: top 491 / 0.651; r42 −0.110, r43 −0.147, r44 −0.184.
  ΔtopR = +0.209.
- Ember control (overlay n/a): top 479 / 0.531; r42 0.289, r43 0.262,
  r44 0.232.

READING: the overlay hypothesis is REFUTED and the rhythm is NOT
Frostfall-specific. (1) In no view and no overlay state is 42–44 px the
top autocorrelation lag; overlay-IN r at 42–44 is weak (center 0.19–0.23,
NW 0.01–0.04, SE 0.04–0.09) and overlay-OUT collapses it to ≤ 0.01 /
negative everywhere — if the 44 drift ellipses and ice arcs imprinted the
rhythm, inclusion would carry a strong 42–44 peak and exclusion would
remove it; neither happens. (2) The Ember Wastes control carries
r42–r44 = 0.29 / 0.26 / 0.23, the same band as the prior run's Frostfall
values and stronger than any Frostfall view this run — the ~80u row
correlation exists in a second photo-textured biome with no Frostfall
overlay at all, i.e. it is texture-photo-internal (or method-level), not
overlay-caused. (3) New signal: with the overlay excluded, center and NW
top peaks land at lag 276 px = 511 world units ≈ the 512u texture stride
(r 0.827 / 0.866) — once the overlay's broad ice gradient stops masking
it, the photo lattice's own pitch dominates the row profile; overlay-IN
top lags are long-lag broad-gradient correlation (437–499, r 0.44–0.47),
not a discrete pitch. The overlay-out handoff frames also show the source
photo's mirrored tiling directly.

FIX-IF gate: NOT met for any overlay, feathering, or texture change —
no fix shipped. If pursued further, the next probe is per-texture
source-photo analysis (autocorrelate the raw biome PNGs), not a renderer
change.

Staged handoff frames in audit dir `audits/2026-11-06T08-43-54Z-842181372/`:
`probe-row-rhythm-center-overlay-in.png`, `probe-row-rhythm-center-overlay-out.png`,
`probe-row-rhythm-northwest-overlay-in.png`, `probe-row-rhythm-northwest-overlay-out.png`,
`probe-row-rhythm-southeast-overlay-in.png`, `probe-row-rhythm-southeast-overlay-out.png`,
`probe-row-rhythm-ember-interior.png` (all panels hidden before capture;
overlay-out center frame verified visually: no drifts, arcs, waterfall,
or ice gradient; overlay-in center frame shows all four).

Durable store untouched: before AND after, perf_recordings = 13 rows
(ids 1–13) and game_save load = null in sandbox scope; audit scope
reports sandbox {game_save:1, perf_recordings:13} = durable
{game_save:1, perf_recordings:13}. Typecheck `tsc --noEmit -p
client/tsconfig.json` exit 0. Console errors: 0 on every probe response
in the session. Save / Save & exit never clicked; joystick/WASD toggle
never clicked; no profiler recording started. Disclosure: the sandbox
save's pending region-clear relic modal occluded the staged frames, so
two TAKE clicks (Crucible Carapace, later Warden's Hunger) were made
inside the sandbox audit session only to dismiss it; no durable row
changed (counts above). Preserved behaviors verified in session:
full-resolution textured canvas (390×540 at [0,101,390,540] in play),
touch joystick + context buttons with reserved slots, no center banner,
pause-menu control-scheme toggle untouched.

## 2026-11-06 02:36 PT — Chunk-build pump relocation re-ship attempt: primary metrics passed again, revised gate clause (c) FAILED on WORK p95, fix REVERTED, nothing shipped

Re-dispatch of the 23:36 relocation under the revised FIX-IF gate
(FRAME clause judged on game-attributable WORK/ACCOUNTED, not
absolute FRAME p95). SHA gate: App.tsx SHA-256 BEFORE
`0820364acd1d826db0d921a8f405d756b8036297a9b5d4b435dd5120997d2575`
(prefix `0820364a` confirmed — gate passed; the stale Oct 22 SHA in
AGENTS.md was NOT used). The fix built as
`d03674eaa4cddb95e916847e9bbd21308bcbc2c6b346e164f1d6a845956f9620`
was measured, gate clause (c) failed on both legs (below), and the
fix was REVERTED in this same edit: AFTER SHA is again
`0820364acd1d…` byte-exact (post-revert sha256sum verified — the
shipped source is identical to the 00:36 audit-instrumentation
build; nothing ships from this run).

THE FIX (as built and measured, identical to 23:36):
`drawGroundTexture` no longer calls
`processGroundChunkQueue(fastDriving)` inside the terrain pass;
the frame loop pumps the queue once per frame after the per-frame
diagnostic accumulator reset and immediately before `drawWorld`,
gated `!world.dungeon && biomeTexturesReady`, budgets unchanged
(2.0 ms driving / 3.5 ms otherwise, draws 72/180 inside
`processGroundChunkQueue`). Fixed build passed `web_artifacts.build`
(typecheck incl.); the post-fix audit's content review confirmed
the removal and a working per-frame pump in probe metrics.

METHOD: two probe audit sessions (a rebuild separates pre/post).
Session 1 pre-fix (`audits/2026-11-06T10-37-23Z-832922209/`),
session 2 post-fix (`audits/2026-11-06T10-43-26Z-804752071/`).
Mobile viewport 390×844 DPR 1, New Game, intro tapped through
(3 cards), profiler opened + expanded, F9 `driveClean` staging
((8600,29000)->(13000,31600), Rustbucket speed 300, no kills,
MINIMAL MODE OFF), rings read at the first full 600-frame ring via
tight (~1 s) polling of the DRIVE PROBE panel. Console errors: 0
on both audit envelopes and every probe response. The whole run's
environment was heavily present-throttled (baseline FRAME p95
~83, PRESENT p95 ~80) — the revised gate judges clause (c) on
WORK/ACCOUNTED precisely so this does not decide the outcome.

BASELINE (pre-fix, session 1):
LEG A (600f; 56 streaming / 544 steady): FRAME 16.70/83.40;
RENDER 1.10/12.70; WORK 1.90/19.30; ACCOUNTED 0.20/2.20; PRESENT
17.70/80.00; UNACCOUNTED 16.60/83.20; OVER50 175; CLAMPED 7;
STREAM MAX 67.80; events total 179; first blits 30 canvases, mean
0.35, p95 0.60, max 6.90 (11 frames). STREAM DRAW 1.90/38.20/69.30;
STEADY DRAW 1.00/5.10/69.90. STREAM CAT MS — terrain
0.50/30.20/68.10, entities 0.70/2.50/37.60, other 0.00/0.10/0.10.
WORST STREAM 69.3 ms: T68.1 (98% terrain). WORST STEADY 69.9:
E67.2.
LEG B (600f; 50/550): FRAME 16.70/83.30; RENDER 1.10/10.80; WORK
1.80/13.70; ACCOUNTED 0.20/0.90; PRESENT 16.50/81.20; OVER50 163;
CLAMPED 10; STREAM MAX 84.20; events total 125; first blits 24,
mean 0.31, p95 0.10, max 7.10 (9 frames). STREAM DRAW
2.10/50.50/88.50; STEADY DRAW 1.10/4.40/67.20. STREAM CAT MS —
terrain 0.40/49.80/87.70, entities 0.70/1.80/6.10, other
0.00/0.10/0.90. WORST STREAM 88.5 ms: T87.7 (99% terrain). WORST
STEADY 67.2: E66.8.

POST-FIX (session 2):
LEG A (600f; 50/550): FRAME 16.70/66.70; RENDER 1.30/5.30; WORK
2.20/44.50; ACCOUNTED 0.30/3.00; PRESENT 14.80/70.90; UNACCOUNTED
16.50/66.50; OVER50 84; CLAMPED 4; STREAM MAX 64.20; events total
125; first blits 21, mean 0.33, p95 0.00, max 6.90 (9 frames).
STREAM DRAW 1.20/2.70/8.60; STEADY DRAW 1.30/6.20/62.40. STREAM
CAT MS — terrain 0.20/0.30/7.10, entities 0.90/1.90/3.40, other
0.40/12.20/64.20 (STREAM MAX reappears as CAT-other max — the
expected re-attribution). WORST STREAM 8.6 ms (was 69.3). WORST
STEADY 62.4: T60.5.
LEG B (600f; 52/548): FRAME 16.70/83.30; RENDER 1.00/5.00; WORK
2.00/45.80; ACCOUNTED 0.20/2.50; PRESENT 15.60/78.70; OVER50 138;
CLAMPED 9; STREAM MAX 78.70; events total 153; first blits 30,
mean 1.51, p95 0.70, max 42.00 (12 frames). STREAM DRAW
0.90/16.10/66.20; STEADY DRAW 1.10/4.80/91.10. STREAM CAT MS —
terrain 0.20/2.00/60.60, entities 0.70/5.50/35.40, other
0.40/14.40/78.80 (STREAM MAX as CAT-other max again). WORST
STREAM 66.2 ms: T60.6 (a category-window stall frame; the split
p95s are the gate metrics). WORST STEADY 91.1: E90.9 (the known
first-use sprite stall).

GATE (revised): (a) STREAM DRAW p95 −25% or better on each leg —
PASS both (A 2.70 vs 38.20 = −93%; B 16.10 vs 50.50 = −68%).
(b) terrain CAT MS p95 down in step — PASS both (A 0.30 vs 30.20
= −99%; B 2.00 vs 49.80 = −96%). (c) WORK p95 AND ACCOUNTED p95
at or below baseline on both legs — FAIL both legs: WORK p95
44.50 vs 19.30 (A) and 45.80 vs 13.70 (B); ACCOUNTED p95 3.00 vs
2.20 (A) and 2.50 vs 0.90 (B). FRAME p50 stayed 16.70 on all four
legs and RENDER p50/p95 medians improved, but the revised gate
grants its environmental escape only to PRESENT/UNACCOUNTED, not
to WORK. Per the brief — "If any of (a), (b), or (c) fails,
REVERT to byte-identical App.tsx and ship nothing" — the fix was
reverted. Noted for any future re-dispatch: the WORK p95
elevation (~+25/+32 ms) sits in NO accounted subsystem
(ACCOUNTED p95 moved only +0.8/+1.6 ms while RENDER p95 fell
−7.4/−5.8 ms), the pump performs the identical budgeted steps,
and WORK p95 in the 23:36 post-fix leg A was 24.40 — i.e. WORK
p95 swings by tens of ms between probe sessions in this
environment. A future gate should either pin WORK to a
same-browser-session A/B (baseline and fixed legs without a
rebuild between them is impossible for a source change, so:
repeat-baseline legs in the post-fix session to bound session
drift) or judge clause (c) on ACCOUNTED + RENDER only.

Staged probe frames (in the delivered capture sets):
pre-fix audit dir `audits/2026-11-06T10-37-23Z-832922209/`:
`probe-baseline-legA-driveclean-mid-drive.png` (observe-025),
`probe-baseline-legA-driveclean-600f-panel.png` (observe-033),
`probe-baseline-legB-driveclean-mid-drive.png` (observe-037),
`probe-baseline-legB-driveclean-600f-panel.png` (observe-046).
Post-fix audit dir `audits/2026-11-06T10-43-26Z-804752071/`:
`probe-postfix-legA-driveclean-mid-drive.png` (observe-006;
verified visually: fully textured streamed terrain, Rustbucket
driving the route, MINIMAL MODE OFF, no center banner),
`probe-postfix-legA-driveclean-600f-panel.png` (observe-014),
`probe-postfix-legB-driveclean-mid-drive.png` (observe-018),
`probe-postfix-legB-driveclean-600f-panel.png` (observe-026).

Durable store untouched: before AND after, perf_recordings = 13
rows (ids 1–13) and game_save load = null in sandbox scope; both
audits report sandbox {game_save:1, perf_recordings:13} = durable
{game_save:1, perf_recordings:13}. Typecheck: fixed build passed
`web_artifacts.build` (typecheck incl.); reverted source —
`bun x tsc --noEmit -p client/tsconfig.json` and
`-p server/tsconfig.json` both exit 0. Save / Save & exit never
clicked; joystick/WASD toggle never clicked; no profiler
recording started (diagnostic rings only, as briefed). Preserved
behaviors verified in session: driving on the diagnostic route
with fully textured streamed terrain at full resolution, touch
joystick + context buttons with reserved slots, no center banner.

## 2026-11-06 05:36 PT — Tiling-repetition isolation probe: single-tile clamp vs multi-tile lattice (diagnosis only, NO FIX SHIPPED)

Follow-up to the 00:36 row-rhythm probe: test whether the overlay-out
lag-276 px peak (= one 512u texture-tile period, r 0.83/0.87) comes from
renderer-side tiling repetition by rendering the same views with the
ground lattice clamped to a SINGLE texture tile (no repeat) vs the
normal multi-tile lattice.

SHA gate: App.tsx SHA-256 BEFORE
`0820364acd1d826db0d921a8f405d756b8036297a9b5d4b435dd5120997d2575`
(prefix `0820364a` confirmed live before editing — gate passed; the
stale SHA in AGENTS.md was not used). POST
`dc29af44022fc6e27aaac93646771136d4c773669c89f342714d781d0c79b53e`:
the delta is ONLY the minimal audit-only instrumentation below. No
terrain/texture/gameplay/HUD/audio/save-schema change; no feathering
change; no player-facing fix.

Instrumentation shipped (audit-only, gated to artifact-capture.invalid
OR /hatch-audit-, never installed on the player route, inert in normal
play): (1) module flag `auditSingleTileAnchor` (default null) beside
`auditExcludeFrostfallOverlay`; (2) one branch in `drawTextureLattice`:
while the anchor is set it draws ONLY the raw cell (512u lattice offset
256u) and the feathered cell (aligned 512u lattice) containing the
anchor and returns — every other lattice cell is skipped, so all ground
layers that flow through the lattice (Mosslight base + per-region
replacement via the blend scratch) are clamped together; flag null
renders the exact original lattice; (3) probe hook
`__AWL_RUN_TILING_PROBE__` / `__AWL_READ_TILING_PROBE__` /
`__AWL_SET_SINGLE_TILE__` / `__AWL_HIDE_TILING_PANEL__` plus a small
panel (Run / Single tile on / Single tile off / Hide). The run stages
Frostfall center (21600, 4700) via `__AWL_SHOW_FROSTFALL_DEEP__` with
the special-terrain overlay EXCLUDED in both arms (matching the 00:36
overlay-out baseline) and Mosslight Meadow center (8600, 29000,
region 1 center) as the control, each multi-tile then single-tile,
settling 180 frames per leg, ground chunk cache reset per leg.

Method (identical to the 00:36 run): canvas sampled in-page
(390×540, rows 2..537, profile n = 536), Rec.601 luma, per-row mean of
|L(y+2) − L(y−2)| over all canvas columns, Pearson autocorrelation
lags 40–499 px, viewport 390×844 DPR 1, timeOfDay .38, clear.
Report build `e037d2c2ecc3-20261106T134046782Z`. This run also reports
r276 = r at lag 276 px (the 512u stride). Caveat: single-tile top
peaks sit at lag 493 where the autocorrelation overlap is only
m = 536−493 = 43 rows and the profile is a single textured band
against flat surround, so those long-lag topR values are envelope
correlation, not a pitch; the decisive statistics are r276 (m = 260)
and r42–r44 (m ≈ 490).

Results (topLag / topR = max r over lags 40–499):
- Frostfall center MULTI (overlay out): top 276 / 0.825; r42 0.017,
  r43 −0.041, r44 −0.081; r276 0.825. Reproduces the 00:34/00:36
  baseline (276 / 0.827; r42 0.011, r43 −0.048, r44 −0.088) to within
  0.01 — method validated.
- Frostfall center SINGLE: top 493 / 0.645 (envelope, see caveat);
  r42 0.355, r43 0.339, r44 0.330; r276 −0.528. ΔtopR −0.180,
  Δr276 −1.354.
- Mosslight center MULTI: top 418 / 0.422; r42 0.243, r43 0.229,
  r44 0.217; r276 −0.048. No 276 peak at this view in either state.
- Mosslight center SINGLE: top 493 / 0.857 (envelope, see caveat);
  r42 0.375, r43 0.369, r44 0.361; r276 0.004. ΔtopR +0.435,
  Δr276 +0.053.

VERDICT (split, per the brief's hypothesis test):
- 276 px / 512u peak: hypothesis CONFIRMED — renderer-side tiling
  repetition. With one tile instance there is nothing to repeat at
  512u and r276 collapses from +0.825 to −0.528 (rows one period
  apart now pair the tile's textured band against the flat
  untextured surround). The multi-tile Frostfall frame shows the
  mechanism directly: the mirrored snow photo repeats across the
  whole view.
- 42–44 px / ~80u band: hypothesis NOT confirmed. The band does not
  drop in the single-tile state at either view — it RISES
  (Frostfall ≈0/negative → 0.33–0.35; Mosslight 0.22–0.24 →
  0.36–0.38). Whatever carries the ~80u row correlation lives inside
  a single tile's rendered content (photo-internal structure,
  texture-variant processing, and/or non-lattice canvas content),
  not in lattice repetition. Separate thread from the 512u pitch;
  consistent with the 00:36 Ember control carrying the band.
- Optional warp arm NOT run: the periodic displacement warp named
  in ATTRIBUTION.md is baked into the PNG derivatives at build time
  ("a smooth periodic displacement to move the repeat outside the
  normal play view"); the runtime renderer has no warp gate (the
  only feDisplacementMap uses are world-map SVG decorations), so it
  is identical in both arms and cannot be toggled without swapping
  texture assets.

FIX-IF gate: diagnosis-only — no fix ships this run, as briefed.

Staged frames in audit dir `audits/2026-11-06T13-41-20Z-988061700/`:
`probe-frostfall-multi-tile-overlay-out.png` (clean, panels hidden:
mirrored snow photo tiling the whole view, no overlay drifts/arcs/
waterfall), `probe-frostfall-single-tile-overlay-out.png` (clean,
panels hidden: exactly one textured tile block in a flat dark-green
field), `probe-mosslight-single-tile.png` (clean, panels hidden:
textured grass only in the two clamped cells, flat surround),
`probe-mosslight-multi-tile.png` (live catch mid-run during the
Mosslight multi-tile leg, panels visible: grass textured across the
whole view), plus `observe-002.png` showing the tiling probe's full
JSON report on screen after the measured run.

Durable store untouched: before AND after, perf_recordings = 13 rows
(ids 1–13) and game_save load = null in the invoke sandbox scope;
audit scope reports sandbox {game_save:1, perf_recordings:13} =
durable {game_save:1, perf_recordings:13} (the game_save:1 is the
pre-existing durable row). Typecheck `tsc --noEmit -p
client/tsconfig.json` exit 0. Console errors: 0 in the audit and in
every probe response in the session. Save / Save & exit never
clicked; joystick/WASD toggle never clicked; no profiler recording
started. Preserved behaviors verified in session: full-resolution
textured canvas (390×540 at [0,101,390,540] in play), touch joystick
+ context buttons with reserved slots, no center banner, pause-menu
control-scheme toggle untouched.

## 2026-11-06 06:36 PT — Chunk-build pump relocation, third attempt: clauses (a)/(b) passed a third time, REVISED clause (c) FAILED on ACCOUNTED+RENDER in a present-throttled post-fix session, fix REVERTED, nothing shipped

Third dispatch of the relocation, under the twice-revised gate:
clause (c) judged on ACCOUNTED p95 + RENDER p95 (NOT WORK p95),
with baselines re-taken this run and baseline legs repeated in the
post-fix session to bound session drift. SHA gate: App.tsx
SHA-256 BEFORE `dc29af44022fc6e27aaac93646771136d4c773669c89f342714d781d0c79b53e`
(prefix `dc29af44` confirmed live before editing — gate passed).
The fix built as
`26bab74b5bf06fef7ec037676800b192e22dbda21482d0b04c5bc414ffd34fd6`
was measured, gate clause (c) failed on both designated post-fix
legs (and on both in-session repeat legs), and the fix was
REVERTED in this same edit: AFTER SHA is again `dc29af44022f…`
byte-exact (post-revert sha256sum verified — the shipped source
is identical to the 05:36 tiling-probe instrumentation build;
nothing ships from this run).

THE FIX (as built and measured, identical to 23:36 and 02:36):
`drawGroundTexture` no longer calls
`processGroundChunkQueue(fastDriving)` inside the terrain pass;
the frame loop pumps the queue once per frame after the per-frame
diagnostic accumulator reset and immediately before `drawWorld`,
gated `!world.dungeon && biomeTexturesReady`, budgets unchanged
(2.0 ms driving / 3.5 ms otherwise, draws 72/180 inside
`processGroundChunkQueue`). Fixed build passed `web_artifacts.build`
(typecheck incl.); probe metrics confirm the re-attribution
(STREAM MAX reappears as CAT-other max on both post-fix legs) and
fully textured streamed terrain while driving.

METHOD: two probe audit sessions (a rebuild separates pre/post),
plus two extra repeat legs in the post-fix session per the brief.
Pre-fix session `audits/2026-11-06T14-37-38Z-897216142/`,
post-fix session `audits/2026-11-06T14-47-23Z-934903780/`.
Mobile viewport 390×844 DPR 1, New Game, intro tapped through
(3 cards), profiler opened + expanded, audit panels hidden, F9
`driveClean` staging ((8600,29000)->(13000,31600), Rustbucket
speed 300, no kills, MINIMAL MODE OFF), rings read at the first
full 600-frame ring via ~2 s polling of the DRIVE PROBE panel.
Console errors: 0 on both audit envelopes and every probe
response in both sessions.

BASELINE (pre-fix, session 1):
LEG A (600f; 35 streaming / 565 steady): FRAME 16.70/33.30;
RENDER 0.60/5.20; WORK 1.30/9.60; ACCOUNTED 0.20/0.80; PRESENT
15.40/27.80; UNACCOUNTED 16.50/33.10; OVER50 3; CLAMPED 16;
STREAM MAX 22.80; events total 90; first blits 18 canvases, mean
0.01, p95 0.00, max 0.10 (7 frames). STREAM DRAW 0.90/15.30/26.90;
STEADY DRAW 0.60/1.60/34.70. STREAM CAT MS — terrain
0.50/14.80/26.40, entities 0.30/0.50/1.10, other 0.00/0.10/0.10.
WORST STREAM 26.9 ms: T26.4 (98% terrain).
LEG B (600f; 39/561): FRAME 16.70/50.00; RENDER 0.60/2.00; WORK
1.30/3.60; ACCOUNTED 0.20/0.80; PRESENT 15.40/52.70; UNACCOUNTED
16.50/49.70; OVER50 17; CLAMPED 10; STREAM MAX 14.00; events
total 100; first blits 21, mean 0.34, p95 0.00, max 7.10
(8 frames). STREAM DRAW 1.10/15.50/22.90; STEADY DRAW
0.60/1.60/60.80. STREAM CAT MS — terrain 0.40/15.10/22.50,
entities 0.40/1.00/1.40, other 0.00/0.10/0.10. WORST STREAM
22.9 ms: T22.5 (98% terrain).

POST-FIX (session 2; the whole session was present-throttled —
PRESENT p95 62–81 on every leg vs 27.80/52.70 baseline, OVER50
36–166 vs 3/17):
LEG A (600f; 49/551): FRAME 16.70/83.30; RENDER 1.10/8.70; WORK
2.10/53.00; ACCOUNTED 0.30/6.60; PRESENT 15.80/76.80; UNACCOUNTED
16.60/82.80; OVER50 166; CLAMPED 10; STREAM MAX 67.70; events
total 125; first blits 28, mean 0.75, p95 6.80, max 7.30
(12 frames). STREAM DRAW 1.20/6.80/60.80; STEADY DRAW
1.10/8.70/64.00. STREAM CAT MS — terrain 0.20/0.40/14.30,
entities 0.90/1.90/6.00, other 0.40/63.50/69.60 (STREAM MAX as
CAT-other max — the expected re-attribution). WORST STREAM
60.8 ms: O69.6. WORST STEADY 64.0: E63.8.
LEG B (600f; 48/552): FRAME 16.70/66.70; RENDER 0.90/4.40; WORK
1.80/23.30; ACCOUNTED 0.20/2.60; PRESENT 15.50/75.50; UNACCOUNTED
16.60/66.60; OVER50 118; CLAMPED 4; STREAM MAX 75.20; events
total 121; first blits 21, mean 0.37, p95 0.00, max 7.70
(9 frames). STREAM DRAW 0.90/3.20/69.40; STEADY DRAW
0.90/4.30/60.90. STREAM CAT MS — terrain 0.20/0.30/7.90,
entities 0.70/2.80/61.30, other 0.40/16.60/75.20 (STREAM MAX as
CAT-other max again). WORST STREAM 69.4 ms: E61.3. WORST STEADY
60.9: E60.7.
REPEAT R1 (600f; 56/544): FRAME 16.80/83.30; RENDER 1.10/6.00;
WORK 1.90/22.90; ACCOUNTED 0.20/4.20; PRESENT 17.20/81.20; OVER50
148; STREAM DRAW 1.10/4.50/53.70; STREAM CAT MS terrain p95 0.80,
other p95 55.20.
REPEAT R2 (600f; 40/560): FRAME 16.70/66.60; RENDER 0.80/2.80;
WORK 1.50/9.10; ACCOUNTED 0.20/2.10; PRESENT 15.30/62.30; OVER50
36; STREAM DRAW 0.80/2.40/60.10; STREAM CAT MS terrain p95 0.30,
other p95 10.60 (max 71.90 ≈ STREAM MAX 71.70).

GATE (revised): (a) STREAM DRAW p95 down ≥25% on both legs —
PASS both (A 6.80 vs 15.30 = −56%; B 3.20 vs 15.50 = −79%;
repeats −71%/−85%). (b) terrain CAT MS p95 down in step — PASS
both (A 0.40 vs 14.80 = −97%; B 0.30 vs 15.10 = −98%; repeats
0.80/0.30). (c) ACCOUNTED p95 + RENDER p95 flat or down vs
same-session baseline on both legs — FAIL both legs: ACCOUNTED
p95 6.60 vs 0.80 (A) and 2.60 vs 0.80 (B); RENDER p95 8.70 vs
5.20 (A) and 4.40 vs 2.00 (B). The repeat legs fail (c) too
(ACCOUNTED 4.20/2.10 vs 0.80; RENDER 6.00/2.80 vs 5.20/2.00), so
no leg pairing in the post-fix session clears (c) — the drift
repeats bound the session effect without rescuing the clause.
WORK p95 (reported, NOT judged per the brief): 53.00/23.30 vs
9.60/3.60 baseline; repeats 22.90/9.10. Noted for the record:
the post-fix session was throttled at the present path on every
leg (PRESENT p95 62–81 vs baseline 28/53; steady-frame category
windows stalling to E63.8/L56.2/T59.5 ms that the pump cannot
mechanically cause; ACCOUNTED p50 flat at 0.20–0.30 and RENDER
p50 0.80–1.10 vs 0.60 baseline), and FRAME p50 held 16.70 on all
six legs. Per the brief — ship ONLY if all three clauses pass,
otherwise revert byte-identical to dc29af44 — the fix was
reverted. Third consecutive run in which (a)/(b) pass with wide
margins and an environment-sensitive p95 clause fails; if this
is re-dispatched again, the gate needs a clause-(c) reference
measured inside the post-fix session itself (e.g. a same-session
steady-frame ACCOUNTED/RENDER control), because cross-session
p95 comparison in this probe environment has now decided the
outcome three times on session state, not on the fix.

Staged probe frames (in the delivered capture sets):
pre-fix audit dir `audits/2026-11-06T14-37-38Z-897216142/`:
`probe-baseline-legA-driveclean-mid-drive.png`,
`probe-baseline-legA-driveclean-600f-panel.png`,
`probe-baseline-legB-driveclean-mid-drive.png` (Rustbucket in
dawn rain, Mosslight Meadow, fully textured terrain, MINIMAL
MODE OFF, no center banner),
`probe-baseline-legB-driveclean-600f-panel.png`.
Post-fix audit dir `audits/2026-11-06T14-47-23Z-934903780/`:
`probe-postfix-legA-driveclean-mid-drive.png` (verified visually:
fixed build f7b5b9b0, fully textured streamed terrain, Rustbucket
driving the route, touch joystick + EXIT/DASH buttons, no center
banner), `probe-postfix-legA-driveclean-600f-panel.png`,
`probe-postfix-legB-driveclean-mid-drive.png`,
`probe-postfix-legB-driveclean-600f-panel.png`,
`probe-postfix-repeatR2-driveclean-600f-panel.png`.

Durable store untouched: before AND after, perf_recordings = 13
rows (ids 1–13) and game_save load = null in sandbox scope; both
audits report sandbox {game_save:1, perf_recordings:13} = durable
{game_save:1, perf_recordings:13}. Typecheck: fixed build passed
`web_artifacts.build` (typecheck incl.); reverted source —
`bun x tsc --noEmit -p client/tsconfig.json` and
`-p server/tsconfig.json` both exit 0. Save / Save & exit never
clicked; joystick/WASD toggle never clicked; no profiler
recording started (diagnostic rings only, as briefed). Preserved
behaviors verified in session: driving on the diagnostic route
with fully textured streamed terrain at full resolution in both
builds, touch joystick + context buttons with reserved slots, no
center banner.

## 2026-11-06 08:37 PT — Feathered-lattice-cell discrimination probe: feather-ON single-tile legs REPRODUCED, band PERSISTS feather-OFF at both views — feather path EXCLUDED, resampling chain / another inside-tile path remains

Follow-up to the 05:36 tiling-repetition probe: the 42–44 px
row-profile rhythm was proven renderer-inside-tile (single-tile
r42–44 +0.31…+0.37 vs every raw-photo arm −0.28…+0.04), leaving the
feathered lattice cell — the same photo under 12% alpha ramps, drawn
offset half a stride from the raw cell in `drawTextureLattice` — as
the remaining undiscriminated inside-tile candidate. This run
authorized the one missing instrument: a flag that disables that
feathered drawImage in the single-tile branch only.

SHA gate: App.tsx SHA-256 BEFORE
`dc29af44022fc6e27aaac93646771136d4c773669c89f342714d781d0c79b53e`
(prefix `dc29af44` confirmed live before editing — gate passed).
POST `a9f8da884b4ac6b6d00a9b19cd29aa9ae9fe4aae7738297ea9683a4aea3e3a20`
(prefix `a9f8da88` — NEW gate baseline for the next run). The delta
is ONLY the audit-only instrumentation below. No texture, gameplay,
HUD, audio, or save-schema change; no player-facing behavior change;
the multi-tile lattice branch is byte-identical.

Instrumentation shipped (audit-only, gated to
artifact-capture.invalid OR /hatch-audit- — the same effect gate as
the tiling probe — never installed on the player route, inert in
normal play): (1) module flag `auditSingleTileFeatherOff` (default
false) beside `auditSingleTileAnchor`; (2) in `drawTextureLattice`'s
single-tile branch only, the feathered-cell drawImage is wrapped in
`if(!auditSingleTileFeatherOff){…}` — flag false renders the exact
original two-cell clamp; (3) `__AWL_SET_FEATHER_OFF__(disabled)`
setter beside `__AWL_SET_SINGLE_TILE__` (sets the flag +
`resetGroundChunkCache()`), Feather off / Feather on panel buttons,
and a THIRD leg in `__AWL_RUN_TILING_PROBE__`'s per-view measure:
after the feather-ON single-tile leg, the flag is set, the chunk
cache is reset, the view is re-staged, settled 180 frames, and
measured as `singleTileFeatherOff` (report also gains
`deltaFeatherOffTopR` / `deltaFeatherOffR276` and a `featherOff`
parameters string). Method otherwise identical to the 05:36 run:
390×844 DPR 1, timeOfDay .38, clear, 180-frame settle per leg,
chunk cache reset per leg, Frostfall overlay EXCLUDED in all arms,
Rec.601 luma, per-row mean |L(y+2) − L(y−2)|, Pearson lags 40–499,
r276 reported. Report build `8887c8613af9-20261106T164240028Z`.

Results (topLag / topR = max r over lags 40–499; long-lag tops are
envelope correlation per the 05:36 caveat — decisive statistics are
r42–r44 and r276):
- Frostfall center MULTI (overlay out): top 276 / 0.829; r42 0.013,
  r43 −0.044, r44 −0.082; r276 0.829. Reproduces 05:36 (276 / 0.825;
  0.017 / −0.041 / −0.081; 0.825) — method validated again.
- Frostfall center SINGLE feather-ON: top 475 / 0.549 (envelope);
  r42 0.351, r43 0.335, r44 0.326; r276 −0.524. REPRODUCES the
  prior single-tile leg (0.355 / 0.339 / 0.330; r276 −0.528) to
  within 0.005 on every decisive statistic.
- Frostfall center SINGLE feather-OFF: top 467 / 0.757 (envelope);
  r42 0.486, r43 0.478, r44 0.475; r276 −0.616. The band does NOT
  collapse toward the photo-arm values (−0.17 / −0.24 / −0.28) — it
  RISES by +0.135 / +0.143 / +0.149 vs feather-ON.
- Mosslight center MULTI: top 418 / 0.420; r42 0.253, r43 0.243,
  r44 0.232; r276 −0.047. Reproduces 05:36 (418 / 0.422; 0.243 /
  0.229 / 0.217; −0.048).
- Mosslight center SINGLE feather-ON: top 493 / 0.857; r42 0.373,
  r43 0.367, r44 0.360; r276 0.007. REPRODUCES the prior leg
  (493 / 0.857; 0.375 / 0.369 / 0.361; 0.004) essentially exactly.
- Mosslight center SINGLE feather-OFF: top 493 / 0.857 (unchanged);
  r42 0.358, r43 0.352, r44 0.346; r276 0.424. The band does NOT
  collapse toward the photo-arm values (0.04 / −0.01 / 0.02) — it is
  unchanged within 0.015. (r276 moves +0.416: with the feather cell
  gone, rows one stride apart pair raw-cell content against raw-cell
  content instead of against the offset feather blend; the 42–44
  band is indifferent to it.)

VERDICT: the feathered lattice cell is NOT the cause of the
42–44 px / ~80u rhythm. Per the brief's decision rule — collapse
feather-off toward the photo-arm values would have convicted the
feather path; persistence acquits it — the band persists at BOTH
views (strengthens at Frostfall, flat at Mosslight). The rhythm
therefore lives in the RESAMPLING CHAIN or another inside-tile path
that renders the RAW cell (candidate space for the next probe: the
texture-variant canvas generation / downscale of the photo into the
512u variant, the ground-chunk canvas blit scaling, or the probe's
own canvas resample — the last is shared with the photo arms'
method only in part, since the photo arms were measured on the raw
images, not through this canvas chain). Diagnosis-only — no fix
ships this run, as briefed.

Staged frames in audit dir `audits/2026-11-06T16-43-30Z-289335363/`:
`probe-frostfall-staged-during-run.png` (Frostfall Peaks staged live
at probe start, region 12/18), `observe-003.png` (full TILING JSON
report on screen after the measured six-leg run),
`probe-mosslight-single-tile-feather-on.png` (Mosslight single-tile
clamp, feather ON: soft 12%-alpha blend visible across the tile),
`probe-mosslight-single-tile-feather-off.png` (same clamp, Feather
off clicked: the hard un-blended square edge of the single raw cell
is plainly visible around the player — direct visual proof the flag
suppresses exactly the feathered draw and nothing else; joystick,
DASH/MELEE, HUD all intact in both frames, FPS 57).

Durable store untouched: before AND after, perf_recordings = 13
rows (ids 1–13, re-listed post-probe, identical) and game_save load
= null in the invoke sandbox scope; audit scope reports sandbox
{game_save:1, perf_recordings:13} = durable {game_save:1,
perf_recordings:13}. Typecheck: `web_artifacts.build` passed
(typecheck incl.) and `bun x tsc --noEmit -p client/tsconfig.json`
exit 0. Console errors: 0 in the audit and in every probe response
in the session. Save / Save & exit never clicked; joystick/WASD
toggle never clicked; no profiler recording started (probe legs
only). Preserved behaviors verified in session: full-resolution
canvas (390×540), touch joystick + tap targets with reserved slots,
no center banner, no dynamic resolution.

## 2026-11-06 10:37 PT — Variant-canvas vs blit-scale discrimination probe: blit-1:1 leg NULL at both views, variant canvases carry NO rhythm at the band's physical period — verdict NEITHER; the in-chunk lattice draw downscale (1024→512) is the remaining inside-tile candidate

Follow-up to the 08:37 feather discrimination: feathering
exonerated, the two named remaining inside-tile paths were (a) the
texture-variant canvas generation/downscale chain and (b) the
ground-chunk blit scaling. This run authorized the one missing
instrument for (b) — an audit-only flag forcing the ground-chunk →
screen blit to exactly 1:1 — plus an Arm A profile computed directly
on the generated variant canvases.

SHA gate: App.tsx SHA-256 BEFORE
`a9f8da884b4ac6b6d00a9b19cd29aa9ae9fe4aae7738297ea9683a4aea3e3a20`
(prefix `a9f8da88` confirmed live before editing — gate passed).
POST `e7cf9af85567cf2e2987680673ebb533b94c2d03f543ecff8ac5a57752ba1592`
(prefix `e7cf9af8` — NEW gate baseline for the next run). The delta
is ONLY the audit-only instrumentation below. No texture, gameplay,
HUD, audio, or save-schema change; no player-facing behavior
change; the normal blit branch is byte-identical when the flag is
false.

Instrumentation shipped (audit-only, gated to
artifact-capture.invalid OR /hatch-audit- — the same effect gate as
the tiling probe — never installed on the player route, inert in
normal play): (1) module flag `auditBlit1To1` (default false)
beside `auditSingleTileFeatherOff`; (2) in `drawGroundTexture`'s
chunk blit only, when the flag is on the chunk is composited
through an identity device transform (destination origin =
current-transform-mapped chunk origin rounded to whole device
pixels, destination size = chunk canvas size, smoothing already
off) — a pure 1:1 device-pixel copy with no resampling; (3)
`__AWL_SET_BLIT_1TO1__(enabled)` setter beside
`__AWL_SET_FEATHER_OFF__` (blit is per-frame, so no chunk-cache
reset), Blit 1:1 on / Blit 1:1 off panel buttons, and a FOURTH leg
in `__AWL_RUN_TILING_PROBE__`'s per-view measure (`singleTileBlit1To1`,
with `deltaBlitTopR` / `deltaBlitR42` / `deltaBlitR276` vs the
feather-ON single-tile leg); (4) Arm A: the report gains
`variants[]` — the same Rec.601 row-profile autocorrelation
computed directly on the generated RAW variant canvas
(`buildTextureVariants` output index 0, pre-blit, pre-feather) for
region 12 (Frostfall) and region 1 (Mosslight), including
`rMatch42/43/44` at the variant-canvas lags corresponding to the
rendered 42/43/44 px lags (matchLag = round(renderedLag ×
(VIEW_H / canvasCssHeight) × (canvasSize / 512)) = lags 156/159/163
this run), and the viewport block gains backingWidth/backingHeight.
Method otherwise identical to the 05:36/08:37 runs: 390×844 DPR 1,
canvas CSS 390×540, backing 720×1000, timeOfDay .38, clear,
180-frame settle per leg, chunk cache reset per leg, Frostfall
overlay EXCLUDED in all arms, Rec.601 luma, per-row mean
|L(y+2) − L(y−2)|, Pearson lags 40–499, r276 reported. Report
build `33b3631552fd-20261106T184635895Z`.

Results (topLag / topR = max r over lags 40–499; long-lag tops are
envelope correlation per the 05:36 caveat — decisive statistics are
r42–r44, r276, and the matched-lag variant r):
- Frostfall center MULTI (overlay out): top 276 / 0.828; r42
  0.011, r43 −0.046, r44 −0.085; r276 0.828. Reproduces 08:37
  (276 / 0.829; 0.013 / −0.044 / −0.082; 0.829).
- Frostfall center SINGLE feather-ON: top 499 / 0.534 (envelope);
  r42 0.346, r43 0.333, r44 0.327; r276 −0.522. Reproduces the
  brief's BEFORE numbers (0.351 / 0.335 / 0.326) — method
  validated a third time.
- Frostfall center SINGLE feather-OFF: top 492 / 0.647; r42
  0.496, r43 0.490, r44 0.488; r276 −0.614. Band rises feather-off
  again (08:37: 0.486 / 0.478 / 0.475) — feather stays exonerated.
- Frostfall center SINGLE blit-1:1 (Arm B): top 476 / 0.555; r42
  0.349, r43 0.333, r44 0.324; r276 −0.513. Deltas vs feather-ON
  single-tile: Δr42 +0.002, ΔtopR +0.021, Δr276 +0.010 — NULL.
  Forcing the chunk → screen blit to an exact 1:1 device-pixel
  copy does not move the band at all.
- Mosslight center MULTI: top 418 / 0.430; r42 0.272, r43 0.265,
  r44 0.247; r276 −0.047 (08:37: 418 / 0.420; 0.253 / 0.243 /
  0.232; −0.047).
- Mosslight center SINGLE feather-ON: top 493 / 0.857; r42
  0.374, r43 0.368, r44 0.360; r276 0.004. Reproduces the brief's
  BEFORE numbers (0.373 / 0.367 / 0.360) essentially exactly.
- Mosslight center SINGLE feather-OFF: top 493 / 0.857; r42
  0.357, r43 0.351, r44 0.346; r276 0.419 (08:37: identical to
  0.001 on r42–44).
- Mosslight center SINGLE blit-1:1 (Arm B): top 493 / 0.857; r42
  0.372, r43 0.366, r44 0.358; r276 0.009. Deltas: Δr42 −0.002,
  ΔtopR 0.000, Δr276 +0.004 — NULL.
- Arm A, Frostfall variant canvas (region 12, 1024×1024, raw):
  top 447 / 0.362 (long-lag envelope); literal r42 0.005, r43
  0.006, r44 −0.008; r276 0.085. At the band's physical period on
  the variant canvas (matched lags 156/159/163): r −0.108 /
  −0.127 / −0.153 — NEGATIVE, same sign as the raw-photo arm
  (−0.172 / −0.240 / −0.282). The generated Frostfall variant does
  NOT carry the rhythm at any relevant lag.
- Arm A, Mosslight variant canvas (region 1, 1024×1024, raw):
  top 40 / 0.549 — the scan-window EDGE, with literal r42 0.543,
  r43 0.534, r44 0.523 decaying monotonically from lag 40: the
  signature of broad smooth low-frequency content (short-lag
  envelope correlation), NOT a periodic rhythm — those lags are
  variant-canvas pixels, i.e. ~11 rendered px / ~21 world units,
  1/3.7 of the band's scale. At the band's physical period
  (matched lags 156/159/163): r −0.178 / −0.174 / −0.180 —
  NEGATIVE. r276 −0.126. The generated Mosslight variant does NOT
  carry the rhythm at the band's period either.

VERDICT: NEITHER. (b) Blit scaling is RULED OUT: an exact 1:1
blit changes r42 by ≤0.002 at both views — the band is indifferent
to the blit (unsurprising in hindsight: at zoom 1 / renderScale 1
the stock blit is already a whole-pixel 1:1 copy with smoothing
off, and the flag proves it). (a) Variant generation/downscale is
RULED OUT as the carrier: neither variant canvas holds positive
correlation at the band's physical period (both matched-lag r
negative, −0.11…−0.18, photo-arm-like). The rhythm therefore
enters BETWEEN the variant canvas and the finished frame, in a
step neither arm toggled: the remaining inside-tile candidate is
the LATTICE DRAW inside chunk building — `drawTextureLattice`
draws the 1024px variant into a 512-device-px cell on the 640px
chunk canvas (a 2:1 downscale with smoothing ON, the default, in
the chunk context) — and/or the probe's own final resample
(720×1000 backing → 390×540 sample, shared with no other arm's
method). Next discriminator: an audit leg that draws the lattice
cell into the chunk at 1:1 (or into a supersampled chunk) — if the
band collapses there, the in-chunk lattice downscale is the cause;
if it persists, the probe's own sample resample is the last
suspect and the "band" may be partly a measurement artifact of
the 720→390 vertical resample interacting with the 512u lattice.
Diagnosis-only — no fix ships this run, as briefed.

Staged frames in audit dir `audits/2026-11-06T18-46-51Z-631225985/`:
`probe-frostfall-staged-during-run.png` (Frostfall Peaks staged
live mid-run, "TILING · running eight staged frames…", region
12/18, FPS 52, joystick/DASH/MELEE/HUD intact),
`probe-tiling-report-on-screen.png` (full TILING JSON in the
probe output after the eight-leg run; post-run Mosslight frame
with report text in observe-003.png).

Durable store untouched: before AND after, perf_recordings = 13
rows (ids 1–13, re-listed post-probe, identical) and game_save
load = null in the invoke sandbox scope; audit scope reports
sandbox {game_save:1, perf_recordings:13} = durable
{game_save:1, perf_recordings:13}. Typecheck:
`web_artifacts.build` passed (typecheck incl.) and
`bun x tsc --noEmit -p client/tsconfig.json` exit 0. Console
errors: 0 in the audit and in every probe response in the
session. Save / Save & exit never clicked; joystick/WASD toggle
never clicked; no profiler recording started (probe legs only).
Preserved behaviors verified in session: full-resolution canvas
(390×540 CSS / 720×1000 backing), touch joystick + tap targets
with reserved slots, no center banner, no dynamic resolution.

## 2026-11-06 11:37 PT — Chunk-build pump relocation, fourth attempt: same-session A/B/A control run — clauses (a)/(b) passed a fourth time on both comparisons, clause (c) FAILED on ON leg 1 RENDER p95 only, fix REVERTED, nothing shipped

Fourth dispatch, under the brief's new same-session control design:
the relocation was re-applied behind an audit-only runtime toggle
(`auditPumpReloc`, default OFF = shipped behavior, tiling-probe
panel pattern like `auditBlit1To1`, with a gated
`__AWL_SET_PUMP_RELOC__` setter and Pump reloc on/off panel buttons)
so OFF and ON legs could interleave inside ONE probe session on
the driveClean route. SHA gate: App.tsx SHA-256 BEFORE
`e7cf9af85567cf2e2987680673ebb533b94c2d03f543ecff8ac5a57752ba1592`
(prefix `e7cf9af8` confirmed live before editing — gate passed;
the stale Oct 22 SHA in AGENTS.md was NOT used). The toggle build
passed `web_artifacts.build` (typecheck incl.) and two audits
(console errors 0 throughout). The gate failed (below), so the
toggle AND the relocation were reverted in this same edit: AFTER
SHA is again `e7cf9af85567cf2e…` byte-exact (post-revert
sha256sum verified; zero `auditPumpReloc`/`PUMP_RELOC` remnants —
nothing ships from this run, not even the toggle).

METHOD NOTE: a first page session was discarded before any gate
leg — the tiling panel's one-way Hide button was clicked to expand
the profiler, which permanently removes the Pump reloc buttons
for that page session, so no ON leg could be toggled there (its
single OFF ring — STREAM DRAW p95 15.20, terrain CAT MS p95
13.30, ACCOUNTED p95 1.50, RENDER p95 5.20, PRESENT p95 25.90,
FRAME 16.70/33.30 — is NOT gate evidence and is recorded only for
provenance). All four gate legs below ran in ONE fresh page
session (audit dir `audits/2026-11-06T19-41-45Z-935986522/`),
mobile viewport 390×844 DPR 1, New Game, intro tapped through
(3 cards), profiler opened (F9 staging auto-expands it), MINIMAL
MODE OFF, no post-staging toggles other than the pump toggle
itself. Legs interleaved OFF → ON → OFF → ON, each re-staged with
F9 `driveClean` ((8600,29000)->(13000,31600), Rustbucket speed
300, no kills), each read at the first full 600-frame ring. The
toggle state was confirmed in the TILING panel output text before
each ON/OFF leg ("chunk-build pump relocated to the frame loop" /
"chunk-build pump back inside the terrain pass"). Console errors:
0 on every audit envelope and every probe response. No Save /
Save & exit clicks, no joystick/WASD toggle, no profiler
recording; durable store counts before AND after: game_save rows
0 (loadgame save null), perf_recordings 13 (ids 1–13) — unchanged.

RESULTS (600-frame rings, native clock; DRAW = renderMs):

LEG OFF 1 (600f; 33 streaming / 567 steady): FRAME 16.70/16.80;
RENDER 1.00/3.50; WORK 1.70/5.90; ACCOUNTED 0.20/0.90; PRESENT
15.00/23.40; UNACCOUNTED 16.50/16.70; OVER50 2; CLAMPED 15;
STREAM MAX 51.90; events total 81; first blits 18 canvases, mean
0.02, p95 0.10, max 0.10 (7 frames). STREAM DRAW 1.50/15.20/56.90;
STEADY DRAW 1.00/2.70/30.20. STREAM CAT MS — terrain
0.60/14.10/54.70, entities 0.70/1.20/1.80, other 0.00/0.10/0.30.
WORST STREAM 56.9 ms: T54.7 (96% terrain — the classic pre-fix
signature).

LEG ON 1 (600f; 39/561): FRAME 16.70/33.40; RENDER 1.00/3.90;
WORK 1.90/8.20; ACCOUNTED 0.20/0.80; PRESENT 15.00/32.90;
UNACCOUNTED 16.50/33.10; OVER50 10; CLAMPED 2; STREAM MAX 28.00;
events total 102; first blits 18, mean 0.54, p95 0.60, max 9.10
(8 frames). STREAM DRAW 1.30/3.20/11.50; STEADY DRAW
1.00/3.90/51.30. STREAM CAT MS — terrain 0.20/0.30/9.20, entities
0.90/2.20/2.90, other 0.30/10.70/28.00 (STREAM MAX reappears as
CAT-other max — the expected re-attribution). WORST STREAM
11.5 ms. WORST STEADY 51.3 ms: T50.1 — a steady-frame category-
window stall on a frame where the pump does no work.

LEG OFF 2 (600f; 36/564): FRAME 16.70/33.30; RENDER 1.00/3.50;
WORK 1.80/5.50; ACCOUNTED 0.20/0.80; PRESENT 14.90/36.60;
UNACCOUNTED 16.50/33.10; OVER50 7; CLAMPED 10; STREAM MAX 17.30;
events total 95; first blits 16, mean 1.00, p95 0.10, max 15.90
(6 frames). STREAM DRAW 1.50/18.30/22.00; STEADY DRAW
1.00/2.70/49.10. STREAM CAT MS — terrain 0.40/17.40/20.90,
entities 0.70/1.60/1.80, other 0.00/0.10/0.10. WORST STREAM
22.0 ms: T20.9 (95% terrain — OFF signature reproduced
in-session, bracketing ON 1).

LEG ON 2 (600f; 34/566): FRAME 16.70/33.30; RENDER 1.00/2.90;
WORK 1.70/4.60; ACCOUNTED 0.20/0.70; PRESENT 15.00/25.60;
UNACCOUNTED 16.50/23.80; OVER50 5; CLAMPED 0; STREAM MAX 17.20;
events total 85; first blits 16, mean 0.54, p95 0.00, max 8.70
(7 frames). STREAM DRAW 0.90/2.40/10.90; STEADY DRAW
1.00/2.90/51.40. STREAM CAT MS — terrain 0.20/0.40/9.10, entities
0.70/1.90/3.00, other 0.30/11.20/17.20 (re-attribution again).
WORST STREAM 10.9 ms. WORST STEADY 51.4 ms: E51.1.

GATE (this run's FIX-IF, judged ONLY within this session; WORK
p95 reported, NOT judged): (a) STREAM DRAW p95 down ≥25% on both
ON comparisons — PASS (ON 1: 3.20 vs OFF 15.20/18.30 = −79%/−83%;
ON 2: 2.40 vs 15.20/18.30 = −84%/−87%). (b) terrain CAT MS p95
down in step — PASS (ON 1: 0.30 vs 14.10/17.40 = −98%; ON 2: 0.40
vs 14.10/17.40 = −97%/−98%). (c) ACCOUNTED p95 + RENDER p95 flat
or down vs the same-session OFF legs on BOTH comparisons — FAIL:
ON 2 passes cleanly (ACCOUNTED 0.70 vs 0.90/0.80; RENDER 2.90 vs
3.50/3.50), but ON 1 RENDER p95 is 3.90 vs 3.50 on BOTH OFF legs
(+0.40), while its ACCOUNTED p95 passes (0.80 vs 0.90/0.80).
TRACKING ANALYSIS (required by the brief): the ON 1 RENDER
elevation tracks NEITHER the toggle nor the session. Against the
toggle: ON 2, later in the same session with the toggle still ON,
came in BELOW both OFF legs (2.90 < 3.50), which a toggle-caused
RENDER increase cannot explain. Against the session: the OFF legs
bracket ON 1 at an identical 3.50 with no drift, and FRAME p50
held 16.70 and ACCOUNTED p50 0.20 on all four legs. ON 1's RENDER
p95 equals its own STEADY DRAW p95 (3.90) — the p95 was set by
steady frames, not streaming frames — and the leg contains a
51.3 ms steady frame whose terrain category window stalled to
50.1 ms on a frame class where the relocated pump performs no
work at all, so the relocation cannot mechanically produce it.
It is a single-leg p95 excursion from environmental steady-frame
stalls. But the brief's gate is absolute — flip ONLY if all three
clauses pass on BOTH comparisons — so per the gate the fix was
reverted byte-identical to e7cf9af8. Fourth consecutive run in
which (a)/(b) pass with wide margins; this time the same-session
control did its job — it isolated the (c) failure to one leg's
steady-frame RENDER p95 (+0.40 ms) instead of a whole-session
present-path offset, and ON 2 + both OFF brackets show the
relocation itself is RENDER-neutral in-session. If re-dispatched
again, the remaining question is purely the gate's tolerance for
a single-leg steady-frame p95 excursion (e.g. judging RENDER on
the streaming split, or a small explicit epsilon), not the fix.

Staged probe frames (audit dir
`audits/2026-11-06T19-41-45Z-935986522/`):
`probe-off1-driveclean-mid-drive.png`,
`probe-off1-driveclean-600f-panel.png`,
`probe-on1-driveclean-mid-drive.png` (verified visually: TILING
output reads "chunk-build pump relocated to the frame loop",
Rustbucket driving fully textured Mosslight Meadow terrain,
touch joystick + EXIT/DASH buttons, no center banner),
`probe-on1-driveclean-600f-panel.png`,
`probe-off2-driveclean-mid-drive.png`,
`probe-off2-driveclean-600f-panel.png`,
`probe-on2-driveclean-mid-drive.png` (verified visually: same
relocated-pump confirmation, fully textured streamed terrain in
rain), `probe-on2-driveclean-600f-panel.png`.

---

## 2026-11-06 12:36 PT polish run — ground row-rhythm diagnosis: lattice-downscale vs final-resample (DIAGNOSIS ONLY, no fix shipped)

SHA GATE: pre-edit App.tsx sha256 e7cf9af85567cf2e2987680673ebb533b94c2d03f543ecff8ac5a57752ba1592 — MATCHED the brief's gate, edit proceeded. Intermediate SHA after probe wiring: cac12a2cbbe31e359ee1054e125cf99176c0fab3b924cc6bd1865d5ebe85c69a. Final shipped SHA: 15b6ccacae4afe83934f16b8103fcc47a4d6c17eb159bf350405f2402ebcfd5c (adds only the audit fix below). Typecheck/build: PASS (two web_artifacts.build runs, ok). Console errors: 0 on every audit envelope and every probe response.

SHIPPED (audit-only probe wiring, all default-OFF, gated to artifact-capture.invalid OR /hatch-audit- routes, same pattern as auditBlit1To1): (1) `auditLattice1To1` flag — while true AND the single-tile clamp is active, drawTextureLattice's single-tile branch draws each variant at its native size (1024 device px) instead of the 512-device-px cell, so chunk building performs NO 2:1 downscale of the variant; multi-tile branch untouched; set via `__AWL_SET_LATTICE_1TO1__` hook (resets chunk cache) + "Lattice 1:1 on/off" panel buttons. (2) Tiling probe fifth leg per view `singleTileLattice1To1` + deltas. (3) On the single-tile feather-ON leg, two added profiles in the report: `chunkProfile` (row-profile autocorrelation computed directly on the finished ground-chunk canvas containing the staged point — post-lattice-draw, pre-blit; 640x640 device px at 1px per world unit, band lags 78–81 reported as r78–r81) and `singleTileBacking` (same profile on the raw 720x1000 backing canvas BEFORE the probe's drawImage resample to the 390x540 sample; literal r42/43/44/276 plus r at matched lags 78/80/81/511). (4) Audit fix from the first audit pass: tiling-probe control row got flex-wrap + max-width so the two new buttons (and Hide panel) stay reachable at 390px phone width (first audit flagged them clipped_off; re-audit clean, unreachable_controls mobile []). NO default changed, no texture/gameplay/HUD/audio/save-schema change, no fix for the rhythm (diagnosis-only gate).

METHOD: one fresh page session (audit dir audits/2026-11-06T20-41-44Z-862784186/), mobile 390x844 DPR 1, New Game, intro tapped through (3 cards, via the story dialog node — direct canvas-node clicks timed out the probe op twice; dialog clicks worked), tiling probe run once (10 legs, 180-frame settle/leg, chunk cache reset/leg, timeOfDay .38, clear, Frostfall overlay excluded in all legs as in the 10:34 baseline). Full report JSON: audits/2026-11-06T20-41-44Z-862784186/tiling-probe-report.json (build 21967b9eed61-20261106T204117955Z; viewport 390x844 DPR1, canvas 390x540, backing 720x1000 — confirms the brief's backing/sample geometry). No Save / Save & exit clicks, no joystick/WASD toggle clicks, no profiler recording. Durable store counts before AND after (this sandbox, via actions): game_save rows 0 (loadgame save null), perf_recordings 13 (ids 1–13) — unchanged. (The audit harness's own rendered copy showed game_save:1 from its own session; not this sandbox.)

REPRODUCTION of the 10:34 BEFORE legs: Frostfall SINGLE-TILE feather-ON r42/43/44 0.327/0.313/0.305 (BEFORE 0.346/0.333/0.327), BLIT-1:1 0.348/0.332/0.323 (BEFORE 0.349/0.333/0.324); Mosslight SINGLE-TILE 0.373/0.366/0.359 (BEFORE 0.374/0.368/0.360), BLIT-1:1 0.374/0.367/0.360 (BEFORE 0.372/0.366/0.358). Feather-OFF Frostfall r42 rose to 0.482 (08:34 direction reproduced). Variant canvases reproduced too (Frostfall matched lags 156/159/163 r −0.108/−0.127/−0.153; Mosslight −0.178/−0.174/−0.180).

ARM A flag leg (single-tile, feather ON, lattice drawn 1:1 — no 2:1 downscale):
- Frostfall center: top lag 296 r 0.446; r42 0.329, r43 0.332, r44 0.330, r276 +0.411. Deltas vs single-tile: ΔtopR −0.195, Δr42 +0.002, Δr276 +0.928. The 42–44 band is UNCHANGED when the downscale is removed.
- Mosslight center: top lag 40 r 0.785; r42 0.769, r43 0.761, r44 0.757, r276 0.055. Δr42 +0.395 — the band RISES: at native scale the view shows the variant's top-left 512px crop, whose own short-lag photo structure (variant canvas r40–44 ≈ 0.52–0.55) lands directly on the measured sample lags. A confound, but it moves the wrong way for the hypothesis; Frostfall is the clean read.
VERDICT A: lattice-draw downscale EXONERATED (fourth exoneration). If it injected the band, the 1:1 leg would collapse r42 toward the variant's negative matched-lag values at both views; it did not move at Frostfall and rose at Mosslight.

ARM A chunk-canvas profile (single-tile feather-ON leg, finished chunk, post-lattice-draw, pre-blit, pre-resample):
- Frostfall chunk 21120:4480 (640x640): top lag 40 r 0.711; r42 0.699, r43 0.697, r44 0.693; r276 0.479; BAND r78 0.641, r79 0.637, r80 0.637, r81 0.633.
- Mosslight chunk 8320:28800 (640x640): top lag 40 r 0.311; r42 0.291, r43 0.286, r44 0.280; r276 −0.373; BAND r78 0.072, r79 0.075, r80 0.076, r81 0.064.
READ: Frostfall's finished chunk already carries strong 78–81u correlation — but the chunk is a COMPOSITE (fallback lattice + region lattice via radial destination-in mask + region tint map at .45 alpha), its whole short-lag region is elevated (top at the window edge, lag 40), and the flag leg proves the lattice downscale inside it is not the injector; the chunk-level band is a composite property still to be ablated. Mosslight's anchor chunk has NO band at 78–81u (≤0.076) while its rendered frame does — for Mosslight the band appears between the anchor chunk canvas and the backing (the view spans 4 chunks; only the anchor chunk was profiled — or a per-frame pass).

ARM B final resample (raw backing 720x1000, single-tile feather-ON leg, NO probe resample):
- Frostfall: top lag (40–499 window) 40 r 0.676; literal r42 0.661, r43 0.654, r44 0.646, r276 −0.147; MATCHED lags 78/80/81/511 r 0.377/0.370/0.367/−0.528 vs downsampled sample r42/43/44 0.327/0.313/0.305.
- Mosslight: top lag 40 r 0.603; literal r42 0.591, r43 0.586, r44 0.583, r276 −0.138; MATCHED 78/80/81/511 r 0.513/0.502/0.494/−0.363 vs sample 0.373/0.366/0.359.
VERDICT B: the probe's final resample is EXONERATED (fifth exoneration) — at both views the band is present in the raw backing at the matched lags and is slightly STRONGER there than in the downsampled sample; the resample attenuates the band a little, it never injects it.

OVERALL VERDICT: NEITHER. Both remaining named inside-tile candidates are ruled out. Per the FIX-IF gate, NO fix was implemented; the planned next probe (logged for a later run, not built): (1) Mosslight — profile ALL FOUR visible chunks and add a ground-only backing capture (entities/trees/lighting suppressed by audit flags) to localize the chunk→backing segment where its band appears; (2) Frostfall — ablate the chunk composite layer by layer (fallback lattice only / region lattice only / region tint map suppressed) since the band is already in the finished chunk but is not the variant photo, not the feathered cell, and not the lattice downscale; the region tint map (GROUND_REGION_TINT_SCALE, .45 alpha) and the fallback+region composite are the untested inside-chunk candidates.

Staged probe frames (audit dir audits/2026-11-06T20-41-44Z-862784186/): observe-014.png (post-probe Mosslight staged view, TILING report in panel — verified visually: meadow terrain, road, trees, MELEE button, no center banner), act-009.png / observe-016.png (Frostfall deep center staged, panels up), act-010.png (Frostfall deep center staged, panels collapsed — verified visually: snow terrain, road, snow pines, player, joystick + DASH/MELEE, no center banner).

## 2026-11-06 13:36 PT — Pause-menu below-fold pointer-drag live measurement (diagnosis-only, no fix)

SHA gate: App.tsx pre-edit prefix 15b6ccac CONFIRMED (full pre 15b6ccacae4afe83934f…). Only change shipped: minimal audit-only probe wiring — a host-gated (artifact-capture.invalid or /hatch-audit- path) useEffect adding window.__AWL_PAUSE_DRAG_PROBE__ on F1. Each F1 press measures all .pause-overlay buttons intersecting the overlay viewport (content-space rects), scans leaf text nodes for scroll>client overflow, then dispatches ONE synthetic touch PointerEvent drag (pointerdown y=640, pointermove steps to y=340, pointerup, pointerType "touch", pointerId 9917) on the overlay so the game's OWN document pointer-drag handler performs the scroll; results render into an <output id="awl-pause-drag-audit">. Pressing F1 with no overlay open resets accumulated state (used between legs). No gameplay/HUD/audio/save-schema/default change. Post-edit App.tsx SHA 8dad962eb4716eb06bf71329a428bb341a77c417a5efd9e61099dfa0019edef0. Build (incl. strict typecheck) passed.

Method: 390x844 DPR 1 probe, fresh New Game, intro tapped through, Pause opened. Three drags per leg scrolled scrollTop 0->300->600->707 (max=707; overlay 390x540, scrollHeight 1247, clientHeight 540). Day leg at natural day; night leg via the existing Ctrl+Shift+Digit4 scene setter (NIGHT 21:36, Greyhaven) after an F1 reset. Console errors: [] on every observe in both legs.

RESULTS — identical in day and night, all 18 panel-native controls >=44px in both dimensions, OVERLAPS 0, CLIPPED 0 (both legs):
- Equip Pipe Bomb 44x44 @31,439 · Equip Molotov 44x44 @81,439 · Equip Bile Jar 44x44 @131,439
- CRAFT 3+1 72.2x44 @31,508 · CRAFT 1+2 72.2x44 @109.2,508 · CRAFT 2+1 72.2x44 @187.4,508
- Use on-screen joystick 128.1x44 @98.7,682.5 · Use WASD or arrow keys 128.1x44 @231.9,682.5
- Hardcore toggle (NEXT NEW GAME) 320x54 @35,743.5
- Blood moon every 2/3/4/5/6 nights: 58x44 @40/103/166/229/292,837
- Options 320x50 @35,970 · Resume 320x50 @35,1029 · Save 320x50 @35,1088 · Save & exit 320x50 @35,1146
(Positions are content-space: x,y relative to overlay top-left + scrollTop.)

NOT measured: overwrite-confirm dialog buttons (Cancel / Overwrite save) — the dialog only opens via the Save button, and this run's constraints forbade clicking Save / Save & exit; Overwrite save was never clicked. Joystick/WASD toggle never clicked (setting unchanged, JOYSTICK still selected in frames). No profiler recording started. Sandbox-only: durable-store counts before = after (game_save 1, perf_recordings 13; total 14).

VERDICT: PASS, no findings — the below-fold pause controls are confirmed live at >=44px with zero overlaps and zero clipped text, day and night. Nothing logged for a fix-if run. The F1 PAUSEDRAG hook stays as audit-only wiring for future runs.

Staged frames (audits/pause-drag-probe-2026-11-06/, copied from audit session audits/2026-11-06T21-44-21Z-619875180/): day-pause-top.png, day-pause-drag1-controls.png (joystick/WASD + hardcore exposed), day-pause-drag2-bloodmoon-options.png (blood-moon 2-6 + Options/Resume/Save exposed), day-pause-bottom-save-exit.png (scrollTop 707, Save & exit exposed), night-pause-top.png, night-pause-drag1-controls.png, night-pause-drag2-bloodmoon-options.png, night-pause-bottom-save-exit.png.

## 2026-11-06 14:36 PT — Chunk-localize probe: all-chunks Arm A + ground-only backing Arm B (diagnosis-only, no fix)

SHA gate: App.tsx pre-edit SHA-256 8dad962eb4716eb06bf71329a428bb341a77c417a5efd9e61099dfa0019edef0 (prefix 8dad962e) CONFIRMED before editing. Only change shipped: minimal audit-only probe wiring — (1) module flag `auditGroundOnlyBacking` (in-memory only, never persisted); while true, `drawWorld` returns immediately after `drawGroundTexture` (the ground-chunk composite), skipping atmosphere, districts, airfield/bay/pier layers, interiors, roofs, props, entities, depth items, lighting and vignettes; (2) a host-gated (artifact-capture.invalid or /hatch-audit- path) useEffect adding `__AWL_SET_GROUND_ONLY__` / `__AWL_RUN_CHUNK_LOCALIZE_PROBE__` / `__AWL_READ_CHUNK_LOCALIZE_PROBE__` / `__AWL_HIDE_CHUNK_LOCALIZE_PANEL__` plus a CHUNK LOCALIZE panel. No texture, gameplay, HUD, audio, save-schema, or default change; flag default false = exact original frame. Post-edit App.tsx SHA-256 be389f9103ddb8d7461103ac8a3806f0554fe3117ed19d63106f4af5ba4dada3. Build (incl. strict typecheck) passed. (First audit flagged the early return sitting after the atmosphere/district layers; corrected to immediately after drawGroundTexture and re-audited clean.)

Method: 390x844 DPR 1, fresh New Game, intro tapped through, probe staged Mosslight Meadow center (8600, 29000), timeOfDay .38, clear, 180-frame settle, chunk cache reset at staging, Frostfall overlay excluded (Mosslight has none). NOTE on chunk count: the live camera settled at (8258.45, 28500) — ~18px east of the nominal 8240 — so the renderer's own setGroundChunkBounds spans 3 cols x 3 rows = NINE chunks, not the four the brief expected from the nominal camera; Arm A profiled all nine (a superset of the brief's four). Console errors: [] on every observe/act.

ARM A — finished chunk canvases (640x640 @1px/u, post-lattice-draw, pre-blit), NORMAL multi-tile build:
- 7680:28160: top 499 r 0.598; r42 0.161, r43 0.172, r44 0.152; band r78–81 −0.087/−0.126/−0.114/−0.110; r276 0.129
- 8320:28160: top 499 r 0.643; r42 0.227, r43 0.213, r44 0.196; band −0.128/−0.144/−0.142/−0.153; r276 0.163
- 8960:28160: top 499 r 0.644; r42 0.212, r43 0.202, r44 0.177; band −0.090/−0.104/−0.100/−0.115; r276 0.076
- 7680:28800: top 40 r 0.479; r42 0.452, r43 0.461, r44 0.454; band 0.163/0.130/0.130/0.124; r276 −0.216
- 8320:28800 (ANCHOR): top 47 r 0.386; r42 0.369, r43 0.382, r44 0.364; band 0.215/0.197/0.186/0.175; r276 −0.189
- 8960:28800: top 286 r 0.323; r42 0.210, r43 0.207, r44 0.182; band −0.083/−0.099/−0.094/−0.112; r276 0.185
- 7680:29440: top 497 r 0.472; r42 0.207, r43 0.221, r44 0.199; band −0.025/−0.072/−0.063/−0.065; r276 0.262
- 8320:29440: top 42 r 0.556; r42 0.556, r43 0.550, r44 0.538; band 0.255/0.252/0.251/0.234; r276 −0.165
- 8960:29440: top 43 r 0.517; r42 0.515, r43 0.517, r44 0.493; band 0.266/0.256/0.262/0.243; r276 −0.018
READ: in the NORMAL build the 42–44 band is ALREADY INSIDE the finished chunk canvases — strongest in the southern row (8320:29440 r42 0.556, 8960:29440 r42 0.515) and the middle-row west/anchor chunks (7680:28800 r43 0.461; anchor 8320:28800 r43 0.382). The northern row and 8960:28800 / 7680:29440 carry no 42–44 band (tops at lag 497–499 = long-range drift; band negative). The 12:34 "anchor chunk has NO band" read was an artifact of profiling the chunk during the single-tile-clamp leg, when the chunk canvas held base fill + one raw/feather cell pair (12:34 anchor: r42 0.291, band 0.072–0.076); it does not describe the normally-built chunk.

ARM B — raw backing canvas (720x1000, NO probe resample), same staged view:
- Full backing: top 47 r 0.390; r42 0.383, r43 0.386, r44 0.382; band 0.218/0.211/0.199/0.196; r276 −0.299
- Ground-only backing: top 499 r 0.486; r42 0.365, r43 0.370, r44 0.358 (Δ −0.018/−0.017/−0.024 vs full); band 0.113/0.091/0.082/0.067; r276 −0.128 (Δ +0.171)
VERDICT B: the 42–44 band survives in the ground-only backing at ~95% strength — non-ground layers are EXONERATED as the injector (sixth exoneration). The 78–81 backing component roughly halves with non-ground layers suppressed, so part of the backing's 78–81 read is non-ground content, but the 42–44 band itself is ground.

OVERALL VERDICT: the band is injected during NORMAL ground-chunk BUILDING (inside the finished chunk canvas), not in the chunk→backing composite and not by non-ground layers. The brief's hypothesis segments (other-chunks / composite / non-ground) are resolved: other chunks DO carry it (and so does the anchor under normal build); composite and non-ground layers do not inject the 42–44 band. Per the FIX-IF gate, NO fix was implemented. Planned next probe for a later run (not built): ablate the normal chunk build phase-by-phase at the strongest chunk (8320:29440) — snapshot/profile the chunk canvas after base lattice, after regions (region tint map, GROUND_REGION_TINT_SCALE at .45 alpha), and after special/road phases — and profile a pure multi-tile lattice composite of the Mosslight variant (no tint, no feather) to separate the multi-tile lattice repetition (512u stride, feather cells at half-stride offset) from the region tint map; those are the two untested inside-build candidates.

Sandbox-only: no Save / Save & exit clicked, joystick/WASD toggle never clicked (joystick still shown in frames), no profiler recording started. A session loot-choice card (Briar Mantle) that the staged session dealt was taken once to dismiss the modal so the Arm B visual frame could be captured; sandbox session only. Durable-store counts before = after (game_save 1, perf_recordings 13; total 14 — audit scope line, both audits; action reads identical: 13 recordings ids 1–13).

Staged probe frames (audits/chunk-localize-probe-2026-11-06/, copied from audit session audits/2026-11-06T22-48-03Z-635837102/, full JSON in chunk-localize-report.json): post-probe-report-panel.png (CHUNK LOCALIZE report JSON in panel over the staged view), mosslight-ground-only.png (Arm B visual: same staged Mosslight view with only the ground composite — grass + road, no trees/player/props), mosslight-full-restored.png (same view after Ground only off — trees, player, loot marker restored; joystick + DASH/MELEE, no center banner).
