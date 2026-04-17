import { int, real, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ─── water_logs ───────────────────────────────────────────────────────────────
// Every time the user logs water, a row is inserted here.
export const waterLogs = sqliteTable("water_logs", {
  id:         int("id").primaryKey({ autoIncrement: true }),
  amountMl:   int("amount_ml").notNull(),
  vesselType: text("vessel_type"),                          // 'glass' | 'bottle' | 'mug' | 'thermos' | 'custom'
  note:       text("note"),
  loggedAt:   text("logged_at")
                .notNull()
                .default(sql`(strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))`),
});

// ─── user_settings ────────────────────────────────────────────────────────────
// Single-row table for all user preferences. Populated with defaults on first run.
export const userSettings = sqliteTable("user_settings", {
  id:                        int("id").primaryKey({ autoIncrement: true }),
  dailyGoalMl:               int("daily_goal_ml").notNull().default(2500),
  wakeTime:                  text("wake_time").notNull().default("07:30"),    // "HH:MM"
  windDownTime:              text("wind_down_time").notNull().default("22:00"),
  reminderFrequencyMinutes:  int("reminder_frequency_minutes").notNull().default(60),
  smartReminders:            int("smart_reminders", { mode: "boolean" }).notNull().default(true),
  weekendMode:               int("weekend_mode",    { mode: "boolean" }).notNull().default(false),
});

// ─── TypeScript types (inferred) ─────────────────────────────────────────────
export type WaterLog      = typeof waterLogs.$inferSelect;
export type NewWaterLog   = typeof waterLogs.$inferInsert;
export type UserSettings  = typeof userSettings.$inferSelect;
