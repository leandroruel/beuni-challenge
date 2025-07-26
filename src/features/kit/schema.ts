import { kit } from "../../db/schema/kit.ts";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const kitInsertSchema = createInsertSchema(kit);
export const kitSelectSchema = createSelectSchema(kit);
export const kitUpdateSchema = createUpdateSchema(kit);
