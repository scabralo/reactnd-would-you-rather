import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Would You Rather...?</h1>
          {console.log(this.props.loading)}
          {this.props.loading === true 
            ? "Loading"
            : <Login /> }
        </header>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    loading: users === null
  }
}

export default connect(mapStateToProps)(App)
