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
