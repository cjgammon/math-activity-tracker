import * as React from "react";
import styles from "./calculatorButton.less";


export interface Props {
    name: string;
    onClick: any;
}

export class CalculatorButton extends React.Component<Props, {}> {
  
    render() {
        return (
            <button 
                className={styles.button}
                onClick={() => this.props.onClick(this.props.name)}>
                    {this.props.name}
            </button>
        );
    }

}