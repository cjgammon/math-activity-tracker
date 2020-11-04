import appState from "../models/appState";
import * as React from "react";

import { ACTIVITY_LIST } from "../models/activityMap";
import history from '../utils/history';

interface Props{

}

interface State{

}

export default class ActivitiesView extends React.Component<Props, State>{

    constructor(props: any) {
        super(props);
    }

    handle_activity_CLICK(id) {
        history.push(`activity/${id}`);
    }

    render() {
        return (
            <div>
                <h2>activities</h2>
                <div>
                    {this.renderActivities()}
                </div>
            </div>
        );
    }

    renderActivities() {
        let activities = [];

        for (let i = 0; i < ACTIVITY_LIST.length; i ++) {
            let activity = ACTIVITY_LIST[i];

            if (activity.users.includes(appState.user.id)) {
                activities.push(<div 
                    key={i} 
                    onClick={() => this.handle_activity_CLICK(i)}>{activity.name}</div>);
            }
        }

        return activities;
    }
}