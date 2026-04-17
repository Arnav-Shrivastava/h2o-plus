import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { UserSettings } from "../db/schema";
import { format, parse, setHours, setMinutes, isWeekend, addMinutes, isAfter, isBefore } from "date-fns";

// Ensure notifications show even when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermissions() {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("hydration", {
        name: "Hydration Reminders",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#0058bf",
      });
    }
    
    return finalStatus === "granted";
  } catch (e) {
    console.warn("Notifications gracefully disabled: standard Expo Go does not support native notification APIs.");
    return false;
  }
}

export async function rescheduleNotifications(settings: UserSettings, todaysTotalMl: number) {
  try {
    // 1. Cancel all existing scheduled notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    // If user has hit their goal and "Smart Reminders" is ON, don't schedule more for today
    if (settings.smartReminders && todaysTotalMl >= settings.dailyGoalMl) {
      return;
    }

    // 2. Determine frequency based on weekend mode
    const today = new Date();
    let frequencyMins = settings.reminderFrequencyMinutes;
    
    if (settings.weekendMode && isWeekend(today)) {
      // If weekend mode is ON and it's the weekend, reduce frequency (e.g. double the gap)
      frequencyMins *= 2; 
    }

    // 3. Parse wake up and wind down times to Date objects for today
    const wakeDate = parse(settings.wakeTime, "HH:mm", today);
    const windDownDate = parse(settings.windDownTime, "HH:mm", today);

    // 4. Generate notification schedule for the rest of today
    let nextNotificationTime = wakeDate;
    
    // If we are already past wake time, find the next interval
    if (isBefore(nextNotificationTime, today)) {
       // Find the next interval based on wake time and frequency
       let time = wakeDate;
       while (isBefore(time, today)) {
         time = addMinutes(time, frequencyMins);
       }
       nextNotificationTime = time;
    }

    // Schedule up to wind down time
    let count = 0;
    while (isBefore(nextNotificationTime, windDownDate) && count < 64) { // iOS limit is 64
      // Only schedule if it's in the future
      if (isAfter(nextNotificationTime, today)) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "💧 Time to hydrate!",
            body: "Keep your vital flow going. Grab a fresh glass of water.",
            sound: true,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: nextNotificationTime,
            channelId: "hydration",
          },
        });
        count++;
      }
      nextNotificationTime = addMinutes(nextNotificationTime, frequencyMins);
    }
  } catch (e) {
    console.warn("Skipping notification reschedule: unsupported in standard Expo Go.");
  }
}
