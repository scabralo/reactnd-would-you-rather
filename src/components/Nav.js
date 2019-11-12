import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import UserInfo from './UserInfo'
import { Button } from 'react-bootstrap'
import { logoutAuthedUser } from '../actions/authedUser'

class Nav extends Component {

  logoutHandler = (e) => {
    this.props.dispatch(logoutAuthedUser())
  }
  render() {
    const { authedUser, user } = this.props

    return (
      <div>
        <div className='navigation-wrapper'>
          <ul>
            <li><Link to={authedUser ? '/' : '#' }>Home</Link></li>
            <li><Link to={authedUser ? '/add' : '#'}>Add Question</Link></li>
          </ul>
        </div>
        {authedUser && (
          <div className='user-info-wrapper'>
          <UserInfo avatarURL={user.avatarURL} authorName={authedUser} />
          <Button variant="danger" onClick={this.logoutHandler}>Logout</Button>
        </div>
        )}
        

      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    user: users[authedUser] ? users[authedUser] : []
  }
}

export default connect(mapStateToProps)(Nav)