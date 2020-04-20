import { Reducer, ReducerState } from "react";
import {
  UserType,
  ConnectedEnterprisePhaseSystemType,
  TenantConnectedEnterprisePhaseSystemType,
  TenantPhaseManualEntryType,
  TenantJobStatusType,
  TenantJobOptionType,
  SelectedJobType,
  AvailableTenantJobTypeType,
  ConfigurationSchemaType
} from "./model";
import { ActionCreatorType } from "./action";

type R = Reducer<any, any>;

export type ReducerStateType = ReducerState<R>;

export type LoadingStateType = {
  [actionType: string]: {
    loading: boolean;
    error?: string;
    meta?: any;
  };
};

export type UserStateType = {
  data?: UserType;
};

export type TenantStateType = {};

export type SystemStateType = {
  list: Array<ConnectedEnterprisePhaseSystemType>;
  tenantItemList: Array<TenantConnectedEnterprisePhaseSystemType>;
  manualEntryList: Array<TenantPhaseManualEntryType>;
};

export type JobStateType = {
  jobTypeConfigSchemas: {
    [jobTypeGuid: string]: ConfigurationSchemaType;
  };
  jobOptions: TenantJobOptionType;
  availableJobTypes: Array<AvailableTenantJobTypeType>;
  statuses: Array<TenantJobStatusType>;
  selectedJob: SelectedJobType;
};

export type StateType = {
  loading: LoadingStateType;
  user: UserStateType;
  tenant: TenantStateType;
  system: SystemStateType;
  job: JobStateType;
};

export type SelectorType = (state: StateType) => any;

export type IsLoadingSelectorType = (
  actionCreator: ActionCreatorType
) => (state: StateType) => boolean;

export type LoadingStateSelectorType = (
  actionCreator: ActionCreatorType
) => (state: StateType) => any;

export type ErrorMessageSelectorType = (
  actionCreator: ActionCreatorType
) => (state: StateType) => string;

export type UserSelectorType = (state: StateType) => UserType;

export type SystemsSelectorType = (
  state: StateType
) => Array<ConnectedEnterprisePhaseSystemType>;

export type TenantSystemsSelectorType = (
  state: StateType
) => Array<TenantConnectedEnterprisePhaseSystemType>;

export type TenantPhaseManualEntriesSelectorType = (
  state: StateType
) => Array<TenantPhaseManualEntryType>;

export type TenantJobStatusesSelectorType = (
  state: StateType
) => Array<TenantJobStatusType>;

export type TenantJobOptionsSelectorType = (
  state: StateType
) => TenantJobOptionType;

export type SelectedJobSelectorType = (state: StateType) => SelectedJobType;

export type AvailableJobTypesSelectorType = (
  state: StateType
) => Array<AvailableTenantJobTypeType>;

export type JobTypeConfigSchemasSelectorType = (
  state: StateType
) => {
  [jobTypeGuid: string]: ConfigurationSchemaType;
};
