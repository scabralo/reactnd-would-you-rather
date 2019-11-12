import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import UserInfo from './UserInfo'

class QuestionDetails extends Component {
  render() {
    const { authedUser } = this.props
    
    if(!authedUser) {
      return <Redirect to='/login' />
    }

    const { users, question, answered } = this.props
    const { author, optionOne, optionTwo } = question

    if (question === null) {
      return <p>This Question doesn't exist</p>
    }



    return (
      <div>
        Question Details Page
        <UserInfo 
          avatarURL={users[author] ? users[author].avatarURL : ''}
          authorName={author} 
        />
        <div className='question-info-container'>
        {answered === true 
          ? (
              <p>Answered</p>
              /* TODO: 
               * -Figureout which option was selected, this could be done by 
               * simple elimination, we check the first one if it isn't the first one
               * it's immediately the second one.
               * 
               * - Show both options but show a special styling/background on the one the user selected.
               * 
               * - Show number of votes for both options and percentages that they represent. This could also
               * be done by calculating one and then deducting the values for the second one.
              */
            )
          : (
              <p>Not answered</p>
              /* TODO:
               * - Show both options, these could be toggle buttons so that the use can select one and then submit the selection.
               * 
               * - After the user submits we have to make sure the screen gets updated to show the new information.
               *
               */
            )}
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser, questions, users}, props) {
  const { id } = props.match.params
  const { answered } = props.location.state

  return {
    question: questions[id] ? questions[id] : [],
    authedUser,
    users,
    answered
  }
}
export default connect(mapStateToProps)(QuestionDetails)