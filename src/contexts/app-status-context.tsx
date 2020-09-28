import React, { FunctionComponent } from 'react';
import { default as useAppStatusHook } from '../hooks/use-app-status';
import { AppStatus } from '../types';

interface AppStatusContextProps {
  isLoading: boolean;
  isError: boolean;
  appStatus?: AppStatus;
  error?: Error;
}

const AppContext = React.createContext<AppStatusContextProps | undefined>(
  undefined,
);

interface AppStatusProviderProps {
  children: React.ReactNode;
}

const AppStatusProvider: FunctionComponent<AppStatusProviderProps> = ({
  children,
}) => {
  const { isLoading, isError, appStatus, error } = useAppStatusHook();

  return (
    <AppContext.Provider value={{ isLoading, isError, appStatus, error }}>
      {children}
    </AppContext.Provider>
  );
};

function useAppStatus(): AppStatusContextProps {
  const context = React.useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppStatus must be used within a AppStatusProvider');
  }
  return context;
}

export { useAppStatus, AppStatusProvider };
