import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeState = {
  isDarkMode: boolean;
  setDarkMode: (isDarkMode: boolean) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      setDarkMode: (isDarkMode) => {
        Appearance.setColorScheme(isDarkMode ? "dark" : "light");
        set({ isDarkMode });
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        Appearance.setColorScheme(state?.isDarkMode ? "dark" : "light");
      },
    }
  )
);
