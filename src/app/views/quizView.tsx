import * as React from "react";
import { Calculator } from "./calculator";
import { ProblemView } from "./problemView";

export class QuizView extends React.Component {
  
    handle_button_CLICK(e) {
        console.log(e);
    }

    render() {
        return (
            <div>
                <ProblemView 
                    numberA={5}
                    numberB={3}
                    operator="+">    
                </ProblemView>
                <Calculator 
                    onButtonClick={(e) => this.handle_button_CLICK(e)}>
                </Calculator>
            </div>
        );
    }

}