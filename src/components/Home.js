import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import Question from './Question'
import { Tabs, Tab } from 'react-bootstrap'

class Home extends Component {
  

  render() {
    const { users, questions, questionIds, authedUser } = this.props

    if(!authedUser) {
      return <Redirect to='/login' />
    }

    if(questions === null) {
      return <p>There are no questions to show. Create one yourself <Link to='/add'>HERE!</Link></p>
    }

    const oldQuestions = questionIds.filter((id) => (
      questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.votes.includes(authedUser)
      ))
    const newQuestions = questionIds.filter((id) => (!oldQuestions.includes(id)))

    return (
      <div>
        Home Page

        <Tabs defaultActiveKey="unanswered" id="uncontrolled-tab-example">
          <Tab eventKey="unanswered" title="Unanswered">
            {newQuestions.map((id) => <Question key={id} id={id} /> )}
          </Tab>
          <Tab eventKey="answered" title="Answered">
            {oldQuestions.map((id) => <Question key={id} id={id} /> )}
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  return {
    users,
    questions,
    authedUser,
    questionIds: Object.keys(questions)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Home)