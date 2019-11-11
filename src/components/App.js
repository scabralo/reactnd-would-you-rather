import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import AddQuestion from './AddQuestion'
import QuestionDetails from './QuestionDetails'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authedUser } = this.props

    return (
      <Router>
        <div className="App">
          <Header />
          {authedUser === null && <Redirect to='/login' />}
          {this.props.loading === true 
            ? null
            : <div>
                <Route path='/' exact component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/add' component={AddQuestion} />
                <Route path='/questions/:id' component={QuestionDetails} />
              </div> }
        </div>
      </Router>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    loading: users === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App)
