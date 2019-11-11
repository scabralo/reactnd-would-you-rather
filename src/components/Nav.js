import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
  render() {
    const { authedUser } = this.props

    return (
      <div>
        <ul>
          <li><Link to={authedUser ? '/' : '#' }>Home</Link></li>
          <li><Link to={authedUser ? '/add' : '#'}>Add Question</Link></li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(Nav)