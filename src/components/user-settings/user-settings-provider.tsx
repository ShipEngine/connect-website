import React, { ReactNode, useEffect, useState } from "react";
import { localStorage } from "../../lib/local-storage";
import { UserSettings, UserSettingsContext } from "./user-settings-context";


export interface UserSettingProviderProps {
  children?: ReactNode;
}


/**
 * A React provider component that provides the user's current preferences
 * and persists them to local storage.
 */
export function UserSettingsProvider({ children }: UserSettingProviderProps) {
  const [settings, setSettings] = useState(undefined as unknown as UserSettings);

  // Allow settings to be patch-updated
  const update = (patch: Partial<UserSettings>) => {
    setSettings({ ...settings, ...patch });
  }

  useEffect(() => {
    if (settings) {
      // The user settings have changed, so persist them to local storage
      localStorage.setItem("settings", JSON.stringify(settings));
    }
    else {
      // There are no settings yet, so read them from local storage
      const persisted = localStorage.getItem("settings");
      if (persisted) {
        setSettings(JSON.parse(persisted));
      }
    }
  }, [settings]);

  return (
    <UserSettingsContext.Provider value={{ ...settings, update }}>
      { children }
    </UserSettingsContext.Provider>
  )
}
