import { makeStyles } from '@material-ui/core';
import { colors } from '@Theme';
import homepageBackground from './../../assets/images/landing-page-background.jpg';

export const useStyles = makeStyles((theme) => ({
    backgroundContent: {
        height: '100vh',
        position: 'fixed',
        width: '100vw'
    },
    backgroundIcon: {
        bottom: '5%',
        right: '55%',
        position: 'absolute'
    },
    backgroundText: {
        bottom: '30%',
        color: colors.white.light,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Roboto',
        fontSize: 66,
        left: '8%',
        lineSpacing: 1.3,
        position: 'absolute'
    },
    backgroundFooter: {
        alignItems: 'center',
        bottom: 15,
        color: colors.white.light,
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%'
    },
    backgroundLink: {
        alignItems: 'center',
        color: colors.white.light,
        display: 'flex',
        fontSize: 24,
        justifyContent: 'center'
    },
    backgroundImage: {
        minHeight: '100%',
        minWidth: '1024px',
            
        /* Set up proportionate scaling */
        width: '100vw',
        height: '100vh',
        /* Set up positioning */
        position: 'absolute',
        top: 0,
        left: 0,
        background: `url(${homepageBackground}) no-repeat center center fixed`,
        backgroundSize: 'cover',

        '&:before': {
            backgroundColor: colors.blue.dark,
            bottom: 0,
            content: "''",
            left: 0,
            opacity: 0.8,
            position: 'absolute',
            right: 0,
            top: 0
        }
    }
}));
