import { defineAction, z, type ActionsModule, type Ctx } from "@hatch/space-sdk";
import { desc, eq } from "drizzle-orm";
import * as schema from "./schema";

const raritySchema = z.enum(["Common", "Uncommon", "Rare", "Epic", "Legendary", "Relic"]);
const rareLootDropSchema = z.object({ id: z.number().int(), itemId: z.string().min(1).max(40), x: z.number(), y: z.number() });
const enemyRespawnSchema = z.object({ id: z.number().int(), respawnAt: z.number().int().nonnegative() });
const vehicleStateSchema = z.object({ id: z.string().min(1).max(24), x: z.number().min(0).max(14400), y: z.number().min(0).max(17800), hp: z.number().min(0).max(180), fuel: z.number().min(0).max(100), owned: z.boolean(), inventory: z.array(z.string().min(1).max(40)).max(4) });
const saveSchema = z.object({
  room: z.number().int().min(1).max(15),
  level: z.number().int().min(1).max(99),
  timeOfDay: z.number().min(0).max(1),
  hp: z.number().int().min(0).max(999),
  maxHp: z.number().int().min(1).max(999),
  coins: z.number().int().min(0).max(999999),
  weaponName: z.string().min(1).max(40),
  weaponDamage: z.number().min(1).max(999),
  attackSpeed: z.number().min(0.2).max(8),
  rarity: raritySchema,
  meleeWeaponName: z.string().min(1).max(80),
  armorName: z.string().min(1).max(40),
  armorDefense: z.number().int().min(0).max(90),
  charmName: z.string().min(1).max(40),
  trinketName: z.string().min(1).max(40),
  gadgetName: z.string().min(1).max(40),
  flashlightOn: z.boolean(),
  uvEmitterOwned: z.boolean().default(false),
  uvEmitterOn: z.boolean().default(false),
  soundMuted: z.boolean(),
  controlScheme: z.enum(["joystick", "wasd"]).nullable().default(null),
  critChance: z.number().min(0).max(0.75),
  keys: z.number().int().min(0).max(99),
  ironKeys: z.number().int().min(0).max(999),
  goldKeys: z.number().int().min(0).max(999),
  ancientKeys: z.number().int().min(0).max(999),
  vehicleKeyOwned: z.boolean(),
  lifesteal: z.number().min(0).max(0.5),
  thorns: z.number().min(0).max(0.75),
  dashReduction: z.number().min(0).max(0.75),
  moveSpeed: z.number().min(0).max(1),
  pickupRadius: z.number().min(0).max(240),
  items: z.array(z.string().min(1).max(40)).max(60),
  storedItems: z.array(z.string().min(1).max(40)).max(60),
  baseStates: z.array(z.object({ id: z.enum(["ember", "frost", "mire"]), claimed: z.boolean(), upgrades: z.array(z.enum(["spikes", "lantern", "cookfire"])).max(3) })).max(3),
  dungeonProgress: z.array(z.object({ id: z.enum(["meadow", "ember", "frost"]), roomsCleared: z.number().int().min(0).max(4), foesDefeated: z.number().int().min(0).max(999), eliteDefeated: z.boolean() })).max(3),
  dungeonBossesDefeated: z.array(z.enum(["meadow", "ember", "frost"])).max(3),
  dungeonLootedChestIds: z.array(z.number().int()).max(12),
  respawnBase: z.enum(["village", "ember", "frost", "mire"]),
  rawMeat: z.number().int().min(0).max(999),
  cookedMeals: z.number().int().min(0).max(999),
  infectionLevel: z.number().min(0).max(100).default(0),
  antibiotics: z.number().int().min(0).max(999).default(0),
  herbs: z.number().int().min(0).max(999).default(0),
  antiseptic: z.number().int().min(0).max(999).default(0),
  gunAmmoState: z.array(z.object({ name: z.string().min(1).max(40), magazine: z.number().int().min(0).max(500), reserve: z.number().int().min(0).max(5000) })).max(4),
  boltCount: z.number().int().min(0).max(5000),
  woodScraps: z.number().int().min(0).max(999),
  planks: z.number().int().min(0).max(999),
  barricades: z.array(z.object({ siteId: z.string().min(1).max(24), points: z.array(z.object({ id: z.string().min(1).max(24), hp: z.number().int().min(0).max(100), maxHp: z.number().int().min(1).max(100) })).max(4) })).max(4),
  questState: z.enum(["not_started", "active", "complete"]),
  questTravelOut: z.boolean(),
  questTravelBack: z.boolean(),
  frontierQuestState: z.enum(["not_started", "active", "complete"]),
  npcMetIds: z.array(z.string().min(1).max(32)).max(64),
  npcQuestStates: z.array(z.object({ id: z.string().min(1).max(32), state: z.enum(["not_started", "active", "complete"]) })).max(24),
  mainStoryState: z.enum(["not_started", "active", "complete"]),
  mainStoryChapter: z.number().int().min(0).max(4),
  storyIntroSeen: z.boolean(),
  veilTruthStage: z.number().int().min(0).max(6),
  veilTruthChoice: z.enum(["mercy", "judgment", "doubt"]).nullable(),
  storyFlags: z.array(z.string().min(1).max(48)).max(32),
  ruinedLootedSiteIds: z.array(z.number().int()).max(40),
  visitedBuildingIds: z.array(z.string().min(1).max(48)).max(40),
  activeInteriorId: z.string().min(1).max(48).nullable().default(null),
  interiorLootedContainerIds: z.array(z.number().int()).max(80),
  interiorDefeatedEnemyIds: z.array(z.number().int()).max(300),
  mallVisited: z.boolean().default(false),
  mallBossDefeated: z.boolean().default(false),
  mallLootedContainerIds: z.array(z.number().int()).max(80).default([]),
  rareLootDrops: z.array(rareLootDropSchema).max(100),
  enemyRespawns: z.array(enemyRespawnSchema).max(2000),
  kills: z.number().int().min(0).max(999999),
  headshots: z.number().int().min(0).max(999999),
  headshotKills: z.number().int().min(0).max(999999),
  roomsCleared: z.number().int().min(0).max(999999),
  bossesDefeated: z.number().int().min(0).max(999999),
  runsStarted: z.number().int().min(1).max(999999),
  openedChestIds: z.array(z.number().int()).max(100),
  claimedPickupIds: z.array(z.number().int()).max(200),
  claimedBreakableIds: z.array(z.number().int()).max(100),
  defeatedEnemyIds: z.array(z.number().int()).max(2000),
  clearedRoomIds: z.array(z.number().int().min(1).max(15)).max(15),
  secretOpenedRoomIds: z.array(z.number().int().min(1).max(15)).max(15),
  exploredCells: z.array(z.string().regex(/^\d+:\d+$/)).max(8000),
  truckX: z.number().min(0).max(14400),
  truckY: z.number().min(0).max(17800),
  truckFuel: z.number().min(0).max(100),
  truckHp: z.number().min(0).max(180),
  vehicles: z.array(vehicleStateSchema).max(6),
  dogAdopted: z.boolean(),
  dogLevel: z.number().int().min(1).max(99),
  dogX: z.number().min(0).max(14400),
  dogY: z.number().min(0).max(17800),
  dogHp: z.number().min(0).max(999),
  dogKills: z.number().int().min(0).max(999999),
  zombieDogKills: z.number().int().min(0).max(999999),
  zombieCrowKills: z.number().int().min(0).max(999999),
  packHuntBonuses: z.number().int().min(0).max(999999),
  dogTagRelics: z.number().int().min(0).max(999),
  leatherScraps: z.number().int().min(0).max(999),
  specialEncountered: z.array(z.enum(["tank", "witch", "boomer", "smoker", "hunter"])).max(5),
  specialKills: z.number().int().min(0).max(999999),
  bileJars: z.number().int().min(0).max(99), pipeBombs: z.number().int().min(0).max(99), molotovs: z.number().int().min(0).max(99), rags: z.number().int().min(0).max(999), selectedThrowable: z.enum(["pipeBomb","molotov","bileJar"]),
  specialTrophies: z.array(z.string().min(1).max(48)).max(60),
  chestsOpened: z.number().int().min(0).max(999999),
  bloodMoons: z.number().int().min(0).max(999999),
  bloodMoonsSurvived: z.number().int().min(0).max(999999),
  volatileKills: z.number().int().min(0).max(999999).default(0),
  volatileEyes: z.number().int().min(0).max(999).default(0),
  volatileTrophyOwned: z.boolean().default(false),
  volatileNestDespawnedIds: z.array(z.number().int()).max(80).default([]),
  comboCrafts: z.number().int().min(0).max(999999).default(0),
  boxLocation: z.number().int().min(0).max(4).default(0),
  boxPullsRemaining: z.number().int().min(0).max(7).default(0),
  boxPoolState: z.array(z.string().min(1).max(80)).max(12).default([]),
  runStartedAt: z.string().min(1).max(64),
});

const savedSchema = saveSchema.extend({ updatedAt: z.string() });
const loadResponse = z.object({
  save: savedSchema.nullable(),
  canSave: z.boolean(),
  message: z.string().nullable(),
});
const writeResponse = z.discriminatedUnion("ok", [
  z.object({ ok: z.literal(true), save: savedSchema }),
  z.object({ ok: z.literal(false), message: z.string() }),
]);

const perfSubsystemSchema = z.object({ render: z.number().nonnegative().optional(), terrain: z.number().nonnegative(), streaming: z.number().nonnegative(), entities: z.number().nonnegative(), camera: z.number().nonnegative(), hud: z.number().nonnegative(), collision: z.number().nonnegative(), enemyAi: z.number().nonnegative(), audio: z.number().nonnegative(), save: z.number().nonnegative() });
const perfChunkLoadEventSchema = z.object({ timestamp: z.number().int().nonnegative(), key: z.string().min(1).max(40), durationMs: z.number().nonnegative().max(10000).optional(), drawCalls: z.number().int().nonnegative().max(100000).optional() });
const perfSampleSchema = z.object({
  timestamp: z.number().int().nonnegative(), fps: z.number().nonnegative().max(1000), frameMs: z.number().nonnegative().max(600000), jankMs: z.number().nonnegative().max(600000), subsystems: perfSubsystemSchema,
  vehicleSpeed: z.number().min(-1000).max(1000), activeEnemies: z.number().int().nonnegative().max(10000), visibleEnemies: z.number().int().nonnegative().max(10000), totalEnemies: z.number().int().nonnegative().max(10000).optional(), totalPickups: z.number().int().nonnegative().max(10000).optional(), activeProjectiles: z.number().int().nonnegative().max(10000).optional(), activeSparks: z.number().int().nonnegative().max(10000).optional(), activeDamageNumbers: z.number().int().nonnegative().max(10000).optional(), activeAudioVoices: z.number().int().nonnegative().max(10000).optional(), groundChunksCached: z.number().int().nonnegative().max(10000).optional(), groundCacheMiB: z.number().nonnegative().max(10000).optional(), groundQueueSlots: z.number().int().nonnegative().max(100000).optional(), renderScale: z.number().min(0.4).max(1).optional(), renderMs: z.number().nonnegative().max(10000).optional(), drawCalls: z.number().int().nonnegative().max(100000).optional(), chunkBuildMs: z.number().nonnegative().max(10000).optional(), chunkBuildSteps: z.number().int().nonnegative().max(100000).optional(), chunkBuildCompletions: z.number().int().nonnegative().max(10000).optional(), chunkQueueDepth: z.number().int().nonnegative().max(10000).optional(), chunkQueuePeak: z.number().int().nonnegative().max(10000).optional(), chunksQueuedThisFrame: z.number().int().nonnegative().max(10000).optional(), visibleChunks: z.number().int().nonnegative().max(1000).optional(), chunkCanvasAllocations: z.number().int().nonnegative().max(100000).optional(), chunkCanvasReuses: z.number().int().nonnegative().max(100000).optional(), chunkPoolSize: z.number().int().nonnegative().max(10000).optional(), chunkLoadEvents: z.array(perfChunkLoadEventSchema).max(40),
});
const perfRecordingSummarySchema = z.object({ id: z.number().int(), startedAt: z.string(), stoppedAt: z.string(), sampleCount: z.number().int(), durationMs: z.number().int(), averageFps: z.number(), averageFrameMs: z.number(), p95FrameMs: z.number(), worstFrameMs: z.number(), worstJankMs: z.number(), stallCount50: z.number().int(), jankCount100: z.number().int(), hotspot: z.string(), chunkLoadCount: z.number().int(), averageRenderMs: z.number(), p95RenderMs: z.number(), averageDrawCalls: z.number(), maxDrawCalls: z.number().int(), averageChunkBuildMs: z.number(), chunkBuildFrameCount: z.number().int(), hitchWithChunkBuildCount: z.number().int(), maxChunkQueueDepth: z.number().int().nullable(), maxChunkQueuePeak: z.number().int().nullable(), maxChunksQueuedThisFrame: z.number().int().nullable(), averageVisibleChunks: z.number().nullable(), maxVisibleChunks: z.number().int().nullable(), chunkCanvasAllocations: z.number().int(), chunkCanvasReuses: z.number().int() });
const savePerfRecordingResponse = z.discriminatedUnion("ok", [z.object({ ok: z.literal(true), recording: perfRecordingSummarySchema }), z.object({ ok: z.literal(false), message: z.string() })]);
const listPerfRecordingsResponse = z.object({ recordings: z.array(perfRecordingSummarySchema), canRecord: z.boolean(), message: z.string().nullable() });
const getPerfRecordingResponse = z.discriminatedUnion("ok", [z.object({ ok: z.literal(true), recording: perfRecordingSummarySchema.extend({ samples: z.array(perfSampleSchema) }) }), z.object({ ok: z.literal(false), message: z.string() })]);

const BASE_SAVE: z.infer<typeof saveSchema> = {
  room: 6, level: 1, timeOfDay: .38, hp: 100, maxHp: 100, coins: 0,
  weaponName: "Glock", weaponDamage: 13, attackSpeed: 4.2, rarity: "Common", meleeWeaponName: "Rustblade",
  armorName: "Traveler Cloak", armorDefense: 0, charmName: "None", trinketName: "None", gadgetName: "None", flashlightOn: false, uvEmitterOwned: false, uvEmitterOn: false, soundMuted: false, controlScheme: null, critChance: 0.05,
  keys: 0, ironKeys: 0, goldKeys: 0, ancientKeys: 0, vehicleKeyOwned: false, lifesteal: 0, thorns: 0, dashReduction: 0, moveSpeed: 0, pickupRadius: 0,
  items: ["Glock"], storedItems: [], baseStates: [], dungeonProgress: [], dungeonBossesDefeated: [], dungeonLootedChestIds: [], respawnBase: "village", rawMeat: 0, cookedMeals: 0, infectionLevel: 0, antibiotics: 0, herbs: 0, antiseptic: 0, gunAmmoState: [{ name: "Glock", magazine: 17, reserve: 68 }], boltCount: 0, woodScraps: 0, planks: 0, barricades: [], questState: "not_started", questTravelOut: false, questTravelBack: false, frontierQuestState: "not_started", npcMetIds: [], npcQuestStates: [], mainStoryState: "not_started", mainStoryChapter: 0, storyIntroSeen: false, veilTruthStage: 0, veilTruthChoice: null, storyFlags: [], ruinedLootedSiteIds: [], visitedBuildingIds: [], activeInteriorId: null, interiorLootedContainerIds: [], interiorDefeatedEnemyIds: [], mallVisited: false, mallBossDefeated: false, mallLootedContainerIds: [], rareLootDrops: [], enemyRespawns: [], kills: 0, headshots: 0, headshotKills: 0, roomsCleared: 0, bossesDefeated: 0, runsStarted: 1,
  openedChestIds: [], claimedPickupIds: [], claimedBreakableIds: [], defeatedEnemyIds: [], clearedRoomIds: [], secretOpenedRoomIds: [], exploredCells: [], truckX: 3335, truckY: 14880, truckFuel: 82, truckHp: 180,
  vehicles: [{ id: "rustbucket", x: 3335, y: 14880, hp: 180, fuel: 82, owned: false, inventory: [] }, { id: "motorcycle", x: 1840, y: 15450, hp: 90, fuel: 76, owned: false, inventory: [] }, { id: "mustang", x: 4375, y: 15095, hp: 140, fuel: 70, owned: false, inventory: [] }, { id: "trailrunner", x: 13330, y: 10740, hp: 180, fuel: 64, owned: false, inventory: [] }, { id: "mire-mule", x: 10635, y: 13210, hp: 180, fuel: 55, owned: false, inventory: [] }],
  dogAdopted: false, dogLevel: 1, dogX: 1210, dogY: 15715, dogHp: 64, dogKills: 0,
  zombieDogKills: 0, zombieCrowKills: 0, packHuntBonuses: 0, dogTagRelics: 0, leatherScraps: 0, specialEncountered: [], specialKills: 0, bileJars: 0, pipeBombs: 0, molotovs: 0, rags: 0, selectedThrowable: "pipeBomb", specialTrophies: [], chestsOpened: 0, bloodMoons: 0, bloodMoonsSurvived: 0, volatileKills: 0, volatileEyes: 0, volatileTrophyOwned: false, volatileNestDespawnedIds: [], comboCrafts: 0, boxLocation: 0, boxPullsRemaining: 0, boxPoolState: [],
  runStartedAt: new Date().toISOString(),
};

function viewerKey(ctx: Ctx): string | null {
  const viewer = ctx.viewer;
  if (!viewer) return null;
  if (viewer.isOwner) return "owner";
  return viewer.source === "local" ? `local:${viewer.userId}` : `cloudflare:${viewer.viewerFbid}`;
}

function serialize(row: typeof schema.gameSave.$inferSelect): z.infer<typeof savedSchema> {
  return {
    room: row.room, level: row.level, timeOfDay: row.timeOfDay, hp: row.hp, maxHp: row.maxHp, coins: row.coins,
    weaponName: row.weaponName, weaponDamage: row.weaponDamage, attackSpeed: row.attackSpeed, rarity: row.rarity, meleeWeaponName: row.meleeWeaponName,
    armorName: row.armorName, armorDefense: row.armorDefense, charmName: row.charmName, trinketName: row.trinketName, gadgetName: row.gadgetName, flashlightOn: row.flashlightOn, uvEmitterOwned: row.uvEmitterOwned, uvEmitterOn: row.uvEmitterOn, soundMuted: row.soundMuted, controlScheme: row.controlScheme, critChance: row.critChance,
    keys: row.keys, ironKeys: row.ironKeys, goldKeys: row.goldKeys, ancientKeys: row.ancientKeys, vehicleKeyOwned: row.vehicleKeyOwned, lifesteal: row.lifesteal, thorns: row.thorns, dashReduction: row.dashReduction, moveSpeed: row.moveSpeed, pickupRadius: row.pickupRadius,
    items: row.items, storedItems: row.storedItems, baseStates: row.baseStates, dungeonProgress: row.dungeonProgress, dungeonBossesDefeated: row.dungeonBossesDefeated, dungeonLootedChestIds: row.dungeonLootedChestIds, respawnBase: row.respawnBase, rawMeat: row.rawMeat, cookedMeals: row.cookedMeals, infectionLevel: row.infectionLevel, antibiotics: row.antibiotics, herbs: row.herbs, antiseptic: row.antiseptic, gunAmmoState: row.gunAmmoState, boltCount: row.boltCount, woodScraps: row.woodScraps, planks: row.planks, barricades: row.barricades, questState: row.questState, questTravelOut: row.questTravelOut, questTravelBack: row.questTravelBack, frontierQuestState: row.frontierQuestState, npcMetIds: row.npcMetIds, npcQuestStates: row.npcQuestStates, mainStoryState: row.mainStoryState, mainStoryChapter: row.mainStoryChapter, storyIntroSeen: row.storyIntroSeen, veilTruthStage: row.veilTruthStage, veilTruthChoice: row.veilTruthChoice, storyFlags: row.storyFlags, ruinedLootedSiteIds: row.ruinedLootedSiteIds, visitedBuildingIds: row.visitedBuildingIds, activeInteriorId: row.activeInteriorId, interiorLootedContainerIds: row.interiorLootedContainerIds, interiorDefeatedEnemyIds: row.interiorDefeatedEnemyIds, mallVisited: row.mallVisited, mallBossDefeated: row.mallBossDefeated, mallLootedContainerIds: row.mallLootedContainerIds, rareLootDrops: row.rareLootDrops, enemyRespawns: row.enemyRespawns, kills: row.kills, headshots: row.headshots, headshotKills: row.headshotKills, roomsCleared: row.roomsCleared, bossesDefeated: row.bossesDefeated,
    runsStarted: row.runsStarted, openedChestIds: row.openedChestIds, claimedPickupIds: row.claimedPickupIds,
    claimedBreakableIds: row.claimedBreakableIds, defeatedEnemyIds: row.defeatedEnemyIds, clearedRoomIds: row.clearedRoomIds,
    secretOpenedRoomIds: row.secretOpenedRoomIds, exploredCells: row.exploredCells, truckX: row.truckX, truckY: row.truckY, truckFuel: row.truckFuel, truckHp: row.truckHp, vehicles: row.vehicles.map(vehicle => ({ ...vehicle, inventory: Array.isArray(vehicle.inventory) ? vehicle.inventory.slice(0, 4) : [] })),
    dogAdopted: row.dogAdopted, dogLevel: row.dogLevel, dogX: row.dogX, dogY: row.dogY, dogHp: row.dogHp, dogKills: row.dogKills,
    zombieDogKills: row.zombieDogKills, zombieCrowKills: row.zombieCrowKills, packHuntBonuses: row.packHuntBonuses, dogTagRelics: row.dogTagRelics, leatherScraps: row.leatherScraps, specialEncountered: row.specialEncountered, specialKills: row.specialKills, bileJars: row.bileJars, pipeBombs: row.pipeBombs, molotovs: row.molotovs, rags: row.rags, selectedThrowable: row.selectedThrowable, specialTrophies: row.specialTrophies, chestsOpened: row.chestsOpened, bloodMoons: row.bloodMoons, bloodMoonsSurvived: row.bloodMoonsSurvived, volatileKills: row.volatileKills, volatileEyes: row.volatileEyes, volatileTrophyOwned: row.volatileTrophyOwned, volatileNestDespawnedIds: row.volatileNestDespawnedIds, comboCrafts: row.comboCrafts, boxLocation: row.boxLocation, boxPullsRemaining: row.boxPullsRemaining, boxPoolState: row.boxPoolState,
    runStartedAt: row.runStartedAt || row.updatedAt.toISOString(), updatedAt: row.updatedAt.toISOString(),
  };
}

function presentValues(values:Array<number|undefined>):number[]{return values.filter((value):value is number=>typeof value==="number");}
function averageOrNull(values:number[]):number|null{return values.length?values.reduce((sum,value)=>sum+value,0)/values.length:null;}

function serializePerfSummary(row: typeof schema.perfRecordings.$inferSelect): z.infer<typeof perfRecordingSummarySchema> {
  const frameTimes = row.samples.map(sample => sample.frameMs).sort((a, b) => a - b);
  let previousTimestamp = row.startedAt.getTime();
  const jankTimes = row.samples.map(sample => {
    const derived = Math.max(0, sample.timestamp - previousTimestamp - 50);
    previousTimestamp = sample.timestamp;
    return Math.max(0, sample.jankMs ?? derived);
  });
  const p95Index = Math.max(0, Math.min(frameTimes.length - 1, Math.floor((frameTimes.length - 1) * 0.95)));
  return {
    id: row.id,
    startedAt: row.startedAt.toISOString(),
    stoppedAt: row.stoppedAt.toISOString(),
    sampleCount: row.sampleCount,
    durationMs: Math.max(0, row.stoppedAt.getTime() - row.startedAt.getTime()),
    averageFps: row.averageFps,
    averageFrameMs: row.averageFrameMs,
    p95FrameMs: frameTimes[p95Index] ?? 0,
    worstFrameMs: frameTimes[frameTimes.length - 1] ?? 0,
    worstJankMs: jankTimes.length ? Math.max(...jankTimes) : 0,
    stallCount50: jankTimes.filter(value => value > 50).length,
    jankCount100: jankTimes.filter(value => value > 100).length,
    hotspot: row.hotspot,
    chunkLoadCount: row.chunkLoadCount,
    averageRenderMs: row.samples.length ? row.samples.reduce((sum, sample) => sum + (sample.renderMs ?? sample.subsystems.render ?? 0), 0) / row.samples.length : 0,
    p95RenderMs: (() => { const values = row.samples.map(sample => sample.renderMs ?? sample.subsystems.render ?? 0).sort((a, b) => a - b); return values[Math.max(0, Math.min(values.length - 1, Math.floor((values.length - 1) * 0.95)))] ?? 0; })(),
    averageDrawCalls: row.samples.length ? row.samples.reduce((sum, sample) => sum + (sample.drawCalls ?? 0), 0) / row.samples.length : 0,
    maxDrawCalls: row.samples.length ? Math.max(...row.samples.map(sample => sample.drawCalls ?? 0)) : 0,
    averageChunkBuildMs: row.samples.length ? row.samples.reduce((sum, sample) => sum + (sample.chunkBuildMs ?? 0), 0) / row.samples.length : 0,
    chunkBuildFrameCount: row.samples.filter(sample => (sample.chunkBuildMs ?? 0) > 0).length,
    hitchWithChunkBuildCount: row.samples.filter(sample => sample.frameMs > 25 && (sample.chunkBuildMs ?? 0) > 0).length,
    maxChunkQueueDepth: presentValues(row.samples.map(sample => sample.chunkQueueDepth)).length ? Math.max(...presentValues(row.samples.map(sample => sample.chunkQueueDepth))) : null,
    maxChunkQueuePeak: presentValues(row.samples.map(sample => sample.chunkQueuePeak)).length ? Math.max(...presentValues(row.samples.map(sample => sample.chunkQueuePeak))) : null,
    maxChunksQueuedThisFrame: presentValues(row.samples.map(sample => sample.chunksQueuedThisFrame)).length ? Math.max(...presentValues(row.samples.map(sample => sample.chunksQueuedThisFrame))) : null,
    averageVisibleChunks: averageOrNull(presentValues(row.samples.map(sample => sample.visibleChunks))),
    maxVisibleChunks: presentValues(row.samples.map(sample => sample.visibleChunks)).length ? Math.max(...presentValues(row.samples.map(sample => sample.visibleChunks))) : null,
    chunkCanvasAllocations: row.samples.length ? (row.samples[row.samples.length - 1]?.chunkCanvasAllocations ?? 0) : 0,
    chunkCanvasReuses: row.samples.length ? (row.samples[row.samples.length - 1]?.chunkCanvasReuses ?? 0) : 0,
  };
}

export const Actions = {
  loadGame: defineAction({
    request: z.object({}), response: loadResponse,
    async handler(ctx): Promise<z.infer<typeof loadResponse>> {
      const ownerKey = viewerKey(ctx);
      if (!ownerKey) return { save: null, canSave: false, message: "Sign in to sync progress. You can still play this session." };
      const rows = await ctx.db<typeof schema>().select().from(schema.gameSave).where(eq(schema.gameSave.ownerKey, ownerKey)).limit(1);
      const row = rows[0];
      return { save: row ? serialize(row) : null, canSave: true, message: null };
    },
  }),

  saveGame: defineAction({
    request: saveSchema, response: writeResponse,
    async handler(ctx, args): Promise<z.infer<typeof writeResponse>> {
      const ownerKey = viewerKey(ctx);
      if (!ownerKey) return { ok: false, message: "Sign in to sync progress. Your current run is still playable." };
      const db = ctx.db<typeof schema>();
      const now = new Date();
      await db.insert(schema.gameSave).values({ ownerKey, ...args, updatedAt: now })
        .onConflictDoUpdate({ target: schema.gameSave.ownerKey, set: { ...args, updatedAt: now } });
      const rows = await db.select().from(schema.gameSave).where(eq(schema.gameSave.ownerKey, ownerKey)).limit(1);
      const row = rows[0];
      if (!row) return { ok: false, message: "Progress could not be confirmed. Try saving again." };
      ctx.invalidateQueries();
      return { ok: true, save: serialize(row) };
    },
  }),

  savePerfRecording: defineAction({
    request: z.object({ startedAt: z.number().int().nonnegative(), stoppedAt: z.number().int().nonnegative(), samples: z.array(perfSampleSchema).min(1).max(12000) }), response: savePerfRecordingResponse,
    async handler(ctx, args): Promise<z.infer<typeof savePerfRecordingResponse>> {
      if (args.stoppedAt < args.startedAt) return { ok: false, message: "The recording end time is invalid." };
      const sums = { render: 0, terrain: 0, streaming: 0, entities: 0, camera: 0, hud: 0, collision: 0, enemyAi: 0, audio: 0, save: 0 };
      let fpsTotal = 0, frameTotal = 0, chunkLoadCount = 0;
      for (const sample of args.samples) { fpsTotal += sample.fps; frameTotal += sample.frameMs; chunkLoadCount += sample.chunkLoadEvents.length; for (const key of Object.keys(sums) as Array<keyof typeof sums>) sums[key] += sample.subsystems[key] ?? 0; }
      const hotspot = (Object.keys(sums) as Array<keyof typeof sums>).reduce((best, key) => sums[key] > sums[best] ? key : best, "terrain");
      const now = new Date();
      const inserted = await ctx.db<typeof schema>().insert(schema.perfRecordings).values({ startedAt: new Date(args.startedAt), stoppedAt: new Date(args.stoppedAt), sampleCount: args.samples.length, averageFps: fpsTotal / args.samples.length, averageFrameMs: frameTotal / args.samples.length, hotspot, chunkLoadCount, samples: args.samples, createdAt: now }).returning();
      const row = inserted[0];
      if (!row) return { ok: false, message: "The profiler recording could not be saved." };
      ctx.invalidateQueries();
      return { ok: true, recording: serializePerfSummary(row) };
    },
  }),

  listPerfRecordings: defineAction({
    request: z.object({}), response: listPerfRecordingsResponse,
    async handler(ctx): Promise<z.infer<typeof listPerfRecordingsResponse>> {
      const rows = await ctx.db<typeof schema>().select().from(schema.perfRecordings).orderBy(desc(schema.perfRecordings.startedAt)).limit(20);
      return { recordings: rows.map(serializePerfSummary), canRecord: true, message: null };
    },
  }),

  getPerfRecording: defineAction({
    request: z.object({ id: z.number().int().positive() }), response: getPerfRecordingResponse,
    async handler(ctx, args): Promise<z.infer<typeof getPerfRecordingResponse>> {
      const rows = await ctx.db<typeof schema>().select().from(schema.perfRecordings).where(eq(schema.perfRecordings.id, args.id)).limit(1);
      const row = rows[0];
      if (!row) return { ok: false, message: "That profiler recording was not found." };
      let previousTimestamp = row.startedAt.getTime();
      const samples = row.samples.map(sample => { const derived = Math.max(0, sample.timestamp - previousTimestamp - 50); previousTimestamp = sample.timestamp; return { ...sample, jankMs: sample.jankMs ?? derived }; });
      return { ok: true, recording: { ...serializePerfSummary(row), samples } };
    },
  }),

  resetGame: defineAction({

    request: z.object({}), response: writeResponse,
    async handler(ctx): Promise<z.infer<typeof writeResponse>> {
      const ownerKey = viewerKey(ctx);
      if (!ownerKey) return { ok: false, message: "Sign in to start a synced run." };
      const db = ctx.db<typeof schema>();
      const existing = await db.select().from(schema.gameSave).where(eq(schema.gameSave.ownerKey, ownerKey)).limit(1);
      const runsStarted = (existing[0]?.runsStarted ?? 0) + 1;
      const now = new Date();
      const fresh = { ...BASE_SAVE, runsStarted, runStartedAt: now.toISOString() };
      await db.insert(schema.gameSave).values({ ownerKey, ...fresh, updatedAt: now })
        .onConflictDoUpdate({ target: schema.gameSave.ownerKey, set: { ...fresh, updatedAt: now } });
      const rows = await db.select().from(schema.gameSave).where(eq(schema.gameSave.ownerKey, ownerKey)).limit(1);
      const row = rows[0];
      if (!row) return { ok: false, message: "The new run could not be confirmed. Try again." };
      ctx.invalidateQueries();
      return { ok: true, save: serialize(row) };
    },
  }),
} satisfies ActionsModule;

export type GameSave = z.infer<typeof saveSchema>;
