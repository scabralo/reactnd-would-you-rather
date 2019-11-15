import React from 'react'
import { ListGroup } from 'react-bootstrap'
import Question from './Question'

export default function QuestionsList(props) {
  const { questions, answered } = props

  return (
    <ListGroup >
      {questions.length > 0 
      ? questions.map((id) => (
          <ListGroup.Item action  key={id}>
            <Question id={id} answered={answered} />
          </ListGroup.Item>
        )
      )
    : (<p className='h4'>There are no questions on this Category.</p>)}
    </ListGroup>
  )
}