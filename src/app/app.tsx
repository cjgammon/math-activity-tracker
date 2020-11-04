import * as React from "react";

import Database from './models/DB';
import history from './utils/history';

import {
  Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import UserSelectView from "./views/userSelect";
import ActivitiesView from "./views/activitiesView";
import appState from "./models/appState";

import './styles.less';
import ActivityView from "./views/activityView";

//Globals
declare global {
	interface Window { 
		_db: any
	}
}

export default class App extends React.Component{

	state = {
		loading: true
	}

	constructor(props: any) {
		super(props);

		window._db = new Database();
		window._db.oncomplete = this.db_complete.bind(this);
	}

	db_complete() {
		console.log('db complete: set up store');
		this.setState({loading: false});
	}

	render() {

		if (this.state.loading) {
			return <div>loading</div>;
		}

		return (
			<Router history={history}>
				<Switch>
					<Route path="/activity/:id">
						<ActivityView/>
					</Route>
					<Route path="/activities">
						<ActivitiesView />
					</Route>
					<Route path="/">
						<UserSelectView />
					</Route>
				</Switch>
			</Router>
		);
	}
  
}

