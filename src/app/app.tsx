import * as React from "react";
import MenuView, { QuizDefinition } from "./views/menu/menuView";
import { QuizView } from "./views/quiz/quizView";

interface State{
    problems: QuizDefinition;
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
                problems={this.state.problems.arr} 
                operator={this.state.problems.operator}
                max={100}
                maxTime={this.state.problems.time || -1}
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