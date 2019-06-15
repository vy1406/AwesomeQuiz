import React, { Component } from 'react';
import Question from '../question/Question';
import TestResults from '../testResults/TestResults';
import "./test.css"

const questions = require('../../utils/questions.json')
const LIMIT = questions.length

class Test extends Component {

    constructor() {
        super()
        this.state = {
            curQuestionID: 0,
            curQuestion: questions[0],
            userAnswers: [],          // for example:  
            // [{q_id: 0, userSelectedOption_id: 3} , 
            //  {q_id: 1, userSelectedOption_id: 2} ]
            isFinished: false
        }
    }

    nextQuestion = () => {
        this.setState({
            curQuestionID: this.state.curQuestionID + 1
        })
    }

    prevQuestion = () => {
        this.setState({
            curQuestionID: this.state.curQuestionID - 1
        })
    }

    renderTestResultComponent = () => {
        this.setState({
            isFinished: true
        })
    }

    getCurrentQuestionByID = () => questions.filter(q => q.questionID === this.state.curQuestionID)[0]

    assignChosenAnswer = async (q_id, userSelectedOption_id) => {

        const userAnswer = { q_id, userSelectedOption_id }
        const userAnswers = this.state.userAnswers

        if (this.answerExist(userAnswer))

            this.updateExistingAnswer(userAnswer)

        else {
            userAnswers.push(userAnswer)
            await this.setState({ userAnswers })
        }
    }

    updateExistingAnswer = async userAnswer => {
        let userAnswers = this.state.userAnswers
        for (let i = 0; i < userAnswers.length; i++)
            if (userAnswers[i].q_id === userAnswer.q_id)
                userAnswers[i].userSelectedOption_id = userAnswer.userSelectedOption_id

        this.setState({ userAnswers })
    }

    answerExist = (userAnswer) => this.state.userAnswers.some(ua => ua.q_id === userAnswer.q_id)

    getUserAnswer = (q_id) => {
        let userAnswer = undefined
        for (let i = 0; i < this.state.userAnswers.length; i++) {
            if (this.state.userAnswers[i].q_id == q_id)
                userAnswer = this.state.userAnswers[i]
        }
        return userAnswer
    }

    renderQuestions = () => <Question
        question={this.getCurrentQuestionByID()}
        userAnswer={this.getUserAnswer(this.state.curQuestionID)}
        prevQuestion={this.prevQuestion}
        nextQuestion={this.nextQuestion}
        assignChosenAnswer={this.assignChosenAnswer}
    />

    renderTestResults = () => <TestResults userAnswers={this.state.userAnswers} questions={questions} />

    checkIfUserChose = () => this.getUserAnswer(this.state.curQuestionID) === undefined ? true : false

    finishTest = (event) => this.renderTestResultComponent()
    
    renderControls = () => {
        return (
            <div className="controls">
                {/* render prev or not */}
                {this.state.curQuestionID !== 0 ?
                    <button onClick={this.prevQuestion} className="prev-btn">PREV</button>
                    :
                    null}
                {/* render finish or next */}
                {this.state.curQuestionID === LIMIT -1 ?
                    // <button onClick={this.renderTestResultComponent} hidden={this.checkIfUserChose()} className="finish-btn">FINISH</button>
                    <button  hidden={this.checkIfUserChose()} onClick={(e) => { if (window.confirm('Are u sure ?')) this.finishTest(e) }}  className="finish-btn">FINISH</button>
                    :
                    <button onClick={this.nextQuestion} hidden={this.checkIfUserChose()} className="next-btn">NEXT</button>}
                    
            </div>
        )
    }
//  <button onClick={(e) => { if (window.confirm('Are item?')) this.deleteItem(e) }}>Delete</button>
    renderQuestionsAndControls = () => {
        return (
            <div>
                {this.renderQuestions()}
                {this.renderControls()}
            </div>
        )
    }
 
    render() {
        return (
            <div>
                {
                    this.state.isFinished
                        ?
                        this.renderTestResults()
                        :
                        this.renderQuestionsAndControls()
                }

            </div>
        )
    }
}

export default Test;