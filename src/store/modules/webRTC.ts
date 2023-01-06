import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { Friends } from './friends'

export interface Audio {
  isUse: boolean
  joinTime: number
  localStream: MediaStream | undefined
  pc: RTCPeerConnection | undefined
  friend: Friends | undefined
  isOffer: boolean
  isAnswer: boolean
  media: MediaStreamConstraints | undefined
  dataChannel: RTCDataChannel | undefined
}

interface CreateOfferParams {
  localStream: MediaStream
  friend: Friends
  media: MediaStreamConstraints
}

interface CreateAnswerParams {
  friend: Friends
  media: MediaStreamConstraints
  offer: RTCSessionDescription
}

const initialState: Audio = {
  isUse: false,
  joinTime: 0,
  localStream: undefined,
  pc: undefined,
  friend: undefined,
  isOffer: false,
  isAnswer: false,
  media: undefined,
  dataChannel: undefined,
}

export const creatOffer = createAsyncThunk(
  'weRTC/creatOffer',
  async ({ localStream, friend, media }: CreateOfferParams) => {
    const isUse = true
    const isOffer = true
    const joinTime = new Date().getTime()
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.gmx.net:3478',
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
          ],
        },
      ],
    })
    const dataChannel = pc.createDataChannel(friend.topic)
    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream))
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    await new Promise((resolve) => {
      pc.onicecandidate = (event) => {
        if (event.candidate) setTimeout(() => resolve(pc.localDescription), 10000)
      }
    })
    return {
      isUse,
      isOffer,
      joinTime,
      localStream,
      pc,
      friend,
      media,
      dataChannel,
    }
  }
)

export const creatAnswer = createAsyncThunk(
  'weRTC/creatAnswer',
  async ({ friend, media, offer }: CreateAnswerParams) => {
    const isUse = true
    const isAnswer = true
    const joinTime = new Date().getTime()
    const localStream = await navigator.mediaDevices.getUserMedia(media)
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.gmx.net:3478',
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
          ],
        },
      ],
    })
    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream))
    await pc.setRemoteDescription(offer)
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    await new Promise((resolve) => {
      pc.onicecandidate = (event) => {
        if (event.candidate) setTimeout(() => resolve(pc.localDescription), 10000)
      }
    })
    return { isUse, isAnswer, joinTime, localStream, pc, friend, media }
  }
)

const weRTC = createSlice({
  name: 'weRTC',
  initialState,
  reducers: {
    setAnswerChannel(state, { payload }: PayloadAction<RTCDataChannel>) {
      state = Object.assign(state, payload)
    },
    setOfferRemote(state, { payload }: PayloadAction<RTCSessionDescription>) {
      const { pc } = state
      if (!pc!.currentRemoteDescription) {
        pc!.setRemoteDescription(payload)
      }
      state = Object.assign(state, { pc })
    },
  },
  extraReducers(builder) {
    builder.addCase(creatOffer.fulfilled, (state, { payload }) => {
      state = Object.assign(state, payload)
    })
    builder.addCase(creatAnswer.fulfilled, (state, { payload }) => {
      state = Object.assign(state, payload)
    })
  },
})

export const { setAnswerChannel, setOfferRemote } = weRTC.actions
export default weRTC.reducer
