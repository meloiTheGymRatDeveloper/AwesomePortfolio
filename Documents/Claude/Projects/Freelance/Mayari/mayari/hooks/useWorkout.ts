import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import type { WorkoutPlan, WorkoutSession, Exercise, PersonalRecord } from '../types/database';

export function useActivePlan() {
  const userId = useAuthStore(s => s.session?.user.id);
  return useQuery({
    queryKey: ['workout_plan', 'active', userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from('workout_plans')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle();
      if (error) throw error;
      return data as WorkoutPlan | null;
    },
    enabled: !!userId,
  });
}

export function useRecentSessions(limit = 3) {
  const userId = useAuthStore(s => s.session?.user.id);
  return useQuery({
    queryKey: ['workout_sessions', 'recent', userId, limit],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('workout_sessions')
        .select('*')
        .eq('user_id', userId)
        .not('ended_at', 'is', null)
        .order('started_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as WorkoutSession[];
    },
    enabled: !!userId,
  });
}

export function useExercises() {
  return useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      const { data, error } = await supabase.from('exercises').select('*').order('name');
      if (error) throw error;
      return (data ?? []) as Exercise[];
    },
    staleTime: 1000 * 60 * 60,
  });
}

export function useExerciseById(id: string) {
  return useQuery({
    queryKey: ['exercises', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('exercises').select('*').eq('id', id).single();
      if (error) throw error;
      return data as Exercise;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}

export function usePersonalRecords() {
  const userId = useAuthStore(s => s.session?.user.id);
  return useQuery({
    queryKey: ['personal_records', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('personal_records')
        .select('*')
        .eq('user_id', userId)
        .order('exercise_name');
      if (error) throw error;
      return (data ?? []) as PersonalRecord[];
    },
    enabled: !!userId,
  });
}
