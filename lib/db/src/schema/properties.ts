import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const propertiesTable = pgTable("properties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  price: text("price").notNull(),
  priceValue: integer("price_value"),
  beds: integer("beds").notNull(),
  baths: integer("baths").notNull(),
  sqft: integer("sqft").notNull(),
  type: text("type").notNull(),
  mode: text("mode").notNull(),
  tag: text("tag").notNull().default("New"),
  photos: text("photos").notNull().default("[]"),
  status: text("status").notNull().default("ongoing"),
  basement: text("basement"),
  livableArea: integer("livable_area"),
  projectCost: integer("project_cost"),
  projectStartDate: text("project_start_date"),
  projectCompletionDate: text("project_completion_date"),
  soldPrice: integer("sold_price"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPropertySchema = createInsertSchema(propertiesTable).omit({
  id: true,
  createdAt: true,
});

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof propertiesTable.$inferSelect;
