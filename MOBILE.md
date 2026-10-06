# Adventure with Looting — iOS app via Capacitor

The game is a web app; this wraps it in a native iOS shell using
[Capacitor](https://capacitorjs.com). Touch controls carry over as-is.

## What's here
- `capacitor.config.ts` — app id `com.andrewsides.adventurewithlooting`, web dir `client/dist`
- `ios/` — native Xcode project (generated with `npx cap add ios`)

## Prereqs
- Mac with Xcode installed
- Node 20+ (and/or Bun)
- Apple Developer Program membership ($99/yr) for TestFlight / App Store

## Build & run
```sh
# 1. install deps
bun install            # game deps
npm i                  # capacitor deps (package.json at root)

# 2. build the web client
bun run build:client   # outputs client/dist

# 3. sync into the native project
npx cap sync ios

# 4. open in Xcode
npx cap open ios
```
In Xcode: pick your team, bump the version, run on a device or archive for TestFlight.

## Backend decision (open)
The game currently saves through its hosted server (`server/src/actions.ts`
POSTed to `./actions`). For the App Store build, pick one:
- **A — host the server**: deploy `server/` (Bun + SQLite) somewhere cheap and
  point the app's API base URL at it. Keeps cross-device saves.
- **B — local saves**: replace the API client with a localStorage/SQLite
  (via `@capacitor/preferences` or `@capacitor-community/sqlite`) implementation.
  Fully offline, no server to run.

Until this is decided, the wrapped app expects the `./actions` endpoint to exist.

## Release flow
Hourly web iterations continue on the web build. Cut App Store releases from a
snapshot: build, sync, archive in Xcode, upload to TestFlight, then submit for
App Store review when it feels ready.
