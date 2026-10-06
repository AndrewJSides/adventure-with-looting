# Data Plan

## Context provenance
- “Would you be able to build a mobile game that’s fully playable within this app?” (prior user statement; establishes touch-first, self-contained play)
- “Adventure with looting” (prior user statement; establishes theme and reward loop)
- “Top-down action roguelite — touch joystick, auto-attacks, monster rooms, treasure chests, gear upgrades, and a boss.” (assistant proposal explicitly accepted by the user’s reply “1”; defines the game format and required systems)

## Tested sources
- The player supplied this top-down truck sprite sheet as visual-shape reference: https://cdn.masto.host/mastodongamedevplace/media_attachments/files/116/835/268/672/487/897/original/f120bac2fe1a5507.png
- No factual game content is imported from external sources; the world, enemies, and landmarks remain original.

## Imagery
The supplied truck sheet informs only the high-level silhouette cues (separate bed, cab, hood, and protruding corner wheels). No external pixels are copied: the vehicles, world map, characters, enemies, chests, and loot remain original procedural canvas/SVG/CSS graphics.

## Long-term data behavior
- **Refresh policy**: No external refresh; a run plays entirely in the client and save snapshots are persisted through typed artifact actions.
- **Growth**: A single durable save record is updated at room clears and meaningful loot/progression events; it does not accumulate unbounded history.
- **Ordering**: Loot choices are shown by rarity, then power; the equipped item remains visually primary.
- **Time semantics**: No real-world time dependency; creation/update timestamps are metadata only.

## Rejected approaches
- **Tried**: Turn-based dungeon crawler or side-scrolling platformer.
  **Why rejected**: The user explicitly chose option 1, the top-down action roguelite.
- **Tried**: External art or real-world imagery.
  **Why rejected**: The game’s original abstract fantasy visuals are better rendered deterministically in the canvas and require no factual subjects or external provenance.
