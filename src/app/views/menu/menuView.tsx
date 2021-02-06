import { FunButton } from "app/components/FunButton";
import styles from "./menuView.less";
import * as React from "react";

interface Props {
    onSelect: any;
}

export default class MenuView extends React.Component<Props, {}> {

    problems = {
        "1": [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10]],
        "2": [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10]],
        "3": [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10]],
        "4": [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10]],
        "5": [[0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10]],
        "6": [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10]],
        "7": [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [7, 8], [7, 9], [7, 10]],
        "8": [[0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10]],
        "9": [[0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [9, 7], [9, 8], [9, 9], [9, 10]],
        "10": [[0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [10, 7], [10, 8], [9, 10], [10, 10]],
        "quiz": [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10],
            [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10],
            [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10],
            [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10],
            [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10],
            [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10],
            [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [7, 8], [7, 9], [7, 10],
            [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10],
            [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [9, 7], [9, 8], [9, 9], [9, 10],
            [0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [10, 7], [10, 8], [9, 10], [10, 10]]
    };

    colors = [
        "#F25C78",
        "#5166A6",
        "#F2CF63",
        "#F2B872",
        "#F28B50"
    ];

    selectItem(e) {
        this.props.onSelect(e);
    }

    render() {
        return (
            <div className={styles.container}>
                {this.renderButtons()}
            </div>
        );
    }

    renderButtons() {
        let arr = [];

        for (let i in this.problems) {

            arr.push(<FunButton 
                width={60}
                height={60}
                color={this.colors[Math.floor(Math.random() * this.colors.length)]}
                onClick={() => this.selectItem(this.problems[i])}>{i}</FunButton>);
        }

        return arr;
    }
  
}