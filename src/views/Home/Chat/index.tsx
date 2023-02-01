import React from 'react'

import { Box, Divider, Typography } from '@mui/material'

import langHook from '@hooks/localHook'
import { chatLang } from '@langs/index'

import type { Friends } from '@store/modules/friends'

import talk from './Talk'
import Operate from './Operate'

interface ChatProps {
  friend: Friends
}

export default ({ friend }: ChatProps): JSX.Element => {
  
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
      {friend.connected ? (
        <Operate self={self} friend={friend} />
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
