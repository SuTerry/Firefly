import React, { useState, KeyboardEvent } from 'react'

import { Box, Divider, IconButton, Stack } from '@mui/material'

import { useAppSelector, useAppDispatch } from '@store/index'
import { creatOffer } from '@store/modules/webRTC'

import type { Send } from '@views/Home/libp2pHook'
import type { Friends } from '@store/modules/friends'

import { Phone, Videocam } from '@mui/icons-material'

import './index.less'

interface Operate {
  send: Send
  self: (text: string) => void
  friend: Friends
}

export default ({ send, self, friend }: Operate): JSX.Element => {
  const { isUse } = useAppSelector((store) => store.webRTC)

  const dispatch = useAppDispatch()

  const [text, setText] = useState('')

  const handleEnter = (event: KeyboardEvent) => {
    if (event.which !== 13) return
    event.preventDefault()
    const value = text.trim()
    if (value === '') return
    send(value, friend)
    self(value)
    setText('')
  }

  const handleAudio = () => {
    const media = { video: false, audio: true }
    creatStream(media)
  }

  const handleVideo = () => {
    const media = { video: true, audio: true }
    creatStream(media)
  }

  const creatStream = async (media: MediaStreamConstraints) => {
    if (isUse) return
    dispatch(creatOffer({ friend, media }))
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
        <IconButton onClick={handleAudio}>
          <Phone />
        </IconButton>
        <IconButton onClick={handleVideo}>
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
