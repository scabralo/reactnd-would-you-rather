import { saveQuestionAnswer } from '../utils/api'
import { userResponse } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const RESPOND_QUESTION = 'RESPOND_QUESTION'

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