import AsyncStorage from "@react-native-async-storage/async-storage";
import type { LanguageCode } from "@/types/learning";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type LanguageState = {
  selectedLanguage: LanguageCode | null;
  hasHydrated: boolean;
  setSelectedLanguage: (language: LanguageCode) => void;
  clearSelectedLanguage: () => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      hasHydrated: false,
      setSelectedLanguage: (language) => set({ selectedLanguage: language }),
      clearSelectedLanguage: () => set({ selectedLanguage: null }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ selectedLanguage: state.selectedLanguage }),
      onRehydrateStorage: () => () => {
        useLanguageStore.setState({ hasHydrated: true });
      },
    }
  )
);
