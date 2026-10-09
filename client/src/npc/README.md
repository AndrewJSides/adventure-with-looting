# NPC writing

Everything people say, plus a bench of 100 new people who are written but not in the game yet.

| File | What it is | In the game? |
| --- | --- | --- |
| `cast.ts` | Dialogue for all 31 current NPCs. `App.tsx` reads `NPC_DIALOGUE` from here. | **Yes** |
| `look.ts` | How each cast member is drawn in the world: clearly a man or a woman (build, hair, beard, face). `drawNpc` calls it. | **Yes** |
| `roster-*.ts` | 100 new NPCs: backstory, six voice pools, a secret, portrait notes, ties. | No |
| `index.ts` | Combines the rosters; `pickResidents()` to populate towns; `portraitPrompt()`. | No |
| `types.ts` | Shared shapes. | — |

`App.tsx` imports `cast.ts` and `look.ts` directly, never `index.ts`, so the roster adds nothing to the game bundle until someone uses it.

## Editing dialogue

Edit `cast.ts`, not `App.tsx`. `NPC_DIALOGUE` is typed against `NpcId`, so adding an NPC to the game without writing their lines fails `bun run typecheck`. A new NPC also needs an entry in `CAST_LOOK` in `look.ts`.

House rules (enforced by the checker below):

- No contractions. Everyone says "do not", "I am". Possessives are fine.
- **Hints must be true.** Players act on them. Every hint was checked against the game code on 2026-10-09; the game changes hourly, so re-check a hint before relying on it.
- Lines are short: voice lines ≤110 characters, history ≤215, world ≤200.
- At least 4 greetings and 3 of every other voice per cast member.
- Cast lines never name anyone from the roster (the roster is not in the game).

## Everyone is clearly a man or a woman

- Cast: `CAST_LOOK` in `look.ts` (16 women, 15 men). Women get longer or styled hair, no beard, a narrower build and a fitted coat; men get broader shoulders, brows and (most of them) beards or stubble. Before this, every NPC without a hand-drawn hairdo was drawn with a chin beard, women included.
- Roster: every entry has `gender`, and every portrait note says man, woman, boy or girl. `portraitPrompt(npc)` appends an explicit "unmistakably a man / woman" cue so a generator cannot drift.
- Calls made where the old art was ambiguous: **Lark** is a young man, **Patch Merrin** is a woman, **Tide Runner Sel** is a woman (the game now uses Muse's feminine alternate portrait), **The Veiled One** is a woman (the game's own chapter IV text makes her Nera Rusk).

## Using the roster

```ts
import { pickResidents, portraitPrompt, rosterFor } from "./npc";

// Any number that stays fixed for a save. Same seed -> same neighbours, every time.
const people = pickResidents(42, "greyhaven", 8);
// Zhenya Kolt, Clem Adair, Odalys Finch, Billie Nwosu, Sergeant Inga Varga, Frida Hart, ...

rosterFor("rimewatch");          // everyone who could live there, natives first
portraitPrompt(people[0]);       // full prompt for the portrait generator
```

`pickResidents` prefers natives, pulls in people tied to whoever was picked (so a line about a neighbour usually has the neighbour), and allows at most one child per two adults. Every line still reads correctly if the tied person is absent.

Each roster person has:

- `history`, `world`, `detail`, `voices` — same shape as cast dialogue, so an entry can be dropped into `NPC_DIALOGUE` unchanged.
- `home`, `alsoFits`, `role` (one of 18 archetypes, so a town gets one healer, not five), `gender`, `look` (muted palette that matches the cast).
- `ties` — ids of cast or roster people their lines lean on.
- `secret` — never spoken. A quest hook.
- `portrait` — art direction.

## Canon the writing assumes

Each is a line or two to undo if you disagree.

- **Two Tomases.** Mara's husband Tomas held Hearthglen's south gate the first night and died. Tomas Reed the gardener drew the long straw and lived. Not related.
- Juno Reed is Tomas Reed's niece; her brother is Wes (roster). Tamsin Vale and Father Vale are siblings.
- Elowen's family died at the east gate, the one Captain Rusk sealed.
- The Veiled One is only foreshadowed (doors, gates). The reveal stays in chapter IV.
- Roster only: the fall was **four years ago** (the game itself just says "years ago").

Threads the secrets keep returning to, for whoever writes quests next: a pulse **nineteen minutes** apart (hordes, bells, fireflies), **spirals** under places that matter, **Greyhaven Civic Works** and who profited, what happened to **Nera Rusk**, and Gloomfang being Frida Hart's dog, Button.

## Checking

```
bun scripts/check-npcs.ts
```

Checks pool sizes, line lengths, contractions (straight or curly apostrophes), duplicate lines across all 131 people, ids and name collisions (including cast surnames), that ties resolve and that naming someone requires a tie, that live cast lines never name roster people, that `detail` matches any inline table left in `App.tsx`, that everyone has a gender and a portrait note that agrees with it, and that `pickResidents` is deterministic.
