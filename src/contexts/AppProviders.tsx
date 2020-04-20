import React from 'react';
import { AuthProvider } from './auth-context';
import { UserProvider } from './user-context';

interface AppProvidersProps {
  children: any;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
};

AppProviders.displayName = 'AppProviders';
