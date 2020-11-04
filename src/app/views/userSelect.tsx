import * as React from "react";
import DAO from "../models/DAO";

import history from '../utils/history';

import styles from './userSelect.less';
import appState from "../models/appState";

interface Props{

}

interface State{
    users: any
}

export default class UserSelectView extends React.Component<Props, State>{

    constructor(props: any) {
        super(props);

        this.state = {
            users: []
        };

        DAO.getUsers()
            .then((res) => {
                this.setState({users: res});
            });
    }

    handle_userItem_CLICK(user: any) {
        appState.user = user;
        history.push('activities');
    }

    render() {
        return (
            <div className={styles.container}>
                <h2>Select User</h2>
                <div className={styles.userItemHolder}>
                    {this.renderUsers()}
                </div>
            </div>
        );
    }

    renderUsers() {
        let users: any[] = [];
        for (let i = 0; i < this.state.users.length; i++) {
            let user = this.state.users[i];
            users.push(<div 
                key={i}
                className={styles.userItem} 
                onClick={() => this.handle_userItem_CLICK(user)}
                >{user.name}</div>);
        }
        return users;
    }
  
}