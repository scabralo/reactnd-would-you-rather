import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import UserInfo from './UserInfo'
import { handleRespondQuestion } from '../actions/questions'
import { Form, Button } from 'react-bootstrap'

class QuestionDetails extends Component {
  state = {
    selected: '',
    refresh: false
  }

  onSubmitHandler = (e) => {
    e.preventDefault()
    const { question, dispatch } = this.props
    const { selected } = this.state

    dispatch(handleRespondQuestion(question.id, selected))
      .then(() => {
    this.setState({
      selected: '',
      refresh: true
    })
      })
  }
  onChangeHandler = (e) => {
    const selected = e.target.id
    this.setState(() => ({
      selected
    }))
  }

  render() {
    const { authedUser } = this.props
    const { refresh } = this.state
    
    if(!authedUser) {
      return <Redirect to='/login' />
    }
    if(refresh) {
      return <Redirect to='/' />
    }

    const { question } = this.props

    if (question === null) {
      return <p>This Question doesn't exist</p>
    }

    const { users, answered } = this.props
    const { author, optionOne, optionTwo } = question
    const { selected } = this.state

    return (
      <Fragment >
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
            /* TODO:
               * - Show both options, these could be toggle buttons so that the use can select one and then submit the selection.
               * 
               * - After the user submits we have to make sure the screen gets updated to show the new information.
               *
               */
            <div>
              <Form onChange={this.onChangeHandler} onSubmit={this.onSubmitHandler}>
                <Form.Row>
                  <fieldset>
                    <Form.Group>
                      <h2>Would You Rather...</h2>
                      <Form.Check 
                        type='radio'
                        id={'optionOne'}
                        name="formHorizontalRadios"
                        label={<p className='h4'>{optionOne.text}</p>}
                      />
                      <Form.Check 
                        type='radio'
                        id={'optionTwo'}
                        name="formHorizontalRadios"
                        label={<p className='h4'>{optionTwo.text}</p>}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.submitHandler} disabled={selected === ''}>
                      Sign In
                    </Button>
                  </fieldset>
                </Form.Row>
                
              </Form>
            </div>
            )}
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps({authedUser, questions, users}, props) {
  const { id } = props.match.params
  const answered = props.location.state ? props.location.state.answered : false

  return {
    question: questions[id] ? questions[id] : [],
    authedUser,
    users,
    answered
  }
}
export default connect(mapStateToProps)(QuestionDetails)