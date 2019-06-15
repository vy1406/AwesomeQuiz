import React, { Component } from 'react';
import "./question.css"

class Question extends Component {

    renderQuestion = () => {
        return (
            <div className="title">
                {this.props.question.question}
            </div>
        )
    }

    setAnswer(event) {
        let chosenAnswer_id = event.target.value
        this.props.assignChosenAnswer(this.props.question.questionID, chosenAnswer_id)
    }

    renderAnswers = () => {
        let userAnswerId = this.props.userAnswer === undefined ? -1 : this.props.userAnswer.userSelectedOption_id

        return (
            <div className="options">
                {this.renderInputById(0, userAnswerId)}
                {this.renderInputById(1, userAnswerId)}
                {this.renderInputById(2, userAnswerId)}
                {this.renderInputById(3, userAnswerId)}
            </div>
        )
    }

    // id - question_option_id  | a_id - userAnswer_id
    renderInputById = (id, a_id) => {
        const answers = this.props.question.answers

        return (
            <div>
                <input type="radio" key={id} value={id} name="answer" onChange={event => this.setAnswer(event)} checked={id == a_id} />  {answers[id].text} <br />
            </div>
        )
    }

    // checkIfUserChose = () => this.props.userAnswer === undefined ? true : false

    // renderControls = () => {
    //     return (
    //         <div className="controls">
    //             {/* render prev or not */}
    //             {this.props.question.questionID !== 0 ?
    //                 <button onClick={this.props.prevQuestion} className="prev-btn">PREV</button>
    //                 :
    //                 null}
    //             {/* render finish or next */}
    //             {this.props.question.questionID === 9 ?
    //                 <button onClick={this.props.finishTest} hidden={this.checkIfUserChose()} className="finish-btn">FINISH</button>
    //                 :
    //                 <button onClick={this.props.nextQuestion} hidden={this.checkIfUserChose()} className="next-btn">NEXT</button>}
    //         </div>
    //     )
    // }

    render() {
        return (
            <div className="question">
                {this.renderQuestion()}
                {this.renderAnswers()}
                {/* {this.renderControls()} */}
            </div>
        )
    }
}

export default Question;