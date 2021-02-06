import * as React from "react";
import classnames from 'classnames';
import styles from "./calculatorButton.less";


export interface Props {
    name: string;
    onClick: any;
}

export class CalculatorButton extends React.Component<Props, {}> {
  
    render() {
        return (
            <button 
                className={classnames({
                    [styles.button]: true, 
                    [styles.cancel]: this.props.name == "Clear",
                    [styles.enter]: this.props.name == "Enter"
                })}
                onClick={() => this.props.onClick(this.props.name)}>
                    {this.props.name}
            </button>
        );
    }

}