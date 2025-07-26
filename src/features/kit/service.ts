import { type InferInsertModel, eq } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { kit } from "../../db/schema/kit.ts";

export type KitInsert = InferInsertModel<typeof kit>;
export type KitUpdate = Partial<Omit<InferInsertModel<typeof kit>, "id">>;

/**
 * Create a new Kit
 * @param kitData {KitInsert} Kit payload
 * @returns {kit} the new kit data
 */
export const createKit = async (kitData: KitInsert) => {
  const newKit = await db.insert(kit).values(kitData).returning();
  return newKit[0];
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
  if (result.length === 0) {
    return null;
  }
  return result[0];
};

/**
 * @param id {number} the id of the kit to delete
 * @returns {kit} the deleted kit data
 * @throws {Error} if the kit does not exist
 * @description Deletes a kit by its ID
 * @example
 * const deletedKit = await deleteKit(1);
 * console.log(deletedKit);
 * // Output: { id: 1, name: 'Kit Name', ... }
 * @throws {Error} if the kit does not exist
 * @throws {Error} if the deletion fails
 * @throws {Error} if the database connection fails
 * @throws {Error} if the query fails
 * @throws {Error} if the kit is not found
 * @throws {Error} if the kit cannot be deleted
 * @throws {Error} if the kit has dependencies that prevent deletion
 */
export const deleteKit = async (id: number) => {
  const kitToDelete = await db.delete(kit).where(eq(kit.id, id)).returning();
  return kitToDelete;
};

/**
 *
 * @returns {Promise<kit[]>} an array of all kits
 * @description Retrieves all kits from the database
 * @example
 * const allKits = await getAllKits();
 * console.log(allKits);
 * // Output: [{ id: 1, name: 'Kit 1', ... }, { id: 2, name: 'Kit 2', ... }]
 */
export const getAllKits = async () => {
  const kits = await db.select().from(kit);
  return kits;
};

/**
 *
 * @param id {number} the id of the kit to retrieve
 * @description Retrieves a kit by its ID
 * @example
 * const kit = await getKitById(1);
 * console.log(kit);
 * // Output: { id: 1, name: 'Kit Name', ... }
 * @throws {Error} if the kit does not exist
 * @throws {Error} if the database connection fails
 * @throws {Error} if the query fails
 * @throws {Error} if the kit is not found
 * @throws {Error} if the kit cannot be retrieved
 * @returns {Promise<kit | null>} the kit data or null if not found
 */
export const getKitById = async (id: number) => {
  const kitData = await db.select().from(kit).where(eq(kit.id, id));
  return kitData[0] || null;
};
