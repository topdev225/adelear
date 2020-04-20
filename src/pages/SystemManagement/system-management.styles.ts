import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  serviceCards: {
    '& > div:not(:first-of-type)': {
      marginTop: '21px'
    }
  },
  hint: {
    fontSize: '18px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.13,
    letterSpacing: 'normal',
    color: '#333333'
  }
}));
