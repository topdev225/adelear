import React, { ComponentType, useCallback, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  Box
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { TransitionProps } from "@material-ui/core/transitions";
import { Formik, FormikValues, FormikHelpers } from "formik";
import * as yup from "yup";
import cronstrue from "cronstrue";
import uuid from "uuid/v1";

// Modules Import
import {
  availableJobTypesSelector,
  tenantJobStatusesSelector,
  tenantJobOptionsSelector,
  createScheduledJobDefinition,
  updateScheduledJobDefinition
} from "@Modules";
import { connectStore } from "@Store";

// Types Import
import {
  MapStateToPropsType,
  StateType,
  TenantJobStatusType,
  TenantJobOptionType,
  MapDispatchToPropsType,
  CreateScheduledJobDefinitionRequestType,
  UpdateScheduledJobDefinitionRequestType,
  AvailableTenantJobTypeType
} from "@Types";

// Assets Import
import cronValidationImage from "../../assets/images/cron-validation.png";

// Styles Import
import { useStyles } from "./manage-job-dialog.styles";

type ManageJobDialogProps = {
  open: boolean;
  availableJobTypes: Array<AvailableTenantJobTypeType>;
  job: TenantJobStatusType;
  jobOptions: TenantJobOptionType;
  jobId?: number;
  onRequestClose: () => void;
  createScheduledJobDefinition: CreateScheduledJobDefinitionRequestType;
  updateScheduledJobDefinition: UpdateScheduledJobDefinitionRequestType;
};

const Transition: ComponentType<TransitionProps> = React.forwardRef(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

const empty: TenantJobStatusType = {
  jobDefinitionId: -1,
  jobTriggerType: 0,
  jobTypeGuid: "",
  sourceSystem: "",
  sourceDataInterfaceDescription: "",
  destSystem: "",
  destDataInterfaceDescription: "",
  jobChron: "",
  isActive: false,
  isArchived: false,
  jobDefinitionGuid: ""
};

const mapState: MapStateToPropsType = (
  state: StateType,
  componentProps: any
) => {
  const jobOptions = tenantJobOptionsSelector(state);
  const availableJobTypes = availableJobTypesSelector(state);
  if (componentProps.jobId) {
    const jobs = tenantJobStatusesSelector(state);
    const job = jobs.find(j => j.jobDefinitionId === componentProps.jobId);
    if (job) {
      return { job, jobOptions, availableJobTypes };
    }
  }

  return {
    job: {
      ...empty,
      jobTypeGuid:
        availableJobTypes.length > 0 ? availableJobTypes[0].jobGuid : ""
    },
    jobOptions,
    availableJobTypes
  };
};

const mapDispatch: MapDispatchToPropsType = {
  createScheduledJobDefinition,
  updateScheduledJobDefinition
};

const ManageJobDialog: React.FunctionComponent<ManageJobDialogProps> = ({
  open,
  jobId,
  job,
  availableJobTypes,
  jobOptions,
  onRequestClose,
  createScheduledJobDefinition,
  updateScheduledJobDefinition
}) => {
  const [jobCronRequired, setJobCronRequired] = useState(
    job.jobTriggerType === 0
  );

  const [validationRuleVisible, setValidationRuleVisible] = useState(false);

  useEffect(() => {
    setJobCronRequired(job.jobTriggerType === 0);
  }, [job]);

  const handleUpdate = useCallback(
    async (values, actionBag) => {
      actionBag.setSubmitting(true);
      if (jobId === -1) {
        await createScheduledJobDefinition({
          ...values,
          jobDefinitionGuid: uuid(),
          isActive: true
        });
      } else {
        await updateScheduledJobDefinition({
          jobDefinitionId: job.jobDefinitionId,
          jobDefinitionGuid: job.jobDefinitionGuid,
          sourceSystem: values.sourceSystem,
          sourceDataInterfaceDescription: values.sourceDataInterfaceDescription,
          destSystem: values.destSystem,
          destDataInterfaceDescription: values.destDataInterfaceDescription,
          jobTriggerType: values.jobTriggerType,
          jobTypeGuid: values.jobTypeGuid,
          isActive: job.isActive,
          jobChron: values.jobChron
        });
      }
      actionBag.setSubmitting(false);
      onRequestClose();
    },
    [job, jobId]
  );

  const handleJobTriggerType = useCallback(
    (formik: FormikHelpers<FormikValues>) => (e: object, value: number) => {
      formik.setFieldValue("jobTriggerType", value);
      setJobCronRequired(value === 0);
      setTimeout(() => {
        if (value === 1) {
          formik.setFieldValue("jobChron", "");
          formik.setFieldError("jobChron", "");
        }
      }, 0);
    },
    []
  );

  const handleShowCronValidationRule = useCallback(() => {
    setValidationRuleVisible(true);
  }, []);

  const classes = useStyles({});

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      classes={{
        paper: classes.root
      }}
      onClose={onRequestClose}
    >
      <Formik
        initialValues={job}
        enableReinitialize
        validationSchema={yup.object().shape({
          sourceSystem: yup.string().required("Source system is required!"),
          destSystem: yup.string().required("Destination system is required!"),
          jobChron: jobCronRequired
            ? yup
                .string()
                .test("validation", "Job cron is invalid!", (value: string) => {
                  if (!value) return true;
                  try {
                    cronstrue.toString(value);
                    return true;
                  } catch (error) {
                    console.log("cron validator error", error);
                    return false;
                  }
                })
                .required("Job cron is required!")
            : yup.string()
        })}
        onSubmit={handleUpdate}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>{`${
              jobId === -1 ? "Create" : "Update"
            } Job`}</DialogTitle>
            <DialogContent>
              <ToggleButtonGroup
                value={formik.values.jobTriggerType}
                exclusive
                onChange={handleJobTriggerType(formik)}
              >
                <ToggleButton value={0}>Scheduled</ToggleButton>
                <ToggleButton value={1}>External Trigger</ToggleButton>
              </ToggleButtonGroup>
              <FormControl fullWidth margin="dense">
                <InputLabel>Job Type</InputLabel>
                <Select
                  id="jobTypeGuid"
                  name="jobTypeGuid"
                  fullWidth
                  margin="dense"
                  value={formik.values.jobTypeGuid}
                  onChange={formik.handleChange}
                >
                  {availableJobTypes.map(availableJobType => (
                    <MenuItem
                      key={availableJobType.jobGuid}
                      value={availableJobType.jobGuid}
                    >
                      {availableJobType.jobName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                error={Boolean(
                  formik.touched.sourceSystem && formik.errors.sourceSystem
                )}
                fullWidth
                margin="dense"
              >
                <InputLabel>Source System</InputLabel>
                <Select
                  id="sourceSystem"
                  name="sourceSystem"
                  fullWidth
                  margin="dense"
                  value={formik.values.sourceSystem}
                  onChange={formik.handleChange}
                >
                  {jobOptions.systemOptions.map(systemOption => (
                    <MenuItem key={systemOption.id} value={systemOption.name}>
                      {systemOption.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.sourceSystem && formik.errors.sourceSystem && (
                  <FormHelperText>{formik.errors.sourceSystem}</FormHelperText>
                )}
              </FormControl>
              <TextField
                margin="dense"
                id="sourceDataInterfaceDescription"
                name="sourceDataInterfaceDescription"
                label="Source Data Interface Description"
                fullWidth
                error={Boolean(
                  formik.touched.sourceDataInterfaceDescription &&
                    formik.errors.sourceDataInterfaceDescription
                )}
                helperText={
                  formik.touched.sourceDataInterfaceDescription
                    ? formik.errors.sourceDataInterfaceDescription
                    : ""
                }
                value={formik.values.sourceDataInterfaceDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormControl
                error={Boolean(
                  formik.touched.destSystem && formik.errors.destSystem
                )}
                fullWidth
                margin="dense"
              >
                <InputLabel>Destination System</InputLabel>
                <Select
                  id="destSystem"
                  name="destSystem"
                  fullWidth
                  margin="dense"
                  value={formik.values.destSystem}
                  onChange={formik.handleChange}
                >
                  {jobOptions.systemOptions.map(systemOption => (
                    <MenuItem key={systemOption.id} value={systemOption.name}>
                      {systemOption.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.destSystem && formik.errors.destSystem && (
                  <FormHelperText>{formik.errors.destSystem}</FormHelperText>
                )}
              </FormControl>
              <TextField
                margin="dense"
                id="destDataInterfaceDescription"
                name="destDataInterfaceDescription"
                label="Destination Data Interface Description"
                fullWidth
                error={Boolean(
                  formik.touched.destDataInterfaceDescription &&
                    formik.errors.destDataInterfaceDescription
                )}
                helperText={
                  formik.touched.destDataInterfaceDescription
                    ? formik.errors.destDataInterfaceDescription
                    : ""
                }
                value={formik.values.destDataInterfaceDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                margin="dense"
                id="jobChron"
                name="jobChron"
                label="Job Cron"
                fullWidth
                error={Boolean(
                  formik.touched.jobChron && formik.errors.jobChron
                )}
                helperText={
                  formik.values.jobTriggerType === 1
                    ? "Our engineers will assist in setting up external triggers (file drops, sharepoint list updates, etc..)"
                    : formik.touched.jobChron
                    ? formik.errors.jobChron
                    : "The change will go into effect within 24hrs"
                }
                disabled={formik.values.jobTriggerType === 1} // When the job type is external trigger
                value={formik.values.jobChron}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.values.jobTriggerType === 0 && (
                <Box mt={1}>
                  <Typography color="textSecondary" variant="caption">
                    Find and test your CRON definition in{" "}
                    <a href="#" onClick={handleShowCronValidationRule}>
                      here
                    </a>
                  </Typography>
                  {validationRuleVisible && (
                    <Box overflow="auto">
                      <img src={cronValidationImage} />
                    </Box>
                  )}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                color="primary"
                disabled={formik.isSubmitting}
              >
                {`${jobId !== -1 ? "Update" : "Create"}`}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default connectStore(mapState, mapDispatch)(ManageJobDialog);
