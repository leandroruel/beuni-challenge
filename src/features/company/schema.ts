import { company } from "../../db/schema/company.ts";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const companyInsertSchema = createInsertSchema(company);
export const companySelectSchema = createSelectSchema(company);
export const companyUpdateSchema = createUpdateSchema(company);
