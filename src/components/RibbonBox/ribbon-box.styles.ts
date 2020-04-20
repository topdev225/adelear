import { makeStyles } from '@material-ui/core';
import { colors } from '@Theme';

export const useStyles = makeStyles(theme => ({
  container: {
    borderColor: `${colors.border.light} !important`
  },
  ribbonTitleBox: {
    borderWidth: 2
  },
  ribbonTitle: {
    fontSize: '13px',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.31,
    letterSpacing: '0.9px',
    color: '#777777',
    textTransform: 'uppercase'
  },
  textEllipsis: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
}));
