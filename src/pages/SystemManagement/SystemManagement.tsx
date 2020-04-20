import React, { useCallback, useState } from "react";
import { History } from "history";
import qs from "qs";
import {
  PageContainer,
  SystemSelectionCard,
  ServiceCard,
  Loader
} from "@Components";
import { Box, Grid, Fab, Container } from "@material-ui/core";
import {
  Edit as EditIcon,
  ArrowBack as ArrowBackIcon
} from "@material-ui/icons";
import { useStyles } from "./system-management.styles";

// Components Import
import { ConfirmDialog } from "@Components";

// Context Import
import { BestHeightProvider } from "@Contexts";

// Module Import
import {
  loadTenantSystems as loadTenantSystemsActionCreator,
  tenantSystemsSelector
} from "@Modules";

// Types Import
import {
  UserType,
  TenantConnectedEnterprisePhaseSystemType,
  SelectSystemRequestType,
  DeselectSystemRequestType,
  AddTenantPhaseManualEntryRequestType,
  UpdateTenantPhaseManualEntryRequestType,
  TenantPhaseManualEntryType,
  DeleteTenantPhaseManualEntryRequestType
} from "@Types";
import { useToggle } from "@Hooks";

// Type definition of the props that are passed in SystemManagement component
type SystemManagementProps = {
  getCategoriedSystems: () => Array<any>;
  history: History;
  user: UserType;
  selectSystem: SelectSystemRequestType;
  deselectSystem: DeselectSystemRequestType;
  addTenantPhaseManualEntry: AddTenantPhaseManualEntryRequestType;
  updateTenantPhaseManualEntry: UpdateTenantPhaseManualEntryRequestType;
  deleteTenantPhaseManualEntry: DeleteTenantPhaseManualEntryRequestType;
};

const SystemManagement = ({
  getCategoriedSystems,
  history,
  user,
  selectSystem,
  deselectSystem,
  addTenantPhaseManualEntry,
  updateTenantPhaseManualEntry,
  deleteTenantPhaseManualEntry
}: SystemManagementProps) => {
  const [state, setState] = useState({
    confirmDialogOptions: {}
  });
  const {
    on: confirmDialogOpen,
    setOn: showConfirmDialog,
    setOff: closeConfirmDialog
  } = useToggle();

  const classes = useStyles({});
  const services = getCategoriedSystems();
  const pageAction = qs.parse(history.location.search, {
    ignoreQueryPrefix: true
  }).action;

  const handleGoEdit = useCallback(() => {
    history.push("/system?action=edit");
  }, [history]);
  const handleGoRoadmap = useCallback(() => {
    history.push("/system");
  }, [history]);
  const handleSelectSystem = useCallback(
    (customer: any) => async () => {
      const tenantId = user.tenants[0].id;
      if (customer.selected) {
        deselectSystem({
          tenantSystemPhaseId: customer.selected.id,
          userId: user.userId
        });
      } else {
        selectSystem({
          tenantId,
          connectedEnterprisePhaseSystemsId: customer.phaseSystemId,
          userId: user.userId
        });
      }
    },
    [user]
  );
  const handleAddOrUpdateManualEntry = useCallback(
    (phaseId: number) => async (manualEntry: TenantPhaseManualEntryType) => {
      const tenantId = user.tenants[0].id;
      if (manualEntry.id === -1) {
        return addTenantPhaseManualEntry({
          tenantId,
          connectedEnteprisePhaseId: phaseId,
          manualSystemNameEntry: manualEntry.systemName,
          userId: user.userId
        });
      } else {
        return updateTenantPhaseManualEntry({
          tenantPhaseManualSystemEntryId: manualEntry.id,
          manualEntryNewValue: manualEntry.systemName
        });
      }
    },
    [user]
  );

  const handleWipeOutManualEntries = useCallback(
    (phaseId: number) => () => {
      const confirmDialogOptions = {
        title: "Disable manual entries",
        contentText:
          "Are you sure that you want to delete all the existing manual systems?",
        yesHandler: () => {
          const service = services.find(service => service.phaseId === phaseId);
          if (service) {
            service.manualEntries.forEach(
              (manualEntry: TenantPhaseManualEntryType) => {
                deleteTenantPhaseManualEntry(manualEntry.id);
              }
            );
          }
          closeConfirmDialog();
        },
        noHandler: () => {
          closeConfirmDialog();
        }
      };
      setState({ ...state, confirmDialogOptions });
      showConfirmDialog();
    },
    [services]
  );

  const handleWipeOutManualEntry = useCallback(
    (manualEntry: TenantPhaseManualEntryType) => {
      const confirmDialogOptions = {
        title: "Disable manual entry",
        contentText: `Are you sure that you want to delete the manual system - ${manualEntry.systemName}?`,
        yesHandler: () => {
          closeConfirmDialog();
          deleteTenantPhaseManualEntry(manualEntry.id);
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

  return (
    <PageContainer header={"System Management"}>
      <Loader
        actionCreator={loadTenantSystemsActionCreator}
        selector={tenantSystemsSelector}
      >
        {(tenantSystems: Array<TenantConnectedEnterprisePhaseSystemType>) =>
          tenantSystems.length === 0 || pageAction === "edit" ? (
            <Box maxWidth={1072} mx="auto" my="auto">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <div className={classes.hint}>
                  For each phase below, select the system(s) you wish to
                  integrate with your Connected Enterprise.
                </div>
                <Box>
                  <Fab
                    color="primary"
                    aria-label="edit"
                    onClick={handleGoRoadmap}
                  >
                    <ArrowBackIcon />
                  </Fab>
                </Box>
              </Box>
              <Box className={classes.serviceCards}>
                {services.map((service, index) => (
                  <SystemSelectionCard
                    key={index}
                    service={service}
                    onSelectSystem={handleSelectSystem}
                    onAddOrUpdateManualEntry={handleAddOrUpdateManualEntry(
                      service.phaseId
                    )}
                    onWipeOutAllManualEntries={handleWipeOutManualEntries(
                      service.phaseId
                    )}
                    onWipeOutManualEntry={handleWipeOutManualEntry}
                  />
                ))}
              </Box>
            </Box>
          ) : (
            <Container maxWidth="xl">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Box fontSize={30}>
                  {user && user.tenants[0].tenantName} Connected Enterprise
                  System
                </Box>
                <Fab color="primary" aria-label="edit" onClick={handleGoEdit}>
                  <EditIcon />
                </Fab>
              </Box>
              <BestHeightProvider>
                <Grid
                  alignItems="flex-start"
                  container
                  direction="row"
                  justify="space-between"
                  spacing={2}
                >
                  {services.map(service => {
                    return (
                      <Grid key={service.phaseId} item>
                        <ServiceCard
                          {...service}
                          hideUnselected
                          showVeryTwoOnly={false}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </BestHeightProvider>
            </Container>
          )
        }
      </Loader>
      <ConfirmDialog
        open={confirmDialogOpen}
        onRequestClose={closeConfirmDialog}
        options={state.confirmDialogOptions}
      />
    </PageContainer>
  );
};

SystemManagement.displayName = "SystemManagement";

export default SystemManagement;
