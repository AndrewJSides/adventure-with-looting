# Adventure with Looting — Roadmap

Set by Andrew, Oct 5, 2026. Vision: like **Surroundead** (Steam indie) — open world with zombies, looting buildings, bosses scattered about, traveling around finding rare loot.

## Roadmap status (updated Oct 6, 2026)
1. **Vehicles** — ✅ SHIPPED. Bronco/Mustang/Harley, 5x fuel, buildings-only, distinct sounds, drive prompt, headlights (driving only), no combat while driving, Mustang needs key. New games start with the Harley only; Rustbucket/Bronco are world discoveries.
2. **Pet dog** — ✅ SHIPPED. Companion dog that follows, fights, levels up.
3. **Machine guns** — ✅ SHIPPED. Rust SMG, Scavenger LMG, Warlord's Minigun (spin-up), hold-to-fire.
4. **Swords and other melee weapons** — ✅ SHIPPED. Rusty Machete, Firefighter's Axe, Katana (crit), Wraithbane Greatsword (lifesteal). Point-blank melee hits all around.
5. **Bases** — ✅ SHIPPED. 3 claimable outposts (Ember Wastes, Frostfall Peaks, Gloam Mire): banner claims, shared storage, campfires, buildable upgrades, zombie raids.
6. **Dungeons** — ❌ NOT SHIPPED. Four attempts superseded by build collisions; needs a sustained quiet window.
7. **Key-locked chests** — ✅ SHIPPED. Iron/Gold/Ancient keys, six world chests.
8. **Expansive cities** — ✅ SHIPPED. Greyhaven (inhabited) and Old Greyhaven (abandoned).
9. **Building interiors** — ❌ NOT SHIPPED. Roofs fade to ~10% opacity concept pending.
10. **Day/night cycle** — ✅ SHIPPED. 8-minute cycle, clock HUD, reduced night visibility, stronger night zombies. (Lighting perf fixed: pre-rendered masks, no per-frame gradients.)
11. **Flashlights** — ✅ SHIPPED. Lootable Basic Flashlight + rare Lantern Rig; tap-to-toggle night cone, slows/reveals zombies.
12. **Zombie sound effects** — ✅ SHIPPED. Web Audio: groans, snarls, yelps, gurgles, boss roars, night drone, loot chimes. HUD mute toggle.
13. **Way more NPCs and dialogue** — ✅ SHIPPED. Hearthglen villagers, Sable quest line, Maro's shop, Greyhaven (Cora/Ilyan/Patch/Edda), Old Greyhaven (Alden Cross/Nia Mercer), Lio (Ember Wastes), Suri (Frostfall), Veiled figure. Branching dialogue, quest chains, HUD tracking.
14. **Deeper storyline** — 🔶 PARTIAL. Cross-NPC quest chains (Ember Crystal → Bound Ember Core → Wayfarer's Ember Charm), Veiled figure mystery hook. Needs a dedicated story pass.

## Zombie trope backlog (from the classics) — added Oct 6, 2026
Tropes to work through, sourced from famous zombie movies and games:
- **Noise draws hordes** (Project Zomboid, TWD) — gunfire/chainsaws attract zombies; stealth vs loud playstyle tradeoff
- **Headshots matter** (most) — headshot crit multiplier on all ranged
- **Barricading** (CoD Zombies, TWD) — board up windows/doors of safehouses with planks
- **Horde nights / blood moon** (7 Days to Die, Dying Light) — periodic massive night assaults on your position
- **Special infected roster** (Left 4 Dead) — Tank, Witch (don't startle her), Boomer (bile blinds/attracts), Smoker, Hunter; some already covered (brute/charger/spitter)
- **Throwables** (L4D, Dead Rising) — pipe bombs, molotov cocktails, bile jars
- **Makeshift weapon combining** (Dead Rising) — combine two items into combo weapons at workbenches
- **UV light burns zombies** (Dying Light) — flashlight upgrade that damages volatiles
- **Night volatiles** (Dying Light) — apex predators that only hunt at night
- **Safehouse power: fuel the generator** (State of Decay) — keep generators fueled for lights/crafting
- **Infection & cure** (28 Days Later, RE) — infection meter from bites, antibiotics/herbs to cure
- **Zombie animals** (Resident Evil) — zombie dogs, crows
- **The mall** (Dawn of the Dead, Dead Rising) — big lootable shopping mall location
- **Hospital/lab dungeon** (Resident Evil) — ties into unshipped dungeons #6
- **Sewers/underground** (many) — tunnel network region
- **Weapon upgrading: Pack-a-Punch style** (CoD Zombies) — Cora the blacksmith already exists; add a machine/ritual to supercharge weapons
- **Perks** (CoD Zombies) — drinkable/craftable perk buffs (speed, revive, armor)
- **Mystery box** (CoD Zombies) — random-weapon box with box-move events
- **Wave defense mode** (CoD Zombies) — standalone holdout mode at outposts
- **Zombieland rules as flavor** — "Cardio", "Double tap" as loading-screen tips / NPC banter
- **Crossbow** (TWD) — silent, retrievable bolts
- **Farmhouse start homage** (Night of the Living Dead) — maybe a new-game-origin vignette
- **Permadeath / hardcore mode** — optional

## Still outstanding
- **Dungeons** (#6) and **building interiors** (#9) — the two big unshipped items.
- **Deeper storyline** (#14) — needs a dedicated pass now that NPCs are in.
- Perf: kill-then-drive lag under active investigation. Landed so far: night-lighting pre-rendered masks; PR #1 (respawn-scan O(timers×enemies) → O(timers+enemies), served timers dropped); PR #2 (restored draw-call chunk-build throttle that PR #1 accidentally disabled, fixed terrain-chunk eviction thrash, 1.25-chunk lookahead, worst-frame peak profiler). Vehicles TEMPORARILY DISABLED (kill-switch in perf HUD, owned vehicles preserved) as a diagnostic — re-enable after lag is resolved. Minimal-mode strip-back + effect kill-switches live in perf HUD for A/B testing.

## Already shipped (context)
- 11+ biomes, ~16× world scale, zombie enemies with biome variants, elites, named bosses with unique relic drops
- Inventory grid with icons, trinket slot, player house + storage trunk (village spawn); house interior expanded to 520×420
- Campfire/wayfire fast travel, minimap with fog of war, terrain blending, region labels
- Mobile-first touch controls (joystick, tap-to-shoot, slash attack); Glock is semi-auto (one tap = one shot)
- NPCs defend themselves: melee swing (10 dmg/sec, knockback, hit FX) when zombies close in; all NPCs have realistic portraits
- SDK vendored (`vendor/space-sdk.tgz`) so the repo installs on any machine
