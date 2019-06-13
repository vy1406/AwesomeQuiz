import React, { Component } from 'react';

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
                {correctAnswers} out of 5!!
            </div>
        )
    }
    render() {
        const correctAnswers  = this.calculateGrade()
        return (
             <div>TEST RESULTS:
                 {this.renderResults(correctAnswers)}
             </div>
        )
    }
}

export default TestResults;