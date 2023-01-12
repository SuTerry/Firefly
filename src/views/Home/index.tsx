import React from 'react'

import libp2pHook from './libp2pHook'
import friendsHook from './friendsHook'

import { useAppSelector } from '@store/index'

import Chat from './Chat'

export default (): JSX.Element => {
  const { send } = libp2pHook()
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
          key={friend.account_id}
          style={{backgroundColor: '#f0f0f0'}}
        >
          {currentFriendIndex === index && <Chat friend={friend} send={send} />}
        </div>
      ))}
    </>
  )
}
