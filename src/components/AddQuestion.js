import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { handleAddQuestion } from '../actions/questions'

class AddQuestion extends Component {
  state ={
    optionOneText: 'First Option',
    optionTwoText: 'Second Option',
    toHome: false
  }
  submitHandler = (e) => {
    e.preventDefault()
    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props
    dispatch(handleAddQuestion(optionOneText, optionTwoText))
      .then(()=>{
        this.setState({
          toHome: true
        })
      })
  }
  onChange = (e) => {
    const { id, value } = e.target
    this.setState({
      ...this.state,
      [id]: value
    })
  }
  render() {
    const { authedUser } = this.props
    const { optionOneText, optionTwoText, toHome } = this.state

    // console.log('State: ', this.state)
    if(!authedUser) {
      return <Redirect to='/login' />
    }
    if(toHome) {
      return <Redirect to='/' />
    }
    
    return (
      <div className='add-question-wrapper'>
        <h2>Add a question...</h2>
        <Form className='add-question-form' onChange={this.onChange}  onSubmit={this.submitHandler} >
          <h3>Would you rather...</h3>
          <Form.Group>
            <Form.Control id='optionOneText' as='input' defaultValue='First Option' placeholder='First Option' />
            <p className='h4'>...or...</p>
            <Form.Control id='optionTwoText' as='input' defaultValue='Second Option' placeholder='Second Option' />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={ optionOneText === '' || optionTwoText === '' }>
            Submit Response
          </Button>
        </Form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(AddQuestion)