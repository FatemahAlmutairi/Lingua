import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PreferencesState = {
  emailNotifications: boolean;
  setEmailNotifications: (emailNotifications: boolean) => void;
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      emailNotifications: true,
      setEmailNotifications: (emailNotifications) => set({ emailNotifications }),
    }),
    {
      name: "preferences-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
