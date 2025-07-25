import { type InferInsertModel, eq } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { kit } from "../../db/schema/kit.ts";

export type KitInsert = InferInsertModel<typeof kit>;
export type KitUpdate = InferInsertModel<typeof kit>;

/**
 * Create a new Kit
 * @param kitData {KitInsert} Kit payload
 * @returns {kit} the new kit data
 */
export const createKit = async (kitData: KitInsert) => {
  const newKit = await db.insert(kit as any).values(kitData);
  return newKit;
};

/**
 * Updates a kit from a specific id
 * @param id {number} the id of the kit
 * @param data {KitUpdate} Payload to update
 * @returns {kit} the updated kit data
 */
export const updateKit = async (id: number, data: KitUpdate) => {
  const result = await db
    .update(kit)
    .set(data)
    .where(eq(kit.id, id))
    .returning();
  return result[0];
};

export const deleteKit = async (id: number) => {
  const kitToDelete = await db.delete(kit).where(eq(kit.id, id)).returning();
  return kitToDelete;
};

export const getAllKits = async () => {
  const kits = await db.select().from(kit);
  return kits;
};

export const getKitById = async (id: number) => {
  const kitData = await db.select().from(kit).where(eq(kit.id, id));
  return kitData[0];
};
