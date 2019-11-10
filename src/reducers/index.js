import { combineReducers } from 'redux'
import authedUsers from './auhedUser'
import users from './users'
import questions from './questions'

export default combineReducers({
  authedUsers,
  users,
  questions
})