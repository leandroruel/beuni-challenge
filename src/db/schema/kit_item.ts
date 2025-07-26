import { pgTable, serial, integer, index } from "drizzle-orm/pg-core";
import { kit } from "./kit.ts";
import { promotionalItem } from "./promotional_item.ts";

export const kitItem = pgTable(
  "kit_item",
  {
    id: serial("id").primaryKey(),
    kitId: integer("kit_id")
      .notNull()
      .references(() => kit.id, { onDelete: "cascade" }),
    promotionalItemId: integer("promotional_item_id")
      .notNull()
      .references(() => promotionalItem.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
  },
  (table) => [
    // Índice para busca por kitId
    index("kit_item_kit_id_idx").on(table.kitId),
    // Índice para busca por promotionalItemId
    index("kit_item_promotional_item_id_idx").on(table.promotionalItemId),
  ],
);
