import React, { Component } from 'react';

class Question extends Component {

    constructor() {
        super()
    }

    renderQuestion = () => {
        return (
            <div className="question">
                {this.props.question.question}
            </div>
        )
    }

    setAnswer(event) {
        let chosenAnswer_id = event.target.value
        this.props.assignChosenAnswer(this.props.question.questionID, chosenAnswer_id)
    }

    renderAnswers = () => {
        const answers = this.props.question.answers

        return (
            <div onChange={event => this.setAnswer(event)}>
                <input type="radio" value={answers[0].id} name="answer" /> {answers[0].text} <br />
                <input type="radio" value={answers[1].id} name="answer"  defaultChecked={this.userSelection()}/> {answers[1].text} <br />
                <input type="radio" value={answers[2].id} name="answer" /> {answers[2].text} <br />
                <input type="radio" value={answers[3].id} name="answer" /> {answers[3].text} <br />
            </div>
        )
    }

    userSelection = () => {
        let userAnswer = this.getUserAnswer()
        return false
    }
    getUserAnswer = () => {

    }
    renderInputById = (answer) => <input type="radio" value={answer.id} name={answer.id} />

    renderControls = () => {
        return (
            <div>
                {/* render prev or not */}
                {this.props.question.questionID !== 0 ?
                    <button onClick={this.props.prevQuestion}>Prev</button>
                    :
                    null}
                {/* render finish or next */}
                {this.props.question.questionID === 4 ?
                    <button onClick={this.props.finishTest}>Finish</button>
                    :
                    <button onClick={this.props.nextQuestion}>Next</button>}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderQuestion()}
                {this.renderAnswers()}
                {this.renderControls()}
            </div>
        )
    }
}

export default Question;