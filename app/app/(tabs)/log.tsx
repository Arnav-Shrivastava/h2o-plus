import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useHydrationStore } from "../../stores/hydration";
import { router } from "expo-router";

// ─── Vessel data ──────────────────────────────────────────────────────────────
const VESSELS = [
  { id: "glass",   label: "Glass",   ml: 250,  icon: "cup",         bg: "#d8e2ff", iconColor: "#0058bf" },
  { id: "bottle",  label: "Bottle",  ml: 500,  icon: "bottle-soda", bg: "#5af8fb", iconColor: "#004f51" },
  { id: "mug",     label: "Mug",     ml: 350,  icon: "coffee",      bg: "#e6e8ea", iconColor: "#414755" },
  { id: "thermos", label: "Thermos", ml: 750,  icon: "shaker",     bg: "#e0e0ff", iconColor: "#4f54a3" },
] as const;

function formatTime(isoString: string) {
  const d = new Date(isoString);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function LogScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [custom, setCustom] = useState("");
  const { todaysLogs, logWater, settings, todaysTotalMl } = useHydrationStore();

  const selectedVessel = VESSELS.find((v) => v.id === selected);

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
            className="text-4xl font-black text-on-surface tracking-tight"
            style={{ fontFamily: "PlusJakartaSans" }}
          >
            Log Water
          </Text>
          <Text className="text-on-surface-variant text-base mt-1 leading-relaxed" style={{ fontFamily: "Manrope" }}>
            Stay in your flow. Choose a vessel or enter a custom amount to record your hydration.
          </Text>
        </View>

        {/* ─ Vessel Grid ─ */}
        <View className="flex-row flex-wrap gap-3 mb-8">
          {VESSELS.map((v) => {
            const isActive = selected === v.id;
            return (
              <TouchableOpacity
                key={v.id}
                activeOpacity={0.85}
                onPress={() => setSelected(isActive ? null : v.id)}
                style={{
                  width: "47%",
                  backgroundColor: isActive ? "#0058bf" : "#ffffff",
                  borderRadius: 20,
                  padding: 24,
                  alignItems: "center",
                  gap: 10,
                  shadowColor: "#191c1e",
                  shadowOpacity: 0.04,
                  shadowRadius: 12,
                  elevation: isActive ? 4 : 1,
                }}
              >
                <View style={{ width: 56, height: 56, borderRadius: 999, backgroundColor: isActive ? "rgba(255,255,255,0.2)" : v.bg, alignItems: "center", justifyContent: "center" }}>
                  <MaterialCommunityIcons
                    name={v.icon as any}
                    size={26}
                    color={isActive ? "#fff" : v.iconColor}
                  />
                </View>
                <Text style={{ fontFamily: "PlusJakartaSans", fontWeight: "700", fontSize: 16, color: isActive ? "#fff" : "#191c1e" }}>
                  {v.label}
                </Text>
                <Text style={{ fontFamily: "Manrope", fontSize: 13, color: isActive ? "rgba(255,255,255,0.7)" : "#414755" }}>
                  {v.ml}ml
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ─ Custom Entry ─ */}
        <View className="bg-surface-container-lowest rounded-xl p-6 mb-6">
          <Text className="text-xl font-bold text-on-surface mb-5" style={{ fontFamily: "PlusJakartaSans" }}>
            Custom Entry
          </Text>
          <Text className="text-xs text-on-surface-variant mb-2 ml-1" style={{ fontFamily: "Manrope" }}>
            Volume (ml)
          </Text>
          <TextInput
            value={custom}
            onChangeText={setCustom}
            keyboardType="numeric"
            placeholder="e.g. 400"
            placeholderTextColor="#c1c6d7"
            style={{
              backgroundColor: "#e0e3e5",
              borderRadius: 999,
              paddingHorizontal: 24,
              paddingVertical: 16,
              fontSize: 24,
              fontFamily: "PlusJakartaSans",
              fontWeight: "700",
              color: "#191c1e",
              marginBottom: 16,
            }}
          />
          <TouchableOpacity activeOpacity={0.85} onPress={() => {
            if (selectedVessel) {
              logWater(selectedVessel.ml, selectedVessel.id);
              setSelected(null);
            } else if (custom && !isNaN(Number(custom))) {
               const num = Number(custom);
               if(num > 0) {
                 logWater(num, "custom");
                 setCustom("");
               }
            }
          }}>
            <LinearGradient
              colors={["#0058bf", "#006fef"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 999, paddingVertical: 16, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }}
            >
              <MaterialCommunityIcons name="plus" size={20} color="#fff" />
              <Text style={{ color: "#fff", fontFamily: "PlusJakartaSans", fontWeight: "700", fontSize: 16 }}>
                {selectedVessel
                  ? `Log ${selectedVessel.ml}ml (${selectedVessel.label})`
                  : custom
                  ? `Log ${custom}ml`
                  : "Log Entry"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ─ Visual Feedback Card (editorial style) ─ */}
        <View className="mb-8 relative min-h-[220px] bg-primary-container/10 rounded-xl flex-col items-center justify-center p-8 overflow-hidden border border-primary/5">
          <View className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></View>
          <View className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></View>
          
          <Text style={{ fontFamily: "PlusJakartaSans", fontSize: 72, fontWeight: "900", color: "rgba(0, 88, 191, 0.1)", marginBottom: -10, letterSpacing: -2 }}>
            {settings?.dailyGoalMl ? Math.round((todaysTotalMl / settings.dailyGoalMl) * 100) : 0}%
          </Text>
          <Text style={{ fontFamily: "PlusJakartaSans", fontWeight: "800", fontSize: 24, color: "#191c1e", marginBottom: 8 }}>
            Vital Goal
          </Text>
          <Text style={{ fontFamily: "Manrope", color: "#414755", textAlign: "center", fontSize: 13, lineHeight: 20 }}>
            You're only <Text style={{ fontWeight: "700", color: "#0058bf" }}>{Math.max((settings?.dailyGoalMl || 2500) - todaysTotalMl, 0)}ml</Text> away from your daily sanctuary of health.
          </Text>
        </View>

        {/* ─ Recent Logs ─ */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-on-surface" style={{ fontFamily: "PlusJakartaSans" }}>
              Recent Hydration
            </Text>
            <TouchableOpacity onPress={() => router.push("/history")}>
              <Text className="text-primary text-sm font-bold" style={{ fontFamily: "Manrope" }}>
                View History
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ gap: 10 }}>
            {todaysLogs.length === 0 ? (
              <Text className="text-on-surface-variant text-center my-4" style={{ fontFamily: "Manrope" }}>
                You haven't logged any water today yet.
              </Text>
            ) : (
              todaysLogs.map((item) => {
                const vesselInfo = VESSELS.find(v => v.id === item.vesselType) || VESSELS[0];
                return (
                  <View
                    key={item.id}
                    className="flex-row items-center justify-between p-4 bg-surface-container-low rounded-xl"
                  >
                    <View className="flex-row items-center gap-3">
                      <View className="w-11 h-11 bg-white rounded-full items-center justify-center">
                        <MaterialCommunityIcons name={vesselInfo.icon as any} size={20} color={vesselInfo.iconColor} />
                      </View>
                      <View>
                        <Text className="font-bold text-on-surface text-sm" style={{ fontFamily: "Manrope" }}>
                          Water
                        </Text>
                        <Text className="text-on-surface-variant text-xs" style={{ fontFamily: "Manrope" }}>
                          {formatTime(item.loggedAt)} {item.vesselType ? `• ${vesselInfo.label}` : ''}
                        </Text>
                      </View>
                    </View>
                    <Text style={{ color: vesselInfo.iconColor, fontFamily: "PlusJakartaSans", fontWeight: "700", fontSize: 15 }}>
                      {item.amountMl}ml
                    </Text>
                  </View>
                );
              })
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
