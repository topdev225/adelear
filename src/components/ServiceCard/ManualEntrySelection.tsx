import React, { useCallback, useEffect, useState } from "react";
import {
  FormControlLabel,
  Checkbox,
  Box,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Typography
} from "@material-ui/core";
import {
  Add as AddIcon,
  Clear as ClearIcon,
  Check as CheckIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";
import { Formik, FieldArray } from "formik";
import { get } from "lodash";
import { useStyles } from "./manual-entry-selection.styles";

// Modules Import
import {
  loadingStateSelector,
  deleteTenantPhaseManualEntry,
  updateTenantPhaseManualEntry
} from "@Modules";
import { connectStore } from "@Store";

// Types Import
import {
  TenantPhaseManualEntryType,
  MapStateToPropsType,
  StateType
} from "@Types";

// Hooks Import
import { useToggle } from "@Hooks";

type ServiceType = {
  phaseId: number;
  manualEntries: Array<EditableTenantPhaseManualEntryType>;
};

type ManualEntrySelectionProps = {
  service: ServiceType;
  loadingStateForDeleteManualEntry: any;
  loadingStateForUpdateManualEntry: any;
  onAddOrUpdateManualEntry: Function;
  onWipeOutManualEntry: Function;
  onWipeOutAllManualEntries: Function;
};

interface EditableTenantPhaseManualEntryType
  extends TenantPhaseManualEntryType {
  isEditing?: boolean;
}

const mapState: MapStateToPropsType = (state: StateType) => ({
  loadingStateForDeleteManualEntry: loadingStateSelector(
    deleteTenantPhaseManualEntry
  )(state),
  loadingStateForUpdateManualEntry: loadingStateSelector(
    updateTenantPhaseManualEntry
  )(state)
});

const ManualEntrySelection = ({
  service,
  loadingStateForDeleteManualEntry,
  loadingStateForUpdateManualEntry,
  onAddOrUpdateManualEntry,
  onWipeOutManualEntry,
  onWipeOutAllManualEntries
}: ManualEntrySelectionProps) => {
  const classes = useStyles({});

  const [state, setState] = useState({
    forceShowManualEntries: false
  });

  const emptyManualEntry: EditableTenantPhaseManualEntryType = {
    id: -1,
    connectedEnteprisePhaseId: service.phaseId,
    systemName: "",
    tenantId: -1,
    isEditing: true
  };

  const {
    on: manualEntriesVisible,
    setOn: showManualEntries,
    setOff: hideManualEntries
  } = useToggle(service.manualEntries.length > 0);

  useEffect(() => {
    if (service.manualEntries.length > 0) {
      showManualEntries();
    } else {
      hideManualEntries();
    }
  }, [service.manualEntries]);

  useEffect(() => {
    if (service.manualEntries.length === 0) {
      hideManualEntries();
    }
  }, [service]);

  const handleWipeAllManualEntries = useCallback(() => {
    if (!manualEntriesVisible) {
      showManualEntries();
    } else if (service.manualEntries.length === 0) {
      hideManualEntries();
    } else {
      onWipeOutAllManualEntries();
    }
  }, [service, manualEntriesVisible]);

  const handleWipeManualEntry = useCallback(
    (manualEntry: TenantPhaseManualEntryType) => () => {
      onWipeOutManualEntry(manualEntry);
    },
    []
  );

  const handleAddOrUpdate = useCallback(
    (
      manualEntry: TenantPhaseManualEntryType,
      index: number,
      replace: Function
    ) => async () => {
      setState({ forceShowManualEntries: true });
      await onAddOrUpdateManualEntry(manualEntry);
      if (manualEntry.id !== -1) {
        replace(index, {
          ...manualEntry,
          isEditing: false
        });
      }
      setState({ forceShowManualEntries: false });
    },
    [onAddOrUpdateManualEntry]
  );

  const handleNope = useCallback(() => {}, []);

  return (
    <>
      <FormControlLabel
        classes={{
          label: classes.otherOptionLabel
        }}
        control={
          <Checkbox
            checked={state.forceShowManualEntries || manualEntriesVisible}
            onChange={handleWipeAllManualEntries}
            value="checkedA"
          />
        }
        label="System not listed OR using a home-grown product"
      />
      {(state.forceShowManualEntries || manualEntriesVisible) && (
        <>
          <Box fontWeight={600} ml={4}>
            List other systems/products you are using in this phase:
          </Box>
          <Formik
            initialValues={{
              manualEntries:
                service.manualEntries.length > 0
                  ? service.manualEntries
                  : [emptyManualEntry]
            }}
            enableReinitialize
            onSubmit={handleNope}
          >
            {formik => (
              <FieldArray name="manualEntries">
                {({ push, replace, remove }) => (
                  <>
                    {formik.values.manualEntries.map((manualEntry, index) => {
                      const isDeleting = get(
                        loadingStateForDeleteManualEntry,
                        `meta.${manualEntry.id}`,
                        false
                      );
                      const isUpdating = get(
                        loadingStateForUpdateManualEntry,
                        `meta.${manualEntry.id}`,
                        false
                      );

                      return (
                        <Box
                          key={index}
                          maxWidth={440}
                          ml={4}
                          display="flex"
                          alignItems="center"
                          className={classes.manualEntry}
                        >
                          {manualEntry.isEditing ? (
                            <>
                              <TextField
                                name={`manualEntries.${index}.systemName`}
                                variant="outlined"
                                margin="dense"
                                label="Enter system name here"
                                fullWidth
                                autoFocus
                                value={manualEntry.systemName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              {isUpdating ? (
                                <CircularProgress
                                  color="primary"
                                  size={16}
                                  className={classes.manualEntryUpdateCircle}
                                />
                              ) : (
                                <IconButton
                                  onClick={handleAddOrUpdate(
                                    manualEntry,
                                    index,
                                    replace
                                  )}
                                >
                                  <CheckIcon
                                    className={classes.saveManualEntry}
                                  />
                                </IconButton>
                              )}
                              <IconButton
                                onClick={() => {
                                  if (manualEntry.id !== -1) {
                                    replace(index, {
                                      ...manualEntry,
                                      isEditing: false
                                    });
                                  } else {
                                    remove(index);
                                  }
                                }}
                                disabled={isUpdating}
                              >
                                <ClearIcon color="error" />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <Box
                                fontSize="1rem"
                                py={1}
                                width="100%"
                                display="flex"
                                alignItems="center"
                              >
                                {isDeleting ? (
                                  <CircularProgress color="primary" size={16} />
                                ) : (
                                  <>-&nbsp;&nbsp;</>
                                )}
                                <Typography>
                                  {manualEntry.systemName}
                                </Typography>
                              </Box>
                              <IconButton
                                className="editManualEntry"
                                onClick={() => {
                                  replace(index, {
                                    ...manualEntry,
                                    isEditing: true
                                  });
                                }}
                                disabled={isDeleting}
                              >
                                <EditIcon color="primary" />
                              </IconButton>
                              <IconButton
                                className="deleteManualEntry"
                                onClick={handleWipeManualEntry(manualEntry)}
                                disabled={isDeleting}
                              >
                                <DeleteIcon color="error" />
                              </IconButton>
                            </>
                          )}
                        </Box>
                      );
                    })}
                    <Box ml={4}>
                      <Button
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => push(emptyManualEntry)}
                      >
                        <Box fontWeight={600}>Add Another</Box>
                      </Button>
                    </Box>
                  </>
                )}
              </FieldArray>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default connectStore(mapState)(ManualEntrySelection);
