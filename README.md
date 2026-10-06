# Adventure with Looting

Open-world zombie survival roguelite (Surroundead-inspired), built with Muse.

Top-down action: explore huge biomes, fight zombie hordes, loot buildings and chests,
defeat scattered bosses for unique relics, drive vehicles, and follow quest lines.
Mobile-first touch controls (joystick, tap-to-shoot, slash attack).

## Roadmap
See `roadmap.md`. Vehicles → pet dog → machine guns → melee weapons → bases →
dungeons → key-locked chests → cities → day/night → flashlights → zombie SFX →
more NPCs → deeper storyline.

## iOS app
See `MOBILE.md` — Capacitor wrapper for the App Store.

## Stack
- Client: TypeScript + Vite-style build (`client/`)
- Server: TypeScript actions + SQLite via Drizzle (`server/`, `drizzle/`)
- Runtime: Bun

## Dev
```sh
bun install
bun run build:client   # outputs client/dist
```

## Notes
- `app.db*` (save data) is intentionally not committed.
- Snapshots land automatically; hourly web iterations continue.
