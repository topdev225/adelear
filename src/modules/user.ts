import { createSelector } from "reselect";
import { createAction, handleActions, fulfilled } from "./actionUtils";
import { LOAD_USER, UPDATE_USER } from "./actionsTypes";
import { request } from "@Utils";

// Types Import
import {
  UserSelectorType,
  StateType,
  UpdateUserRequestInputType,
  UserStateType
} from "@Types";

// ==================================
// Selectors
// ==================================
const selfSelector = (state: StateType) => state.user;

export const userSelector: UserSelectorType = createSelector(
  selfSelector,
  self => self.data
);

// ==================================
// Actions
// ==================================
export const loadUser = createAction(LOAD_USER, () => {
  return request({
    url: "/Users/GetUser"
  });
});

export const updateUser = createAction(
  UPDATE_USER,
  ({ firstName, lastName }: UpdateUserRequestInputType) => {
    return request({
      url: "/Users/UpdateUser",
      method: "post",
      body: {
        firstName,
        lastName
      }
    }).then(() => ({
      firstName,
      lastName
    }));
  }
);

// ==================================
// Action Handlers
// ==================================
const actionHandlers = {
  [fulfilled(loadUser)]: (state: UserStateType, action: any): UserStateType => {
    return {
      ...state,
      data: action.payload.data
    };
  },
  [fulfilled(updateUser)]: (
    state: UserStateType,
    action: any
  ): UserStateType => {
    return {
      ...state,
      data: {
        ...state.data,
        ...action.payload
      }
    };
  }
};

// ==================================
// Reducer
// ==================================
export default handleActions(actionHandlers);
