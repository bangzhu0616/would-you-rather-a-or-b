import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionList from './QuestionList'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class Dashboard extends Component {

  render() {
    const { authedUser } = this.props

    if (authedUser === undefined || authedUser === null) {
      return <Redirect to='/login' />
    }

    return (
      <div className='center'>
        <Tabs>
          <TabList>
            <Tab>Unanswered Polls</Tab>
            <Tab>Answered Polls</Tab>
          </TabList>
          <TabPanel>
            <QuestionList answered={false}/>
          </TabPanel>
          <TabPanel>
            <QuestionList answered={true}/>
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users
  }
}


export default withRouter(connect(mapStateToProps)(Dashboard))
