import { employee } from "../../db/schema/employee.ts";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const employeeInsertSchema = createInsertSchema(employee);
export const employeeSelectSchema = createSelectSchema(employee);
export const employeeUpdateSchema = createUpdateSchema(employee);
