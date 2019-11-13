import React, { Component } from 'react'
import NavMenu from './NavMenu'

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <h1>Would You Rather...?</h1>
        <NavMenu />
      </header>
    )
  }
}

export default Header