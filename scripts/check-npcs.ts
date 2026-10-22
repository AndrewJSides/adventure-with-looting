#!/usr/bin/env bun
// Lints the NPC writing in client/src/npc. Run:  bun scripts/check-npcs.ts
//
// These are the rules the existing cast already follows, made checkable so
// that adding the 101st person does not quietly break the register.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CAST_DIALOGUE, CAST_LOOK, NPC_ROSTER, pickResidents, portraitPrompt, rosterFor } from "../client/src/npc/index";
import type { NpcProfile, Settlement, VoiceKind } from "../client/src/npc/index";

const ROOT = join(import.meta.dirname, "..");
const KINDS: VoiceKind[] = ["greeting", "idle", "farewell", "hint", "wounded", "reaction"];
const CAST_MIN: Record<VoiceKind, number> = { greeting: 4, idle: 3, farewell: 3, hint: 3, wounded: 3, reaction: 3 };
const ROSTER_MIN: Record<VoiceKind, number> = { greeting: 3, idle: 2, farewell: 2, hint: 2, wounded: 2, reaction: 2 };
// Caps sit just above the longest lines Muse has shipped (Mira's and Dr. Hale's run longest).
const MAX = { voice: 110, history: 215, world: 200, detail: 115 };
const EXPECTED_ROSTER = Number(process.env.NPC_EXPECT ?? 100);

const problems: string[] = [];
const warn: string[] = [];
const fail = (who: string, message: string) => problems.push(`${who}: ${message}`);

// The cast speaks without contractions ("do not", "I am"). Possessives are fine.
// Muse writes curly apostrophes, so both kinds count.
const CONTRACTION = /\b\w+n['’]t\b|\b\w+['’](?:m|re|ve|ll|d)\b|\b(?:it|that|there|here|what|who|he|she|let|how|where)['’]s\b/i;

const allLines = new Map<string, string>();
function checkText(who: string, field: string, text: string, max: number) {
  if (text.length > max) fail(who, `${field} is ${text.length} chars (max ${max}): "${text}"`);
  if (text.includes('"')) fail(who, `${field} contains a double quote`);
  if (text !== text.trim() || /\s{2,}/.test(text)) fail(who, `${field} has stray whitespace`);
  const hit = CONTRACTION.exec(text);
  if (hit) fail(who, `${field} uses a contraction "${hit[0]}": "${text}"`);
  const key = text.toLowerCase();
  const prior = allLines.get(key);
  if (prior && prior !== who) fail(who, `${field} duplicates a line of ${prior}: "${text}"`);
  allLines.set(key, who);
}

function checkProfile(who: string, profile: NpcProfile, minimum: Record<VoiceKind, number>) {
  checkText(who, "history[0]", profile.history[0], MAX.history);
  checkText(who, "history[1]", profile.history[1], MAX.history);
  checkText(who, "world", profile.world, MAX.world);
  if (profile.detail.length > MAX.detail) fail(who, `detail is ${profile.detail.length} chars (max ${MAX.detail})`);
  for (const kind of KINDS) {
    const lines = profile.voices[kind];
    if (lines.length < minimum[kind]) fail(who, `${kind} has ${lines.length} lines (min ${minimum[kind]})`);
    lines.forEach((line, index) => checkText(who, `${kind}[${index}]`, line, MAX.voice));
  }
}

// ---- cast ----------------------------------------------------------------
const castIds = Object.keys(CAST_DIALOGUE);
for (const id of castIds) checkProfile(id, CAST_DIALOGUE[id as keyof typeof CAST_DIALOGUE], CAST_MIN);

// `detail` is functional UI text; it must match what App.tsx ships exactly.
const app = readFileSync(join(ROOT, "client/src/App.tsx"), "utf8");
// Only an inline object literal counts. After the table moved to cast.ts the
// declaration is a one-line alias, and there is nothing inline to compare.
const inlineTable = /NPC_DIALOGUE: Record<NpcId[^\n]*= \{\n/.exec(app);
const live = inlineTable ? app.slice(inlineTable.index, app.indexOf("\n};", inlineTable.index)) : "";
for (const id of castIds) {
  // Once the table has moved into cast.ts there is no inline copy left to compare
  // against; cast.ts is then the source of truth and this check has nothing to do.
  if (!live) break;
  const match = new RegExp(`\\n  ${id}:\\{history:.*?,detail:"((?:[^"\\\\]|\\\\.)*)"`, "s").exec(live);
  if (!match) { warn.push(`${id}: could not find the live detail string to compare`); continue; }
  const mine = CAST_DIALOGUE[id as keyof typeof CAST_DIALOGUE].detail;
  if (match[1] !== mine) fail(id, `detail differs from App.tsx: "${match[1]}" vs "${mine}"`);
}

// ---- roster --------------------------------------------------------------
const firstName = (name: string) => name.replace(/^(?:Sergeant|Captain|Councilor|Mother|Mama|Sister|Brother|Father|Dr\.|Old) /, "").split(" ")[0] ?? name;
const castNames = ["Mara", "Maro", "Elowen", "Orin", "Kael", "Sable", "Rowan", "Tamsin", "Juno", "Vale", "Bria", "Tomas", "Rook", "Ysra", "Fen", "Lark", "Alden", "Nia", "Cora", "Ilyan", "Patch", "Edda", "Lio", "Suri", "Nera", "Rusk", "Marsh", "Cobb", "Sel", "Mira", "Imogen", "Hale"];
// Surnames already taken by the cast; a roster person sharing one reads as family.
const castSurnames = ["Vale", "Reed", "Stone", "Ash", "Pike", "Hollow", "Cross", "Mercer", "Flint", "Voss", "Merrin", "Marr", "Venn", "Kest", "Holt", "Hale", "Rusk"];

// ---- gender: nobody in between --------------------------------------------
for (const id of castIds) {
  if (!CAST_LOOK[id as keyof typeof CAST_LOOK]) fail(id, "has no entry in CAST_LOOK (look.ts)");
}
for (const npc of NPC_ROSTER) {
  if (npc.gender !== "male" && npc.gender !== "female") fail(npc.id, `gender is "${String(npc.gender)}"`);
  const says = npc.gender === "female" ? /\b(woman|girl)\b/i : /\b(man|boy)\b/i;
  const contradicts = npc.gender === "female" ? /\b(man|boy|his|him)\b/i : /\b(woman|girl|her|hers)\b/i;
  if (!says.test(npc.portrait)) fail(npc.id, `portrait note does not say ${npc.gender === "female" ? "woman/girl" : "man/boy"}`);
  if (contradicts.test(npc.portrait)) fail(npc.id, `portrait note contradicts gender: "${npc.portrait}"`);
  if (/\b(their|they|them|themselves)\b/i.test(npc.portrait)) fail(npc.id, "portrait note is gender-neutral");
  if (!portraitPrompt(npc).includes("Unmistakably")) fail(npc.id, "portraitPrompt is missing its gender cue");
}
const ids = new Set<string>();
const names = new Set<string>();
const firsts = new Map<string, string>();
for (const npc of NPC_ROSTER) {
  if (!/^[a-z]+(?:-[a-z]+)*$/.test(npc.id)) fail(npc.id, "id is not kebab-case");
  if (ids.has(npc.id) || castIds.includes(npc.id)) fail(npc.id, "id is not unique");
  ids.add(npc.id);
  if (names.has(npc.name)) fail(npc.id, `name "${npc.name}" is not unique`);
  names.add(npc.name);
  const first = firstName(npc.name);
  if (castNames.includes(first)) fail(npc.id, `first name "${first}" collides with the cast`);
  const last = npc.name.split(" ").slice(1).pop();
  if (last && castSurnames.includes(last) && !npc.ties.some((tie) => castIds.includes(tie))) fail(npc.id, `surname "${last}" is a cast surname but no cast tie explains it`);
  if (firsts.has(first)) fail(npc.id, `first name "${first}" also used by ${firsts.get(first)}`);
  firsts.set(first, npc.id);
  checkProfile(npc.id, npc, ROSTER_MIN);
  if (!npc.secret.trim()) fail(npc.id, "secret is empty");
  if (!npc.portrait.trim()) fail(npc.id, "portrait is empty");
}
for (const npc of NPC_ROSTER) {
  for (const tie of npc.ties) if (!ids.has(tie) && !castIds.includes(tie)) fail(npc.id, `tie "${tie}" is not a known id`);
  // A line that names another roster person needs that person in `ties`,
  // or a populator has no way to know the two belong together.
  const spoken = [...npc.history, npc.world, ...KINDS.flatMap((kind) => npc.voices[kind])].join(" ");
  for (const [first, otherId] of firsts) {
    if (otherId === npc.id || first.length < 4) continue;
    if (new RegExp(`\\b${first}\\b`).test(spoken) && !npc.ties.includes(otherId)) fail(npc.id, `mentions ${first} but does not list "${otherId}" in ties`);
  }
}
// Cast lines are live, so they must never name someone who is not in the game.
for (const id of castIds) {
  const profile = CAST_DIALOGUE[id as keyof typeof CAST_DIALOGUE];
  const spoken = [...profile.history, profile.world, ...KINDS.flatMap((kind) => profile.voices[kind])].join(" ");
  for (const [first, otherId] of firsts) {
    if (first.length < 4) continue;
    if (new RegExp(`\\b${first}\\b`).test(spoken)) fail(id, `live cast line names unseeded roster person ${first} (${otherId})`);
  }
}
if (NPC_ROSTER.length !== EXPECTED_ROSTER) warn.push(`roster has ${NPC_ROSTER.length} people, expected ${EXPECTED_ROSTER}`);

// ---- populator -----------------------------------------------------------
const SETTLEMENTS: Settlement[] = ["hearthglen", "greyhaven", "old-greyhaven", "ashwatch", "rimewatch", "blackwater", "road"];
for (const settlement of SETTLEMENTS) {
  const available = rosterFor(settlement).length;
  if (!available) continue;
  const want = Math.min(6, available);
  const first = pickResidents(1234, settlement, want).map((npc) => npc.id).join(",");
  const again = pickResidents(1234, settlement, want).map((npc) => npc.id).join(",");
  const other = pickResidents(9876, settlement, want).map((npc) => npc.id).join(",");
  if (first !== again) fail(settlement, "pickResidents is not deterministic for a fixed seed");
  if (first.split(",").length !== want) fail(settlement, `pickResidents returned ${first.split(",").length}, wanted ${want}`);
  if (new Set(first.split(",")).size !== want) fail(settlement, "pickResidents returned a duplicate");
  if (available > want + 2 && first === other) warn.push(`${settlement}: two different seeds picked identical residents`);
}

// ---- report --------------------------------------------------------------
const lineCount = allLines.size;
console.log(`cast ${castIds.length} · roster ${NPC_ROSTER.length} · ${lineCount} distinct lines`);
for (const settlement of SETTLEMENTS) console.log(`  ${settlement.padEnd(14)} ${NPC_ROSTER.filter((npc) => npc.home === settlement).length} native, ${rosterFor(settlement).length} eligible`);
for (const message of warn) console.log(`warn  ${message}`);
for (const message of problems) console.log(`FAIL  ${message}`);
console.log(problems.length ? `\n${problems.length} problem(s)` : "\nall checks passed");
process.exit(problems.length ? 1 : 0);
