import React, { useCallback, useEffect, useState } from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import moment from 'moment';
import {
  AppBar,
  Toolbar,
  Tab,
  Tabs,
  Tooltip,
  Hidden,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon
} from '@material-ui/icons';
import { AdelearIcon, AdelearText } from '@Icons';
import { theme } from '@Theme';
import { useUser } from '@Contexts';
import { SetupUserDialog } from '@Components';
import { useStyles } from './navbar.styles';
import { authContext } from '../../adalConfig';

// Modules Import
import { userSelector } from '@Modules';
import { connectStore } from '@Store';
import { useToggle, usePopover } from '@Hooks';

// Types Import
import { MapStateToPropsType, StateType, UserType } from '@Types';

interface A11yProps {
  id: string;
  'aria-controls': string;
}

interface NavbarProps extends RouteComponentProps {
  history: History;
  user?: UserType;
  onOpenMobileNav: Function;
}

const mapState: MapStateToPropsType = (state: StateType) => ({
  user: userSelector(state)
});

const a11yProps = (index: number): A11yProps => ({
  id: `action-tab-${index}`,
  'aria-controls': `action-tabpanel-${index}`
});

const getTabIndexFromPath = (path: string): number => {
  switch (path) {
    case '/roadmap':
      return 1;
    case '/contact':
      return 2;
    default:
      return 0;
  }
};

const Navbar: React.FunctionComponent<NavbarProps> = ({ history, user, onOpenMobileNav }) => {
  const classes = useStyles({});
  const { user: isSignedIn, userInfo } = useUser();

  const {
    on: dialogOpen,
    setOn: openDialog,
    setOff: closeDialog
  } = useToggle();
  const {
    open: openAccountMenu,
    anchorEl,
    openPopover,
    closePopover
  } = usePopover();

  // Set the index based on the url. Used to ensure proper state on reload.
  const [value, setValue] = useState(
    getTabIndexFromPath(history.location.pathname)
  );

  useEffect(() => {
    // history.listen returns a function that unsubscribes from the listener.
    const historySubscription = history.listen(() => {
      setValue(getTabIndexFromPath(history.location.pathname));
    });

    const historyUnsubscribe = () => historySubscription();
    return () => {
      historyUnsubscribe();
      console.log('unsubscribing from router');
    };
  }, [history]);

  const handleChange = useCallback(
    (event: React.ChangeEvent, index: number): void => {
      let pathToNavigateTo: string = '/';
      const button = event.target.closest('button');
      const currentPath = history.location.pathname;

      if (button) {
        pathToNavigateTo = button.getAttribute('data-path');
      }

      if (currentPath === pathToNavigateTo) {
        return;
      }
      setValue(index);
      history.push(pathToNavigateTo);
    },
    [history, setValue]
  );

  const handleOpenMobileNav = useCallback(() => {
    onOpenMobileNav();
  }, [onOpenMobileNav]);

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar
        style={{
          minHeight: '64px'
        }}
      >
        <Hidden smUp>
          <IconButton onClick={handleOpenMobileNav}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <div className={classes.logo}>
          <a
            href="https://www.adelear.com"
            className={classes.logo}
            target="_blank"
          >
            <AdelearIcon height={30} fill={theme.palette.secondary.main} />
            <Hidden xsDown>
              <AdelearText
                height={18}
                width={85}
                fill={theme.palette.primary.main}
              />
            </Hidden>
          </a>
          <Link to={isSignedIn ? '/roadmap' : '/'} className={classes.logo}>
            <div className={classes.logoText}>Connected Enterprise</div>
          </Link>
        </div>

        {isSignedIn ? (
          <>
            <Hidden xsDown>
              <div className={classes.navInfo}>
                <Tooltip
                  title={
                    user
                      ? `Last Sign On Date: ${moment(user.lastLogin).format(
                          'MM/DD/YYYY HH:mm A'
                        )}`
                      : ''
                  }
                >
                  <div
                    className={classes.userInfo}
                    onClick={() => openDialog()}
                  >
                    Hi,{' '}
                    {user
                      ? `${user.firstName} ${user.lastName}`
                      : userInfo.email}
                  </div>
                </Tooltip>
                <div
                  className={classes.navLink}
                  onClick={() => authContext.logOut()}
                >
                  Sign Out
                </div>
              </div>
            </Hidden>
            <Hidden smUp>
              <IconButton onClick={openPopover}>
                <AccountCircleIcon color="primary" />
              </IconButton>
              <Popover
                open={openAccountMenu}
                anchorEl={anchorEl}
                onClose={closePopover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
              >
                <List>
                  <ListItem>
                    <ListItemText
                      primary={`Hi, ${
                        user
                          ? `${user.firstName} ${user.lastName}`
                          : userInfo.email
                      }`}
                      secondary={
                        user
                          ? `Last Sign On Date: ${moment(user.lastLogin).format(
                              'MM/DD/YYYY HH:mm A'
                            )}`
                          : ''
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem
                    button
                    onClick={() => {
                      closePopover();
                      openDialog();
                    }}
                  >
                    <ListItemText primary="Update Profile" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => {
                      closePopover();
                      authContext.logOut();
                    }}
                  >
                    <ListItemText primary="Sign Out" />
                  </ListItem>
                </List>
              </Popover>
            </Hidden>
          </>
        ) : (
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            {/* Use data-path in place of react-router link due to TS errors in mui-tab refs */}
            {/* We hide the home tab since Tabs require an index that matches on of its children and we have removed the home tab visually. */}
            <Tab
              style={{ display: 'none' }}
              label="Home"
              data-path="/"
              {...a11yProps(1)}
              aria-hidden={true}
            />
            <Tab label="Roadmap" data-path="/roadmap" {...a11yProps(1)} />
            <Tab label="Login" data-path="/app" {...a11yProps(2)} />
          </Tabs>
        )}
      </Toolbar>
      <SetupUserDialog open={dialogOpen} onRequestClose={closeDialog} />
    </AppBar>
  );
};

Navbar.displayName = 'Navbar';

export default withRouter(connectStore(mapState)(Navbar));
