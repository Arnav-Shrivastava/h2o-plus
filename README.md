<div align="center">

<img src="https://img.shields.io/badge/Platform-Android%20%7C%20iOS-blue?style=for-the-badge&logo=android" />
<img src="https://img.shields.io/badge/Built%20With-React%20Native%20%2B%20Expo-black?style=for-the-badge&logo=expo" />
<img src="https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/Offline-First-green?style=for-the-badge" />

# 💧 H2O+

### *Your personal hydration sanctuary.*
A premium, offline-first water tracking app for Android (and iOS) — built with React Native + Expo.

</div>

---

## ✨ Overview

**H2O+** helps you build and maintain healthy hydration habits through beautiful, friction-free water logging, intelligent reminders, and insightful history tracking — all without needing an internet connection.

The design language, *"The Fluid Sanctuary"*, draws from the restorative quality of water itself — soft glassmorphism, deep-ocean blues, and editorial typography that makes health tracking feel premium, not clinical.

---

## 📱 Screens

| Dashboard | Log Water | Reminder Settings | Hydration History |
|:---------:|:---------:|:-----------------:|:-----------------:|
| ![Dashboard](html%20ui%20mockups/dashboard/screen.png) | ![Log Water](html%20ui%20mockups/log_water/screen.png) | ![Reminders](html%20ui%20mockups/reminder_settings/screen.png) | ![History](html%20ui%20mockups/hydration_history/screen.png) |
| Daily progress ring, quick-add, streaks | Vessel picker + custom entry | Smart schedules & frequency | Weekly charts & daily breakdown |

---

## 🚀 Features

- **📊 Vital Flow Dashboard** — Animated circular hydration ring, daily goal progress, and a 7-day bar chart at a glance
- **⚡ One-Tap Logging** — Pre-set vessel amounts (250ml / 500ml) or a fully custom entry
- **🔔 Smart Reminders** — Configurable wake/wind-down times, frequency chips (every 30m → 2h), auto-pause when you're ahead of goal, and Weekend Mode
- **📈 History & Insights** — Weekly consistency score, goals-met tracker, and exportable daily breakdowns
- **✈️ Fully Offline** — All data stored locally on-device. No account. No server. No compromise.
- **🔥 Streak Tracking** — Gamified daily goal streaks to keep you motivated

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | React Native + Expo SDK 52 | Cross-platform, closest to the web mockups |
| **Styling** | NativeWind v4 (Tailwind CSS) | Design tokens port directly from mockups |
| **Navigation** | Expo Router (file-based) | Intuitive tab structure, like Next.js |
| **Database** | expo-sqlite + Drizzle ORM | Type-safe, offline-first local storage |
| **State** | Zustand + MMKV | Lightweight global state + fast persistence |
| **Notifications** | expo-notifications | Local scheduled alerts, fully offline |
| **Charts** | react-native-svg + Victory Native | SVG ring + bar charts matching the design |
| **Blur/Glass** | expo-blur | Glassmorphism nav bars and overlays |
| **Gradients** | expo-linear-gradient | Signature blue-to-cyan gradient CTAs |

---

## 🎨 Design System

The app follows a custom Material Design 3-inspired token system called **"Vital Flow"**:

- **Primary:** `#0058bf` → `#006fef` (signature gradient)
- **Secondary:** `#00696b` (teal accent)
- **Surface:** `#f7f9fb` (soft white canvas)
- **Typography:** Plus Jakarta Sans (display/headlines) + Manrope (body/labels)
- **Rules:** No 1px borders, no black (`#000`), no sharp corners — tonal layering only

→ Full spec in [`html ui mockups/vital_flow/DESIGN.md`](html%20ui%20mockups/vital_flow/DESIGN.md)

---

## 📂 Project Structure *(coming soon)*

```
h2o-plus/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Dashboard
│   │   ├── log.tsx            # Log Water
│   │   ├── reminders.tsx      # Reminder Settings
│   │   └── history.tsx        # Hydration History
│   └── _layout.tsx
├── components/
│   ├── HydrationRing.tsx      # SVG circular progress
│   ├── WaterBar.tsx           # Weekly bar chart
│   └── VesselCard.tsx         # Quick-log vessel cards
├── db/
│   └── schema.ts              # Drizzle SQLite schema
├── stores/
│   └── hydration.ts           # Zustand global store
├── lib/
│   └── notifications.ts       # Notification scheduler
├── html ui mockups/           # Original design mockups
└── tailwind.config.js
```

---

## 🏁 Getting Started *(coming soon)*

```bash
# Clone the repo
git clone https://github.com/Arnav-Shrivastava/h2o-plus.git
cd h2o-plus

# Install dependencies
npm install

# Start development server
npx expo start
```

---

## 📋 Roadmap

- [x] UI/UX Design & Mockups
- [x] Design system documentation (Vital Flow)
- [x] Project scaffold (Expo + NativeWind)
- [x] SQLite schema + Drizzle ORM setup
- [ ] Dashboard screen
- [ ] Log Water screen
- [ ] Reminder Settings screen + notification scheduler
- [ ] Hydration History screen + charts
- [ ] App icon + splash screen
- [ ] EAS production build (`.apk`)

---

## 👤 Author

**Arnav** — [github.com/Arnav-Shrivastava](https://github.com/Arnav-Shrivastava)

---

<div align="center">
  <sub>Designed with intent. Built for habit. 💧</sub>
</div>
