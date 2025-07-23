import { pgEnum } from "drizzle-orm/pg-core";

export const kitStatusEnum = pgEnum("kit_status", [
  "pending",
  "shipped",
  "delivered",
  "cancelled",
]);
