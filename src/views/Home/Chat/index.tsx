import React, { useEffect } from 'react'

import { Box, Divider, Typography } from '@mui/material'

import { useAppSelector, useAppDispatch } from '@store/index'
import { Friends, setRemotes } from '@store/modules/friends'

import langHook from '@hooks/localHook'
import { chatLang } from '@langs/index'

import type { Send } from '../libp2pHook'

import talk from './Talk'
import Operate from './Operate'

interface ChatProps {
  friend: Friends
  send: Send
}

export default ({ friend, send }: ChatProps): JSX.Element => {

  const { remotes } = useAppSelector((store) => store.friends)

  const dispatch = useAppDispatch()

  const local = langHook()

  const { Talk, self, remote } = talk({ account_id: friend.account_id })

  useEffect(() => {
    if (remotes.length > 0) {
      const _remotes = [...remotes]
      const index = _remotes.findIndex(
        (_remote) => _remote.account_id === friend.account_id
      )
      if (index < 0) return
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
      // {friend.name ? (
        <Operate send={send} self={self} friend={friend} />
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
