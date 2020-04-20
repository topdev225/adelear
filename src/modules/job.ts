import { createSelector } from "reselect";
import qs from "qs";
import { createAction, handleActions, fulfilled } from "./actionUtils";
import { request } from "@Utils";
import {
  LOAD_JOB_OPTIONS,
  LOAD_TENANT_JOB_STATUSES,
  CREATE_SCHEDULED_JOB,
  UPDATE_SCHEDULED_JOB,
  UPDATE_JOB_STATUS,
  DELETE_SCHEDULED_JOB,
  LOAD_TENANT_JOB_STATUS,
  LOAD_TENANT_JOB_HISTORY,
  LOAD_TENANT_JOB_HISTORY_IN_RANGE,
  LOAD_AVAILABLE_JOB_TYPES,
  LOAD_JOB_TYPE_CONFIG_SCHEMA
} from "./actionsTypes";

// Types Import
import {
  StateType,
  JobStateType,
  TenantJobStatusesSelectorType,
  TenantJobOptionsSelectorType,
  CreateScheduledJobDefinitionRequestInputType,
  UpdateScheduledJobDefinitionRequestInputType,
  SetJobActiveStatusRequestInputType,
  SelectedJobSelectorType,
  AvailableJobTypesSelectorType,
  JobTypeConfigSchemasSelectorType
} from "@Types";

// ==================================
// Selectors
// ==================================
const selfSelector = (state: StateType) => state.job;

export const availableJobTypesSelector: AvailableJobTypesSelectorType = createSelector(
  selfSelector,
  self => self.availableJobTypes
);

export const selectedJobSelector: SelectedJobSelectorType = createSelector(
  selfSelector,
  self => self.selectedJob
);

export const tenantJobStatusesSelector: TenantJobStatusesSelectorType = createSelector(
  selfSelector,
  self => self.statuses
);

export const tenantJobOptionsSelector: TenantJobOptionsSelectorType = createSelector(
  selfSelector,
  self => self.jobOptions
);

export const jobTypeConfigSchemasSelector: JobTypeConfigSchemasSelectorType = createSelector(
  selfSelector,
  self => self.jobTypeConfigSchemas
);

// ==================================
// Actions
// ==================================
export const loadJobOptions = createAction(LOAD_JOB_OPTIONS, () => {
  return request({
    url: "/Tenant/GetTenantJobOptions"
  });
});

export const loadAvailableJobTypes = createAction(
  LOAD_AVAILABLE_JOB_TYPES,
  () => {
    return request({
      url: "/Job/GetAvailableJobTypes"
    });
  }
);

export const loadJobHistory = createAction(
  LOAD_TENANT_JOB_HISTORY,
  (jobDefinitionId: number) => {
    return request({
      url: `/Job/GetJobHistory?jobDefinitionId=${jobDefinitionId}`
    });
  }
);

export const loadJobHistoryInRange = createAction(
  LOAD_TENANT_JOB_HISTORY_IN_RANGE,
  (jobDefinitionId: number, startDate: string, endDate?: string) => {
    return request({
      url: `/Job/GetJobHistoryInDateRange?jobDefinitionId=${jobDefinitionId}&startDate=${startDate}${
        endDate ? `&endDate=${endDate}` : ""
      }`
    });
  }
);

export const loadJobStatus = createAction(
  LOAD_TENANT_JOB_STATUS,
  (JobDefinitionIdList: Array<number>) => {
    return request({
      url: `/Job/GetJobStatus?${qs.stringify(
        { JobDefinitionIdList },
        { indices: false }
      )}`
    });
  }
);

export const loadJobStatuses = createAction(LOAD_TENANT_JOB_STATUSES, () => {
  return request({
    url: "/Job/GetAllJobStatuses"
  });
});

export const createScheduledJobDefinition = createAction(
  CREATE_SCHEDULED_JOB,
  (params: CreateScheduledJobDefinitionRequestInputType) => {
    return request({
      url: "/Job/CreateTenantScheduleJobDefinition",
      method: "put",
      body: params
    });
  }
);

export const updateScheduledJobDefinition = createAction(
  UPDATE_SCHEDULED_JOB,
  (params: UpdateScheduledJobDefinitionRequestInputType) => {
    return request({
      url: "/Job/UpdateTenantScheduleJobDefinition",
      method: "post",
      body: params
    });
  }
);

export const deleteScheduledJobDefinition = createAction(
  DELETE_SCHEDULED_JOB,
  async (jobDefinitionId: number, Guid: string) => {
    await request({
      url: `/Job/ArchiveTenantScheduleJobDefinition?jobDefinitionId=${jobDefinitionId}&Guid=${Guid}`,
      method: "delete"
    });
    return Guid;
  }
);

export const setJobActiveStatus = createAction(
  UPDATE_JOB_STATUS,
  (params: SetJobActiveStatusRequestInputType) => {
    return request({
      url: "/Job/SetTenantScheduleJobDefinitionActiveStatus",
      method: "post",
      body: params
    });
  }
);

export const loadJobTypeConfigSchema = createAction(
  LOAD_JOB_TYPE_CONFIG_SCHEMA,
  (jobTypeGuid: string) => {
    return request({
      url: `/Job/GetJobTypeConfigSchema?jobTypeGuid=${jobTypeGuid}`,
      method: "get"
    });
  }
);

// ==================================
// Action Handlers
// ==================================
const actionHandlers = {
  [fulfilled(loadAvailableJobTypes)]: (
    state: JobStateType,
    action: any
  ): JobStateType => ({
    ...state,
    availableJobTypes: action.payload.data
  }),
  [fulfilled(loadJobHistory)]: (
    state: JobStateType,
    action: any
  ): JobStateType => ({
    ...state,
    selectedJob: {
      ...state.selectedJob,
      history: action.payload.data
    }
  }),
  [fulfilled(loadJobHistoryInRange)]: (
    state: JobStateType,
    action: any
  ): JobStateType => ({
    ...state,
    selectedJob: {
      ...state.selectedJob,
      history: action.payload.data
    }
  }),
  [fulfilled(loadJobStatus)]: (
    state: JobStateType,
    action: any
  ): JobStateType => ({
    ...state,
    selectedJob: {
      ...state.selectedJob,
      status: action.payload.data[0]
    }
  }),
  [fulfilled(loadJobOptions)]: (
    state: JobStateType,
    action: any
  ): JobStateType => ({
    ...state,
    jobOptions: action.payload.data
  }),
  [fulfilled(loadJobStatuses)]: (
    state: JobStateType,
    action: any
  ): JobStateType => ({
    ...state,
    statuses: action.payload.data
  }),
  [fulfilled(createScheduledJobDefinition)]: (
    state: JobStateType,
    action: any
  ): JobStateType => ({
    ...state,
    statuses: [...state.statuses, { ...action.payload.data, lastStatus: 3 }]
  }),
  [fulfilled(updateScheduledJobDefinition)]: (
    state: JobStateType,
    action: any
  ): JobStateType => ({
    ...state,
    statuses: state.statuses.map(status =>
      status.jobDefinitionId === action.payload.data.jobDefinitionId
        ? {
            ...status,
            ...action.payload.data
          }
        : status
    )
  }),
  [fulfilled(deleteScheduledJobDefinition)]: (
    state: JobStateType,
    action: any
  ): JobStateType => ({
    ...state,
    statuses: state.statuses.filter(
      status => status.jobDefinitionGuid !== action.payload
    )
  }),
  [fulfilled(setJobActiveStatus)]: (
    state: JobStateType,
    action: any
  ): JobStateType => ({
    ...state,
    selectedJob:
      state.selectedJob.status &&
      state.selectedJob.status.jobDefinitionId ===
        action.payload.data.jobDefinitionId
        ? {
            ...state.selectedJob,
            status: {
              ...state.selectedJob.status,
              isActive: action.payload.data.isActive
            }
          }
        : state.selectedJob,
    statuses: state.statuses.map(jobStatus =>
      jobStatus.jobDefinitionId === action.payload.data.jobDefinitionId
        ? {
            ...jobStatus,
            isActive: action.payload.data.isActive
          }
        : jobStatus
    )
  }),
  [fulfilled(loadJobTypeConfigSchema)]: (
    state: JobStateType,
    action: any
  ): JobStateType => {
    const jobTypeGuid = action.args[0];

    return {
      ...state,
      jobTypeConfigSchemas: {
        [jobTypeGuid]: action.payload.data
      }
    };
  }
};

// ==================================
// Reducer
// ==================================
export default handleActions(actionHandlers);
