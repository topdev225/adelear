import React from 'react';
import { useMediaQuery, Theme } from '@material-ui/core';
import { theme } from '@Theme';
import { useStyles } from './page-container.styles';

interface PageContainerProps {
  backgroundColor?: string;
  children: any;
  header?: string;
  sideNavIsVisible?: boolean;
}

export const PageContainer: React.FunctionComponent<PageContainerProps> = ({
  backgroundColor,
  children,
  header,
  sideNavIsVisible
}) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs')
  );
  const classes = useStyles({
    backgroundColor,
    sideNavIsVisible: !sideNavIsVisible ? false : !isMobile
  });

  return (
    <div className={classes.pageContainer}>
      {header && <div className={classes.headerContainer}>{header}</div>}
      <div className={classes.contentContainer}>{children}</div>
    </div>
  );
};

PageContainer.displayName = 'PageContainer';

PageContainer.defaultProps = {
  backgroundColor: theme.palette.background.default,
  sideNavIsVisible: true
};
