import React from 'react';
import { AuthenticatedApp } from './../AuthenticatedApp';
import { UnauthenticatedApp } from './../UnauthenticatedApp';
import { useUser } from '@Contexts';

const AppChrome = () => {
  const { user } = useUser();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

AppChrome.displayName = 'AppChrome';

export default AppChrome;
