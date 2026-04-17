import { openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "./schema";

// Open (or create) the SQLite database file on-device.
const sqlite = openDatabaseSync("h2oplus.db");

// Drizzle ORM client — use this everywhere instead of raw SQL.
export const db = drizzle(sqlite, { schema });

// ─── Migration: create tables if they don't exist ────────────────────────────
// We run raw SQL here because expo-sqlite doesn't support drizzle-kit migrations
// at runtime. This is the recommended approach for local-first Expo apps.
export function runMigrations() {
  sqlite.execSync(`
    CREATE TABLE IF NOT EXISTS water_logs (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      amount_ml   INTEGER NOT NULL,
      vessel_type TEXT,
      note        TEXT,
      logged_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
    );

    CREATE TABLE IF NOT EXISTS user_settings (
      id                          INTEGER PRIMARY KEY AUTOINCREMENT,
      daily_goal_ml               INTEGER NOT NULL DEFAULT 2500,
      wake_time                   TEXT    NOT NULL DEFAULT '07:30',
      wind_down_time              TEXT    NOT NULL DEFAULT '22:00',
      reminder_frequency_minutes  INTEGER NOT NULL DEFAULT 60,
      smart_reminders             INTEGER NOT NULL DEFAULT 1,
      weekend_mode                INTEGER NOT NULL DEFAULT 0
    );

    -- Seed default settings row if it doesn't exist yet
    INSERT OR IGNORE INTO user_settings (id) VALUES (1);
  `);
}
