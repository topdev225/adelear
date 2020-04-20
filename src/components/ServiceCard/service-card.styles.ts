import { makeStyles } from '@material-ui/core';
import { colors } from '@Theme';

export const useStyles = makeStyles(theme => ({
  buttonLink: {
    backgroundColor: 'inherit',
    border: 'none',
    color: colors.text.informative,
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 500,
    paddingBottom: 0,
    paddingTop: 0
  },
  cardContainer: {
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.30)',
    padding: '10px 25px',
    width: 315,
    minHeight: (props: any) => props.cardHeight
  },
  cardCta: {
    color: colors.text.dark,
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `solid 2px ${colors.border.light}`
  },
  cardDescription: {
    fontSize: 13,
    color: colors.text.medium,
    marginBottom: 5,
    marginTop: 5
  },
  cardHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  cardStep: {
    color: colors.text.informative,
    fontSize: 20,
    fontWeight: 500
  },
  cardTitle: {
    width: 211,
    fontSize: 24,
    fontWeight: 500,
    color: colors.text.dark
  },
  displayAsCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    paddingBottom: 15,
    paddingTop: 15,

    // TODO: fix responsive layout better
    '& img': {
      height: 30,
      width: 'auto'
    }
  },
  image: {
    height: 40,
    margin: '10px 10px',

    '& img': {
      height: '100%',
      width: 'auto'
    }
  },
  modal: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: 0
  },
  modalContainer: {
    backgroundColor: colors.white.light,
    maxWidth: '90%',
    width: 600
  },
  modalHeader: {
    alignItems: 'center',
    borderBottom: `1px solid ${colors.border.light}`,
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25
  },
  modalBody: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    padding: '20px 100px'
  },
  modalFooter: {
    alignItems: 'center',
    borderTop: `1px solid ${colors.border.light}`,
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 20
  }
}));
