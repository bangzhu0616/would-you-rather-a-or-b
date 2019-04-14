import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/questions'

class QuestionPage extends Component {

  handleSelect = (e, id, option) => {
    e.preventDefault()
    console.log(option, id)
    console.log(this.props.authedUser)
    const { dispatch, authedUser } = this.props
    dispatch(handleAnswerQuestion(id, option, authedUser))
  }

  render() {
    const { authedUser } = this.props
    if (authedUser === undefined || authedUser === null) {
      return <Redirect to='/login' />
    }

    const { authedUserObj } = this.props
    const { id } = this.props.match.params
    const question = this.props.questions[id]
    console.log(question)
    const { author, optionOne, optionTwo } = question
    const { name, avatarURL } = this.props.users[author]
    const answered = Object.keys(authedUserObj.answers).includes(id)
    const answer = authedUserObj.answers[id]
    const oneVotes = question.optionOne.votes.length
    const twoVotes = question.optionTwo.votes.length
    const totalVotes = oneVotes + twoVotes

    return (
      <div className='question-container'>
        {answered === true
          ? <div className='question'>
              <div className='question-info'>
                <div className='would-you-rather'>Would you rather</div>
                <div className={answer==='optionOne' ? 'selected' : 'unselected'}>
                  <span>{optionOne.text}</span>
                  <span className='percent'>{parseFloat(oneVotes/totalVotes*100).toFixed(2)+'% ' + `(${oneVotes}/${totalVotes})`}</span>
                </div>
                <div className={answer==='optionTwo' ? 'selected' : 'unselected'}>
                  <span>{optionTwo.text}</span>
                  <span className='percent'>{parseFloat(twoVotes/totalVotes*100).toFixed(2)+'% ' + `(${twoVotes}/${totalVotes})`}</span>
                </div>
              </div>
              <div style={{float: 'right'}}>
                <img src={avatarURL}
                       alt={`Avatar of ${name}`}
                       className='avatar'
                  />
                <span className='username'>{name}</span>
                </div>
            </div>
          : <div className='question'>
              <div className='question-info'>
                <div className='would-you-rather'>Would you rather</div>
                <div className='selection' onClick={(e) => this.handleSelect(e, id, 'optionOne')}>
                  <span>{optionOne.text}</span>
                </div>
                <div className='selection' onClick={(e) => this.handleSelect(e, id, 'optionTwo')}>
                  <span>{optionTwo.text}</span>
                </div>
              </div>
              <div style={{float: 'right'}}>
                <img src={avatarURL}
                       alt={`Avatar of ${name}`}
                       className='avatar'
                  />
                <span className='username'>{name}</span>
              </div>
            </div>}

      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  const authedUserObj = users[authedUser]
  return {
    authedUser,
    authedUserObj,
    users,
    questions
  }
}

export default withRouter(connect(mapStateToProps)(QuestionPage))
