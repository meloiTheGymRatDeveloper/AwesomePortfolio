import { create } from 'zustand';
import type { WorkoutSet } from '../types/database';

type ActiveSet = Omit<WorkoutSet, 'id' | 'completed_at'>;

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
