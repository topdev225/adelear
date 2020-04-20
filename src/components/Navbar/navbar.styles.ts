import { makeStyles } from '@material-ui/core';
import { colors } from '@Theme';

export const useStyles = makeStyles((theme: any) => ({
  logo: {
    alignItems: 'center',
    display: 'flex',
    marginRight: 'auto',
    textDecoration: 'none',

    '& > svg:first-child': {
      marginRight: 10
    }
  },
  logoText: {
    borderLeft: `1px solid ${colors.border.light}`,
    color: colors.blue.dark,
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 1,
    margin: 0,
    padding: 0,
    marginLeft: '10px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingTop: '5px'
  },
  navInfo: {
    color: colors.text.dark,
    display: 'flex'
  },
  userInfo: {
    borderRight: `1px solid ${colors.border.dark}`,
    paddingRight: '10px',
    marginRight: '10px',
    cursor: 'pointer'
  },
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: colors.white.light,
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    color: theme.palette.primary.main,
    flexGrow: 1
  },
  navLink: {
    cursor: 'pointer'
  }
}));
