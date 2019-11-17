import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import UserInfo from './UserInfo'

class LeaderBoard extends Component {
  render() {
    const { authedUser, userIds, users } = this.props
    
    if(!authedUser) {
      return <Redirect to='/login' />
    }

    return (
      <div className='leader-board-wrapper'>
        <ListGroup >
          <h2>Leader Board</h2>
          {userIds.map((id) => (
            <ListGroup.Item  key={id}>
              <UserInfo 
                avatarURL={users[id] ? users[id].avatarURL : ''}
                authorName={id} 
              />
              <div className='user-scores'>
                <p className='h4'>{`Answers: ${Object.keys(users[id].answers).length}`}</p>
                <p className='h4'>{`Questions: ${users[id].questions.length}`}</p>
                <p className='h1'>{`Score: ${Object.keys(users[id].answers).length + users[id].questions.length}`}</p>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    )
  }
}

function mapStateToProps({users, authedUser}) {
  return {
    users,
    userIds : Object.keys(users)
    .sort((a,b) => {
      const answersA = Object.keys(users[a].answers).length
      const questionsA = users[a].questions.length

      const answersB = Object.keys(users[b].answers).length
      const questionsB = users[b].questions.length

      return (answersB + questionsB) - (answersA + questionsA)
    }),
    authedUser
  }
}

export default connect(mapStateToProps)(LeaderBoard)