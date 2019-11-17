import React from 'react'
import { Redirect } from 'react-router-dom'

export default function ErrorPage(props) {
  const { authedUser } = props

  if(!authedUser) {
    return <Redirect to='/login' />
  }

  console.log('props: ', props)
  return (
    <div className='error-page'>
      <h2>404</h2>
      <h3>Looks like the page you're looking for doesn't exist.</h3>
    </div>
  )
}