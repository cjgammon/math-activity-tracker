import * as React from "react";
import { QuizView } from "./views/quizView";

export default class App extends React.Component<{}> {

  render() {

    let problems = [
      [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10]
    ];

    return (
      <div>
        <QuizView problems={problems} operator="+" max={20}></QuizView>
      </div>
    );
  }
  
}