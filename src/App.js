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
      // [{q_id: 0, userSelectedOption: 3} , 
      //  {q_id: 1, userSelectedOption: 2} ]
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

  assignChosenAnswer = async (q_id, userSelected_id) => {

    const userAnswer = { q_id, userSelected_id }
    const userAnswers = this.state.userAnswers

    if (this.answerExist(userAnswer)) 
      this.updateExistingAnswer(userAnswer)
    
    else {
      userAnswers.push(userAnswer)
      await this.setState({ userAnswers })
    }

    console.log(this.state.userAnswers)
  }

  updateExistingAnswer = async userAnswer => {
    let userAnswers = this.state.userAnswers
    for (let i = 0; i < userAnswers.length; i++)
      if (userAnswers[i].q_id === userAnswer.q_id)
        userAnswers[i].userSelected_id = userAnswer.userSelected_id
  }

  answerExist = (userAnswer) => this.state.userAnswers.some(ua => ua.q_id === userAnswer.q_id)

  renderQuestions = () => <Question
    question={this.getCurrentQuestionByID()}
    userAnswers = {this.state.userAnswers}
    prevQuestion={this.prevQuestion}
    nextQuestion={this.nextQuestion}
    finishTest={this.renderTestResultComponent}
    assignChosenAnswer={this.assignChosenAnswer}
  />

  renderTestResults = () => <TestResults />


  render() {
    // const todos = ["this.props.question.questionID === 0 ? --> !== 0 , for next", "userSelection in questions"]
    // console.log(todos)

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
