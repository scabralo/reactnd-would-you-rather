import React, { Component } from 'react'
import Nav from './Nav'

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <h1>Would You Rather...?</h1>
        <Nav />
      </header>
    )
  }
}

export default Header