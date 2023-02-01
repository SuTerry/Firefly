import React from 'react'

import signaling from '@hooks/signaling'
import friendsHook from './friendsHook'
import loginHook from './loginHook'

import { useAppSelector } from '@store/index'

import Chat from './Chat'

export default (): JSX.Element => {
  signaling()
  loginHook()
  friendsHook()

  const { friends, currentFriendIndex } = useAppSelector(
    (state) => state.friends
  )

  return (
    <>
      {friends.map((friend, index) => (
        <div
          role="tabpanel"
          hidden={currentFriendIndex !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          key={friend.account_id + friend.connected}
          style={{ backgroundColor: '#f0f0f0' }}
        >
          {currentFriendIndex === index && <Chat friend={friend} />}
        </div>
      ))}
    </>
  )
}
