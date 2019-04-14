import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { userAnswerQuestion, userAddQuestion } from './users'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTIONS = 'ADD_QUESTIONS'
export const ANSWER_QUESTION ='ANSWER_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTIONS,
    question,
  }
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispath) => {
    dispath(showLoading())
    return saveQuestion({optionOneText, optionTwoText, author})
      .then((question) => dispath(addQuestion(question)))
      .then((question) => dispath(userAddQuestion(author, question.id)))
      .then(() => dispath(hideLoading()))
  }
}

function answerQuestion (answer) {
  return {
    type: ANSWER_QUESTION,
    answer
  }
}

export function handleAnswerQuestion(qid, answer, authedUser) {
  return (dispath) => {
    dispath(showLoading())
    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => dispath(answerQuestion({qid, answer, authedUser})))
      .then(() => dispath(userAnswerQuestion({qid, answer, authedUser})))
      .then(() => dispath(hideLoading()))
  }
}