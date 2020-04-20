import { makeStyles } from '@material-ui/core';
import { colors } from '@Theme';

export const useStyles = makeStyles(theme => ({
  serviceContainer: {
    borderRadius: 10,
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: 35,
    position: 'relative',
    '&:after': {
      borderLeft: '35px solid transparent',
      borderRight: '35px solid transparent',
      borderTop: `25px solid ${theme.palette.secondary.main}`,
      bottom: -25,
      content: "''",
      display: 'block',
      height: 0,
      position: 'absolute',
      right: 'calc(50% - 35px)',
      width: 0
    }
  },
  serviceRow: {
    marginBottom: 20,
    '&:last-child': {
      marginTop: 30
    }
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  sectionHeader: {
    color: colors.white.light,
    fontSize: 32,
    fontWeight: 500,
    marginBottom: 10
  },
  servicesPoweredByContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    color: colors.white.light,
    fontSize: 15,
    fontWeight: 500,
    justifyContent: 'center',
    padding: 25,
    width: 315
  },
  servicesPoweredByBubble: {
    alignItems: 'center',
    backgroundColor: `rgba(255, 255, 255, 0.2)`,
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    height: '250px',
    justifyContent: 'center',
    letterSpacing: 1.88,
    width: '250px',
    '& > div:not(:last-of-type)': {
      marginBottom: 10
    }
  },
  footerContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 40
  },
  footerHeader: {
    color: colors.text.light,
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 15
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-evenly',

    '& > div': {
      marginLeft: 15,
      marginRight: 15
    }
  }
}));
