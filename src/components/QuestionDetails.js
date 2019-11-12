import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class QuestionDetails extends Component {
  render() {
    const { authedUser } = this.props
    
    if(!authedUser) {
      return <Redirect to='/login' />
    }
    
    return (
      <div>
        Question Details Page
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(QuestionDetails)