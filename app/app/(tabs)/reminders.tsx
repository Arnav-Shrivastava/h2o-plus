import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

const FREQUENCIES = ["Every 30m", "Every Hour", "Every 2h", "Custom"];

export default function RemindersScreen() {
  const [activeFreq, setActiveFreq] = useState("Every 30m");
  const [smartReminders, setSmartReminders] = useState(true);
  const [weekendMode, setWeekendMode] = useState(false);
  const [goalMl] = useState(2800);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f9fb" />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ─ Header ─ */}
        <View className="pt-5 mb-8">
          <Text
            className="text-4xl font-black text-on-surface tracking-tight"
            style={{ fontFamily: "PlusJakartaSans" }}
          >
            Reminders
          </Text>
          <Text className="text-on-surface-variant text-base mt-1" style={{ fontFamily: "Manrope" }}>
            Fine-tune your targets for a healthier flow.
          </Text>
        </View>

        {/* ─ Daily Goal Card ─ */}
        <View className="bg-surface-container-lowest rounded-xl p-6 mb-5">
          <Text className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mb-4" style={{ fontFamily: "Manrope" }}>
            Daily Hydration Goal
          </Text>
          <View className="flex-row items-baseline gap-1 mb-5">
            <Text className="text-5xl font-black text-primary" style={{ fontFamily: "PlusJakartaSans" }}>
              {goalMl.toLocaleString()}
            </Text>
            <Text className="text-lg font-bold text-on-surface-variant" style={{ fontFamily: "PlusJakartaSans" }}>
              ml
            </Text>
          </View>
          {/* Slider track (visual only for now) */}
          <View className="w-full h-3 bg-surface-container-high rounded-full mb-2 overflow-hidden">
            <LinearGradient
              colors={["#0058bf", "#006fef"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: "70%", height: "100%", borderRadius: 999 }}
            />
          </View>
          <View className="flex-row justify-between">
            <Text className="text-xs text-outline" style={{ fontFamily: "Manrope" }}>1,500ml</Text>
            <Text className="text-xs text-outline" style={{ fontFamily: "Manrope" }}>4,000ml</Text>
          </View>
        </View>

        {/* ─ Wake / Wind-down ─ */}
        <View className="flex-row gap-3 mb-5">
          {/* Wake Up */}
          <View className="flex-1 bg-surface-container-low p-5 rounded-xl">
            <MaterialCommunityIcons name="weather-sunny" size={22} color="#0058bf" />
            <Text className="font-bold text-base text-on-surface mt-2" style={{ fontFamily: "PlusJakartaSans" }}>
              Wake Up
            </Text>
            <Text className="text-on-surface-variant text-xs mb-3" style={{ fontFamily: "Manrope" }}>
              First reminder
            </Text>
            <View className="bg-surface-container-lowest rounded-2xl px-4 py-3 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-on-surface" style={{ fontFamily: "PlusJakartaSans" }}>07:30</Text>
              <Text className="text-primary text-xs font-bold uppercase" style={{ fontFamily: "Manrope" }}>AM</Text>
            </View>
          </View>
          {/* Wind Down */}
          <View className="flex-1 bg-surface-container-low p-5 rounded-xl">
            <MaterialCommunityIcons name="weather-night" size={22} color="#4f54a3" />
            <Text className="font-bold text-base text-on-surface mt-2" style={{ fontFamily: "PlusJakartaSans" }}>
              Wind Down
            </Text>
            <Text className="text-on-surface-variant text-xs mb-3" style={{ fontFamily: "Manrope" }}>
              Last reminder
            </Text>
            <View className="bg-surface-container-lowest rounded-2xl px-4 py-3 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-on-surface" style={{ fontFamily: "PlusJakartaSans" }}>10:00</Text>
              <Text className="text-tertiary text-xs font-bold uppercase" style={{ fontFamily: "Manrope" }}>PM</Text>
            </View>
          </View>
        </View>

        {/* ─ Frequency Chips ─ */}
        <View className="mb-5">
          <Text className="font-bold text-base text-on-surface mb-3" style={{ fontFamily: "PlusJakartaSans" }}>
            Reminder Frequency
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {FREQUENCIES.map((f) => {
              const isActive = activeFreq === f;
              return (
                <TouchableOpacity
                  key={f}
                  onPress={() => setActiveFreq(f)}
                  activeOpacity={0.8}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 999,
                    backgroundColor: isActive ? "#5af8fb" : "#e6e8ea",
                  }}
                >
                  <Text style={{
                    fontFamily: "Manrope",
                    fontWeight: "600",
                    fontSize: 13,
                    color: isActive ? "#002020" : "#414755",
                  }}>
                    {f}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ─ Smart Toggles ─ */}
        <View style={{ gap: 10, marginBottom: 24 }}>
          {/* Smart Reminders */}
          <View className="bg-surface-container-low p-5 rounded-xl flex-row items-center">
            <View className="w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mr-4">
              <MaterialCommunityIcons name="auto-fix" size={22} color="#0058bf" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-sm text-on-surface" style={{ fontFamily: "PlusJakartaSans" }}>
                Smart Reminders
              </Text>
              <Text className="text-xs text-on-surface-variant" style={{ fontFamily: "Manrope" }}>
                Pause when you're ahead of goal
              </Text>
            </View>
            <Switch
              value={smartReminders}
              onValueChange={setSmartReminders}
              trackColor={{ false: "#e0e3e5", true: "#0058bf" }}
              thumbColor="#fff"
            />
          </View>
          {/* Weekend Mode */}
          <View className="bg-surface-container-low p-5 rounded-xl flex-row items-center">
            <View className="w-12 h-12 rounded-2xl bg-secondary/10 items-center justify-center mr-4">
              <MaterialCommunityIcons name="sofa" size={22} color="#00696b" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-sm text-on-surface" style={{ fontFamily: "PlusJakartaSans" }}>
                Weekend Mode
              </Text>
              <Text className="text-xs text-on-surface-variant" style={{ fontFamily: "Manrope" }}>
                Reduce frequency Sat/Sun
              </Text>
            </View>
            <Switch
              value={weekendMode}
              onValueChange={setWeekendMode}
              trackColor={{ false: "#e0e3e5", true: "#00696b" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* ─ Save Button ─ */}
        <TouchableOpacity activeOpacity={0.85}>
          <LinearGradient
            colors={["#0058bf", "#006fef"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 999, paddingVertical: 18, alignItems: "center" }}
          >
            <Text style={{ color: "#fff", fontFamily: "PlusJakartaSans", fontWeight: "700", fontSize: 17 }}>
              Save Changes
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
