import React, { Component } from 'react';
import './App.css';
import Question from './components/Question';
import TestResults from './components/TestResults';
const questions = require('./utils/questions.json')

class App extends Component {
  constructor() {
    super()
    this.state = {
      curQuestionID: 0,
      curQuestion: questions[0],
      userAnswers: [],          // for example:  
                                // [{q_id: 0, userAnswer: 3, correct: 2, isCorrect: false} , 
                                //  {q_id: 1, userAnswer: 2, correct: 2, isCorrect: true} ]
      isFinished: false
    }
  }

  nextQuestion = async () => {
    await this.setState({
      curQuestionID: this.state.curQuestionID + 1
    })
    // console.log(this.state.curQuestionID)
  }

  prevQuestion = async () => {
    await this.setState({
      curQuestionID: this.state.curQuestionID - 1
    })
    // console.log(this.state.curQuestionID)
  }

  renderTestResultComponent = () => {
    this.setState({
      isFinished: true
    })
  }

  getCurrentQuestionByID = () => questions.filter(q => q.questionID === this.state.curQuestionID)[0]

  assignChosenAnswer = (q_id, answer_id) => {
    console.log("assigning to q_id: " + q_id + " the answer_id : " + answer_id)

  }
  renderQuestions = () => <Question
    question={this.getCurrentQuestionByID()}
    prevQuestion={this.prevQuestion}
    nextQuestion={this.nextQuestion}
    finishTest={this.renderTestResultComponent}
    assignChosenAnswer={this.assignChosenAnswer}
  />

  renderTestResults = () => <TestResults />


  render() {
    const todos = ["this.props.question.questionID === 0 ? --> !== 0 , for next", "userSelection in questions"]
    console.log(todos)

    return (
      <div className="App">
        {this.state.isFinished
          ?
          this.renderTestResults()
          :
          this.renderQuestions()
        }
      </div>
    );
  }
}

export default App;
