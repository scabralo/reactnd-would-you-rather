import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    userId: ''
  }
  onUserChange = (e) => {
    const userId = e.target.value
    this.setState((e) => ({
      userId
    }))
  }
  submitHandler = (e) => {
    e.preventDefault()
    const { userId } = this.state

    this.props.dispatch(setAuthedUser(userId))
  }
  render() {
    const { authedUser } = this.props
    const { userId } =  this.state

    if(authedUser) return <Redirect to='/' />

    return (
      <div>
        <h2>Welcome!</h2>
        <h3>Sign In</h3>
        <Form>
          <Form.Group>
            <Form.Label>Who are you?</Form.Label>
            <Form.Control as="select" onChange={this.onUserChange.bind(this)}>
              <option key='0' value=''>Select a User</option>
              {this.props.userIds.map((id) => (
                <option key={id} value={id}>{id}</option>
              ))}
            </Form.Control>
            <Button variant="primary" type="submit" onClick={this.submitHandler} disabled={userId === ''}>
              Sign In
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    userIds: Object.keys(users),
    authedUser
  }
}

export default connect(mapStateToProps)(Login)