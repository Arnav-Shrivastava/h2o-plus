import "../global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { runMigrations } from "../../db/client";
import { useHydrationStore } from "../../stores/hydration";
import { requestNotificationPermissions } from "../lib/notifications";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    // Plus Jakarta Sans weights
    PlusJakartaSans: require("../assets/fonts/SpaceMono-Regular.ttf"), // placeholder until custom fonts added
    Manrope: require("../assets/fonts/SpaceMono-Regular.ttf"),         // placeholder
  });

  // Run migrations and init store
  useEffect(() => {
    async function setupApp() {
      runMigrations();
      await requestNotificationPermissions();
      await useHydrationStore.getState().initialize();
    }
    setupApp();
  }, []);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
