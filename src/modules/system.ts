import { createSelector } from "reselect";
import { createAction, handleActions, fulfilled, pending } from "./actionUtils";
import {
  LOAD_PUBLIC_SYSTEMS,
  LOAD_SYSTEMS,
  LOAD_TENANT_SYSTEMS,
  LOAD_TENANT_PHASE_MANUAL_ENTRIES,
  ADD_TENANT_PHASE_MANUAL_ENTRY,
  UPDATE_TENANT_PHASE_MANUAL_ENTRY,
  DELETE_TENANT_PHASE_MANUAL_ENTRY,
  SELECT_SYSTEM,
  DESELECT_SYSTEM
} from "./actionsTypes";
import { request } from "@Utils";

// Types Import
import {
  SystemsSelectorType,
  TenantSystemsSelectorType,
  TenantPhaseManualEntriesSelectorType,
  StateType,
  SystemStateType,
  SelectTenantPhaseSystemRequestInputType,
  DeactivateTenantSystemPhaseInputType,
  AddTenantPhaseManualEntryRequestInputType,
  UpdateTenantPhaseManualEntryRequestInputType
} from "@Types";

// ==================================
// Selectors
// ==================================
const selfSelector = (state: StateType) => state.system;

export const systemsSelector: SystemsSelectorType = createSelector(
  selfSelector,
  self => self.list
);

export const tenantSystemsSelector: TenantSystemsSelectorType = createSelector(
  selfSelector,
  self => self.tenantItemList || []
);

export const tenantPhaseManualEntriesSelector: TenantPhaseManualEntriesSelectorType = createSelector(
  selfSelector,
  self => self.manualEntryList || []
);

// ==================================
// Actions
// ==================================
export const loadPublicSystems = createAction(LOAD_PUBLIC_SYSTEMS, () => {
  return request({
    url: "/Public/GetAllSystemPhases"
  });
});

export const loadSystems = createAction(LOAD_SYSTEMS, () => {
  return request({
    url: "/Tenant/GetAllSystemPhases"
  });
});

export const loadTenantSystems = createAction(
  LOAD_TENANT_SYSTEMS,
  (tenantId: number) => {
    return request({
      url: `/Tenant/GetTenantSystemPhases?tenantId=${tenantId}`
    });
  }
);

export const loadTenantPhaseManualEntries = createAction(
  LOAD_TENANT_PHASE_MANUAL_ENTRIES,
  (tenantId: number) => {
    return request({
      url: `/Tenant/GetTenantSystemPhaseManualEntries?tenantId=${tenantId}`
    });
  }
);

export const addTenantPhaseManualEntry = createAction(
  ADD_TENANT_PHASE_MANUAL_ENTRY,
  ({
    tenantId,
    connectedEnteprisePhaseId,
    manualSystemNameEntry,
    userId
  }: AddTenantPhaseManualEntryRequestInputType) => {
    return request({
      url: "/Tenant/SetTenantSystemPhaseManualEntry",
      method: "put",
      body: {
        tenantId,
        connectedEnteprisePhaseId,
        manualSystemNameEntry,
        userId
      }
    });
  }
);

export const updateTenantPhaseManualEntry = createAction(
  UPDATE_TENANT_PHASE_MANUAL_ENTRY,
  ({
    tenantPhaseManualSystemEntryId,
    manualEntryNewValue
  }: UpdateTenantPhaseManualEntryRequestInputType) => {
    return request({
      url: "/Tenant/UpdateTenantSystemPhaseManualEntry",
      method: "post",
      body: {
        tenantPhaseManualSystemEntryId,
        manualEntryNewValue
      }
    });
  },
  (actionState: string, args: any[]) => {
    const params = args[0] as UpdateTenantPhaseManualEntryRequestInputType;
    return {
      [params.tenantPhaseManualSystemEntryId]:
        pending(updateTenantPhaseManualEntry) === actionState
    };
  }
);

export const deleteTenantPhaseManualEntry = createAction(
  DELETE_TENANT_PHASE_MANUAL_ENTRY,
  async (tenantPhaseManualSystemEntryId: number) => {
    const res = await request({
      url: "/Tenant/DeleteTenantSystemPhaseManualEntry",
      method: "delete",
      body: {
        tenantPhaseManualSystemEntryId
      }
    });
    res.data;
  },
  (actionState: string, args: any[]) => {
    const tenantPhaseManualSystemEntryId = args[0];
    return {
      [tenantPhaseManualSystemEntryId]:
        pending(deleteTenantPhaseManualEntry) === actionState
    };
  }
);

export const selectSystem = createAction(
  SELECT_SYSTEM,
  ({
    tenantId,
    connectedEnterprisePhaseSystemsId,
    userId
  }: SelectTenantPhaseSystemRequestInputType) => {
    return request({
      url: `/Tenant/SetTenantSystemPhase`,
      method: "put",
      body: {
        TenantId: tenantId,
        ConnectedEnterprisePhaseSystemsId: connectedEnterprisePhaseSystemsId,
        UserId: userId
      }
    });
  },
  (actionState: string, args: any[]) => {
    const params = args[0] as SelectTenantPhaseSystemRequestInputType;
    return {
      [params.connectedEnterprisePhaseSystemsId]:
        pending(selectSystem) === actionState
    };
  }
);

export const deselectSystem = createAction(
  DESELECT_SYSTEM,
  ({ tenantSystemPhaseId, userId }: DeactivateTenantSystemPhaseInputType) => {
    return request({
      url: `/Tenant/DeactivateTenantSystemPhase`,
      method: "post",
      body: {
        TenantSystemPhaseId: tenantSystemPhaseId,
        UserId: userId
      }
    });
  },
  (actionState: string, args: any[]) => {
    const params = args[0] as DeactivateTenantSystemPhaseInputType;
    return {
      [params.tenantSystemPhaseId]: pending(deselectSystem) === actionState
    };
  }
);

// ==================================
// Action Handlers
// ==================================
const actionHandlers = {
  [fulfilled(loadPublicSystems)]: (
    state: SystemStateType,
    action: any
  ): SystemStateType => ({
    ...state,
    list: action.payload.data
  }),
  [fulfilled(loadSystems)]: (
    state: SystemStateType,
    action: any
  ): SystemStateType => ({
    ...state,
    list: action.payload.data
  }),
  [fulfilled(loadTenantSystems)]: (
    state: SystemStateType,
    action: any
  ): SystemStateType => ({
    ...state,
    tenantItemList: action.payload.data
  }),
  [fulfilled(loadTenantPhaseManualEntries)]: (
    state: SystemStateType,
    action: any
  ): SystemStateType => ({
    ...state,
    manualEntryList: action.payload.data
  }),
  [fulfilled(selectSystem)]: (
    state: SystemStateType,
    action: any
  ): SystemStateType => ({
    ...state,
    tenantItemList: [...state.tenantItemList, action.payload.data]
  }),
  [fulfilled(deselectSystem)]: (
    state: SystemStateType,
    action: any
  ): SystemStateType => ({
    ...state,
    tenantItemList: state.tenantItemList.filter(
      item => item.id !== action.payload.data.id
    )
  }),
  [fulfilled(addTenantPhaseManualEntry)]: (
    state: SystemStateType,
    action: any
  ): SystemStateType => ({
    ...state,
    manualEntryList: [...state.manualEntryList, action.payload.data]
  }),
  [fulfilled(updateTenantPhaseManualEntry)]: (
    state: SystemStateType,
    action: any
  ): SystemStateType => ({
    ...state,
    manualEntryList: state.manualEntryList.filter(me =>
      me.id === action.payload.data.id ? action.payload.data : me
    )
  }),
  [fulfilled(deleteTenantPhaseManualEntry)]: (
    state: SystemStateType,
    action: any
  ): SystemStateType => {
    const tenantPhaseManualSystemEntryId = action.args[0];
    return {
      ...state,
      manualEntryList: state.manualEntryList.filter(
        entry => entry.id !== tenantPhaseManualSystemEntryId
      )
    };
  }
};

// ==================================
// Reducer
// ==================================
export default handleActions(actionHandlers);
