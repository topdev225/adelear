import React, { createContext, useContext } from 'react';

const AuthContext = createContext(undefined);

const AuthProvider = (props: any) => {
  const idtoken = localStorage['adal.idtoken'];

  const tokens = idtoken && idtoken.length > 0 ? { idtoken } : undefined;

  return <AuthContext.Provider value={{ tokens }} {...props} />;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
