import React, { useEffect, useRef } from 'react'

import {
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  Slide,
  Typography,
  IconButton,
  Skeleton,
  CircularProgress,
} from '@mui/material'

import { useAppSelector, useAppDispatch } from '@store/index'
import { initWebRTCState, creatAnswer } from '@store/modules/webRTC'
import { setMeta } from '@store/modules/dialog'

import { path } from '@utils/ipfs'

import type { TransitionProps } from '@mui/material/transitions'
import type { Friends } from '@store/modules/friends'

import './index.less'

import { Call, CallEnd } from '@mui/icons-material'

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement
    },
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="up" ref={ref} {...props} />
  }
)

export default (): JSX.Element => {
  const { streamOpen } = useAppSelector((store) => store.dialog)
  const {
    friend,
    pc,
    isOffer,
    isAnswer,
    stream,
    isVideo,
    localStream,
    isMeta,
    dataChannel,
    candidate
  } = useAppSelector((store) => store.webRTC)

  const dispatch = useAppDispatch()

  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoLocalRef = useRef<HTMLVideoElement>(null)

  const handleAnswer = () => {
    dispatch(creatAnswer())
  }

  const handleClose = () => {
    dispatch(initWebRTCState())
  }

  const isUse = isOffer || isAnswer
  const connected = pc && stream && dataChannel && candidate

  const createAudio = (friend: Friends) => (
    <>
      <img
        style={{ width: '100px', marginBottom: '16px' }}
        src={path(friend.image)}
      />
      <Typography sx={{ color: '#000' }}>{friend.name}</Typography>
      <audio className="audio" ref={audioRef} autoPlay></audio>
    </>
  )

  const creatVideo = () => (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <video
        className="local_video"
        ref={videoLocalRef}
        autoPlay
        muted={true}
      ></video>
      <video className="remote_video" ref={videoRef} autoPlay></video>
    </Box>
  )

  useEffect(() => {
    if (!stream) return
    if (!connected) return
    if (isVideo) {
      videoRef.current!.srcObject = stream
      videoLocalRef.current!.srcObject = localStream!
    } else {
      audioRef.current!.srcObject = stream
    }
    if (isMeta) dispatch(setMeta(true))
  }, [stream, pc?.connectionState])

  return (
    <div>
      <Dialog open={streamOpen} TransitionComponent={Transition} keepMounted>
        <DialogContent>
          <Box
            sx={{
              width: 552,
              height: 400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            {friend ? (
              connected ? (
                isVideo ? (
                  creatVideo()
                ) : (
                  createAudio(friend)
                )
              ) : (
                createAudio(friend)
              )
            ) : (
              <>
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={100}
                  sx={{ mb: 2 }}
                />
                <Skeleton
                  variant="text"
                  sx={{ width: '80px', fontSize: '1.5em' }}
                />
              </>
            )}
            {!connected && <CircularProgress color="inherit" sx={{ mt: 6 }} />}
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            pl: 10,
            pr: 10,
            mb: 2,
            display: 'flex',
            justifyContent: isUse ? 'center' : 'space-between',
          }}
        >
          {!isUse && (
            <IconButton size="large" onClick={handleAnswer}>
              <Call color="success" />
            </IconButton>
          )}
          <IconButton size="large" onClick={handleClose}>
            <CallEnd color="error" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
