# Adventure with Looting

Open-world zombie survival roguelite built with Muse.

Top-down action: explore huge biomes, fight zombie hordes, loot buildings and chests,
defeat scattered bosses for unique relics, drive vehicles, and follow quest lines.
Mobile-first touch controls (joystick, tap-to-shoot, slash attack).

## Roadmap
Vehicles → pet dog → machine guns → melee weapons → bases → dungeons → key-locked chests → cities.

## Stack
- Client: TypeScript + Vite-style build (`client/`)
- Server: TypeScript actions + SQLite via Drizzle (`server/`, `drizzle/`)
- Runtime: Bun

## Dev
```sh
bun install
# client
cd client && bun run build
# server
cd server
```

## Notes
- `app.db*` (save data) is intentionally not committed.
- This repo is a snapshot of the game as built in Muse; hourly iterations continue to land.
