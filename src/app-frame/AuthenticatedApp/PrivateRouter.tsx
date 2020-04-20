import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Analytics,
  HomePage,
  NotFound,
  Roadmap,
  Settings,
  SyncSchedule,
  SystemManagement
} from "@Pages";

import { CSSTransition, TransitionGroup } from "react-transition-group";

export interface RouterProps {
  children: any;
}

export const PrivateRouter = ({ children }: RouterProps) => {
  return (
    <BrowserRouter>
      {children}
      <TransitionGroup>
        <CSSTransition timeout={{ enter: 300, exit: 300 }} classNames="fade">
          <Switch>
            <Route path="/" component={HomePage} exact={true} />
            <Route path="/app" component={HomePage} />
            <Route path="/system" component={SystemManagement} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/sync" component={SyncSchedule} />
            <Route path="/settings" component={Settings} />
            <Route path="/roadmap" component={Roadmap} />
            <Route component={NotFound} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </BrowserRouter>
  );
};

PrivateRouter.displayName = "PrivateRouter";
