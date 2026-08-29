import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type LearningState = {
  xpToday: number;
  dailyGoal: number;
  streak: number;
  completedLessonIds: string[];
  hasHydrated: boolean;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
};

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      xpToday: 15,
      dailyGoal: 20,
      streak: 12,
      completedLessonIds: [],
      hasHydrated: false,
      addXP: (amount) => set((state) => ({ xpToday: state.xpToday + amount })),
      completeLesson: (lessonId) => {
        if (get().completedLessonIds.includes(lessonId)) return;
        set((state) => ({ completedLessonIds: [...state.completedLessonIds, lessonId] }));
      },
    }),
    {
      name: "learning-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        xpToday: state.xpToday,
        dailyGoal: state.dailyGoal,
        streak: state.streak,
        completedLessonIds: state.completedLessonIds,
      }),
      onRehydrateStorage: () => () => {
        useLearningStore.setState({ hasHydrated: true });
      },
    }
  )
);
