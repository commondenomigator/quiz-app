import React, { useState, useEffect } from "react"

import NewQuestion from "./newQuestion"
import Question from "./question"

import "./quiz.css"

function Quiz() {
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [index, setIndex] = useState([])
  const [editing, setEditing] = useState([])
  const [newQuestion, setNewQuestion] = useState([])

  useEffect(function () {
    const dummyQuestions = [
      {
        text: "What is life?",
        answers: ["Good", "Bad"],
        correct: 0,
      },
      {
        text: "What is no",
        answers: ["Yes", "No", "Maybe"],
        correct: 1,
      },
    ]

    setQuestions(dummyQuestions)
    setSelectedAnswers(dummyQuestions.map(() => -1))
    setIndex(0)
    setEditing(false)
    setNewQuestion(false)
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
