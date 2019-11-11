import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          {this.props.loading === true 
            ? "Loading"
            : <Login /> }
        </div>
      </Router>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    loading: users === null
  }
}

export default connect(mapStateToProps)(App)
