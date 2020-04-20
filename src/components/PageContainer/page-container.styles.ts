import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { colors } from  '@Theme';

export interface StyleProps {
    backgroundColor: string;
    sideNavIsVisible?: boolean;
}

export const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => createStyles({
    contentContainer: {
        paddingBottom: '50px',
        paddingLeft: '50px',
        paddingRight: '50px',
        paddingTop: '50px'
    },
    headerContainer: {
        backgroundColor: colors.blue.medium,
        color: colors.white.light,
        fontSize: '30px',
        fontWeight: 500,
        height: '80px',
        lineHeight: '80px',
        paddingLeft: '50px'
    },
    pageContainer: {
        backgroundColor: ({ backgroundColor }) => backgroundColor,
        marginLeft: ({ sideNavIsVisible }) => sideNavIsVisible ? '60px' : '',
        marginTop: '64px',
        minHeight: 'calc(100vh - 64px)',
        width: ({ sideNavIsVisible }) => sideNavIsVisible ? 'calc(100vw - 60px)' : '100vw'
    }
}));
