import { makeStyles } from '@material-ui/core';
import { colors } from '@Theme';

export const useStyles = makeStyles(theme => ({
  customerBox: {
    cursor: 'pointer',
    '&:hover': {
      borderColor: colors.green.extraLight
    }
  },
  selectedCustomerBox: {
    cursor: 'pointer',
    borderWidth: 3
  },
  checkbox: {
    color: colors.green.light
  },
  image: {
    height: 40,
    margin: '10px 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& img': {
      width: '80px'
    }
  },
  emptyCard: {
    borderRadius: '8px',
    border: 'dashed 1px #cccccc',
    backgroundColor: '#f7f7f7'
  }
}));
