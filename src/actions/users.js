export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USER_RESPONSE = 'USER_RESPONSE'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}
export function userResponse (user) {
  return {
    type: USER_RESPONSE,
    user
  }
}
export function addUserQuestion (question) {
  return {
    type: ADD_USER_QUESTION,
    question
  }
}