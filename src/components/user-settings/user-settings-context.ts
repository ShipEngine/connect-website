import { Language } from 'prism-react-renderer'
import React from 'react'
import { ReferenceLayout } from '../reference/reference'

/**
 * A React Context that contains user preferences
 */
export const UserSettingsContext = React.createContext({} as UserSettings)

/**
 * The user's stored preferences
 */
export interface UserSettings {
  preferredLanguage?: Language
  referenceLayout?: ReferenceLayout
  update(settings: Partial<UserSettings>): void
}
