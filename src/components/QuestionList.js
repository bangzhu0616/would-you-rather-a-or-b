import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionList extends Component {

  render() {
    const { questions } = this.props
    // const Question = this.props.answered ? AnsweredQuestion : UnansweredQuestion

    return (
      <div>
        <ul>
          {questions.map((id) => (
            <li key={id} >
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, { answered }) {
  const user = users[authedUser]
  const answers = user.answers
  if (answered === true) {
    return {
      answered,
      questions: Object.keys(questions).filter((id) => {return id in answers})
    }
  } else {
    return {
      answered,
      questions: Object.keys(questions).filter((id) => {return !(id in answers)})
    }
  }
}

export default connect(mapStateToProps)(QuestionList)
