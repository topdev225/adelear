export type UpdateUserRequestInputType = {
  firstName?: string;
  lastName?: string;
};

export type SelectTenantPhaseSystemRequestInputType = {
  tenantId: number;
  connectedEnterprisePhaseSystemsId: number;
  userId: number;
};

export type DeactivateTenantSystemPhaseInputType = {
  tenantSystemPhaseId: number;
  userId: number;
};

export type AddTenantPhaseManualEntryRequestInputType = {
  tenantId: number;
  connectedEnteprisePhaseId: number;
  manualSystemNameEntry?: string;
  userId: number;
};

export type UpdateTenantPhaseManualEntryRequestInputType = {
  tenantPhaseManualSystemEntryId: number;
  manualEntryNewValue?: string;
};

export type SetJobActiveStatusRequestInputType = {
  jobDefinitionId: number;
  jobDefinitionGuid: string;
  isActive: boolean;
};

export type CreateScheduledJobDefinitionRequestInputType = {
  sourceSystem: string;
  sourceDataInterfaceDescription: string;
  destSystem: string;
  destDataInterfaceDescription: string;
  jobDefinitionGuid: string;
  isActive: boolean;
  jobTriggerType: 0 | 1;
  jobTypeGuid?: string;
  jobChron: string;
};

export type UpdateScheduledJobDefinitionRequestInputType = {
  jobDefinitionId: number;
  jobDefinitionGuid: string;
  sourceSystem: string;
  sourceDataInterfaceDescription: string;
  destSystem: string;
  destDataInterfaceDescription: string;
  isActive: boolean;
  jobTriggerType: 0 | 1;
  jobTypeGuid?: string;
  jobChron: string;
};

export type RequestType = (...args: any[]) => Promise<any>;

export type UpdateUserRequestType = (
  params: UpdateUserRequestInputType
) => Promise<any>;

export type SelectSystemRequestType = (
  params: SelectTenantPhaseSystemRequestInputType
) => Promise<any>;

export type DeselectSystemRequestType = (
  params: DeactivateTenantSystemPhaseInputType
) => Promise<any>;

export type LoadTenantSystemsRequestType = (tenantId: number) => Promise<any>;

export type LoadTenantPhaseManualEntriesRequestType = (
  tenantId: number
) => Promise<any>;

export type AddTenantPhaseManualEntryRequestType = (
  params: AddTenantPhaseManualEntryRequestInputType
) => Promise<any>;

export type UpdateTenantPhaseManualEntryRequestType = (
  params: UpdateTenantPhaseManualEntryRequestInputType
) => Promise<any>;

export type DeleteTenantPhaseManualEntryRequestType = (
  tenantPhaseManualSystemEntryId: number
) => Promise<any>;

export type LoadTenantJobStatusesRequestType = () => Promise<any>;

export type SetJobActiveStatusRequestType = (
  params: SetJobActiveStatusRequestInputType
) => Promise<any>;

export type CreateScheduledJobDefinitionRequestType = (
  params: CreateScheduledJobDefinitionRequestInputType
) => Promise<any>;

export type UpdateScheduledJobDefinitionRequestType = (
  params: UpdateScheduledJobDefinitionRequestInputType
) => Promise<any>;

export type LoadJobStatusRequestType = (
  JobDefinitionIdList: Array<number>
) => Promise<any>;

export type LoadJobHistoryRequestType = (jobId: number) => Promise<any>;

export type LoadJobHistoryInDateRangeRequestType = (
  jobDefinitionId: number,
  starDate: string,
  endDate?: string
) => Promise<any>;

export type LoadJobTypeConfigurationSchemaRequestType = (
  jobTypeGuid: string
) => Promise<any>;
