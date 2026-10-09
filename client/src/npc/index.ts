// NPC writing: the rewritten cast, and a roster of people to populate towns.
//
// Nothing in the roster is in the game yet. See README.md in this folder.

import { GREYHAVEN_ROSTER } from "./roster-greyhaven";
import { HEARTHGLEN_ROSTER } from "./roster-hearthglen";
import { OLD_GREYHAVEN_ROSTER } from "./roster-old-greyhaven";
import { OUTPOST_ROSTER } from "./roster-outposts";
import { ROAD_ROSTER } from "./roster-road";
import type { Gender, RosterNpc, Settlement } from "./types";

export { CAST_DIALOGUE, type CastNpcId } from "./cast";
export { CAST_LOOK } from "./look";
export type { Gender, NpcLook, NpcProfile, RosterNpc, RosterRole, Settlement, VoiceKind } from "./types";

export const NPC_ROSTER: RosterNpc[] = [
  ...HEARTHGLEN_ROSTER,
  ...GREYHAVEN_ROSTER,
  ...OLD_GREYHAVEN_ROSTER,
  ...OUTPOST_ROSTER,
  ...ROAD_ROSTER,
];

const ROSTER_BY_ID = new Map(NPC_ROSTER.map((npc) => [npc.id, npc]));
export const rosterNpcById = (id: string): RosterNpc | undefined => ROSTER_BY_ID.get(id);

// Portraits are generated, so the gender cue is spelled out every time instead
// of trusting the generator to infer it. No androgynous results.
const PORTRAIT_STYLE =
  "Painted head-and-shoulders portrait, post-apocalyptic survivor, worn practical clothes, " +
  "moody natural light, same painterly style as the existing cast portraits, no text.";
const GENDER_CUE: Record<Gender, { adult: string; young: string }> = {
  male: {
    adult: "Unmistakably a man: masculine jaw, brow and neck, short hair or facial hair as described.",
    young: "Unmistakably a boy.",
  },
  female: {
    adult: "Unmistakably a woman: feminine face and features, longer or styled hair as described.",
    young: "Unmistakably a girl.",
  },
};

/** The full prompt to hand an image generator for this person's portrait. */
export function portraitPrompt(npc: RosterNpc): string {
  const young = /\b(boy|girl)\b/i.test(npc.portrait);
  return `${npc.portrait} ${GENDER_CUE[npc.gender][young ? "young" : "adult"]} ${PORTRAIT_STYLE}`;
}

/** Everyone who can plausibly live in a settlement, natives first. */
export function rosterFor(settlement: Settlement): RosterNpc[] {
  const natives = NPC_ROSTER.filter((npc) => npc.home === settlement);
  const visitors = NPC_ROSTER.filter((npc) => npc.home !== settlement && npc.alsoFits?.includes(settlement));
  return [...natives, ...visitors];
}

// mulberry32: tiny, fast, and good enough to shuffle a town. Deterministic, so
// the same save seed always produces the same neighbours.
function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSettlement(settlement: Settlement): number {
  let hash = 2166136261;
  for (let index = 0; index < settlement.length; index += 1) {
    hash = Math.imul(hash ^ settlement.charCodeAt(index), 16777619);
  }
  return hash >>> 0;
}

/**
 * Choose `count` residents for a settlement from a save's seed.
 *
 * - Deterministic: the same (seed, settlement, count) always returns the same people.
 * - Natives are preferred over people who merely fit.
 * - When someone is chosen, the people they are tied to in the same settlement
 *   are pulled in next, so a line about a neighbour usually has a neighbour to
 *   be about. Lines are written to survive the other person being absent, so
 *   this is a nicety, not a requirement.
 * - At most one child per two adults, so a small pick is never all children.
 */
export function pickResidents(seed: number, settlement: Settlement, count: number): RosterNpc[] {
  const random = seededRandom(seed ^ hashSettlement(settlement));
  const shuffle = <T>(items: T[]): T[] => {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(random() * (index + 1));
      const held = copy[index] as T;
      copy[index] = copy[swap] as T;
      copy[swap] = held;
    }
    return copy;
  };
  const natives = shuffle(NPC_ROSTER.filter((npc) => npc.home === settlement));
  const visitors = shuffle(NPC_ROSTER.filter((npc) => npc.home !== settlement && npc.alsoFits?.includes(settlement)));
  const pool = [...natives, ...visitors];
  const eligible = new Set(pool.map((npc) => npc.id));
  const chosen: RosterNpc[] = [];
  const taken = new Set<string>();
  let children = 0;

  const take = (npc: RosterNpc): boolean => {
    if (chosen.length >= count || taken.has(npc.id)) return false;
    if (npc.role === "child" && children * 2 >= chosen.length - children) return false;
    chosen.push(npc);
    taken.add(npc.id);
    if (npc.role === "child") children += 1;
    return true;
  };

  for (const npc of pool) {
    if (chosen.length >= count) break;
    if (!take(npc)) continue;
    for (const tie of npc.ties) {
      const neighbour = ROSTER_BY_ID.get(tie);
      if (neighbour && eligible.has(neighbour.id)) take(neighbour);
    }
  }
  return chosen;
}
