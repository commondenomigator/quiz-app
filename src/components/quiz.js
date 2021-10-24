import React, { useState, useEffect } from "react"

import NewQuestion from "./newQuestion"
import Question from "./question"

import "./quiz.css"

function Quiz() {
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [index, setIndex] = useState(0)
  const [editing, setEditing] = useState(false)
  const [newQuestion, setNewQuestion] = useState(false)

  useEffect(function () {
    const dummyQuestions = [
      {
        text: "When was UC Berkeley founded?",
        answers: ["1853", "1868", "1890", "1902"],
        correct: 1,
      },
      {
        text: "Which is largest?",
        answers: ["Snail", "Cat", "Human"],
        correct: 2,
      },
    ]

    setQuestions(dummyQuestions)
    setSelectedAnswers(dummyQuestions.map(() => -1))
  }, [])

  const handleSelect = (i, val) => {
    let copy = selectedAnswers.slice()
    copy[i] = val
    setSelectedAnswers(copy)
    setIndex(i + 1)
  }

  function renderQuestions() {
    return questions.map((question, i) => (
      <div>
        <Question index={i} question={question} handleSelect={handleSelect} />
        {editing ? (
          <button className="delete" onClick={() => deleteQuestion(i)}>
            Delete
          </button>
        ) : null}
      </div>
    ))
  }

  function renderQuestion() {
    return index < questions.length ? (
      <Question
        index={index}
        question={questions[index]}
        handleSelect={handleSelect}
      />
    ) : null
  }

  function submit() {
    let correct = 0
    for (let i = 0; i < questions.length; i++) {
      if (selectedAnswers[i] === questions[i].correct) {
        correct++
      }
    }
    alert("You got " + correct + " out of " + questions.length + " correct!")
  }

  function addQuestion(question) {
    setQuestions(questions.concat([question]))
    setNewQuestion(false)
  }

  function deleteQuestion(i) {
    let copy = questions.slice()
    copy.splice(i, 1)
    setQuestions(copy)
  }

  return (
    <div className="quiz">
      <button className="edit" onClick={() => setEditing(!editing)}>
        Edit
      </button>
      <h1>Quiz: Fun facts!</h1>
      {renderQuestions()}
      <div className="topborder">
        {editing ? (
          newQuestion ? (
            <NewQuestion submit={addQuestion} />
          ) : (
            <button onClick={() => setNewQuestion(true)}>
              Add new question
            </button>
          )
        ) : null}
        <button className="submit" onClick={submit}>
          Submit Answers
        </button>
      </div>
    </div>
  )
}

export default Quiz
