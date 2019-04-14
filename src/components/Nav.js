import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'

class Nav extends Component {

  handleLogout = (e) => {
    const {dispatch } = this.props
    dispatch(handleSetAuthedUser(null))
  }

  render() {
    return (
      <nav className='nav center'>
        <ul>
          {this.props.loggedin === true
            ? <li>
                <NavLink to='/' exact activeClassName='active' >
                  <span style={{fontWeight: 'bold', color: 'blue'}}>Hi, {this.props.users[this.props.authedUser].name}</span>
                </NavLink>
              </li>
            : null }
          <li>
            <NavLink to='/' exact activeClassName='active' >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' exact activeClassName='active' >
              New Poll
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active' >
              User Ranking
            </NavLink>
          </li>
          {this.props.loggedin === true
            ? <li>
                <span style={{cursor: 'pointer'}} onClick={e=>this.handleLogout(e)}>
                  LogOut
                </span>
              </li>
            : <li>
                <NavLink to='/login' activeClassName='active' >
                  LogIn
                </NavLink>
              </li>}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    loggedin: authedUser !== null,
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(Nav)
