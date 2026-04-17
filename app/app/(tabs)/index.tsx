import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Defs, LinearGradient as SVGGradient, Stop } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
function QuickAddBtn({ label, sub, primary }: { label: string; sub: string; primary?: boolean }) {
  return primary ? (
    <LinearGradient
      colors={["#0058bf", "#006fef"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, borderRadius: 16, padding: 20, alignItems: "center", gap: 6 }}
    >
      <MaterialCommunityIcons name="cup-water" size={28} color="#fff" />
      <Text className="text-white font-bold text-base" style={{ fontFamily: "PlusJakartaSans" }}>{label}</Text>
      <Text className="text-white/70 text-xs" style={{ fontFamily: "Manrope" }}>{sub}</Text>
    </LinearGradient>
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
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
  const current = 1200;
  const goal = 2500;
  const streak = 12;

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
          <TouchableOpacity className="w-10 h-10 rounded-full bg-surface-container-high items-center justify-center">
            <MaterialCommunityIcons name="magnify" size={20} color="#414755" />
          </TouchableOpacity>
        </View>

        {/* ─ Daily Progress Card ─ */}
        <View className="bg-surface-container-lowest rounded-xl p-6 items-center mb-4">
          <Text className="text-on-surface-variant text-xs font-bold tracking-widest uppercase mb-6"
            style={{ fontFamily: "Manrope" }}>
            Daily Progress
          </Text>
          <HydrationRing current={current} goal={goal} />
          <View className="flex-row items-center gap-2 bg-surface-container-low rounded-full px-5 py-2.5 mt-6">
            <MaterialCommunityIcons name="clock-outline" size={14} color="#0058bf" />
            <Text className="text-sm text-on-surface" style={{ fontFamily: "Manrope", fontWeight: "500" }}>
              Last drink: <Text className="text-primary font-bold">45 mins ago</Text>
            </Text>
          </View>
        </View>

        {/* ─ Quick Add ─ */}
        <View className="bg-surface-container-lowest rounded-xl p-5 mb-4">
          <Text className="text-base font-bold mb-4 text-on-surface" style={{ fontFamily: "PlusJakartaSans" }}>
            Quick Refresh
          </Text>
          <View className="flex-row gap-3">
            <QuickAddBtn label="+250ml" sub="Glass" primary />
            <QuickAddBtn label="+500ml" sub="Bottle" />
          </View>
          <TouchableOpacity className="mt-3 py-4 bg-surface-container-high rounded-2xl items-center">
            <Text className="text-on-surface-variant font-bold" style={{ fontFamily: "PlusJakartaSans" }}>
              Custom Amount
            </Text>
          </TouchableOpacity>
        </View>

        {/* ─ Streak Card ─ */}
        <LinearGradient
          colors={["#006fef", "#0058bf"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 20, padding: 24, marginBottom: 16, overflow: "hidden" }}
        >
          <View className="flex-row items-center justify-between mb-2">
            <MaterialCommunityIcons name="fire" size={32} color="#56f5f8" />
            <View style={{ backgroundColor: "rgba(255,255,255,0.15)", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 }}>
              <Text style={{ color: "#fff", fontSize: 11, fontFamily: "Manrope", fontWeight: "700" }}>LVL 4</Text>
            </View>
          </View>
          <Text style={{ color: "#fff", fontSize: 22, fontFamily: "PlusJakartaSans", fontWeight: "800", marginBottom: 4 }}>
            Vital Streak
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontFamily: "Manrope", marginBottom: 16 }}>
            {streak} days in a row! Keep flowing.
          </Text>
          <View className="flex-row gap-2 items-end">
            {[60, 60, 60, 80, 100, 100, 45].map((h, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  height: h * 0.5,
                  backgroundColor: i >= 3 ? "#56f5f8" : "rgba(255,255,255,0.25)",
                  borderRadius: 999,
                }}
              />
            ))}
          </View>
        </LinearGradient>

        {/* ─ Next Reminder ─ */}
        <View className="bg-surface-container-lowest rounded-xl p-5 flex-row items-center gap-4">
          <View className="w-12 h-12 rounded-full bg-tertiary-fixed items-center justify-center">
            <MaterialCommunityIcons name="bell-ring" size={22} color="#070a61" />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-sm text-on-surface" style={{ fontFamily: "PlusJakartaSans" }}>Next Reminder</Text>
            <Text className="text-on-surface-variant text-xs" style={{ fontFamily: "Manrope" }}>2:30 PM • 250ml suggested</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={22} color="#0058bf" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
