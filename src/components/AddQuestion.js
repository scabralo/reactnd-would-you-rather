import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class AddQuestion extends Component {
  render() {
    const { authedUser } = this.props

    if(!authedUser) {
      return <Redirect to='/login' />
    }
    
    return (
      <div>
        Add a Question Page
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