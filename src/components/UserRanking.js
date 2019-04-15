import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class UserRanking extends Component {
  render() {

    const { authedUser, rankings } = this.props

    if (authedUser === undefined || authedUser === null) {
      return <Redirect to={{ pathname: '/login', state: { referrer: '/leaderboard' }}} />
    }
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Ranking</th>
              <th>Username</th>
              <th>Publish</th>
              <th>Answer</th>
              <th>Total</th>
            </tr>
            {rankings.map((user, index) => (
              <tr key={user.id} style={{fontWeight: user.id === authedUser ? 'bold' : 'normal'}}>
                <td>{index+1}</td>
                <td>
                  <img src={user.avatarURL} className='avatar' alt='profile'/>
                  {user.name}
                </td>
                <td>{user.questions_score}</td>
                <td>{user.answers_score}</td>
                <td>{user.total_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  const rankings = []
  Object.entries(users).forEach(
    ([key, value]) =>{
      const questions_score = value.questions.length
      const answers_score = Object.keys(value.answers).length
      rankings.push({
        id: value.id,
        name: value.name,
        avatarURL: value.avatarURL,
        questions_score: questions_score,
        answers_score: answers_score,
        total_score: questions_score + answers_score
      })
    }
  )
  return {
    authedUser,
    questions,
    users,
    rankings: rankings.sort((a, b) => b.total_score - a.total_score)
  }
}

export default withRouter(connect(mapStateToProps)(UserRanking))
