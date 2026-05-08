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
