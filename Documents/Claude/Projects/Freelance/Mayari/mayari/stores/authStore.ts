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
