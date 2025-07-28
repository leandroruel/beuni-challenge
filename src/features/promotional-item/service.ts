import { promotionalItem } from "../../db/schema/promotional_item.ts";
import { db } from "../../db/index.ts";
import { type InferInsertModel, eq, and } from "drizzle-orm";

type PromotionalItemInsert = InferInsertModel<typeof promotionalItem>;
type PromotionalItemUpdate = Partial<
  Omit<InferInsertModel<typeof promotionalItem>, "id">
>;

/**
 * Creates a new promotional item.
 * @param itemData - Data for the new promotional item.
 * @returns The created promotional item.
 */
export const createPromotionalItem = async (
  itemData: PromotionalItemInsert,
) => {
  const newItem = await db.insert(promotionalItem).values(itemData).returning();
  return newItem[0];
};

/**
 * Updates an existing promotional item by ID.
 * @param id - Promotional item ID.
 * @param data - Data to update.
 * @returns The updated promotional item or undefined if not found.
 */
export const updatePromotionalItem = async (
  id: number,
  data: PromotionalItemUpdate,
) => {
  const result = await db
    .update(promotionalItem)
    .set(data)
    .where(eq(promotionalItem.id, id))
    .returning();
  return result[0];
};

/**
 * Retrieves all promotional items.
 * @returns Array of promotional items.
 */
export const getAllPromotionalItems = async () => {
  const items = await db.select().from(promotionalItem);
  return items;
};

/**
 * Retrieves a promotional item by ID.
 * @param id - Promotional item ID.
 * @returns The promotional item or undefined if not found.
 */
export const getPromotionalItemById = async (id: number) => {
  const itemData = await db
    .select()
    .from(promotionalItem)
    .where(eq(promotionalItem.id, id));
  return itemData[0];
};

/**
 * Deletes a promotional item by ID.
 * @param id - Promotional item ID.
 * @returns The deleted promotional item or undefined if not found.
 */
export const deletePromotionalItem = async (id: number) => {
  const result = await db
    .delete(promotionalItem)
    .where(eq(promotionalItem.id, id))
    .returning();
  return result[0];
};


/**
 * Checks if a promotional item with the given name exists.
 * @param name - The name of the promotional item.
 * @returns A boolean indicating whether the promotional item exists.
 */
export const exists = async (name: string) => {
  const existingItem = await db
    .select()
    .from(promotionalItem)
    .where(eq(promotionalItem.name, name));

  return existingItem.length > 0;
};
