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
  optionDetails = (count, total) => {
    return(
      <p><span>{count}</span> out of <span>{total}</span> votes - <span>{(count/total)*100}%</span></p>
    )
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
                {this.optionDetails(optionOneVotesCount, totalVotes)}
                {this.optionDetails(optionTwoVotesCount, totalVotes)}
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