import React from "react";
import { Link } from 'react-router-dom';
import ArrowForward from '@material-ui/icons/ArrowForward'
import { MergeIcon } from '@Icons';
import { useStyles } from './landing-page.styles';

export const LandingPage = () => {
    const classes = useStyles({});

    return (
        <>
            <div className={classes.backgroundImage}>
            </div>
            <MergeIcon className={classes.backgroundIcon} />
            <div className={classes.backgroundContent}>    
                {/* TODO: Responsive sizing for fonts */}
                <div className={classes.backgroundText}>
                    <div>Business</div>
                    <div>Intelligence</div>
                    <div>Integrated</div>
                </div>
            </div>
            <div className={classes.backgroundFooter}>
                <Link to='/roadmap' className={classes.backgroundLink}>
                    find your path
                    <ArrowForward />
                </Link>
            </div>
        </>
    );
};

LandingPage.displayName = 'LandingPage';
