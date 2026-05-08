# Week 1 Foundation — Scaffold & Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the blank Expo TypeScript project into a fully structured Mayari app shell — Expo Router configured, all dependencies installed, folder structure in place, Supabase client + TanStack Query + Zustand stores wired up, 5-tab navigation shell rendering on device.

**Architecture:** The Expo app lives at `mayari/` inside the repo root. All commands run from that subdirectory. We migrate from the blank `App.tsx` entry point to Expo Router (file-based routing via the `app/` directory). Screens are real placeholder components (not `null` exports) so the tab bar renders end-to-end from day one.

**Tech Stack:** Expo SDK 54, Expo Router v4, Supabase JS, TanStack Query v5, Zustand v5, TypeScript strict

---

## Prerequisites

- [ ] User must provide `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` before Task 6.
- [ ] All commands below are run from the `mayari/` directory (not the repo root).

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Delete | `mayari/App.tsx` | Replaced by Expo Router |
| Delete | `mayari/index.ts` | Replaced by expo-router/entry |
| Modify | `mayari/package.json` | `main` → `expo-router/entry` |
| Modify | `mayari/app.json` | Add scheme, plugins, dark splash |
| Create | `mayari/.env` | Env var template (committed empty) |
| Create | `mayari/constants/theme.ts` | All design tokens |
| Create | `mayari/lib/supabase.ts` | Supabase client singleton |
| Create | `mayari/lib/paymongo.ts` | PayMongo public key placeholder |
| Create | `mayari/lib/queryClient.ts` | TanStack Query client config |
| Create | `mayari/stores/authStore.ts` | Zustand: user session + profile |
| Create | `mayari/stores/workoutStore.ts` | Zustand: active workout state |
| Create | `mayari/stores/uiStore.ts` | Zustand: theme + language pref |
| Create | `mayari/types/database.ts` | TypeScript types matching schema |
| Create | `mayari/app/index.tsx` | Root index — redirects to (auth) |
| Create | `mayari/app/_layout.tsx` | Root layout (QueryClient + font provider) |
| Create | `mayari/app/(auth)/_layout.tsx` | Auth group layout (unauthenticated) |
| Create | `mayari/app/(auth)/index.tsx` | Splash / onboarding placeholder |
| Create | `mayari/app/(auth)/login.tsx` | Login placeholder |
| Create | `mayari/app/(auth)/signup.tsx` | Signup placeholder |
| Create | `mayari/app/(auth)/verify.tsx` | OTP verification placeholder |
| Create | `mayari/app/(auth)/onboarding/[step].tsx` | 7-step wizard placeholder |
| Create | `mayari/app/(tabs)/_layout.tsx` | 5-tab navigator (dark theme, indigo Coach tab) |
| Create | `mayari/app/(tabs)/index.tsx` | Home/Dashboard placeholder |
| Create | `mayari/app/(tabs)/workout/index.tsx` | Workout home placeholder |
| Create | `mayari/app/(tabs)/coach/index.tsx` | Coach Mayari placeholder |
| Create | `mayari/app/(tabs)/nutrition/index.tsx` | Nutrition diary placeholder |
| Create | `mayari/app/(tabs)/profile/index.tsx` | Profile placeholder |
| Create | `mayari/components/ui/.gitkeep` | Reserve folder |
| Create | `mayari/components/workout/.gitkeep` | Reserve folder |
| Create | `mayari/components/nutrition/.gitkeep` | Reserve folder |
| Create | `mayari/components/coach/.gitkeep` | Reserve folder |
| Create | `mayari/components/shared/.gitkeep` | Reserve folder |
| Create | `mayari/hooks/.gitkeep` | Reserve folder |
| Create | `mayari/constants/exercises.ts` | Empty placeholder export |
| Create | `mayari/constants/phFoods.ts` | Empty placeholder export |
| Create | `mayari/supabase/migrations/.gitkeep` | Reserve folder |
| Create | `mayari/supabase/functions/coach-chat/.gitkeep` | Reserve folder |
| Create | `mayari/supabase/functions/verify-photo/.gitkeep` | Reserve folder |

---

## Task 1: Install All Dependencies

**Files:** `mayari/package.json` (auto-updated by expo install / npm install)

- [ ] **Step 1.1: Install Expo-managed packages**

  Run from `mayari/`:
  ```bash
  npx expo install expo-router expo-font expo-splash-screen expo-status-bar
  npx expo install @supabase/supabase-js @react-native-async-storage/async-storage
  npx expo install expo-location expo-camera expo-barcode-scanner expo-av
  npx expo install expo-document-picker expo-image-picker
  npx expo install expo-notifications expo-device expo-constants
  ```
  `npx expo install` resolves peer-compatible versions automatically. Run each line and wait for completion.

- [ ] **Step 1.2: Install npm packages**

  ```bash
  npm install zustand @tanstack/react-query
  npm install react-native-maps
  ```

  Note: `@anthropic-ai/sdk` is intentionally NOT installed in the mobile app. Per CLAUDE.md, Claude API is only called from Supabase Edge Functions (Deno environment), which manage their own imports.

- [ ] **Step 1.3: Verify no peer-dependency errors**

  ```bash
  npx expo-doctor
  ```
  Expected: all checks pass or show only known warnings. Fix any `INCOMPATIBLE_PACKAGE` errors before proceeding.

---

## Task 2: Migrate to Expo Router

**Files:** `mayari/package.json`, `mayari/app.json`, delete `mayari/App.tsx` + `mayari/index.ts`

- [ ] **Step 2.1: Update package.json main entry**

  In `mayari/package.json`, change:
  ```json
  "main": "index.ts",
  ```
  to:
  ```json
  "main": "expo-router/entry",
  ```

- [ ] **Step 2.2: Update app.json**

  Replace `mayari/app.json` with:
  ```json
  {
    "expo": {
      "name": "Mayari",
      "slug": "mayari",
      "version": "1.0.0",
      "orientation": "portrait",
      "icon": "./assets/icon.png",
      "scheme": "mayari",
      "userInterfaceStyle": "dark",
      "newArchEnabled": true,
      "splash": {
        "image": "./assets/splash-icon.png",
        "resizeMode": "contain",
        "backgroundColor": "#0A0A1E"
      },
      "ios": {
        "supportsTablet": false,
        "bundleIdentifier": "com.mayari.app"
      },
      "android": {
        "adaptiveIcon": {
          "foregroundImage": "./assets/adaptive-icon.png",
          "backgroundColor": "#0A0A1E"
        },
        "package": "com.mayari.app",
        "edgeToEdgeEnabled": true,
        "predictiveBackGestureEnabled": false
      },
      "web": {
        "bundler": "metro",
        "favicon": "./assets/favicon.png"
      },
      "plugins": [
        "expo-router",
        "expo-font",
        [
          "expo-splash-screen",
          {
            "backgroundColor": "#0A0A1E",
            "resizeMode": "contain"
          }
        ]
      ],
      "experiments": {
        "typedRoutes": true
      }
    }
  }
  ```

- [ ] **Step 2.3: Delete legacy entry files**

  ```bash
  rm mayari/App.tsx
  rm mayari/index.ts
  ```

---

## Task 3: Create Design Tokens

**Files:** `mayari/constants/theme.ts`

- [ ] **Step 3.1: Write theme constants**

  Create `mayari/constants/theme.ts`:
  ```typescript
  export const colors = {
    bg: {
      primary:   '#0A0A1E',
      secondary: '#13132E',
      elevated:  '#1A1A3E',
    },
    brand: {
      primary:   '#6366F1',
      secondary: '#A78BFA',
      accent:    '#F59E0B',
    },
    text: {
      primary:   '#F1F5F9',
      secondary: '#94A3B8',
      muted:     '#475569',
    },
    success: '#22C55E',
    warning: '#F59E0B',
    error:   '#EF4444',
    border:  '#1E2040',
  } as const;

  export const typography = {
    xs:   12,
    sm:   14,
    base: 16,
    lg:   18,
    xl:   20,
    '2xl': 24,
    '3xl': 30,
  } as const;

  export const spacing = {
    xs:  4,
    sm:  8,
    md:  16,
    lg:  24,
    xl:  32,
    '2xl': 48,
  } as const;
  ```

- [ ] **Step 3.2: Create placeholder constant files**

  Create `mayari/constants/exercises.ts`:
  ```typescript
  // Populated in Week 2 via Wger API seed
  export const fallbackExercises: never[] = [];
  ```

  Create `mayari/constants/phFoods.ts`:
  ```typescript
  // Populated in Week 3 with PH food seed data
  export const phFoodSeed: never[] = [];
  ```

---

## Task 4: Create TypeScript Database Types

**Files:** `mayari/types/database.ts`

- [ ] **Step 4.1: Write skeleton types matching Supabase schema**

  Create `mayari/types/database.ts`:
  ```typescript
  export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
  export type PrimaryGoal = 'build_muscle' | 'lose_fat' | 'maintain' | 'improve_fitness';
  export type EquipmentType = 'full_gym' | 'dumbbells' | 'barbell' | 'bodyweight';
  export type SubscriptionStatus = 'free' | 'beta' | 'active' | 'achiever';
  export type LocationPrecision = 'exact' | 'approx' | 'hidden';
  export type MealSlot = 'almusal' | 'tanghalian' | 'merienda' | 'hapunan';
  export type MessageRole = 'user' | 'assistant';
  export type MessageType = 'chat' | 'plan_generation' | 'photo_analysis';
  export type BuddyRequestStatus = 'pending' | 'accepted' | 'rejected' | 'blocked';

  export interface UserProfile {
    id: string;
    username: string;
    display_name: string;
    avatar_url: string | null;
    birthdate: string | null;
    experience_level: ExperienceLevel;
    primary_goal: PrimaryGoal;
    equipment_type: EquipmentType;
    workout_days: number[];
    session_duration_min: number;
    body_weight_kg: number | null;
    height_cm: number | null;
    target_weight_kg: number | null;
    language_pref: 'en' | 'fil';
    meal_time_style: 'filipino' | 'generic';
    subscription_status: SubscriptionStatus;
    subscription_expires_at: string | null;
    referral_code: string;
    referred_by: string | null;
    created_at: string;
    updated_at: string;
  }

  export interface WorkoutPlan {
    id: string;
    user_id: string;
    split_type: string;
    days_per_week: number;
    plan_data: Record<string, unknown>;
    is_active: boolean;
    generated_by: string;
    created_at: string;
  }

  export interface WorkoutSession {
    id: string;
    user_id: string;
    plan_id: string | null;
    started_at: string;
    ended_at: string | null;
    total_volume_kg: number;
    notes: string | null;
    xp_earned: number;
    created_at: string;
  }

  export interface WorkoutSet {
    id: string;
    session_id: string;
    exercise_id: string;
    exercise_name: string;
    set_number: number;
    weight_kg: number;
    reps: number;
    is_warmup: boolean;
    completed_at: string;
  }

  export interface Exercise {
    id: string;
    name: string;
    muscle_group: 'push' | 'pull' | 'legs' | 'core';
    muscles_primary: string[];
    muscles_secondary: string[];
    equipment: string[];
    category: string;
    description: string;
  }

  export interface PersonalRecord {
    id: string;
    user_id: string;
    exercise_id: string;
    exercise_name: string;
    weight_kg: number;
    reps: number;
    achieved_at: string;
  }

  export interface FoodItem {
    id: string;
    name: string;
    name_fil: string | null;
    brand: string | null;
    is_ph_local: boolean;
    calories_per_100g: number;
    protein_per_100g: number;
    carbs_per_100g: number;
    fat_per_100g: number;
    fiber_per_100g: number;
    barcode: string | null;
    source: 'custom' | 'open_food_facts' | 'ph_seed';
  }

  export interface FoodLog {
    id: string;
    user_id: string;
    food_item_id: string;
    meal_slot: MealSlot;
    quantity_g: number;
    logged_at: string;
    photo_url: string | null;
    ai_estimated: boolean;
  }

  export interface WaterLog {
    id: string;
    user_id: string;
    amount_ml: number;
    logged_at: string;
  }

  export interface BodyMeasurement {
    id: string;
    user_id: string;
    measured_at: string;
    weight_kg: number | null;
    body_fat_pct: number | null;
    waist_cm: number | null;
    chest_cm: number | null;
    arms_cm: number | null;
    legs_cm: number | null;
    notes: string | null;
  }

  export interface CoachMessage {
    id: string;
    user_id: string;
    role: MessageRole;
    content: string;
    message_type: MessageType;
    created_at: string;
  }

  export interface Streak {
    id: string;
    user_id: string;
    workout_current: number;
    workout_longest: number;
    nutrition_current: number;
    nutrition_longest: number;
    last_workout_date: string | null;
    last_nutrition_date: string | null;
  }
  ```

---

## Task 5: Create Lib Files

**Files:** `mayari/lib/queryClient.ts`

- [ ] **Step 5.1: Write TanStack Query client config**

  Create `mayari/lib/queryClient.ts`:
  ```typescript
  import { QueryClient } from '@tanstack/react-query';

  export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,   // 5 minutes
        gcTime:    1000 * 60 * 10,  // 10 minutes
        retry: 1,
      },
    },
  });
  ```

- [ ] **Step 5.2: Write PayMongo client placeholder**

  Create `mayari/lib/paymongo.ts`:
  ```typescript
  // PayMongo integration — implemented in Week 6
  // Public key is safe to expose; secret key lives only in Supabase Edge Functions.
  const PAYMONGO_PUBLIC_KEY = process.env.EXPO_PUBLIC_PAYMONGO_PUBLIC_KEY ?? '';

  export const paymongo = {
    publicKey: PAYMONGO_PUBLIC_KEY,
  };
  ```

---

## Task 6: Create Supabase Client

**Files:** `mayari/lib/supabase.ts`, `mayari/.env`

> **Prerequisite:** You need `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` from the user before this step.

- [ ] **Step 6.1: Create .env file**

  Create `mayari/.env` (replace placeholders with real values from user):
  ```
  EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
  EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
  EXPO_PUBLIC_PAYMONGO_PUBLIC_KEY=
  ```

- [ ] **Step 6.2: Write Supabase client**

  Create `mayari/lib/supabase.ts`:
  ```typescript
  import { createClient } from '@supabase/supabase-js';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

  export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
  ```

- [ ] **Step 6.3: Ensure .env is gitignored**

  Check `mayari/.gitignore` (created by Expo). If `.env` is not listed, add it:
  ```
  .env
  .env.local
  ```

---

## Task 7: Create Zustand Stores

**Files:** `mayari/stores/authStore.ts`, `mayari/stores/workoutStore.ts`, `mayari/stores/uiStore.ts`

- [ ] **Step 7.1: Auth store**

  Create `mayari/stores/authStore.ts`:
  ```typescript
  import { create } from 'zustand';
  import type { UserProfile } from '../types/database';

  interface AuthState {
    session: { user: { id: string } } | null;
    profile: UserProfile | null;
    setSession: (session: AuthState['session']) => void;
    setProfile: (profile: UserProfile | null) => void;
    clear: () => void;
  }

  export const useAuthStore = create<AuthState>((set) => ({
    session: null,
    profile: null,
    setSession: (session) => set({ session }),
    setProfile: (profile) => set({ profile }),
    clear: () => set({ session: null, profile: null }),
  }));
  ```

- [ ] **Step 7.2: Workout store**

  Create `mayari/stores/workoutStore.ts`:
  ```typescript
  import { create } from 'zustand';
  import type { WorkoutSet } from '../types/database';

  interface ActiveSet extends Omit<WorkoutSet, 'id' | 'completed_at'> {}

  interface WorkoutState {
    sessionId: string | null;
    sets: ActiveSet[];
    isResting: boolean;
    restSecondsLeft: number;
    startSession: (sessionId: string) => void;
    addSet: (set: ActiveSet) => void;
    setRest: (seconds: number) => void;
    tickRest: () => void;
    endSession: () => void;
  }

  export const useWorkoutStore = create<WorkoutState>((set) => ({
    sessionId: null,
    sets: [],
    isResting: false,
    restSecondsLeft: 0,
    startSession: (sessionId) => set({ sessionId, sets: [] }),
    addSet: (newSet) => set((s) => ({ sets: [...s.sets, newSet] })),
    setRest: (seconds) => set({ isResting: true, restSecondsLeft: seconds }),
    tickRest: () =>
      set((s) => ({
        restSecondsLeft: Math.max(0, s.restSecondsLeft - 1),
        isResting: s.restSecondsLeft > 1,
      })),
    endSession: () => set({ sessionId: null, sets: [], isResting: false }),
  }));
  ```

- [ ] **Step 7.3: UI store**

  Create `mayari/stores/uiStore.ts`:
  ```typescript
  import { create } from 'zustand';

  interface UIState {
    language: 'en' | 'fil';
    mealTimeStyle: 'filipino' | 'generic';
    setLanguage: (lang: UIState['language']) => void;
    setMealTimeStyle: (style: UIState['mealTimeStyle']) => void;
  }

  export const useUIStore = create<UIState>((set) => ({
    language: 'en',
    mealTimeStyle: 'filipino',
    setLanguage: (language) => set({ language }),
    setMealTimeStyle: (mealTimeStyle) => set({ mealTimeStyle }),
  }));
  ```

---

## Task 8: Create Root and Auth Layouts

**Files:** `mayari/app/_layout.tsx`, `mayari/app/(auth)/_layout.tsx`

- [ ] **Step 8.1: Root index redirect**

  Create `mayari/app/index.tsx` — redirects to the auth flow (will redirect to tabs once auth is built in Week 2):
  ```typescript
  import { Redirect } from 'expo-router';

  export default function RootIndex() {
    return <Redirect href="/(auth)" />;
  }
  ```

- [ ] **Step 8.2: Root layout**

  Create `mayari/app/_layout.tsx`:
  ```typescript
  import { Stack } from 'expo-router';
  import { QueryClientProvider } from '@tanstack/react-query';
  import { StatusBar } from 'expo-status-bar';
  import { queryClient } from '../lib/queryClient';

  export default function RootLayout() {
    return (
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </QueryClientProvider>
    );
  }
  ```

- [ ] **Step 8.2: Auth group layout**

  Create `mayari/app/(auth)/_layout.tsx`:
  ```typescript
  import { Stack } from 'expo-router';

  export default function AuthLayout() {
    return (
      <Stack screenOptions={{ headerShown: false }} />
    );
  }
  ```

---

## Task 9: Create Auth Screen Placeholders

**Files:** `app/(auth)/index.tsx`, `login.tsx`, `signup.tsx`, `verify.tsx`, `onboarding/[step].tsx`

- [ ] **Step 9.1: Splash placeholder**

  Create `mayari/app/(auth)/index.tsx`:
  ```typescript
  import { View, Text, StyleSheet } from 'react-native';
  import { colors, typography } from '../../constants/theme';

  export default function SplashScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🌙 Mayari</Text>
        <Text style={styles.sub}>Your Filipino fitness companion</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: colors.brand.secondary,
      fontSize: typography['3xl'],
      fontWeight: 'bold',
    },
    sub: {
      color: colors.text.secondary,
      fontSize: typography.base,
      marginTop: 8,
    },
  });
  ```

- [ ] **Step 9.2: Login placeholder**

  Create `mayari/app/(auth)/login.tsx`:
  ```typescript
  import { View, Text, StyleSheet } from 'react-native';
  import { colors, typography } from '../../constants/theme';

  export default function LoginScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Login — Week 1 placeholder</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center' },
    text: { color: colors.text.primary, fontSize: typography.base },
  });
  ```

- [ ] **Step 9.3: Signup placeholder**

  Create `mayari/app/(auth)/signup.tsx`:
  ```typescript
  import { View, Text, StyleSheet } from 'react-native';
  import { colors, typography } from '../../constants/theme';

  export default function SignupScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sign Up — Week 1 placeholder</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center' },
    text: { color: colors.text.primary, fontSize: typography.base },
  });
  ```

- [ ] **Step 9.4: OTP verify placeholder**

  Create `mayari/app/(auth)/verify.tsx`:
  ```typescript
  import { View, Text, StyleSheet } from 'react-native';
  import { colors, typography } from '../../constants/theme';

  export default function VerifyScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>OTP Verify — Week 1 placeholder</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center' },
    text: { color: colors.text.primary, fontSize: typography.base },
  });
  ```

- [ ] **Step 9.5: Onboarding wizard placeholder**

  Create `mayari/app/(auth)/onboarding/[step].tsx`:
  ```typescript
  import { View, Text, StyleSheet } from 'react-native';
  import { useLocalSearchParams } from 'expo-router';
  import { colors, typography } from '../../../constants/theme';

  export default function OnboardingStep() {
    const { step } = useLocalSearchParams<{ step: string }>();
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Onboarding Step {step} — Week 1 placeholder</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center' },
    text: { color: colors.text.primary, fontSize: typography.base },
  });
  ```

---

## Task 10: Create 5-Tab Navigator

**Files:** `mayari/app/(tabs)/_layout.tsx` and five placeholder tab screens

- [ ] **Step 10.1: Tab navigator layout**

  Create `mayari/app/(tabs)/_layout.tsx`:
  ```typescript
  import { Tabs } from 'expo-router';
  import { colors } from '../../constants/theme';

  export default function TabsLayout() {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.bg.primary,
            borderTopColor: colors.border,
          },
          tabBarActiveTintColor: colors.brand.primary,
          tabBarInactiveTintColor: colors.text.muted,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ title: 'Home', tabBarIcon: () => null }}
        />
        <Tabs.Screen
          name="workout"
          options={{ title: 'Workout', tabBarIcon: () => null }}
        />
        <Tabs.Screen
          name="coach"
          options={{
            title: '🌙 Coach',
            tabBarActiveTintColor: colors.brand.primary,
            tabBarStyle: {
              backgroundColor: colors.bg.primary,
              borderTopColor: colors.border,
            },
          }}
        />
        <Tabs.Screen
          name="nutrition"
          options={{ title: 'Nutrition', tabBarIcon: () => null }}
        />
        <Tabs.Screen
          name="profile"
          options={{ title: 'Profile', tabBarIcon: () => null }}
        />
      </Tabs>
    );
  }
  ```

- [ ] **Step 10.2: Home tab placeholder**

  Create `mayari/app/(tabs)/index.tsx`:
  ```typescript
  import { View, Text, StyleSheet } from 'react-native';
  import { colors, typography } from '../../constants/theme';

  export default function HomeScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>Kumusta! 💪</Text>
        <Text style={styles.sub}>Home — Week 1 placeholder</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center' },
    greeting: { color: colors.brand.secondary, fontSize: typography.xl, fontWeight: 'bold' },
    sub: { color: colors.text.secondary, fontSize: typography.sm, marginTop: 8 },
  });
  ```

- [ ] **Step 10.3: Workout tab placeholder**

  Create `mayari/app/(tabs)/workout/index.tsx`:
  ```typescript
  import { View, Text, StyleSheet } from 'react-native';
  import { colors, typography } from '../../../constants/theme';

  export default function WorkoutScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Wala pang workout ngayon. Magsimula na tayo!</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center', padding: 24 },
    text: { color: colors.text.secondary, fontSize: typography.base, textAlign: 'center' },
  });
  ```

- [ ] **Step 10.4: Coach tab placeholder**

  Create `mayari/app/(tabs)/coach/index.tsx`:
  ```typescript
  import { View, Text, StyleSheet } from 'react-native';
  import { colors, typography } from '../../../constants/theme';

  export default function CoachScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Coach Mayari 🌙</Text>
        <Text style={styles.sub}>AI Coach — Week 4</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center' },
    title: { color: colors.brand.primary, fontSize: typography.xl, fontWeight: 'bold' },
    sub: { color: colors.text.muted, fontSize: typography.sm, marginTop: 8 },
  });
  ```

- [ ] **Step 10.5: Nutrition tab placeholder**

  Create `mayari/app/(tabs)/nutrition/index.tsx`:
  ```typescript
  import { View, Text, StyleSheet } from 'react-native';
  import { colors, typography } from '../../../constants/theme';

  export default function NutritionScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Almusal / Tanghalian / Merienda / Hapunan</Text>
        <Text style={styles.sub}>Nutrition — Week 3 placeholder</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center' },
    text: { color: colors.text.secondary, fontSize: typography.base },
    sub: { color: colors.text.muted, fontSize: typography.sm, marginTop: 8 },
  });
  ```

- [ ] **Step 10.6: Profile tab placeholder**

  Create `mayari/app/(tabs)/profile/index.tsx`:
  ```typescript
  import { View, Text, StyleSheet } from 'react-native';
  import { colors, typography } from '../../../constants/theme';

  export default function ProfileScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Profile — Week 1 placeholder</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center' },
    text: { color: colors.text.primary, fontSize: typography.base },
  });
  ```

---

## Task 11: Create Reserve Folders and Placeholder Files

**Files:** `.gitkeep` files for empty directories

- [ ] **Step 11.1: Create all component and utility subdirectories**

  ```bash
  mkdir -p mayari/components/ui
  mkdir -p mayari/components/workout
  mkdir -p mayari/components/nutrition
  mkdir -p mayari/components/coach
  mkdir -p mayari/components/shared
  mkdir -p mayari/hooks
  mkdir -p mayari/supabase/migrations
  mkdir -p mayari/supabase/functions/coach-chat
  mkdir -p mayari/supabase/functions/verify-photo
  ```

  Then create `.gitkeep` in each:
  ```bash
  touch mayari/components/ui/.gitkeep
  touch mayari/components/workout/.gitkeep
  touch mayari/components/nutrition/.gitkeep
  touch mayari/components/coach/.gitkeep
  touch mayari/components/shared/.gitkeep
  touch mayari/hooks/.gitkeep
  touch mayari/supabase/migrations/.gitkeep
  touch mayari/supabase/functions/coach-chat/.gitkeep
  touch mayari/supabase/functions/verify-photo/.gitkeep
  ```

---

## Task 12: Verify and Commit

- [ ] **Step 12.1: TypeScript check**

  ```bash
  cd mayari && npx tsc --noEmit
  ```
  Expected: zero errors.

- [ ] **Step 12.2: Start the app and verify 5 tabs render**

  ```bash
  cd mayari && npx expo start
  ```
  - Scan QR with Expo Go (or press `a` for Android emulator / `i` for iOS simulator)
  - Expected: app opens to `(auth)/index.tsx` showing "🌙 Mayari"
  - Navigate to `(tabs)` by confirming route — or temporarily change root redirect
  - Verify 5 tabs appear with dark background and indigo active tint

- [ ] **Step 12.3: Commit**

  ```bash
  git add mayari/
  git commit -m "feat: scaffold Mayari — Expo Router, 5-tab shell, Supabase client, all deps installed"
  ```
