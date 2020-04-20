import React, { ComponentType } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Box
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

type ConfirmDialogOptions = {
  title?: string;
  contentText?: string;
  yesHandler?: () => void;
  noHandler?: () => void;
};

type ConfirmDialogProps = {
  open: boolean;
  options: ConfirmDialogOptions;
  onRequestClose: () => void;
};

const Transition: ComponentType<TransitionProps> = React.forwardRef(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

const ConfirmDialog: React.FunctionComponent<ConfirmDialogProps> = ({
  open,
  options,
  onRequestClose
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      disableBackdropClick
      disableEscapeKeyDown
      onClose={onRequestClose}
    >
      <DialogTitle>{options.title || 'Confirm'}</DialogTitle>
      <DialogContent>
        <Box>{options.contentText || 'Are you sure?'}</Box>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="primary" onClick={options.yesHandler}>
          Yes
        </Button>
        <Button color="primary" onClick={options.noHandler}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
