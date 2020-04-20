import React, { createContext, useContext } from 'react';
import { createStore, initialState } from '@Store';

// Types Import
import { UseStoreType } from '@Types';

const StoreContext = createContext(undefined);

const StoreProvider = (props: any) => {
  const store = createStore(initialState);
  if (process.env.NODE_ENV === 'development') {
    console.log('[Global State Inspection]', Object.assign({}, store[0]));
  }
  return <StoreContext.Provider value={store} {...props} />;
};

const useStore: UseStoreType = () => useContext(StoreContext);

export { StoreProvider, useStore };
