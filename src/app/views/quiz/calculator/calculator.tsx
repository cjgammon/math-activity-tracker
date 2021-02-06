import * as React from "react";
import { CalculatorButton } from "./calculatorButton";
import styles from './calculator.less'

export interface Props {
    onButtonClick: any;
}

export class Calculator extends React.Component<Props, {}> {
    
    buttons = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, "Enter", "Clear"];

    handle_button_CLICK(e) {
        this.props.onButtonClick(e);
    }

    render() {
        return (
            <div className={styles.calculator}>
                {this.renderButtons()}
            </div>
        );
    }

    renderButtons() {
        let arr = [];
        for (let i = 0; i < this.buttons.length; i++) {
            arr.push(<CalculatorButton 
                onClick={(e) => this.handle_button_CLICK(e)}
                name={this.buttons[i].toString()}></CalculatorButton>)
        }
        return arr;
    }

}