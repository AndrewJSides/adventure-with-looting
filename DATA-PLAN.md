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
