import * as React from "react";
import MenuView from "./views/menu/menuView";
import { QuizView } from "./views/quiz/quizView";

interface State{
    problems: any;
}

export default class App extends React.Component<{}, State> {

    state = {
        problems: null
    }

    onSelect(e) {
        this.setState({problems: e})
    }

    render() {

        if (this.state.problems) {
            return <QuizView 
                problems={this.state.problems} 
                operator="+" 
                max={100}
                onClear={() => this.setState({problems: null})}
                ></QuizView>
        }

        return (
            <div>
                <MenuView onSelect={(e) => this.onSelect(e)}></MenuView>
            </div>
        );
    }
    
}