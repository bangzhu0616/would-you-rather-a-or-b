import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionList extends Component {

  render() {
    const { questions } = this.props

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
      questions: Object.keys(questions)
                  .filter((id) => {return id in answers})
                  .sort((a,b) => questions[b].timestamp - questions[a].timestamp)

    }
  } else {
    return {
      answered,
      questions: Object.keys(questions)
                  .filter((id) => {return !(id in answers)})
                  .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
  }
}

export default connect(mapStateToProps)(QuestionList)
