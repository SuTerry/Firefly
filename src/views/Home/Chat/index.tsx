import React from 'react'

import { Box, Divider, Typography } from '@mui/material'

import langHook from '@hooks/localHook'
import { chatLang } from '@langs/index'

import type { Friends } from '@store/modules/friends'
import type { Send } from '../libp2pHook'

import talk from './Talk'
import Operate from './Operate'

interface ChatProps {
  friend: Friends
  send: Send
}

export default ({ friend, send }: ChatProps): JSX.Element => {
  const local = langHook()

  const { Talk, self } = talk(friend)

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Talk />
      {friend.peerId ? (
        // {friend.name ? (
        <Operate send={send} self={self} friend={friend} />
      ) : (
        <Box sx={{ height: 240 }}>
          <Divider />
          <Typography
            sx={{ lineHeight: '239px', textAlign: 'center', color: '#000' }}
          >
            {local(chatLang.notConnect) + friend.name}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
