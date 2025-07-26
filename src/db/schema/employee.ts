import {
  pgTable,
  serial,
  varchar,
  date,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { company } from "./company.ts";

export const employee = pgTable(
  "employee",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    birthDate: date("birth_date").notNull(),
    department: varchar("department", { length: 255 }).notNull(),

    // Relação com a empresa
    companyId: integer("company_id")
      .references(() => company.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [
    // Índice para busca por companyId
    index("employee_company_id_idx").on(table.companyId),
  ],
);
