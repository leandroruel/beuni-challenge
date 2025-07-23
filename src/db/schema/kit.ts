import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { company } from "./company.ts";
import { kitStatusEnum } from "./kit_status.enum.ts";

export const kit = pgTable("kit", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  status: kitStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});
