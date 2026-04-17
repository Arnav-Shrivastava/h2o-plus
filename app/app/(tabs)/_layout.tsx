import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// ─── Tab icon helper ─────────────────────────────────────────────────────────
function TabIcon({
  name,
  color,
  focused,
}: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
  focused: boolean;
}) {
  return (
    <View
      style={[
        styles.iconWrap,
        focused && styles.iconWrapActive,
      ]}
    >
      <MaterialCommunityIcons name={name} size={22} color={focused ? "#0058bf" : "#94a3b8"} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#0058bf",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarLabelStyle: {
          fontFamily: "Manrope",
          fontSize: 11,
          fontWeight: "500",
        },
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: Platform.OS === "ios" ? "transparent" : "rgba(247,249,251,0.92)",
          height: 80,
          paddingBottom: Platform.OS === "ios" ? 20 : 12,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          shadowColor: "#191c1e",
          shadowOpacity: 0.06,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: -8 },
        },
        tabBarBackground:
          Platform.OS === "ios"
            ? () => (
                <BlurView
                  intensity={80}
                  tint="light"
                  style={StyleSheet.absoluteFill}
                />
              )
            : undefined,
      }}
    >
      {/* ── Dashboard ── */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="view-dashboard" color={color} focused={focused} />
          ),
        }}
      />

      {/* ── Log Water ── */}
      <Tabs.Screen
        name="log"
        options={{
          title: "Log",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="water" color={color} focused={focused} />
          ),
        }}
      />

      {/* ── Reminders ── */}
      <Tabs.Screen
        name="reminders"
        options={{
          title: "Reminders",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="bell" color={color} focused={focused} />
          ),
        }}
      />

      {/* ── History ── */}
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="chart-bar" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 44,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  iconWrapActive: {
    backgroundColor: "rgba(0, 88, 191, 0.1)",
  },
});
