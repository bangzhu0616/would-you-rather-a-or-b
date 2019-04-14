import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import UserRanking from './UserRanking'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <div className="container">
            <LoadingBar />
            <Nav />
            <Fragment>
              {this.props.loading === true
                ? null
                : <div>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/questions/:id' component={QuestionPage} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={UserRanking} />
                    <Route path='/login' exact component={SignIn} />
                  </div>}
            </Fragment>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser, questions }) {
  return {
    loading: questions === [],
    loggedin: authedUser !== null
  }
}

export default connect(mapStateToProps)(App)
