import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'

class Login extends Component {
  render() {
    return (
      <div>
        <h2>Welcome!</h2>
        <h3>Sign In</h3>
        <Form>
          <Form.Group>
            <Form.Label>Who are you?</Form.Label>
            <Form.Control as="select">
              {this.props.userIds.map((id) => (
                <option key={id} value={id}>{id}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users)
  }
}

export default connect(mapStateToProps)(Login)