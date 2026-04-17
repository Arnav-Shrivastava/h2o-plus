import { View, Text, ScrollView, TouchableOpacity, StatusBar, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Defs, LinearGradient as SVGGradient, Stop } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useHydrationStore } from "../../stores/hydration";

// ─── Circular Hydration Ring ─────────────────────────────────────────────────
function HydrationRing({ current, goal }: { current: number; goal: number }) {
  const SIZE = 220;
  const STROKE = 14;
  const R = (SIZE - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * R;
  const progress = Math.min(current / goal, 1);
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <View style={{ alignItems: "center", justifyContent: "center", width: SIZE, height: SIZE }}>
      <Svg width={SIZE} height={SIZE} style={{ transform: [{ rotate: "-90deg" }] }}>
        <Defs>
          <SVGGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#0058bf" />
            <Stop offset="100%" stopColor="#56f5f8" />
          </SVGGradient>
        </Defs>
        {/* Track */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          stroke="#e6e8ea"
          strokeWidth={STROKE}
          fill="none"
        />
        {/* Progress */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          stroke="url(#ringGrad)"
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </Svg>
      {/* Center text */}
      <View style={{ position: "absolute", alignItems: "center" }}>
        <Text className="text-5xl font-bold text-primary" style={{ fontFamily: "PlusJakartaSans" }}>
          {current.toLocaleString()}
        </Text>
        <Text className="text-on-surface-variant text-sm" style={{ fontFamily: "Manrope" }}>
          ml / {goal.toLocaleString()}ml
        </Text>
      </View>
    </View>
  );
}

// ─── Quick Add Button ─────────────────────────────────────────────────────────
function QuickAddBtn({ label, sub, primary, onPress }: { label: string; sub: string; primary?: boolean; onPress: () => void }) {
  return primary ? (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0058bf", "#006fef"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 16, padding: 20, alignItems: "center", gap: 6 }}
      >
        <MaterialCommunityIcons name="cup-water" size={28} color="#fff" />
        <Text className="text-white font-bold text-base" style={{ fontFamily: "PlusJakartaSans" }}>{label}</Text>
        <Text className="text-white/70 text-xs" style={{ fontFamily: "Manrope" }}>{sub}</Text>
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{ flex: 1, backgroundColor: "#56f5f8", borderRadius: 16, padding: 20, alignItems: "center", gap: 6 }}
    >
      <MaterialCommunityIcons name="bottle-soda" size={28} color="#004f51" />
      <Text style={{ fontFamily: "PlusJakartaSans", fontWeight: "700", fontSize: 15, color: "#004f51" }}>{label}</Text>
      <Text style={{ fontFamily: "Manrope", fontSize: 12, color: "#006e70" }}>{sub}</Text>
    </TouchableOpacity>
  );
}

// ─── Screen ──────────────────────────────────────────────────────────────────
export default function DashboardScreen() {
  const { todaysTotalMl, settings, streak, todaysLogs, logWater } = useHydrationStore();
  const goal = settings?.dailyGoalMl || 2500;
  
  // Calculate time since last drink
  const lastLog = todaysLogs.length > 0 ? todaysLogs[0] : null;
  let timeSinceLastDrink = "No logs today";
  
  if (lastLog) {
    const diffMins = Math.floor((new Date().getTime() - new Date(lastLog.loggedAt).getTime()) / 60000);
    if (diffMins < 60) timeSinceLastDrink = `${diffMins} mins ago`;
    else timeSinceLastDrink = `${Math.floor(diffMins / 60)} hrs ${diffMins % 60} mins ago`;
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f9fb" />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ─ Top Bar ─ */}
        <View className="flex-row items-center justify-between py-5">
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons name="waves" size={22} color="#0058bf" />
            <Text className="text-2xl font-black text-primary" style={{ fontFamily: "PlusJakartaSans" }}>
              H2O+
            </Text>
          </View>
        </View>

        {/* ─ Daily Progress Card ─ */}
        <View className="bg-surface-container-lowest rounded-xl p-6 items-center mb-4">
          <Text className="text-on-surface-variant text-xs font-bold tracking-widest uppercase mb-6"
            style={{ fontFamily: "Manrope" }}>
            Daily Progress
          </Text>
          <HydrationRing current={todaysTotalMl} goal={goal} />
          <View className="flex-row items-center gap-2 bg-surface-container-low rounded-full px-5 py-2.5 mt-6">
            <MaterialCommunityIcons name="clock-outline" size={14} color="#0058bf" />
            <Text className="text-sm text-on-surface" style={{ fontFamily: "Manrope", fontWeight: "500" }}>
              Last drink: <Text className="text-primary font-bold">{timeSinceLastDrink}</Text>
            </Text>
          </View>
        </View>

        {/* ─ Quick Add ─ */}
        <View className="bg-surface-container-lowest rounded-xl p-5 mb-4">
          <Text className="text-base font-bold mb-4 text-on-surface" style={{ fontFamily: "PlusJakartaSans" }}>
            Quick Refresh
          </Text>
          <View className="flex-row gap-3">
            <QuickAddBtn label="+250ml" sub="Glass" primary onPress={() => logWater(250, "glass")} />
            <QuickAddBtn label="+500ml" sub="Bottle" onPress={() => logWater(500, "bottle")} />
          </View>
          <TouchableOpacity 
            className="mt-3 py-4 bg-surface-container-high rounded-2xl items-center"
            activeOpacity={0.8}
            onPress={() => router.push("/log")}
          >
            <Text className="text-on-surface-variant font-bold" style={{ fontFamily: "PlusJakartaSans" }}>
              Custom Amount
            </Text>
          </TouchableOpacity>
        </View>

        {/* ─ Streak Card ─ */}
        <View style={{ backgroundColor: "#006fef", borderRadius: 20, padding: 24, marginBottom: 16, overflow: "hidden" }}>
          <View className="flex-row items-center justify-between mb-2">
            <MaterialCommunityIcons name="leaf" size={32} color="#fefcff" />
            <View style={{ backgroundColor: "rgba(254, 252, 255, 0.2)", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 }}>
              <Text style={{ color: "#fefcff", fontSize: 11, fontFamily: "Manrope", fontWeight: "700" }}>LVL 4</Text>
            </View>
          </View>
          <Text style={{ color: "#fefcff", fontSize: 22, fontFamily: "PlusJakartaSans", fontWeight: "800", marginBottom: 4 }}>
            Vital Streak
          </Text>
          <Text style={{ color: "rgba(254, 252, 255, 0.8)", fontSize: 13, fontFamily: "Manrope", marginBottom: 16 }}>
            You've hit your goal {streak} days in a row! Keep flowing.
          </Text>
          <View className="flex-row gap-2 items-end">
            {[60, 60, 60, 80, 100, 100, 45].map((h, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  height: h * 0.5,
                  backgroundColor: i >= 3 ? "#5af8fb" : "rgba(254, 252, 255, 0.3)",
                  borderRadius: 999,
                }}
              />
            ))}
          </View>
        </View>

        {/* ─ Insights Grid ─ */}
        <View className="flex-row gap-4 mb-4">
          <View className="flex-1 bg-surface-container-high rounded-xl p-5 justify-between">
            <View>
              <MaterialCommunityIcons name="lightbulb-on" size={20} color="#0058bf" style={{ marginBottom: 16 }} />
              <Text className="font-bold text-on-surface mb-2" style={{ fontFamily: "PlusJakartaSans", fontSize: 16 }}>Pro Tip: Morning Flush</Text>
              <Text className="text-on-surface-variant text-xs leading-relaxed" style={{ fontFamily: "Manrope" }}>Drinking 500ml of water immediately after waking up boosts metabolism by 24% for the next 90 minutes.</Text>
            </View>
            <View className="mt-6 rounded-lg overflow-hidden h-32 relative">
              <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB61rzZdYG5BziB_DiGLjvT_xwNe0yx3ZUQF7jggWYHbeVXSwoYIWRwij1Cd5jM-xerwsdPWwnClohiJM7ivjhnl6oGOug5XI5_Ry1WpbIbvUOs7u1UxgFau0qnDV4iPnObKoJAmARHTZe_cz2JSpwh_91IGzGt9RNEHzkCN30vv0RPyp0dd0shn8ktkPUfSDPsUoakSNPmlgXg1NJuCFLoMnDTeQ0-mzRfrT97CcRCBXeVC5mdGunSWymKz8ZnzpIOOu9HFKXOdYo" }} style={{ width: "100%", height: "100%" }} />
              <View className="absolute inset-0 bg-black/20" />
            </View>
          </View>
        </View>

        <View className="bg-surface-container-lowest rounded-xl p-5 flex-row items-center gap-4 mb-4">
          <View className="w-12 h-12 rounded-full bg-secondary-container items-center justify-center">
            <MaterialCommunityIcons name="weather-sunny" size={22} color="#006e70" />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-sm text-on-surface" style={{ fontFamily: "PlusJakartaSans" }}>Climate Adjustment</Text>
            <Text className="text-on-surface-variant text-xs mt-1" style={{ fontFamily: "Manrope" }}>It's 28°C. Goal increased by 300ml.</Text>
          </View>
        </View>

        {/* Mini Flow History */}
        <View className="bg-surface-container-lowest rounded-xl p-6 mb-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="font-bold text-xl text-on-surface" style={{ fontFamily: "PlusJakartaSans" }}>Flow History</Text>
            <TouchableOpacity onPress={() => router.push("/history")}>
              <Text className="text-primary font-bold text-sm" style={{ fontFamily: "PlusJakartaSans" }}>View Full</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-end justify-between h-24 gap-2">
            {[40, 85, 40, 70, 95, 50, 45].map((val, i) => (
              <View key={i} className="flex-1 rounded-t-full" style={{ height: `${val}%`, backgroundColor: i === 6 ? "#006fef" : i === 5 ? "rgba(0, 88, 191, 0.4)" : "#e6e8ea" }} />
            ))}
          </View>
        </View>

        {/* ─ Next Reminder ─ */}
        <View className="bg-surface-container-lowest rounded-xl p-5 flex-row items-center gap-4">
          <View className="w-12 h-12 rounded-full bg-tertiary-fixed items-center justify-center">
            <MaterialCommunityIcons name="bell-ring" size={22} color="#070a61" />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-sm text-on-surface" style={{ fontFamily: "PlusJakartaSans" }}>Scheduled Flows</Text>
            <Text className="text-on-surface-variant text-xs" style={{ fontFamily: "Manrope" }}>
              {settings?.smartReminders && todaysTotalMl >= goal 
                ? "Paused — daily goal reached! 🎉"
                : "Reminders active & flowing."}
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/reminders")}>
            <MaterialCommunityIcons name="pencil" size={22} color="#0058bf" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
