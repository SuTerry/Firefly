import React, { useState, KeyboardEvent } from 'react'

import { Box, Divider, IconButton, Stack } from '@mui/material'

import { AddIcCall, Videocam } from '@mui/icons-material'

import type { Send } from '@views/Home/libp2pHook'
import type { Friends } from '@store/modules/friends'

import './index.less'

interface Operate {
  send: Send
  self: (text: string) => void
  friend: Friends
}

export default ({ send, self, friend }: Operate): JSX.Element => {
  const [text, setText] = useState('')

  const handleEnter = (event: KeyboardEvent) => {
    if (event.which !== 13) return
    send(text, friend)
    self(text)
    setText('')
  }

  return (
    <Box sx={{ height: 240 }}>
      <Divider />
      <Stack
        sx={{ pr: 2, mb: 1 }}
        direction="row"
        justifyContent="flex-end"
        spacing={2}
      >
        <IconButton>
          <AddIcCall />
        </IconButton>
        <IconButton>
          <Videocam />
        </IconButton>
      </Stack>
      <textarea
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleEnter}
      ></textarea>
    </Box>
  )
}
