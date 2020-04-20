import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { colors } from '@Theme';

const drawerWidth = 60;

export const useStyles = makeStyles((theme: Theme) => createStyles({
    activeLink: {
        borderLeft: `5px solid ${colors.border.blue}`,
        backgroundColor: '#5f80b7',
        paddingLeft: '11px'
    },
    drawer: {
        flexShrink: 0,
        width: drawerWidth,
        
        '& svg': {
            fill: colors.blue.light,
            height: '30px',
            width: '30px',
        }
    },
    drawerPaper: {
        backgroundColor: theme.palette.primary.main,
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar
}));
