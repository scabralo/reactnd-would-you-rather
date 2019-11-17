import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { userResponse, addUserQuestion } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const RESPOND_QUESTION = 'RESPOND_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}
function respondQuestion (question) {
  return {
    type: RESPOND_QUESTION,
    question
  }
}
export function handleRespondQuestion (qId, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    return saveQuestionAnswer({
      authedUser, qId, answer
    })
      .then((resp) => {
        dispatch(respondQuestion(resp.question))
        dispatch(userResponse(resp.user))
      })
  }
}
function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}
export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const author = authedUser
    return saveQuestion({ 
      optionOneText, optionTwoText, author 
    })
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(addUserQuestion(question))
      })
  }
}