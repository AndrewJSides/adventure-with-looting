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

## Still outstanding
- **Dungeons** (#6) and **building interiors** (#9) — the two big unshipped items.
- **Deeper storyline** (#14) — needs a dedicated pass now that NPCs are in.
- Perf: kill-then-drive lag under active investigation (respawn-scan fix merged via PR #1; minimal-mode strip-back HUD live for A/B testing).

## Already shipped (context)
- 11+ biomes, ~16× world scale, zombie enemies with biome variants, elites, named bosses with unique relic drops
- Inventory grid with icons, trinket slot, player house + storage trunk (village spawn)
- Campfire/wayfire fast travel, minimap with fog of war, terrain blending, region labels
- Mobile-first touch controls (joystick, tap-to-shoot, slash attack); Glock is semi-auto (one tap = one shot)
- SDK vendored (`vendor/space-sdk.tgz`) so the repo installs on any machine
