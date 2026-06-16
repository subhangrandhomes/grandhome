import { pgTable, serial, text, timestamp, integer, unique } from "drizzle-orm/pg-core";
import { propertiesTable } from "./properties";

export const investorsTable = pgTable("investors", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const investorSessionsTable = pgTable("investor_sessions", {
  id: serial("id").primaryKey(),
  investorId: integer("investor_id").notNull().references(() => investorsTable.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const investorPropertiesTable = pgTable("investor_properties", {
  id: serial("id").primaryKey(),
  investorId: integer("investor_id").notNull().references(() => investorsTable.id, { onDelete: "cascade" }),
  propertyId: integer("property_id").notNull().references(() => propertiesTable.id, { onDelete: "cascade" }),
}, (t) => [unique().on(t.investorId, t.propertyId)]);

export type Investor = typeof investorsTable.$inferSelect;
export type InvestorSession = typeof investorSessionsTable.$inferSelect;
export type InvestorProperty = typeof investorPropertiesTable.$inferSelect;
