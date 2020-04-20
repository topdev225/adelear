import React, { useEffect } from "react";
import { History } from "history";
import qs from "qs";

import { PageContainer, StatusTable } from "@Components";
import JobStatus from "./JobStatus";

// Modules Import
import {
  loadJobStatuses,
  loadJobOptions,
  loadAvailableJobTypes
} from "@Modules";
import { connectStore } from "@Store";

// Types Import
import {
  MapDispatchToPropsType,
  LoadTenantJobStatusesRequestType,
  RequestType
} from "@Types";

// Type definition of the props that are passed in SyncSchedule component
type SyncScheduleProps = {
  history: History;
  loadJobStatuses: LoadTenantJobStatusesRequestType;
  loadJobOptions: RequestType;
  loadAvailableJobTypes: RequestType;
};

const mapDispatch: MapDispatchToPropsType = {
  loadJobStatuses,
  loadJobOptions,
  loadAvailableJobTypes
};

const SyncSchedule = ({
  history,
  loadJobStatuses,
  loadJobOptions,
  loadAvailableJobTypes
}: SyncScheduleProps) => {
  const jobId = qs.parse(history.location.search, {
    ignoreQueryPrefix: true
  }).jobId;

  useEffect(() => {
    loadJobStatuses();
    loadJobOptions();
    loadAvailableJobTypes();
  }, []);

  return (
    <PageContainer header={!jobId ? "Sync Schedule" : "Job Status"}>
      {!jobId ? <StatusTable /> : <JobStatus jobId={jobId} />}
    </PageContainer>
  );
};

SyncSchedule.displayName = "SyncSchedule";

export default connectStore(null, mapDispatch)(SyncSchedule);
