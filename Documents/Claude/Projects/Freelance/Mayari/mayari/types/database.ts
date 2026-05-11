export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type PrimaryGoal = 'build_muscle' | 'lose_fat' | 'maintain' | 'improve_fitness';
export type EquipmentType = 'full_gym' | 'dumbbells' | 'barbell' | 'bodyweight';
export type SubscriptionStatus = 'free' | 'beta' | 'active' | 'achiever';
export type LocationPrecision = 'exact' | 'approx' | 'hidden';
export type MealSlot = 'almusal' | 'tanghalian' | 'merienda' | 'hapunan';
export type MessageRole = 'user' | 'assistant';
export type MessageType = 'chat' | 'plan_generation' | 'photo_analysis';
export type BuddyRequestStatus = 'pending' | 'accepted' | 'rejected' | 'blocked';

export interface PlannedExercise {
  exercise_id: string;
  exercise_name: string;
  muscle_group: 'push' | 'pull' | 'legs' | 'core';
  sets: number;
  reps_low: number;
  reps_high: number;
  rest_seconds: number;
}

export interface DayPlan {
  day_label: string;
  exercises: PlannedExercise[];
}

export interface PlanData {
  days: DayPlan[];
}

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
  plan_data: PlanData;
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
