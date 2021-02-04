import * as React from "react";
import styles from "./answerView.less";

export interface Props {
    value: number;
}

export class AnswerView extends React.Component<Props, {}> {

    render() {
        return (
            <div className={styles.answer}>
                <div>{this.props.value}</div>
            </div>
        );
    }
}