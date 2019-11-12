import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  render() {
    const { users, authedUser, question, questionId } = this.props
    const user = users[question.author]
    // console.log('questionId: ', questionId)
    return (
      <div className='question-wrapper'>
        <div className='user-info-container'>
          {/* <img src={users[question.author].avatarURL} alt='user avatar' /> */}
        </div>
        <div className='question-info-container'></div>
      </div>
    )
  }
}

function mapStateToProps({users, authedUser, questions}, props) {
  const { questionId } = props.questionId
  console.log('questionId: ', questionId)
  return {
    users,
    authedUser,
    questionId,
    question: questions[questionId] ? questions[questionId] : []
  }
}

export default connect(mapStateToProps)(Question)