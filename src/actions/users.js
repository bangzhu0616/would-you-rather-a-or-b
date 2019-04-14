export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USER_ANSWER_QUESTION = 'USER_ANSWER_QUESTION'
export const USER_ADD_QUESTION = 'USER_ADD_QUESTION'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function userAnswerQuestion(answer) {
  return {
    type: USER_ANSWER_QUESTION,
    answer
  }
}

export function userAddQuestion(authedUser, qid) {
  return {
    type: USER_ADD_QUESTION,
    authedUser,
    qid
  }
}