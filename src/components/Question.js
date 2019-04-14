import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {


  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This question doesn't exists</p>
    }

    const { id } = question.question

    return (
      <div className='question'>
        Would you rather {this.props.common} ___ ?
        <Link to={`/questions/${id}`} className='questions'>
          <button className='btn'>View Poll</button>
        </Link>
      </div>
    )
  }
}

function get_common(optionOne, optionTwo) {
  for (let i=optionOne.length; i>0; i--) {
    if (optionTwo.startsWith(optionOne.slice(0, i))) {
      return optionOne.slice(0, i)
    }
  }
}

function mapStateToProps({ authedUser, questions, users }, {id}) {
  const question = questions[id]
  const author = users[question.author]
  const authed = users[authedUser]
  return {
    authedUser,
    common: question
      ? get_common(question.optionOne.text, question.optionTwo.text)
      : null,
    question: question
      ? formatQuestion(question, author, authed)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Question))
