import { ReducerAction, Dispatch, Reducer } from 'react';
import { ReducerStateType, StateType } from './state';

type R = Reducer<any, any>;

export type DispatchType = Dispatch<ReducerAction<R>>;

export type UseStoreType = () => [StateType, DispatchType];

export type UseCombinedReducersType = {
  [key: string]: [ReducerStateType, DispatchType];
};

export type ActionsHandlerType = {
  [actionType: string]: (
    state: ReducerStateType,
    action: any
  ) => ReducerStateType;
};

// Action Creator Types
type PayloadBuilderType1 = (...args: any[]) => Promise<any>;
type PayloadBuilderType2 = (
  ...args: any[]
) => (dispatch?: DispatchType) => Promise<any>;
export type PayloadBuilderType = PayloadBuilderType1 | PayloadBuilderType2;

export type StandardActionType = {
  type: string;
  payload?: Object;
  args?: any[];
  meta?: Object;
};
export type StandardActionCreatorType = (...args: any[]) => StandardActionType;

export type ThunkActionType = (dispatch: DispatchType) => Promise<any>;
export type ThunkActionCreatorType = (...args: any[]) => ThunkActionType;

export type ActionCreatorType =
  | StandardActionCreatorType
  | ThunkActionCreatorType;

export type ActionMetaBuilderType = (
  actionState: string,
  args: any[],
  payload?: any
) => any;
export type CreateActionType = (
  actionType: string,
  payloadBuilder?: PayloadBuilderType,
  actionMetaBuilder?: ActionMetaBuilderType
) => ActionCreatorType;

// Types when to connect to store
export type MapStateToPropsType = (
  state: StateType,
  componentProps?: any
) => any;
type MapDispatchToPropsType1 = (
  dispatch: DispatchType
) => {
  [key: string]: (...args: any[]) => any;
};
type MapDispatchToPropsType2 = {
  [key: string]: ActionCreatorType;
};
export type MapDispatchToPropsType =
  | MapDispatchToPropsType1
  | MapDispatchToPropsType2;

// Action Types
export type ActionType = ThunkActionType | StandardActionType;
