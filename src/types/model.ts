export type TenantConnectedEnterprisePhaseSystemType = {
  id: number;
  tenantId: number;
  connectedEnterprisePhaseSystemId: number;
};

export type TenantPhaseManualEntryType = {
  id: number;
  systemName?: string;
  connectedEnteprisePhaseId: number;
  connectedEnteprisePhaseName?: string;
  tenantId: number;
};

export type ConnectedEnterprisePhaseSystemType = {
  id: number;
  connectedEnterprisePhaseId: number;
  systemId: number;
  phaseName?: string;
  phaseIconFileName?: string;
  systemName?: string;
  sytemLogoFileName?: string;
  displayOnRoadmap: boolean;
};

export type ConnectedEnterprisePhaseType = {
  id: number;
  number: number;
  name?: string;
  blurb?: string;
  displayIconFileName?: string;
  connectedEnterprisePhaseSystems?: Array<ConnectedEnterprisePhaseSystemType>;
};

export type SystemType = {
  id: number;
  name?: string;
  displayLogoFileName?: string;
  connectedEnterprisePhaseSystems?: Array<ConnectedEnterprisePhaseSystemType>;
};

export type TenantDetailType = {
  id: number;
  tenantId: string;
  tenantName?: string;
};

export type UserType = {
  userId: number;
  userCreatedFlag: boolean;
  createdOn: string;
  firstName?: string;
  lastName?: string;
  lastLogin: string;
  objectId?: string;
  tenants?: Array<TenantDetailType>;
};

export type TenantJobStatusType = {
  jobDefinitionId: number;
  nextRun?: string;
  lastRun?: string;
  lastSuccesfulRun?: string;
  lastStatus?: string;
  isActive: boolean;
  isArchived: boolean;
  sourceSystem?: string;
  sourceDataInterfaceDescription?: string;
  destSystem?: string;
  destDataInterfaceDescription?: string;
  jobChron?: string;
  jobDefinitionGuid: string;
  jobTypeGuid: string;
  jobTriggerType: 0 | 1;
};

export type AvailableTenantJobTypeType = {
  jobName: string;
  jobGuid: string;
  queueName: string;
  apiName: string;
};

export type TenantJobOptionType = {
  systemOptions: Array<{
    id: number;
    name: string;
  }>;
  manualSystemOptions: Array<{
    id: number;
    name: string;
  }>;
  jobTypeOptions: Array<{
    id: number;
    name: string;
  }>;
};

export type TenantJobHistoryType = {
  jobHistoryId: number;
  jobDefinitionId: number;
  status: 0 | 1 | 2;
  startTime: string;
  endTime: string;
  sequenceId: number;
  jobHistoryGuid: string;
};

export type SelectedJobType = {
  status?: TenantJobStatusType;
  history: Array<TenantJobHistoryType>;
};

type StringConfigType = {
  type: ["string", "null"];
};

type IntegerConfigType = {
  type: "integer";
};

type ArrayConfigType = {
  type: ["array", "null"];
  items: StringConfigType;
};

export type ConfigurationType =
  | ArrayConfigType
  | StringConfigType
  | IntegerConfigType;

export type ConfigurationSchemaType = {
  type: "object";
  properties: {
    [key: string]: ConfigurationType;
  };
  required: Array<string>;
};
