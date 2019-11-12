import React from 'react'

export default function UserInfo(props) {
  const { avatarURL, authorName } = props

  return (
    <div className='user-info-container'>
      <img src={avatarURL} alt='user avatar' />
      <p><b>{authorName}</b></p>
    </div>
  )
}