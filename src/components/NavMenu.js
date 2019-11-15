import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import UserInfo from './UserInfo'
import { Button, Navbar, Nav } from 'react-bootstrap'
import { logoutAuthedUser } from '../actions/authedUser'
import { LinkContainer } from 'react-router-bootstrap'

class NavMenu extends Component {

  logoutHandler = (e) => {
    this.props.dispatch(logoutAuthedUser())
  }
  render() {
    const { authedUser, user } = this.props

    return (
      
      <div>
        <Navbar bg="light" expand="lg">
          {/* <Navbar.Brand href={authedUser ? '/' : '#' }>Would You Rather...?</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <LinkContainer to={authedUser ? '/' : '#' }>
              <Nav.Link href={authedUser ? '/' : '#' }>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to={authedUser ? '/add' : '#' }>
              <Nav.Link href={authedUser ? '/add' : '#'}>Add Question</Nav.Link>
            </LinkContainer>
            <LinkContainer to={authedUser ? '/leaders' : '#' }>
              <Nav.Link href={authedUser ? '/leaders' : '#'}>LeaderBoard</Nav.Link>
            </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* <div className='navigation-wrapper'>
          <ul>
            <li><Link to={authedUser ? '/' : '#' }>Home</Link></li>
            <li><Link to={authedUser ? '/add' : '#'}>Add Question</Link></li>
          </ul>
        </div> */}
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

export default connect(mapStateToProps)(NavMenu)