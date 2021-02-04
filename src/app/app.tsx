import * as React from "react";
import { QuizView } from "./views/quizView";

export default class App extends React.Component<{}> {


  render() {
    return (
      <div>
        <QuizView></QuizView>
      </div>
    );
  }
  
}