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
            "6": [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10]]
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