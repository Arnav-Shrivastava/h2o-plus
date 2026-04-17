import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// ─── Weekly bar data ──────────────────────────────────────────────────────────
const WEEK_DATA = [
  { day: "M", pct: 0.85, goal: true  },
  { day: "T", pct: 0.60, goal: false },
  { day: "W", pct: 1.00, goal: true  },
  { day: "T", pct: 0.75, goal: false },
  { day: "F", pct: 0.90, goal: true  },
  { day: "S", pct: 0.40, goal: false },
  { day: "S", pct: 0.65, goal: false },
];

const DAILY_LOGS = [
  { day: "Wed", date: 24, total: 3100, goal: 2800, met: true  },
  { day: "Tue", date: 23, total: 1850, goal: 2800, met: false },
  { day: "Mon", date: 22, total: 2950, goal: 2800, met: true  },
  { day: "Sun", date: 21, total: 2820, goal: 2800, met: true  },
];

export default function HistoryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f9fb" />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ─ Header ─ */}
        <View className="pt-5 mb-8">
          <Text
            className="text-5xl font-black text-on-surface tracking-tight"
            style={{ fontFamily: "PlusJakartaSans" }}
          >
            History
          </Text>
          <Text className="text-on-surface-variant text-base mt-1" style={{ fontFamily: "Manrope" }}>
            Your fluid journey over the last 7 days.
          </Text>
        </View>

        {/* ─ Bento: Chart + Stats ─ */}
        <View className="flex-row gap-3 mb-5">
          {/* Weekly chart */}
          <View className="flex-1 bg-surface-container-lowest rounded-xl p-5">
            <Text className="font-bold text-base text-on-surface mb-1" style={{ fontFamily: "PlusJakartaSans" }}>
              Weekly Intake
            </Text>
            <Text className="text-xs text-on-surface-variant mb-5" style={{ fontFamily: "Manrope" }}>
              Avg 2.4L / day
            </Text>
            {/* Bars */}
            <View style={{ flexDirection: "row", alignItems: "flex-end", height: 100, gap: 6 }}>
              {WEEK_DATA.map((d, i) => (
                <View key={i} style={{ flex: 1, alignItems: "center", gap: 6, height: "100%" }}>
                  <View style={{ flex: 1, width: "100%", backgroundColor: "#e6e8ea", borderRadius: 999, justifyContent: "flex-end", overflow: "hidden" }}>
                    <LinearGradient
                      colors={["#0058bf", "#006fef"]}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 0, y: 0 }}
                      style={{ width: "100%", height: `${d.pct * 100}%`, borderRadius: 999 }}
                    />
                  </View>
                  <Text style={{ fontFamily: "Manrope", fontSize: 10, color: "#414755" }}>{d.day}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Stats column */}
          <View style={{ gap: 10, width: 110 }}>
            {/* Consistency */}
            <View style={{ flex: 1, backgroundColor: "#56f5f8", borderRadius: 20, padding: 16, justifyContent: "space-between" }}>
              <MaterialCommunityIcons name="auto-fix" size={20} color="#006e70" />
              <View>
                <Text style={{ fontFamily: "PlusJakartaSans", fontWeight: "800", fontSize: 28, color: "#006e70" }}>84%</Text>
                <Text style={{ fontFamily: "Manrope", fontSize: 11, color: "#004f51", opacity: 0.8 }}>Consistency</Text>
              </View>
            </View>
            {/* Goals met */}
            <View style={{ flex: 1, backgroundColor: "#686dbe", borderRadius: 20, padding: 16, justifyContent: "space-between" }}>
              <MaterialCommunityIcons name="check-decagram" size={20} color="#fffbff" />
              <View>
                <Text style={{ fontFamily: "PlusJakartaSans", fontWeight: "800", fontSize: 28, color: "#fffbff" }}>5/7</Text>
                <Text style={{ fontFamily: "Manrope", fontSize: 11, color: "rgba(255,251,255,0.8)" }}>Goals Met</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ─ Daily Breakdown ─ */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-on-surface" style={{ fontFamily: "PlusJakartaSans" }}>
            Daily Breakdown
          </Text>
          <TouchableOpacity className="flex-row items-center gap-1">
            <Text className="text-primary text-sm font-bold" style={{ fontFamily: "Manrope" }}>Export</Text>
            <MaterialCommunityIcons name="download" size={16} color="#0058bf" />
          </TouchableOpacity>
        </View>

        <View style={{ gap: 10 }}>
          {DAILY_LOGS.map((log, i) => (
            <View
              key={i}
              className="bg-surface-container-lowest rounded-xl p-4 flex-row items-center justify-between"
            >
              {/* Date badge */}
              <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 rounded-full bg-surface-container-high items-center justify-center">
                  <Text style={{ fontFamily: "Manrope", fontSize: 9, color: "#414755", textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {log.day}
                  </Text>
                  <Text style={{ fontFamily: "PlusJakartaSans", fontWeight: "700", fontSize: 17, color: "#191c1e", lineHeight: 20 }}>
                    {log.date}
                  </Text>
                </View>
                <View>
                  <Text className="font-bold text-sm text-on-surface" style={{ fontFamily: "Manrope" }}>
                    {log.day === "Wed" ? "Wednesday" : log.day === "Tue" ? "Tuesday" : log.day === "Mon" ? "Monday" : "Sunday"}
                  </Text>
                  <Text className="text-xs text-on-surface-variant" style={{ fontFamily: "Manrope" }}>
                    {log.total.toLocaleString()}ml / {log.goal.toLocaleString()}ml
                  </Text>
                </View>
              </View>
              {/* Status badge */}
              <View style={{
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 999,
                backgroundColor: log.met ? "#5af8fb" : "#e6e8ea",
              }}>
                <Text style={{
                  fontFamily: "Manrope",
                  fontWeight: "700",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  color: log.met ? "#002020" : "#414755",
                }}>
                  {log.met ? "Goal Met" : "Partial"}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
