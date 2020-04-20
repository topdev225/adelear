import {
  DispatchType,
  ReducerStateType,
  PayloadBuilderType,
  CreateActionType,
  ActionCreatorType,
  ActionsHandlerType,
  ActionMetaBuilderType,
  ActionType
} from '@Types';

export const createAction: CreateActionType = (
  actionType: string,
  payloadBuilder?: PayloadBuilderType,
  actionMetaBuilder?: ActionMetaBuilderType
): ActionCreatorType => {
  let actionCreator: ActionCreatorType;
  if (payloadBuilder) {
    actionCreator = (...args: any[]) => async (dispatch: DispatchType) => {
      const actionState = `${actionType}_PENDING`;
      let payload =
        args.length > 1 ? args : args.length === 1 ? args[0] : undefined;
      const action: ActionType = { type: actionState, payload, args };

      if (typeof actionMetaBuilder === 'function') {
        action.meta = actionMetaBuilder(actionState, args);
      }

      dispatch(action);

      try {
        const actionState = `${actionType}_FULFILLED`;
        payload = payloadBuilder(...args);

        if (typeof payload === 'function') {
          payload = await payload(dispatch);
        } else if (typeof payload.then === 'function') {
          payload = await payload;
        }

        const action: ActionType = { type: actionState, payload, args };
        if (typeof actionMetaBuilder === 'function') {
          action.meta = actionMetaBuilder(actionState, args, payload);
        }

        dispatch(action);
        return payload;
      } catch (error) {
        const actionState = `${actionType}_REJECTED`;
        payload = error;

        const action: ActionType = { type: actionState, payload, args };
        if (typeof actionMetaBuilder === 'function') {
          action.meta = actionMetaBuilder(actionState, args, payload);
        }

        dispatch(action);
      }
    };
    actionCreator.prototype.isThunk = function() {
      return true;
    };
  } else {
    actionCreator = (...args: any[]) => {
      const actionState = `${actionType}_FULFILLED`;
      let payload =
        args.length > 1 ? args : args.length === 1 ? args[0] : undefined;

      const action: ActionType = { type: actionState, payload, args };
      if (typeof actionMetaBuilder === 'function') {
        action.meta = actionMetaBuilder(actionState, args);
      }

      return action;
    };
    actionCreator.prototype.isThunk = function() {
      return false;
    };
  }
  actionCreator.toString = function() {
    return actionType;
  };

  return actionCreator;
};

export const handleActions = (actionsHandler: ActionsHandlerType) => (
  state: ReducerStateType,
  action: any
) => {
  if (typeof actionsHandler[action.type] === 'function') {
    return actionsHandler[action.type](state, action);
  } else {
    return state;
  }
};

export const pending = (actionCreator: ActionCreatorType | string) =>
  `${actionCreator.toString()}_PENDING`;

export const fulfilled = (actionCreator: ActionCreatorType | string) =>
  `${actionCreator.toString()}_FULFILLED`;

export const rejected = (actionCreator: ActionCreatorType | string) =>
  `${actionCreator.toString()}_REJECTED`;
