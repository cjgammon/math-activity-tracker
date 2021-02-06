import * as React from "react";
import classnames from 'classnames';
import styles from "./quizView.less";
import { FunButton } from "app/components/FunButton";

interface Props {
    problems: Array<any>;
    time: number;
    onBackClick: any;
}

export class ResultsView extends React.Component <Props, {}> {

    handle_back_CLICK() {
        this.props.onBackClick();
    }

    render() {
        return <div className={styles.container}>
            {this.renderCompletedProblemList()}
            <div className={styles.finalTime}>{this.props.time}</div>
            <div>
                <FunButton 
                    height={100}
                    width={100}
                    onClick={() => this.handle_back_CLICK()}>back</FunButton>
            </div>
        </div>
    }

    renderCompletedProblemList() {
        let arr = [];

        for (let i = 0; i < this.props.problems.length; i++) {
            let problem = this.props.problems[i];
            arr.push(<div className={styles.results}>
                <span className={classnames({[styles.incorrect]: !problem.correct})}>{problem.problem}={problem.answer}</span> : {problem.time}
            </div>);
        }

        return arr;
    }

}