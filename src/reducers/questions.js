import { RECEIVE_QUESTIONS, RESPOND_QUESTION } from '../actions/questions'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case RESPOND_QUESTION :
      return {
        ...state,
        [action.question.id]: {
            ...action.question,
        }
      }
    default :
      return state
  }
}