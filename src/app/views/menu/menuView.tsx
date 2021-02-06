import { FunButton } from "app/components/FunButton";
import styles from "./menuView.less";
import * as React from "react";

interface Props {
    onSelect: any;
}

export default class MenuView extends React.Component<Props, {}> {

    selectItem(e) {
        this.props.onSelect(e);
    }

    render() {

        let problems = {
            "5": [[0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10]],
            "6": [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10]],
            "7": [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [7, 8], [7, 9], [7, 10]],
            "8": [[0, 6], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10]],
            "9": [[0, 6], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [9, 7], [9, 8], [9, 9], [9, 10]]

        };

        return (
            <div className={styles.container}>
                <FunButton 
                    width={60}
                    height={60}
                    onClick={() => this.selectItem(problems["5"])}>5</FunButton>
                <FunButton 
                    width={60}
                    height={60}
                    color="#5166A6" 
                    onClick={() => this.selectItem(problems["6"])}>6</FunButton>
            </div>
        );
    }
  
}