import React, { useMemo, useCallback, ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  IconButton,
  Button,
  Tooltip,
  useMediaQuery,
  Theme
} from "@material-ui/core";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  FindInPage as DetailsIcon,
  Done as SuccessIcon,
  Loop as InProgressIcon,
  Warning as FailIcon,
  Minimize as NeverRunIcon,
  Schedule as ScheduledIcon,
  Block as BlockIcon,
  Settings as SettingsIcon,
} from "@material-ui/icons";

import { ActiveSwitch } from "../ActiveSwitch";
import { useStyles } from "./status-table.styles";

// Components Import
import { ManageJobDialog, ConfirmDialog, ManageJobConfigurationDialog } from "@Components";

// Modules Import
import {
  availableJobTypesSelector,
  tenantJobStatusesSelector,
  setJobActiveStatus,
  deleteScheduledJobDefinition
} from "@Modules";
import { connectStore } from "@Store";
import { useToggle } from "@Hooks";

// Types Import
import {
  MapStateToPropsType,
  MapDispatchToPropsType,
  StateType,
  TenantJobStatusType,
  SetJobActiveStatusRequestType,
  RequestType,
  AvailableTenantJobTypeType
} from "@Types";

interface EnhancedTenantJobStatusType extends TenantJobStatusType {
  jobName: string;
  nextRun: string;
  lastRun: string;
  lastSuccesfulRun: string;
}

type StatusTableProps = {
  availableJobTypes: Array<AvailableTenantJobTypeType>;
  tenantJobStatusItems: Array<TenantJobStatusType>;
  setJobActiveStatus: SetJobActiveStatusRequestType;
  deleteScheduledJobDefinition: RequestType;
};

type TableComponentProps = {
  tableData: Array<EnhancedTenantJobStatusType>;
  onToggleActive: (jobStatus: any) => (event: object) => void;
  onEditJob: (jobStatus: any) => () => void;
  onDeleteJob: (jobStatus: any) => () => void;
  onConfigJob: (jobStatus: any) => () => void;
};

const mapState: MapStateToPropsType = (state: StateType) => ({
  availableJobTypes: availableJobTypesSelector(state),
  tenantJobStatusItems: tenantJobStatusesSelector(state)
});

const mapDispatch: MapDispatchToPropsType = {
  setJobActiveStatus,
  deleteScheduledJobDefinition
};

const JobTriggerTypeTitles: any = {
  0: "Scheduled",
  1: "External Trigger"
};

const JobStatusTitles: any = {
  0: "Success",
  1: "In Progress",
  2: "Fail",
  3: "Never Run",
  4: "Scheduled",
  5: "Canceled"
};

const JobStatusIcons: any = {
  0: <SuccessIcon color="primary" />,
  1: <InProgressIcon color="secondary" />,
  2: <FailIcon color="error" />,
  3: <NeverRunIcon color="disabled" />,
  4: <ScheduledIcon color="disabled" />,
  5: <BlockIcon color="disabled" />
};

function DesktopTable({
  tableData,
  onToggleActive,
  onEditJob,
  onDeleteJob,
  onConfigJob
}: TableComponentProps) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Active</TableCell>
            <TableCell>Trigger</TableCell>
            <TableCell>Job Type</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Next Run</TableCell>
            <TableCell>Last Run</TableCell>
            <TableCell>Last Status</TableCell>
            <TableCell>Last Success</TableCell>
            <TableCell>Job Cron</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((jobStatus: EnhancedTenantJobStatusType) => (
            <TableRow key={jobStatus.jobDefinitionId}>
              <TableCell>
                <ActiveSwitch
                  tooltip={`Make Job ${
                    jobStatus.isActive ? "deactive" : "active"
                  }`}
                  active={jobStatus.isActive}
                  onChange={onToggleActive(jobStatus)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {JobTriggerTypeTitles[jobStatus.jobTriggerType]}
              </TableCell>
              <TableCell component="th" scope="row">
                {jobStatus.jobName}
              </TableCell>
              <TableCell>
                {jobStatus.sourceSystem}
                <br />
                <Typography variant="caption" color="textSecondary">
                  {jobStatus.sourceDataInterfaceDescription}
                </Typography>
              </TableCell>
              <TableCell>
                {jobStatus.destSystem}
                <br />
                <Typography variant="caption" color="textSecondary">
                  {jobStatus.destDataInterfaceDescription}
                </Typography>
              </TableCell>
              <TableCell>{jobStatus.nextRun}</TableCell>
              <TableCell>{jobStatus.lastRun}</TableCell>
              <TableCell>
                <Tooltip title={JobStatusTitles[jobStatus.lastStatus]}>
                  {JobStatusIcons[jobStatus.lastStatus]}
                </Tooltip>
              </TableCell>
              <TableCell>{jobStatus.lastSuccesfulRun}</TableCell>
              <TableCell>{jobStatus.jobChron}</TableCell>
              <TableCell>
                <Tooltip title="Job Configuration" onClick={onConfigJob(jobStatus)}>
                  <IconButton size="small">
                    <SettingsIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Show Job">
                  <NavLink to={`sync?jobId=${jobStatus.jobDefinitionId}`}>
                    <IconButton size="small">
                      <DetailsIcon fontSize="small" />
                    </IconButton>
                  </NavLink>
                </Tooltip>
                <Tooltip title="Edit Job">
                  <IconButton size="small" onClick={onEditJob(jobStatus)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Job">
                  <IconButton size="small" onClick={onDeleteJob(jobStatus)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

function ResponsiveTable({
  tableData,
  onToggleActive,
  onEditJob,
  onDeleteJob,
  onConfigJob
}: TableComponentProps) {
  const classes = useStyles({});

  return (
    <Grid container direction="column" spacing={1}>
      {tableData.map(jobStatus => (
        <Grid item key={jobStatus.jobDefinitionId}>
          <Paper>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.headerCell}>Active</TableCell>
                  <TableCell>
                    <ActiveSwitch
                      tooltip={`Make Job ${
                        jobStatus.isActive ? "deactive" : "active"
                      }`}
                      active={jobStatus.isActive}
                      onChange={onToggleActive(jobStatus)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headerCell}>Trigger</TableCell>
                  <TableCell>
                    {JobTriggerTypeTitles[jobStatus.jobTriggerType]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headerCell}>Job Type</TableCell>
                  <TableCell>{jobStatus.jobName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headerCell}>Source</TableCell>
                  <TableCell>
                    {jobStatus.sourceSystem}
                    <br />
                    <Typography variant="caption" color="textSecondary">
                      {jobStatus.sourceDataInterfaceDescription}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headerCell}>
                    Destination
                  </TableCell>
                  <TableCell>
                    {jobStatus.destSystem}
                    <br />
                    <Typography variant="caption" color="textSecondary">
                      {jobStatus.destDataInterfaceDescription}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headerCell}>Next Run</TableCell>
                  <TableCell>{jobStatus.nextRun}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headerCell}>Last Run</TableCell>
                  <TableCell>{jobStatus.lastRun}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headerCell}>
                    Last Status
                  </TableCell>
                  <TableCell>
                    {/* <Tooltip title={JobStatusTitles[jobStatus.lastStatus]}> */}
                    {JobStatusIcons[jobStatus.lastStatus]}
                    {/* </Tooltip> */}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headerCell}>
                    Last Success
                  </TableCell>
                  <TableCell>{jobStatus.lastSuccesfulRun}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.headerCell}>Job Cron</TableCell>
                  <TableCell>{jobStatus.jobChron}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Tooltip title="Job Configuration" onClick={onConfigJob(jobStatus)}>
                        <IconButton size="small">
                          <SettingsIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Show Job">
                        <NavLink to={`sync?jobId=${jobStatus.jobDefinitionId}`}>
                          <IconButton size="small">
                            <DetailsIcon fontSize="small" />
                          </IconButton>
                        </NavLink>
                      </Tooltip>
                      <Tooltip title="Edit Job">
                        <IconButton onClick={onEditJob(jobStatus)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Job">
                        <IconButton onClick={onDeleteJob(jobStatus)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

const StatusTable = ({
  availableJobTypes,
  tenantJobStatusItems,
  setJobActiveStatus,
  deleteScheduledJobDefinition
}: StatusTableProps) => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const tableData: Array<EnhancedTenantJobStatusType> = useMemo(() => {
    return tenantJobStatusItems.map(jobStatus => ({
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
    }));
  }, [tenantJobStatusItems, availableJobTypes]);

  const handleToggleActive = useCallback(
    (jobStatus: EnhancedTenantJobStatusType) => (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      setJobActiveStatus({
        jobDefinitionId: jobStatus.jobDefinitionId,
        jobDefinitionGuid: jobStatus.jobDefinitionGuid,
        isActive: event.target.checked
      });
    },
    []
  );

  const [state, setState] = useState({
    selectedJobId: -1,
    confirmDialogOptions: {}
  });
  const {
    on: jobConfigurationDialogOpen,
    setOn: showJobConfigurationDialog,
    setOff: closeJobConfigurationDialog
  } = useToggle();
  const {
    on: confirmDialogOpen,
    setOn: showConfirmDialog,
    setOff: closeConfirmDialog
  } = useToggle();
  const {
    on: dialogOpen,
    setOn: openDialog,
    setOff: closeDialog
  } = useToggle();

  const handleCreateJob = useCallback(() => {
    setState({
      ...state,
      selectedJobId: -1
    });
    openDialog();
  }, [openDialog]);

  const handleEditJob = useCallback(
    (jobStatus: EnhancedTenantJobStatusType) => () => {
      setState({
        ...state,
        selectedJobId: jobStatus.jobDefinitionId
      });
      openDialog();
    },
    [openDialog]
  );

  const handleDeleteJob = useCallback(
    (jobStatus: EnhancedTenantJobStatusType) => () => {
      const confirmDialogOptions = {
        title: "Delete Job",
        contentText: "Are you sure that you want to delete the job?",
        yesHandler: async () => {
          await deleteScheduledJobDefinition(
            jobStatus.jobDefinitionId,
            jobStatus.jobDefinitionGuid
          );
          closeConfirmDialog();
        },
        noHandler: () => {
          closeConfirmDialog();
        }
      };
      setState({ ...state, confirmDialogOptions });
      showConfirmDialog();
    },
    []
  );

  const handleConfigJob = useCallback((jobStatus: EnhancedTenantJobStatusType) => () => {
    setState({
      ...state,
      selectedJobId: jobStatus.jobDefinitionId
    });
    showJobConfigurationDialog();
  }, [showJobConfigurationDialog]);

  const handleCloseDialog = useCallback(() => {
    setState({
      ...state,
      selectedJobId: -1
    });
    closeDialog();
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleCreateJob}>
          Create Job
        </Button>
      </Box>
      {isDesktop ? (
        <DesktopTable
          tableData={tableData}
          onToggleActive={handleToggleActive}
          onEditJob={handleEditJob}
          onDeleteJob={handleDeleteJob}
          onConfigJob={handleConfigJob}
        />
      ) : (
        <ResponsiveTable
          tableData={tableData}
          onToggleActive={handleToggleActive}
          onEditJob={handleEditJob}
          onDeleteJob={handleDeleteJob}
          onConfigJob={handleConfigJob}
        />
      )}
      <ManageJobConfigurationDialog
        open={jobConfigurationDialogOpen}
        jobId={state.selectedJobId}
        onRequestClose={closeJobConfigurationDialog}
      />
      <ManageJobDialog
        open={dialogOpen}
        jobId={state.selectedJobId}
        onRequestClose={handleCloseDialog}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        onRequestClose={closeConfirmDialog}
        options={state.confirmDialogOptions}
      />
    </Box>
  );
};

export default connectStore(mapState, mapDispatch)(StatusTable);
