import { useMemo, useReducer } from 'react';

// Types Import
import {
  UseCombinedReducersType,
  ReducerStateType,
  DispatchType
} from '@Types';

export default (
  combinedReducers: any,
  initialState: any
): [ReducerStateType, DispatchType] => {
  const useCombinedReducers: UseCombinedReducersType = Object.keys(
    combinedReducers
  ).reduce((memo, key) => {
    const reducer = useReducer(combinedReducers[key], initialState[key] || {});
    return { ...memo, [key]: reducer };
  }, {});

  const state: ReducerStateType = Object.keys(useCombinedReducers).reduce(
    (memo, key) => ({ ...memo, [key]: useCombinedReducers[key][0] }),
    {}
  );

  const dispatch: DispatchType = (action: any) =>
    Object.keys(useCombinedReducers)
      .map(key => useCombinedReducers[key][1])
      .forEach(fn => fn(action));

  return useMemo(() => [state, dispatch], [combinedReducers, initialState]);
};
