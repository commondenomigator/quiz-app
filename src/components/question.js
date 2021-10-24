import React from "react"

function Question({ index, question, handleSelect }) {
  function renderAnswers() {
    return (
      <form>
        {question.answers.map((answer, i) => (
          <div>
            <input
              type="radio"
              name="answer"
              value={answer}
              onChange={() => handleSelect(index, i)}
            />
            <label htmlFor={answer}>{answer}</label>
          </div>
        ))}
      </form>
    )
  }

  return (
    <div>
      <h2>Question {index}</h2>
      <p>{question.text}</p>
      {renderAnswers()}
    </div>
  )
}

export default Question
