import React, { Component } from 'react'
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
    const { authedUser, location } = this.props
    const { refresh } = this.state
    
    if(!authedUser) {
      return <Redirect to={{
        pathname: '/login',
        state: { goBackTo: location.pathname}
      }} />
    }
    if(refresh) {
      return <Redirect to='/' />
    }

    const { question } = this.props

    if (!question.id) {
      return <Redirect to='/not-found' />
    }

    const { users, answered } = this.props
    const { author, optionOne, optionTwo } = question
    const { selected } = this.state

    const optionOneVotesCount = question.optionOne.votes.length
    const optionTwoVotesCount = question.optionTwo.votes.length
    const totalVotes = optionOneVotesCount + optionTwoVotesCount

    const previousAnswer = users[authedUser].answers[question.id]

    return (
      <div className='question-details-container'>
        <UserInfo 
          avatarURL={users[author] ? users[author].avatarURL : ''}
          authorName={author} 
        />
        <div className='question-info-container'>
        {answered === true 
          ? (<div>
              <h2>Results...</h2>
              <div className={`optionOne results-data ${previousAnswer === 'optionOne' ? 'selected' : ''}`} >
                <p className='h4'>{optionOne.text}</p>
                {this.optionDetails(optionOneVotesCount, totalVotes)}
              </div>
              <div className={`optionTwo results-data ${previousAnswer === 'optionTwo' ? 'selected' : ''}`} >
                <p className='h4'>{optionTwo.text}</p>
                {this.optionDetails(optionTwoVotesCount, totalVotes)}
              </div>
            </div>)
          : (<div>
              <Form className='question-details-form' onChange={this.onChangeHandler} onSubmit={this.onSubmitHandler}>
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
                    Submit Question
                  </Button>
                </fieldset>
              </Form>
            </div>)}
        </div>
      </div>
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