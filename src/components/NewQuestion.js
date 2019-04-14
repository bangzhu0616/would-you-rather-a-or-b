import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toPage: false
  }

  handleChangeOne = (e) => {
    const optionOne = e.target.value

    this.setState(() => ({
      optionOne
    }))
  }

  handleChangeTwo = (e) => {
    const optionTwo = e.target.value

    this.setState(() => ({
      optionTwo
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOne, optionTwo } = this.state
    const { dispatch, author } = this.props
    dispatch(handleAddQuestion(optionOne, optionTwo, author))

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toPage: true
    }))
  }

  render() {
    const { authedUser } = this.props

    if (authedUser === undefined || authedUser === null) {
      return <Redirect to='/login' />
    }

    const { optionOne, optionTwo, toPage } = this.state

    if (toPage === true) {
      return <Redirect to='/' />
    }

    return (
      <div className='center'>
        <h3>Create a New Poll</h3>
        <h4>Would you rather</h4>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Option One"
            value={optionOne}
            onChange={this.handleChangeOne}
            className='textarea'
            maxLength={100}
          />
          <br></br>
          <textarea
            placeholder="Option Two"
            value={optionTwo}
            onChange={this.handleChangeTwo}
            className='textarea'
            maxLength={100}
          />
          <br></br>
          <button
            className='btn'
            type='submit'
            disabled={optionOne === '' || optionTwo === ''}>
            CREATE POLL
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    author: authedUser,
    authedUser,
    questions,
    users
  }
}


export default withRouter(connect(mapStateToProps)(NewQuestion))
