import * as React from "react";

import {
    withRouter
  } from "react-router-dom";

interface Props{
    match: any
}

interface State{

}

export class ActivityView extends React.Component<Props, State>{

    constructor(props: any) {
        super(props);
    }

    render() {
        //render based on activity..
        return (
            <div>
                activity {this.props.match.params.id}
            </div>
        );
    }
}

export default withRouter(ActivityView);