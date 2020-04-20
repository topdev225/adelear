import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
	LandingPage,
	NotFound,
	Roadmap,
	RedirectPage
} from '@Pages';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withAdalLoginApi } from '../../adalConfig';

export interface RouterProps { children: any;}

export const PublicRouter = ({ children }: RouterProps) => {
  return (
		<BrowserRouter>
			{children}
			<TransitionGroup>
				<CSSTransition
					timeout={{ enter: 300, exit: 300 }}
					classNames="fade"
				>
					<Switch>
						<Route
							path='/'
							component={LandingPage}
							exact={true}
						/>
						<Route path='/roadmap' component={Roadmap}/>
						<Route path='/app' component={withAdalLoginApi(RedirectPage, RedirectPage, () => <div >error</div>)}/>
						<Route component={NotFound}/>
					</Switch>
				</CSSTransition>
			</TransitionGroup>
		</BrowserRouter>
  )
}

PublicRouter.displayName = 'PublicRouter';
