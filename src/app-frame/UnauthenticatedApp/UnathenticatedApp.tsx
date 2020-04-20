import React, { useEffect } from 'react';
import { PublicRouter } from './PublicRouter';
import { Navbar } from '@Components';

// Module Import
import { loadPublicSystems } from '@Modules';
import { connectStore } from '@Store';

// Types Import
import { MapDispatchToPropsType, RequestType } from '@Types';

type UnauthenticatedAppProps = {
  loadPublicSystems: RequestType;
};

const mapDispatch: MapDispatchToPropsType = {
  loadPublicSystems
};

const UnauthenticatedApp = ({ loadPublicSystems }: UnauthenticatedAppProps) => {
  useEffect(() => {
    loadPublicSystems();
  }, []);
  return (
    <PublicRouter>
      <Navbar />
    </PublicRouter>
  );
};

UnauthenticatedApp.displayName = 'UnauthenticatedApp';

export default connectStore(null, mapDispatch)(UnauthenticatedApp);
