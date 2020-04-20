import React, { useCallback, useMemo, ChangeEvent } from "react";
import moment from "moment";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";

// Components Import
import { ActiveSwitch } from "@Components";

// Modules Import
import { setJobActiveStatus, availableJobTypesSelector } from "@Modules";
import { connectStore } from "@Store";

// Types Import
import {
  TenantJobStatusType,
  SetJobActiveStatusRequestType,
  MapDispatchToPropsType,
  AvailableTenantJobTypeType,
  MapStateToPropsType,
  StateType
} from "@Types";

// Styles Import
import { useStyles } from "./job-summary.styles";

type JobSummaryProps = {
  availableJobTypes: Array<AvailableTenantJobTypeType>;
  jobStatus: TenantJobStatusType;
  setJobActiveStatus: SetJobActiveStatusRequestType;
};

const mapState: MapStateToPropsType = (state: StateType) => ({
  availableJobTypes: availableJobTypesSelector(state)
});

const mapDispatch: MapDispatchToPropsType = {
  setJobActiveStatus
};

const JobTriggerTypeTitles: any = {
  0: "Scheduled",
  1: "External Trigger"
};

function JobSummary({
  availableJobTypes,
  jobStatus,
  setJobActiveStatus
}: JobSummaryProps) {
  const classes = useStyles({});

  const enhancedJobStatus = useMemo(() => {
    return {
      ...jobStatus,
      jobName: (
        availableJobTypes.find(
          availableJobType => availableJobType.jobGuid === jobStatus.jobTypeGuid
        ) || {}
      ).jobName,
      nextRun: jobStatus.nextRun
        ? moment(jobStatus.nextRun).format("MM/DD/YYYY HH:mm A")
        : "N/A",
      lastRun: jobStatus.lastRun
        ? moment(jobStatus.lastRun).format("MM/DD/YYYY HH:mm A")
        : "N/A",
      lastSuccesfulRun: jobStatus.lastSuccesfulRun
        ? moment(jobStatus.lastSuccesfulRun).format("MM/DD/YYYY HH:mm A")
        : "N/A"
    };
  }, [jobStatus]);

  const handleToggleActive = useCallback(
    () => (event: ChangeEvent<HTMLInputElement>) => {
      setJobActiveStatus({
        jobDefinitionId: jobStatus.jobDefinitionId,
        jobDefinitionGuid: jobStatus.jobDefinitionGuid,
        isActive: event.target.checked
      });
    },
    [jobStatus]
  );

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className={classes.headerCell}>Active</TableCell>
          <TableCell align="left">
            <ActiveSwitch
              tooltip={`Make this job ${
                enhancedJobStatus.isActive ? "deactive" : "active"
              }`}
              active={enhancedJobStatus.isActive}
              onChange={handleToggleActive()}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.headerCell}>Job Type</TableCell>
          <TableCell>
            {JobTriggerTypeTitles[enhancedJobStatus.jobTriggerType]}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.headerCell}>Job Name</TableCell>
          <TableCell>{enhancedJobStatus.jobName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.headerCell}>Source</TableCell>
          <TableCell>{enhancedJobStatus.sourceSystem}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.headerCell}>
            Source Data Interface Description
          </TableCell>
          <TableCell>
            {enhancedJobStatus.sourceDataInterfaceDescription}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.headerCell}>Destination</TableCell>
          <TableCell>{enhancedJobStatus.destSystem}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.headerCell}>
            Dest Data Interface Description
          </TableCell>
          <TableCell>
            {enhancedJobStatus.destDataInterfaceDescription}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className={classes.headerCell}>Next Run</TableCell>
          <TableCell>{enhancedJobStatus.nextRun || "N/A"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.headerCell}>Last Status</TableCell>
          <TableCell>{enhancedJobStatus.lastStatus}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.headerCell}>Last Run</TableCell>
          <TableCell>{enhancedJobStatus.lastRun}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.headerCell}>
            Last Successful Run
          </TableCell>
          <TableCell>{enhancedJobStatus.lastSuccesfulRun}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.headerCell}>Job Cron</TableCell>
          <TableCell>{enhancedJobStatus.jobChron}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default connectStore(mapState, mapDispatch)(JobSummary);
