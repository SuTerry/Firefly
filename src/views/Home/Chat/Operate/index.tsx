import React, { useState, useRef, useEffect, KeyboardEvent } from 'react'

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
  const { isUse, media, pc } = useAppSelector((store) => store.webRTC)

  const dispatch = useAppDispatch()

  const [text, setText] = useState('')

  const streamRef = useRef<HTMLAudioElement>(null)

  const handleEnter = (event: KeyboardEvent) => {
    if (event.which !== 13) return
    event.preventDefault()
    const value = text.trim()
    if (value === '') return
    send(value, friend)
    self(value)
    setText('')
  }

  const handleAudio = async () => {
    if (isUse) return
    const media = { video: false, audio: true }
    const localStream = await navigator.mediaDevices.getUserMedia(media)

    dispatch(creatOffer({ localStream, friend, media }))
  }

  useEffect(() => {
    if (!pc) return
    if (!streamRef.current) return
    pc.ontrack = (event) => {
      streamRef.current!.srcObject = event.streams[0]
    }
  }, [pc, streamRef])

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
      {isUse && !media?.video && (
        <audio className="audio" ref={streamRef} autoPlay controls></audio>
      )}
    </Box>
  )
}
