import React, { useState } from "react"

import "./newQuestion.css"

function NewQuestion({ submit }) {
  const [text, setText] = useState("")
  const [answers, setAnswers] = useState([])
  const [correct, setCorrect] = useState(-1)

  function renderAnswers() {
    return answers.map((a, i) => (
      <div className="flex">
        <input
          type="radio"
          name="answers"
          checked={correct === i}
          onChange={() => setCorrect(i)}
        />
        <input
          type="text"
          value={a}
          onChange={(e) => updateAnswer(e.target.value, i)}
          className="answerinput round"
        />
      </div>
    ))
  }

  function updateAnswer(answer, i) {
    let copy = answers.slice()
    copy[i] = answer
    setAnswers(copy)
  }

  function onSubmit() {
    submit({
      text: text,
      answers: answers,
      correct: correct,
    })
  }

  return (
    <span>
      <label className="block" htmlFor={text}>
        Question:{" "}
      </label>
      <textarea
        cols="40"
        rows="3"
        value={text}
        className="questioninput round"
        onChange={(e) => setText(e.target.value)}
      />
      {renderAnswers()}
      <button onClick={(e) => setAnswers(answers.concat([""]))}>
        New Answer
      </button>
      <button className="addquestion" onClick={(e) => onSubmit()}>
        Add Question
      </button>
    </span>
  )
}

export default NewQuestion
