import { createSelector } from 'reselect';
import { createAction, handleActions, fulfilled } from './actionUtils';
import { LOAD_TENANTS } from './actionsTypes';
import { request } from '@Utils';

// ==================================
// Selectors
// ==================================
const selfSelector = (state: any) => state.tenant;

// ==================================
// Actions
// ==================================

// ==================================
// Action Handlers
// ==================================
const actionHandlers = {};

// ==================================
// Reducer
// ==================================
export default handleActions(actionHandlers);
