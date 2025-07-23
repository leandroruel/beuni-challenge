import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { company } from "./company.ts";

export const address = pgTable("address", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  street: text("street").notNull(),
  number: text("number"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  country: text("country").default("Brazil").notNull(),
  complement: text("complement"),
  createdAt: timestamp("created_at").defaultNow(),
});
