import React, { useState, useEffect } from "react"

function NewQuestion({ submit }) {
  const [text, setText] = useState([])
  const [answers, setAnswers] = useState([])
  const [correct, setCorrect] = useState([])

  useEffect(() => {
    setText("")
    setAnswers([])
    setCorrect(-1)
  }, [])

  function renderAnswers() {
    return answers.map((a, i) => (
      <div>
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
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {renderAnswers()}
      <button onClick={(e) => setAnswers(answers.concat([""]))}>
        New Answer
      </button>
      <button onClick={(e) => onSubmit()}>Submit</button>
    </div>
  )
}

export default NewQuestion
