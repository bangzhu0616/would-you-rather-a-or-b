export function formatQuestion (question, author, authedUser) {
  return {
    question,
    author,
    answered: question.id in authedUser.answers,
    answer: question.id in authedUser.answers
              ? authedUser.answers[question.id]
              : null
  }
}