import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import UserInfo from './UserInfo'

class Question extends Component {
  render() {
  // question: questions[questionId] ? questions[questionId] : []
    const { users, question } = this.props

    if (question === null) {
      return <p>This Question doesn't exist</p>
    }

    const { id, author, optionOne } = question

    return (
      <div className='question-wrapper'>
        <Link to={{ 
          pathname:`/questions/${id}`,
          state: { answered: this.props.answered }
          }}>
          <UserInfo 
            avatarURL={users[author] ? users[author].avatarURL : ''}
            authorName={author} 
          />
          <div className='question-info-container'>
            <h3>Would you rather...</h3>
            <p>{optionOne.text}, or...</p>
          </div>
        </Link>
      </div>
    )
  }
}

function mapStateToProps({users, authedUser, questions}, {id}) {
  return {
    users : users ? users : [],
    authedUser,
    question: questions[id] ? questions[id] : []
  }
}

export default connect(mapStateToProps)(Question)