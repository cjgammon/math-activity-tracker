import * as React from "react";
import { AnswerView } from "./answerView";
import { Calculator } from "./calculator/calculator";
import { ProblemView } from "./problemView";
import { ResultsView } from "./resultsView";
import { FunButton } from "app/components/FunButton";
import { CompleteAnimView } from "./completeAnimView";
import styles from "./quizView.less";

interface Props {
    problems: Array<any>;
    operator: string;
    max: number;
    onClear?: any;
}

interface State {
    quizState: string;
    currentProblem: number;
    problemPool: Array<any>;
    operator: string;
    answer: number;
    time: number;
}

export class QuizView extends React.Component <Props, State> {

    problemStartTime: number = null;
    quizStartTime: number = null;
    completedProblems: Array<any> = [];
    quizTimer = null;

    state = {
        quizState: 'start',
        currentProblem: 0,
        problemPool: [],
        operator: null,
        answer: null,
        calcEnabled: false,
        time: 0
    }

    constructor(props) {
        super(props);

        let problemPool = this.shuffle(props.problems);
        this.state.problemPool = problemPool;
    }

    start() {
        let currentProblem = 0;
        let problemPool = this.shuffle(this.props.problems);

        this.problemStartTime = new Date().getTime();
        this.quizStartTime = new Date().getTime();
        this.completedProblems = [];

        if (this.quizTimer) {
            clearInterval(this.quizTimer);
        }
        this.quizTimer = setInterval(() => this.handle_TIMER(), 1000);


        this.setState({
            quizState: "quiz",
            problemPool,
            currentProblem,
            operator: this.props.operator,
            time: 0,
            answer: null
        });
    }

    handle_TIMER() {
        let now = new Date().getTime();
        let elapsedTime = (now - this.quizStartTime) / 1000;

        this.setState({
            time: Math.round(elapsedTime)
        })
    }

    handle_button_CLICK(e) {
        if (e == "Enter") {
            this.submitAnswer();
        } else if (parseInt(e) || e == "0"){
            let numberString = this.state.answer ? this.state.answer.toString() : "";
            let newNumberString = numberString + e;
            let newNumber = parseInt(newNumberString);
            this.setState({answer: newNumber});
        } else if (e == "Clear") {
            this.setState({answer: null});
        }
    }

    submitAnswer() {
        let numberA = this.state.problemPool[this.state.currentProblem][0];
        let numberB = this.state.problemPool[this.state.currentProblem][1];

        let endTime: number = new Date().getTime();
        let time: number = (endTime - this.problemStartTime) / 1000;

        let correctAnswer: number;
        if (this.state.operator == "+") {
            correctAnswer = numberA + numberB;
        }

        let completedProblem = {
            answer: this.state.answer,
            correct: this.state.answer == correctAnswer,
            problem: `${numberA}${this.state.operator}${numberB}`,
            time
        };

        this.completedProblems.push(completedProblem);
        this.problemStartTime = new Date().getTime();

        let currentProblem = this.state.currentProblem + 1;

        //check if done..
        if (currentProblem > this.props.max || currentProblem > this.state.problemPool.length - 1) {
            clearInterval(this.quizTimer);
            this.setState({
                quizState: "finished"
            });
        } else {
            this.setState({
                currentProblem,
                answer: null
            });
        }
    }

    render() {

        if (this.state.problemPool.length == 0) {
            return <div>none</div>
        }

        switch(this.state.quizState) {
            case "start":
                return this.renderStart();
            case "quiz":
                return this.renderQuiz();
            case "finished":
                return <CompleteAnimView 
                    onComplete={() => this.setState({quizState: "results"})}></CompleteAnimView>;
            case "results":
                return <ResultsView 
                    problems={this.completedProblems} 
                    time={this.state.time}
                    onBackClick={() => this.props.onClear()}></ResultsView>;
        }
    }

    renderStart() {
        return <div className={styles.container}>
            <FunButton 
                height={100}
                width={100}
                onClick={() => this.start()}>start</FunButton>
        </div>;
    }

    renderQuiz() {
        let numberA = this.state.problemPool[this.state.currentProblem][0];
        let numberB = this.state.problemPool[this.state.currentProblem][1];

        return (
            <div className={styles.container}>
                <div className={styles.problem}>
                    <ProblemView 
                        numberA={numberA}
                        numberB={numberB}
                        operator={this.state.operator}>    
                    </ProblemView>
                    <AnswerView value={this.state.answer}></AnswerView>
                </div>

                <Calculator 
                    onButtonClick={(e) => this.handle_button_CLICK(e)}>
                </Calculator>
                <div className={styles.timer}>{this.state.time}</div>
            </div>
        );
    }

    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
        }
        return a;
    }
}