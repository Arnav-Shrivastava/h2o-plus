import { create } from "zustand";
import { db } from "../db/client";
import { waterLogs, userSettings, WaterLog, UserSettings } from "../db/schema";
import { eq, sql, gte, and, desc, sum } from "drizzle-orm";
import { rescheduleNotifications } from "../lib/notifications";

interface HydrationState {
  // Data
  todaysLogs: WaterLog[];
  todaysTotalMl: number;
  settings: UserSettings | null;
  history: { day: string; fullDay: string; date: number; total: number; goal: number; met: boolean }[];
  streak: number;
  
  // Loading states
  isLoading: boolean;

  // Actions
  initialize: () => Promise<void>;
  logWater: (amountMl: number, vesselType?: string) => Promise<void>;
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>;
}

export const useHydrationStore = create<HydrationState>((set, get) => ({
  todaysLogs: [],
  todaysTotalMl: 0,
  settings: null,
  history: [],
  streak: 0,
  isLoading: true,

  initialize: async () => {
    try {
      // 1. Fetch settings (row ID 1 guaranteed by migrations)
      const settingsResult = await db.select().from(userSettings).where(eq(userSettings.id, 1));
      const currentSettings = settingsResult[0];

      // 2. Fetch today's logs
      const startOfToday = new Date().toISOString().split("T")[0] + "T00:00:00Z";
      const logs = await db
        .select()
        .from(waterLogs)
        .where(gte(waterLogs.loggedAt, startOfToday))
        .orderBy(desc(waterLogs.loggedAt));

      // Calculate total
      const totalMl = logs.reduce((sum, log) => sum + log.amountMl, 0);

      // 3. Calculate history and streak from previous days
      const last7DaysStrings = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split("T")[0];
      });

      const historyLogs = await db
        .select()
        .from(waterLogs)
        .where(gte(waterLogs.loggedAt, last7DaysStrings[6] + "T00:00:00Z"));

      const history = last7DaysStrings.reverse().map(dateStr => {
        const dayLogs = historyLogs.filter(l => l.loggedAt.startsWith(dateStr));
        const total = dayLogs.reduce((sum, l) => sum + l.amountMl, 0);
        const dayDate = new Date(dateStr);
        const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayDate.getDay()];
        return {
          day: dayName[0], // "M", "T" etc
          fullDay: dayName, // "Mon", "Tue" etc
          date: dayDate.getDate(),
          total,
          goal: currentSettings.dailyGoalMl,
          met: total >= currentSettings.dailyGoalMl
        };
      });

      // Simple streak calculation (going backwards from yesterday)
      let currentStreak = totalMl >= currentSettings.dailyGoalMl ? 1 : 0;
      for (let i = 5; i >= 0; i--) { // Check the last 6 days before today
        if (history[i].met) currentStreak++;
        else break;
      }

      set({
        settings: currentSettings,
        todaysLogs: logs,
        todaysTotalMl: totalMl,
        history,
        streak: currentStreak,
        isLoading: false,
      });

      // 4. Reschedule local notifications based on current goal progress
      await rescheduleNotifications(currentSettings, totalMl);
    } catch (e) {
      console.error("Failed to initialize store", e);
      set({ isLoading: false });
    }
  },

  logWater: async (amountMl: number, vesselType?: string) => {
    try {
      // 1. Insert into SQLite
      await db.insert(waterLogs).values({
        amountMl,
        vesselType,
        // loggedAt defaults to now
      });

      // 2. Refresh local state
      await get().initialize();
    } catch (e) {
      console.error("Failed to log water", e);
    }
  },

  updateSettings: async (newSettings: Partial<UserSettings>) => {
    try {
      await db
        .update(userSettings)
        .set(newSettings)
        .where(eq(userSettings.id, 1));
      
      await get().initialize();
    } catch (e) {
      console.error("Failed to update settings", e);
    }
  }
}));
