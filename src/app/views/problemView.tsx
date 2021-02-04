import * as React from "react";
import styles from './problemView.less';

export interface Props {
    numberB: number;
    numberA: number;
    operator: string;
}

export class ProblemView extends React.Component<Props, {}> {

    render() {
        return (
            <div className={styles.container}>
                <div>{this.props.numberA}</div>
                <div>{this.props.operator}{this.props.numberB}</div>
            </div>
        );
    }
}