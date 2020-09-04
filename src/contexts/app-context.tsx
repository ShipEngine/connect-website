import React, { FunctionComponent } from 'react';
import { CarrierApp } from '@shipengine/connect-sdk/lib/internal/carriers';
import { default as useAppHook } from '../hooks/use-app';

interface AppContextProps {
  isLoading: boolean;
  isError: boolean;
  app?: CarrierApp;
  error?: unknown;
}

const AppContext = React.createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: FunctionComponent<AppProviderProps> = ({ children }) => {
  const { isLoading, isError, app, error } = useAppHook();

  return (
    <AppContext.Provider value={{ isLoading, isError, app, error }}>
      {children}
    </AppContext.Provider>
  );
};

function useApp(): AppContextProps {
  const context = React.useContext(AppContext);

  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider');
  }
  return context;
}

export { useApp, AppProvider };
