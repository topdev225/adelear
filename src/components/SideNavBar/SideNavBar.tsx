import React, { useEffect, useState, useCallback } from "react";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { History } from "history";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Hidden
} from "@material-ui/core";
import {
  Home as HomeIcon,
  Apps as AppsIcon,
  BarChart as BarChartIcon,
  Schedule as ScheduleIcon,
  SettingsApplications as SettingsIcon
} from "@material-ui/icons";
import { useStyles } from "./side-navbar.styles";

type DrawerContentProps = {
  history: History;
  onClickNavItem?: () => void;
};

const DrawerContent: React.FunctionComponent<DrawerContentProps> = ({
  history,
  onClickNavItem
}) => {
  const classes = useStyles({});
  const [activeRoute, setActiveRoute] = useState(history.location.pathname);
  const isActive = useCallback(
    (value: string) => {
      return activeRoute === value ? classes.activeLink : "";
    },
    [activeRoute, history, classes]
  );

  useEffect(() => {
    // history.listen returns a function that unsubscribes from the listener.
    const historySubscription = history.listen(() => {
      setActiveRoute(history.location.pathname);
    });

    const historyUnsubscribe = () => historySubscription();
    return () => {
      historyUnsubscribe();
      console.log("unsubscribing from router");
    };
  }, [history]);

  return (
    <>
      <div className={classes.toolbar} />
      <List>
        <ListItem
          title="Home"
          className={isActive("/")}
          component={Link}
          to="/"
          button
          onClick={onClickNavItem}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem
          title="System Setting"
          className={isActive("/system")}
          component={Link}
          to="/system"
          button
          onClick={onClickNavItem}
        >
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem
          title="Analytics"
          className={isActive("/analytics")}
          component={Link}
          to="/analytics"
          button
          onClick={onClickNavItem}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem
          title="Sync Schedule"
          className={isActive("/sync")}
          component={Link}
          to="/sync"
          button
          onClick={onClickNavItem}
        >
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem
          title="Settings"
          className={isActive("/settings")}
          component={Link}
          to="/settings"
          button
          onClick={onClickNavItem}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
        </ListItem>
      </List>
    </>
  );
};

DrawerContent.defaultProps = {
  onClickNavItem: () => {}
};

interface SideNavBarProps extends RouteComponentProps {
  history: History;
  mobileNavOpen: boolean;
  onCloseMobileNav: Function;
}

export const SideNavBar: React.FunctionComponent<SideNavBarProps> = ({
  history,
  mobileNavOpen,
  onCloseMobileNav
}) => {
  const classes = useStyles({});
  const handleCloseDrawer = useCallback(() => {
    onCloseMobileNav();
  }, [onCloseMobileNav]);

  return (
    <>
      <Hidden xsDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <DrawerContent history={history} />
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={mobileNavOpen}
          onClose={handleCloseDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <DrawerContent history={history} onClickNavItem={handleCloseDrawer} />
        </Drawer>
      </Hidden>
    </>
  );
};

SideNavBar.displayName = "SideNavBar";

export default withRouter(SideNavBar);
