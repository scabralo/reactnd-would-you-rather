import { RECEIVE_USERS, USER_RESPONSE, ADD_USER_QUESTION } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case USER_RESPONSE :
      const { user } = action
      return {
        ...state,
        [user.id] : {
          ...state[user.id],
          answers: user.answers
        }
      }
    case ADD_USER_QUESTION :
      return {
        ...state
      }
    default :
      return state
  }
}