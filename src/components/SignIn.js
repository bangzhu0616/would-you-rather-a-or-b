import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'


class SignIn extends Component {
  state = {
    userId: '',
    toHome: false
  }

  handleChange = (e) => {
    const userId = e.target.value

    this.setState(() => ({
      userId
    }))
  }

  handleSignIn = (e) => {
    e.preventDefault()
    const { userId } = this.state
    const { dispatch } = this.props
    dispatch(handleSetAuthedUser(userId))
    this.setState(() => ({
      userId: '',
      toHome: true
    }))
  }

  render() {
    const { userIds, users } = this.props
    const { toHome } = this.state
    if (toHome === true) {
      return <Redirect to={this.props.location.state ? this.props.location.state.referrer : '/'} />
    }

    return (
      <div className='center'>
        <h3>Please Login</h3>
        <form onSubmit={this.handleSignIn}>
          <select name='username' onChange={this.handleChange}>
            <option value=''>Select Your Username</option>
            {userIds.map((id) => (
              <option key={id} value={id}>
                {users[id].name}
              </option>))}
          </select>
          <br></br>
          <button
            className='btn'
            type='submit'
            disabled={this.state.userId === ''}>
            SUBMIT
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    userIds: Object.keys(users),
    users
  }
}

export default connect(mapStateToProps)(SignIn)
