import React, {ComponentType, useEffect} from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Box,
  CircularProgress
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";

// Components Import
import { FormBuilder } from '@Components';

// Modules Import
import {
  tenantJobStatusesSelector,
  loadJobTypeConfigSchema,
  jobTypeConfigSchemasSelector
} from "@Modules";
import { connectStore } from "@Store";

// Types Import
import { MapStateToPropsType, StateType, TenantJobStatusType, MapDispatchToPropsType, LoadJobTypeConfigurationSchemaRequestType, ConfigurationSchemaType, ConfigurationType } from "@Types";

type ManageJobConfigurationDialogProps = {
  open: boolean;
  job: TenantJobStatusType;
  configSchema: ConfigurationSchemaType;
  onRequestClose: () => void;
  loadJobTypeConfigSchema: LoadJobTypeConfigurationSchemaRequestType;
}

type ManageJobConfigurationDialogContentProps = {
  configSchema: ConfigurationSchemaType;
}

const Transition: ComponentType<TransitionProps> = React.forwardRef(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

const mapState: MapStateToPropsType = (
  state: StateType,
  componentProps: any
) => {
  const jobs = tenantJobStatusesSelector(state);
  const job = jobs.find(j => j.jobDefinitionId === componentProps.jobId);
  const jobTypeConfigSchemas = jobTypeConfigSchemasSelector(state);
  return { job, configSchema: job ? jobTypeConfigSchemas[job.jobTypeGuid] : null };
}

const mapDispatch: MapDispatchToPropsType = {
  loadJobTypeConfigSchema,
};

const ManageJobConfigurationDialogContent: React.FunctionComponent<ManageJobConfigurationDialogContentProps> = ({
  configSchema,
}) => {
  const properties: Array<{
      name: string;
      label: string;
      schema: ConfigurationType;
  }> = Object.keys(configSchema.properties).map((key: string) => ({
    name: key.split(" ").join(""),
    label: key,
    schema: configSchema.properties[key]
  }));

  const formik = useFormik({
    initialValues: properties.reduce((m: any, p) => {
      if (p.schema.type === 'integer') {
        m[p.name] = 0;
      } else if (p.schema.type[0] === 'array') {
        m[p.name] = ["hi", "hi1"];
      }
      return m;
    }, {}),
    onSubmit: (values: any) => {
      console.log('sss', values);
    }
  });

  function handleNope() {}

  return (
    <form onSubmit={configSchema ? formik.handleSubmit : handleNope}>
      <DialogTitle>
        Update Configurations
      </DialogTitle>
      <DialogContent>
        {configSchema && (
          <FormBuilder formik={formik} properties={properties} />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          color="primary"
          disabled={configSchema ? formik.isSubmitting : true}
        >
          Update
        </Button>
      </DialogActions>
    </form>
  )
}

const ManageJobConfigurationDialog: React.FunctionComponent<ManageJobConfigurationDialogProps> = ({
  open,
  job,
  configSchema,
  onRequestClose,
  loadJobTypeConfigSchema,
}) => {
  
  useEffect(() => {
    if (job) {
      loadJobTypeConfigSchema(job.jobTypeGuid);
    }
  }, [job]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onRequestClose}
    >
      {configSchema ? (
        <ManageJobConfigurationDialogContent configSchema={configSchema} />
      ) : (
        <Box p={1}>
          <CircularProgress color="primary" />
        </Box>
      )}
    </Dialog>
  )
};

export default connectStore(mapState, mapDispatch)(ManageJobConfigurationDialog);
