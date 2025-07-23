import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const company = pgTable("company", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  logoUrl: text("logo_url"),
  createdAt: timestamp("created_at").defaultNow(),
});
