// Shared shapes for NPC writing.
//
// NpcProfile is deliberately identical to the value type of NPC_DIALOGUE in
// App.tsx, so any entry here can be dropped into that table unchanged.

export type VoiceKind = "greeting" | "idle" | "farewell" | "hint" | "wounded" | "reaction";

export type NpcProfile = {
  /** [0] answers "Who were you before?", [1] answers "What happened next?". */
  history: [string, string];
  /** Answers "What have you seen out there?" / "What keeps you going?". */
  world: string;
  /** One-line, third-person description of what this person is for. Shown in UI. */
  detail: string;
  /**
   * greeting: on approach. idle: "How are things here?". farewell: on leaving.
   * hint: "Any advice?" -- these must be TRUE about the game, players act on them.
   * wounded: when the player is badly hurt. reaction: after a trade or a job done.
   */
  voices: Record<VoiceKind, string[]>;
};

/** Where someone can be seeded. "road" means any wayfire or camp. */
export type Settlement =
  | "hearthglen"
  | "greyhaven"
  | "old-greyhaven"
  | "ashwatch"
  | "rimewatch"
  | "blackwater"
  | "road";

/** Coarse archetype, so a populator can balance a town (one healer, not five). */
export type RosterRole =
  | "resident" | "guard" | "scout" | "trader" | "healer" | "smith" | "cook"
  | "farmer" | "hunter" | "scavenger" | "storyteller" | "courier" | "tinker"
  | "official" | "child" | "wanderer" | "faith" | "entertainer";

/** Same four fields the Npc type uses to draw a person. */
export type NpcLook = { color: string; accent: string; skin: string; hair: string };

/** Every character is clearly one or the other: in the writing, the portrait and the sprite. */
export type Gender = "male" | "female";

export type RosterNpc = NpcProfile & {
  /** Stable kebab-case id. Never collides with a cast NpcId. */
  id: string;
  name: string;
  /** Same style as Npc.title, e.g. "Greyhaven lamplighter". */
  title: string;
  home: Settlement;
  /** Other settlements where this person still makes sense. */
  alsoFits?: Settlement[];
  role: RosterRole;
  gender: Gender;
  look: NpcLook;
  /**
   * Art direction for a portrait in the existing painted style. Always opens
   * with man/woman/boy/girl. Use portraitPrompt() to get the full prompt.
   */
  portrait: string;
  /**
   * Ids (cast or roster) this person's lines lean on. A populator can seed
   * tied people together; every line is still written to read correctly if
   * the other person is absent.
   */
  ties: string[];
  /** Never spoken. A hook for a future quest or reveal. */
  secret: string;
};

// A small, muted palette. The cast's own colours are all earth tones
// (#565044, #39483a, #815642 ...); keeping new people inside the same family
// stops a randomly populated town from looking like a paint box.
const CLOTH = {
  moss: "#39483a", slate: "#4a4d52", rust: "#815642", umber: "#565044",
  ochre: "#7b6541", steel: "#586879", wine: "#5c3a3f", pine: "#2f4a44",
  clay: "#8a5a44", dusk: "#4b4660", wheat: "#8c7a52", char: "#34322f",
  teal: "#3f5f63", plum: "#59435a", sand: "#9a8a6e", navy: "#34425a",
} as const;
const ACCENT = {
  brass: "#d8b765", bone: "#d9cfb8", ember: "#d9904b", sage: "#78876a",
  sky: "#8fb3c4", rose: "#c98a8a", cream: "#e3d5b0", copper: "#c8a477",
  ash: "#a69a7d", frost: "#b9d6dd", red: "#b5533f", lichen: "#9fae7a",
} as const;
const SKIN = {
  s1: "#e0b99b", s2: "#d09a75", s3: "#c99173", s4: "#bd805e",
  s5: "#a66f59", s6: "#8c5d49", s7: "#6f4a3a", s8: "#55382c",
} as const;
const HAIR = {
  black: "#201d1b", dark: "#2c211c", brown: "#513629", auburn: "#713923",
  red: "#8a3b22", blond: "#b79a62", grey: "#5f5b58", silver: "#c7c0b2",
  white: "#e2ddd2",
} as const;

export const look = (
  cloth: keyof typeof CLOTH,
  accent: keyof typeof ACCENT,
  skin: keyof typeof SKIN,
  hair: keyof typeof HAIR,
): NpcLook => ({ color: CLOTH[cloth], accent: ACCENT[accent], skin: SKIN[skin], hair: HAIR[hair] });
