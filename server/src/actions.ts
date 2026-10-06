import { defineAction, z, type ActionsModule, type Ctx } from "@hatch/space-sdk";
import { eq } from "drizzle-orm";
import * as schema from "./schema";

const raritySchema = z.enum(["Common", "Uncommon", "Rare", "Epic", "Legendary", "Relic"]);
const rareLootDropSchema = z.object({ id: z.number().int(), itemId: z.string().min(1).max(40), x: z.number(), y: z.number() });
const enemyRespawnSchema = z.object({ id: z.number().int(), respawnAt: z.number().int().nonnegative() });
const vehicleStateSchema = z.object({ id: z.string().min(1).max(24), x: z.number().min(0).max(14400), y: z.number().min(0).max(17800), hp: z.number().min(0).max(180), fuel: z.number().min(0).max(100), owned: z.boolean(), inventory: z.array(z.string().min(1).max(40)).max(4) });
const saveSchema = z.object({
  room: z.number().int().min(1).max(12),
  level: z.number().int().min(1).max(99),
  hp: z.number().int().min(0).max(999),
  maxHp: z.number().int().min(1).max(999),
  coins: z.number().int().min(0).max(999999),
  weaponName: z.string().min(1).max(40),
  weaponDamage: z.number().min(1).max(999),
  attackSpeed: z.number().min(0.2).max(8),
  rarity: raritySchema,
  armorName: z.string().min(1).max(40),
  armorDefense: z.number().int().min(0).max(90),
  charmName: z.string().min(1).max(40),
  trinketName: z.string().min(1).max(40),
  critChance: z.number().min(0).max(0.75),
  keys: z.number().int().min(0).max(99),
  vehicleKeyOwned: z.boolean(),
  lifesteal: z.number().min(0).max(0.5),
  thorns: z.number().min(0).max(0.75),
  dashReduction: z.number().min(0).max(0.75),
  moveSpeed: z.number().min(0).max(1),
  pickupRadius: z.number().min(0).max(240),
  items: z.array(z.string().min(1).max(40)).max(60),
  storedItems: z.array(z.string().min(1).max(40)).max(60),
  gunAmmoState: z.array(z.object({ name: z.string().min(1).max(40), magazine: z.number().int().min(0).max(500), reserve: z.number().int().min(0).max(5000) })).max(3),
  questState: z.enum(["not_started", "active", "complete"]),
  questTravelOut: z.boolean(),
  questTravelBack: z.boolean(),
  rareLootDrops: z.array(rareLootDropSchema).max(100),
  enemyRespawns: z.array(enemyRespawnSchema).max(2000),
  kills: z.number().int().min(0).max(999999),
  roomsCleared: z.number().int().min(0).max(999999),
  bossesDefeated: z.number().int().min(0).max(999999),
  runsStarted: z.number().int().min(1).max(999999),
  openedChestIds: z.array(z.number().int()).max(100),
  claimedPickupIds: z.array(z.number().int()).max(200),
  claimedBreakableIds: z.array(z.number().int()).max(100),
  defeatedEnemyIds: z.array(z.number().int()).max(2000),
  clearedRoomIds: z.array(z.number().int().min(1).max(12)).max(12),
  secretOpenedRoomIds: z.array(z.number().int().min(1).max(12)).max(12),
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
  chestsOpened: z.number().int().min(0).max(999),
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

const BASE_SAVE: z.infer<typeof saveSchema> = {
  room: 6, level: 1, hp: 100, maxHp: 100, coins: 0,
  weaponName: "Rustblade", weaponDamage: 12, attackSpeed: 1, rarity: "Common",
  armorName: "Traveler Cloak", armorDefense: 0, charmName: "None", trinketName: "None", critChance: 0.05,
  keys: 0, vehicleKeyOwned: false, lifesteal: 0, thorns: 0, dashReduction: 0, moveSpeed: 0, pickupRadius: 0,
  items: [], storedItems: ["Mustang key"], gunAmmoState: [], questState: "not_started", questTravelOut: false, questTravelBack: false, rareLootDrops: [], enemyRespawns: [], kills: 0, roomsCleared: 0, bossesDefeated: 0, runsStarted: 1,
  openedChestIds: [], claimedPickupIds: [], claimedBreakableIds: [], defeatedEnemyIds: [], clearedRoomIds: [], secretOpenedRoomIds: [], exploredCells: [], truckX: 1580, truckY: 15745, truckFuel: 82, truckHp: 180,
  vehicles: [{ id: "rustbucket", x: 1580, y: 15745, hp: 180, fuel: 82, owned: false, inventory: [] }, { id: "motorcycle", x: 1710, y: 15720, hp: 90, fuel: 76, owned: false, inventory: [] }, { id: "mustang", x: 4480, y: 15055, hp: 140, fuel: 70, owned: false, inventory: [] }, { id: "trailrunner", x: 4545, y: 15125, hp: 180, fuel: 64, owned: false, inventory: [] }, { id: "mire-mule", x: 10635, y: 13210, hp: 180, fuel: 55, owned: false, inventory: [] }],
  dogAdopted: false, dogLevel: 1, dogX: 1210, dogY: 15715, dogHp: 64, dogKills: 0, chestsOpened: 0,
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
    room: row.room, level: row.level, hp: row.hp, maxHp: row.maxHp, coins: row.coins,
    weaponName: row.weaponName, weaponDamage: row.weaponDamage, attackSpeed: row.attackSpeed, rarity: row.rarity,
    armorName: row.armorName, armorDefense: row.armorDefense, charmName: row.charmName, trinketName: row.trinketName, critChance: row.critChance,
    keys: row.keys, vehicleKeyOwned: row.vehicleKeyOwned, lifesteal: row.lifesteal, thorns: row.thorns, dashReduction: row.dashReduction, moveSpeed: row.moveSpeed, pickupRadius: row.pickupRadius,
    items: row.items, storedItems: row.storedItems, gunAmmoState: row.gunAmmoState, questState: row.questState, questTravelOut: row.questTravelOut, questTravelBack: row.questTravelBack, rareLootDrops: row.rareLootDrops, enemyRespawns: row.enemyRespawns, kills: row.kills, roomsCleared: row.roomsCleared, bossesDefeated: row.bossesDefeated,
    runsStarted: row.runsStarted, openedChestIds: row.openedChestIds, claimedPickupIds: row.claimedPickupIds,
    claimedBreakableIds: row.claimedBreakableIds, defeatedEnemyIds: row.defeatedEnemyIds, clearedRoomIds: row.clearedRoomIds,
    secretOpenedRoomIds: row.secretOpenedRoomIds, exploredCells: row.exploredCells, truckX: row.truckX, truckY: row.truckY, truckFuel: row.truckFuel, truckHp: row.truckHp, vehicles: row.vehicles.map(vehicle => ({ ...vehicle, inventory: Array.isArray(vehicle.inventory) ? vehicle.inventory.slice(0, 4) : [] })),
    dogAdopted: row.dogAdopted, dogLevel: row.dogLevel, dogX: row.dogX, dogY: row.dogY, dogHp: row.dogHp, dogKills: row.dogKills, chestsOpened: row.chestsOpened,
    runStartedAt: row.runStartedAt || row.updatedAt.toISOString(), updatedAt: row.updatedAt.toISOString(),
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
