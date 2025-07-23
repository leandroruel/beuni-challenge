import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const promotionalItem = pgTable("promotional_item", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  logoUrl: text("logo_url"),
  colorTheme: text("color_theme"),
  createdAt: timestamp("created_at").defaultNow(),
});
