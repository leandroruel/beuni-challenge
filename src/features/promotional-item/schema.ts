import { promotionalItem } from "../../db/schema/promotional_item.ts";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const promotionalItemInsertSchema = createInsertSchema(promotionalItem);
export const promotionalItemSelectSchema = createSelectSchema(promotionalItem);
export const promotionalItemUpdateSchema = createUpdateSchema(promotionalItem);
