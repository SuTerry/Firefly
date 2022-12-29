import React, { useState, useEffect, KeyboardEvent } from 'react'

import { Box, Divider, IconButton, Stack, Typography } from '@mui/material'

import { useAppSelector, useAppDispatch } from '@store/index'
import { Friends, setRemotes } from '@store/modules/friends'

import langHook from '@hooks/localHook'
import { chatLang } from '@langs/index'

import { AddIcCall, Videocam } from '@mui/icons-material'

import type { Send } from '../libp2pHook'

import talk from './Talk'

import './index.less'

interface ChatProps {
  friend: Friends
  send: Send
}

export default ({ friend, send }: ChatProps): JSX.Element => {
  const { remotes } = useAppSelector((store) => store.friends)

  const dispatch = useAppDispatch()

  const local = langHook()

  const { Talk, self, remote } = talk()
  const [text, setText] = useState('')
  const handleEnter = (event: KeyboardEvent) => {
    if (event.which !== 13) return
    send(text, friend)
    self(text)
    setText('')
  }

  useEffect(() => {
    if (remotes.length > 0) {
      const _remotes = [...remotes]
      const index = _remotes.findIndex(
        (_remote) => _remote.hash === friend.hash
      )
      const _remote = _remotes[index]
      remote(_remote.text)
      _remotes.splice(index, 1)
      dispatch(setRemotes(_remotes))
    }
  }, [remotes])

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
      ) : (
        <Box sx={{ height: 240 }}>
          <Divider />
          <Typography sx={{ lineHeight: '239px', textAlign: 'center' }}>
            {local(chatLang.notConnect) + friend.name}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
