import React, { Component } from 'react';
import "../testResults/testResults.css"
class TestResults extends Component {

    calculateGrade = () => {
        let correctAnswerCounter = 0
        for ( let i = 0 ; i < this.props.questions.length ; i ++ ){
            const userAnswer = this.getUserAnswer(i)
            if (this.props.questions[i].correct == userAnswer.userSelectedOption_id )
                correctAnswerCounter ++ 
        }
        return correctAnswerCounter
    }

    getUserAnswer = q_id => {
        for ( let i = 0 ; i < this.props.userAnswers.length ; i ++ )
            if ( this.props.userAnswers[i].q_id === q_id)
                return this.props.userAnswers[i]
    }

    renderResults = correctAnswers => {
        return (
            <div>
                You answered {correctAnswers} out of {this.props.userAnswers.length}! 
            </div>
        )
    }

    render() {
        const correctAnswers  = this.calculateGrade()
        return (
             <div className="results">
                 {this.renderResults(correctAnswers)}
             </div>
        )
    }
}

export default TestResults;