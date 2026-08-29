import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

type LearningState = {
  xpToday: number;
  xpDate: string;
  dailyGoal: number;
  streak: number;
  completedLessonIds: string[];
  hasHydrated: boolean;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  resetProgress: () => void;
};

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      xpToday: 15,
      xpDate: todayKey(),
      dailyGoal: 20,
      streak: 12,
      completedLessonIds: [],
      hasHydrated: false,
      addXP: (amount) => {
        const today = todayKey();
        set((state) => ({
          xpToday: (state.xpDate === today ? state.xpToday : 0) + amount,
          xpDate: today,
        }));
      },
      completeLesson: (lessonId) => {
        if (get().completedLessonIds.includes(lessonId)) return;
        set((state) => ({ completedLessonIds: [...state.completedLessonIds, lessonId] }));
      },
      resetProgress: () =>
        set({
          xpToday: 0,
          xpDate: todayKey(),
          streak: 0,
          completedLessonIds: [],
        }),
    }),
    {
      name: "learning-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        xpToday: state.xpToday,
        xpDate: state.xpDate,
        dailyGoal: state.dailyGoal,
        streak: state.streak,
        completedLessonIds: state.completedLessonIds,
      }),
      onRehydrateStorage: () => (state) => {
        const today = todayKey();
        if (state && state.xpDate !== today) {
          useLearningStore.setState({ xpToday: 0, xpDate: today });
        }
        useLearningStore.setState({ hasHydrated: true });
      },
    }
  )
);
