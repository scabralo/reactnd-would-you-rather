import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class LeaderBoard extends Component {
  render() {
    const { authedUser } = this.props
    
    if(!authedUser) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        Leader Board... Oh fuck...
      </div>
    )
  }
}

function mapStateToProps({users, questions, authedUser}) {
  return {
    users,
    questions,
    authedUser
  }
}

export default connect(mapStateToProps)(LeaderBoard)