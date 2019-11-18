import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import QuestionsList from './QuestionsList'
import { Tabs, Tab } from 'react-bootstrap'

class Home extends Component {
  

  render() {
    const { questions, questionIds, users, authedUser, location } = this.props

    if(!authedUser) {
      return <Redirect to={{
        pathname: '/login',
        state: { goBackTo: location.pathname}
      }} />
    }

    if(questions === null) {
      return <p>There are no questions to show. Create one yourself <Link to='/add'>HERE!</Link></p>
    }
    
    const oldQuestions = questionIds.filter((id) => ( users[authedUser].answers[id] ))
    const newQuestions = questionIds.filter((id) => (!oldQuestions.includes(id)))

    return (
      <div className='tabs-wrapper'>
        <Tabs defaultActiveKey="unanswered" id="uncontrolled-tab-example">
          <Tab eventKey="unanswered" title="Unanswered">
            <QuestionsList questions={newQuestions} answered={false}/>
          </Tab>
          <Tab eventKey="answered" title="Answered">
            <QuestionsList questions={oldQuestions} answered={true}/>
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