import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
        <Link to={`/questions/${id}`}>
          <div className='user-info-container'>
            <img src={users[author] ? users[author].avatarURL : ''} alt='user avatar' />
            <p><b>{author}</b></p>
          </div>
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