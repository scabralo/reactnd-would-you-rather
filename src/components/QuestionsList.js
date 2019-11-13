import React from 'react'
import { ListGroup } from 'react-bootstrap'
import Question from './Question'

export default function QuestionsList(props) {
  const { questions, answered } = props

  return (
    <ListGroup >
      {questions.map((id) => (
          <ListGroup.Item action  key={id}>
            <Question id={id} answered={answered} />
          </ListGroup.Item>
        )
      )}
    </ListGroup>
  )
}