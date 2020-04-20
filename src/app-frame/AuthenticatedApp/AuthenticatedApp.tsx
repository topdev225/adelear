import React, { useEffect } from "react";
import { PrivateRouter } from "./PrivateRouter";
import { Navbar, SideNavBar, SetupUserDialog } from "@Components";

// Module Import
import {
  userSelector,
  loadUser,
  loadSystems,
  loadTenantSystems,
  loadTenantPhaseManualEntries
} from "@Modules";
import { connectStore } from "@Store";
import { useToggle } from "@Hooks";

// Types Import
import {
  MapStateToPropsType,
  MapDispatchToPropsType,
  UserType,
  StateType,
  RequestType,
  LoadTenantSystemsRequestType,
  LoadTenantPhaseManualEntriesRequestType
} from "@Types";

type AuthenticatedAppProps = {
  user: UserType;
  loadSystems: RequestType;
  loadUser: RequestType;
  loadTenantSystems: LoadTenantSystemsRequestType;
  loadTenantPhaseManualEntries: LoadTenantPhaseManualEntriesRequestType;
};

const mapState: MapStateToPropsType = (state: StateType) => ({
  user: userSelector(state)
});

const mapDispatch: MapDispatchToPropsType = {
  loadSystems,
  loadUser,
  loadTenantSystems,
  loadTenantPhaseManualEntries
};

const AuthenticatedApp = ({
  user,
  loadSystems,
  loadUser,
  loadTenantSystems,
  loadTenantPhaseManualEntries
}: AuthenticatedAppProps) => {
  const {
    on: dialogOpen,
    setOn: openDialog,
    setOff: closeDialog
  } = useToggle();
  const {
    on: mobileNavOpen,
    setOn: openMobileNav,
    setOff: closeMobileNav
  } = useToggle();

  useEffect(() => {
    if (!user) {
      loadUser();
      loadSystems();
    } else {
      const tenantId = user.tenants[0].id;
      loadTenantSystems(tenantId);
      loadTenantPhaseManualEntries(tenantId);
    }
  }, [user]);

  useEffect(() => {
    if (user && !user.userCreatedFlag) {
      openDialog();
    }
  }, [user]);

  return (
    <PrivateRouter>
      <Navbar onOpenMobileNav={openMobileNav} />
      <SideNavBar
        mobileNavOpen={mobileNavOpen}
        onCloseMobileNav={closeMobileNav}
      />
      <SetupUserDialog
        open={dialogOpen}
        onRequestClose={closeDialog}
        forceUpdate
      />
    </PrivateRouter>
  );
};

AuthenticatedApp.displayName = "AuthenticatedApp";

export default connectStore(mapState, mapDispatch)(AuthenticatedApp);
