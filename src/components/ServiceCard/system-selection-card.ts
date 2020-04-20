import { makeStyles } from '@material-ui/core';
import { colors } from '@Theme';

export const useStyles = makeStyles(theme => ({
  cardContainer: {
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.30)',
    padding: '10px 25px'
  },
  step: {
    fontSize: '24px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: colors.blue.medium
  },
  title: {
    fontSize: '24px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: colors.gray.dark
  },
  selectText: {
    fontSize: '13px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.31,
    letterSpacing: 'normal',
    color: colors.gray.medium
  }
}));
