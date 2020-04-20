import { chain, isNil, get } from 'lodash';
import { createSelector } from 'reselect';
import { handleActions, pending, fulfilled, rejected } from './actionUtils';
import * as actions from './actionsTypes';

import {
  ActionCreatorType,
  IsLoadingSelectorType,
  ErrorMessageSelectorType,
  StateType,
  LoadingStateType,
  LoadingStateSelectorType
} from '@Types';

// ==================================
// Selectors
// ==================================
export const selfSelector = (state: StateType) => state.loading;

export const isLoading: IsLoadingSelectorType = (
  actionCreator: ActionCreatorType
) =>
  createSelector(
    selfSelector,
    loadingReducer => {
      const data = loadingReducer[actionCreator.toString()];

      return !isNil(data) && data.loading;
    }
  );

export const loadingStateSelector: LoadingStateSelectorType = (
  actionCreator: ActionCreatorType
) =>
  createSelector(
    selfSelector,
    loadingReducer => loadingReducer[actionCreator.toString()]
  );

export const getErrorMessage: ErrorMessageSelectorType = (
  actionCreator: ActionCreatorType
) =>
  createSelector(
    selfSelector,
    loadingReducer => get(loadingReducer[actionCreator.toString()], 'error')
  );

// ==================================
// Action Handlers
// ==================================
const getActionNextState = (
  actionState: any = {},
  action: any,
  defaultState: any
) => {
  const actionNextState: any = {
    ...actionState,
    ...defaultState
  };
  if (action.meta) {
    actionNextState.meta = {
      ...(actionState.meta || {}),
      ...action.meta
    };
  }
  return actionNextState;
};
const actionHandlers = {
  ...chain(actions)
    .mapKeys((actionName: string) => pending(actionName))
    .mapValues(
      (actionName: string) => (state: LoadingStateType, action: any) => {
        const nextState = getActionNextState(state[actionName], action, {
          loading: true,
          error: null
        });

        return {
          ...state,
          [actionName]: nextState
        };
      }
    )
    .value(),
  ...chain(actions)
    .mapKeys((actionName: string) => fulfilled(actionName))
    .mapValues(
      (actionName: string) => (state: LoadingStateType, action: any) => {
        const nextState = getActionNextState(state[actionName], action, {
          loading: false,
          error: null
        });

        return {
          ...state,
          [actionName]: nextState
        };
      }
    )
    .value(),
  ...chain(actions)
    .mapKeys((actionName: string) => rejected(actionName))
    .mapValues(
      (actionName: string) => (state: LoadingStateType, action: any) => {
        const nextState = getActionNextState(state[actionName], action, {
          loading: false,
          error: get(action.payload.response, 'data.message')
        });

        return {
          ...state,
          [actionName]: nextState
        };
      }
    )
    .value()
};

// ==================================
// Reducer
// ==================================
export default handleActions(actionHandlers);
