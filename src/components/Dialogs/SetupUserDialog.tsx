import React, { ComponentType, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  TextField
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import { Formik } from "formik";
import * as yup from "yup";

// Module Import
import { userSelector, updateUser } from "@Modules";
import { connectStore } from "@Store";

// Types Import
import {
  MapStateToPropsType,
  MapDispatchToPropsType,
  UserType,
  StateType,
  UpdateUserRequestType
} from "@Types";

type SetupUserDialogProps = {
  open: boolean;
  forceUpdate?: boolean;
  user: UserType;
  onRequestClose: () => void;
  updateUser: UpdateUserRequestType;
};

const Transition: ComponentType<TransitionProps> = React.forwardRef(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

const mapState: MapStateToPropsType = (state: StateType) => ({
  user: userSelector(state)
});

const mapDispatch: MapDispatchToPropsType = {
  updateUser
};

const SetupUserDialog: React.FunctionComponent<SetupUserDialogProps> = ({
  open,
  forceUpdate,
  user,
  updateUser,
  onRequestClose
}) => {
  const handleUpdate = useCallback(
    async (values, actionBag) => {
      actionBag.setSubmitting(true);
      try {
        await updateUser({
          firstName: values.firstName,
          lastName: values.lastName
        });
        actionBag.setSubmitting(false);
        onRequestClose();
      } catch (error) {
        console.log("Error! updateUser", error);
        actionBag.setSubmitting(false);
      }
    },
    [user]
  );

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      disableBackdropClick={forceUpdate}
      disableEscapeKeyDown={forceUpdate}
      onClose={onRequestClose}
    >
      <Formik
        initialValues={{
          firstName: user ? user.firstName : "",
          lastName: user ? user.lastName : ""
        }}
        enableReinitialize
        validationSchema={yup.object().shape({
          firstName: yup.string().required("First name is required!"),
          lastName: yup.string().required("Last name is required!")
        })}
        onSubmit={handleUpdate}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
                error={Boolean(
                  formik.touched.firstName && formik.errors.firstName
                )}
                helperText={
                  formik.touched.firstName ? formik.errors.firstName : ""
                }
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                margin="dense"
                id="lastName"
                name="lastName"
                label="Last Name"
                fullWidth
                error={Boolean(
                  formik.touched.lastName && formik.errors.lastName
                )}
                helperText={
                  formik.touched.lastName ? formik.errors.lastName : ""
                }
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                color="primary"
                disabled={formik.isSubmitting}
              >
                Update
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

SetupUserDialog.defaultProps = {
  forceUpdate: false
};

export default connectStore(mapState, mapDispatch)(SetupUserDialog);
