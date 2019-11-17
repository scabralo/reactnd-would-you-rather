import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Switch } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import AddQuestion from './AddQuestion'
import QuestionDetails from './QuestionDetails'
import LeaderBoard from './LeaderBoard'
import ErrorPage from './ErrorPage'

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
            ? null
            : <div className='content'>
                <Switch>
                  <Route path='/' exact component={Home} />
                  <Route path='/login' component={Login} />
                  <Route path='/add' component={AddQuestion} />
                  <Route path='/leaders' component={LeaderBoard} />
                  <Route path='/questions/:id' component={QuestionDetails} />
                  <Route component={ErrorPage} />
                </Switch>
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
