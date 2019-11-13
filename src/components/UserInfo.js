import React from 'react'
import { Image } from 'react-bootstrap'

export default function UserInfo(props) {
  const { avatarURL, authorName } = props

  return (
    <div className='user-info-container'>
      <Image src={avatarURL} roundedCircle />
      <p><b>{authorName}</b></p>
    </div>
  )
}