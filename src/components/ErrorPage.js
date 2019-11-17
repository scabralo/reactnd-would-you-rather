import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class ErrorPage extends Component {
  render() {
    const { authedUser } = this.props

    if(!authedUser) {
      return <Redirect to='/login' />
    }

    return (
      <div className='error-page'>
        <h2 className='h1'>404</h2>
        <h3>Looks like the page you're looking for doesn't exist.</h3>
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(ErrorPage)