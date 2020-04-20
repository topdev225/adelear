import { makeStyles } from '@material-ui/core';
import { colors } from '@Theme';

export const useStyles = makeStyles(theme => ({
  otherOptionLabel: {
    fontSize: '15px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.31,
    letterSpacing: 'normal',
    color: colors.gray.dark
  },
  manualEntry: {
    '& .editManualEntry, .deleteManualEntry': {
      visibility: 'hidden'
    },
    '&:hover': {
      '& .editManualEntry, .deleteManualEntry': {
        visibility: 'visible'
      }
    }
  },
  saveManualEntry: {
    color: colors.green.light
  },
  manualEntryUpdateCircle: {
    margin: '12px',
    marginLeft: '24px'
  }
}));
