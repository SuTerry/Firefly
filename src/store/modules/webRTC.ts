import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { offer, answer, offerRemote } from '@utils/webRTC'

import type { RootState } from '..'
import type { Friends } from './friends'

export interface WebRTC {
  isUse: boolean
  joinTime: number
  localStream: MediaStream | undefined
  pc: RTCPeerConnection | undefined
  friend: Friends | undefined
  isOffer: boolean
  isAnswer: boolean
  media: MediaStreamConstraints | undefined
  dataChannel: RTCDataChannel | undefined
  stream: MediaStream | undefined
  offer: RTCSessionDescription | undefined
  isVideo: boolean
  isMeta: boolean
  candidate: RTCIceCandidateInit | undefined
}

interface OfferRequestParams {
  friend: Friends
  media: MediaStreamConstraints
  offer: RTCSessionDescription
  isMeta: boolean
}

const initialState: WebRTC = {
  isUse: false,
  joinTime: 0,
  localStream: undefined,
  pc: undefined,
  friend: undefined,
  isOffer: false,
  isAnswer: false,
  media: undefined,
  dataChannel: undefined,
  candidate: undefined,
  stream: undefined,
  offer: undefined,
  isVideo: false,
  isMeta: false,
}

export const creatOffer = createAsyncThunk('weRTC/creatOffer', offer)

export const creatAnswer = createAsyncThunk(
  'weRTC/creatAnswer',
  async (_, { getState }) => {
    const { media, offer } = (getState() as RootState).webRTC
    return await answer({ offer: offer!, media: media! })
  }
)

export const setOfferRemote = createAsyncThunk(
  'weRTC/setOfferRemote',
  async (answer: RTCSessionDescription, { getState }) => {
    const { pc } = (getState() as RootState).webRTC
    const { socket } = (getState() as RootState).user
    return await offerRemote({ pc: pc!, answer, socket: socket! })
  }
)

export const initWebRTCState = createAsyncThunk(
  'weRTC/initWebRTCState',
  async () => {
    await new Promise((resolve) => setTimeout(() => resolve(1), 1000))
    return {}
  }
)

const webRTC = createSlice({
  name: 'webRTC',
  initialState,
  reducers: {
    setOfferRequest(state, { payload }: PayloadAction<OfferRequestParams>) {
      state = Object.assign(state, payload, {
        isUse: true,
        isVideo: payload.media.video,
        isMeta: payload.isMeta,
      })
    },
    setAnswerChannel(state, { payload }: PayloadAction<RTCDataChannel>) {
      const { pc } = state
      state = Object.assign(state, {
        dataChannel: payload,
        pc,
      })
    },
    setCandidate(state, { payload }: PayloadAction<RTCIceCandidateInit>) {
      const { pc } = state
      state = Object.assign(state, {
        candidate: payload,
        pc,
      })
    },
  },
  extraReducers(builder) {
    builder.addCase(creatOffer.pending, (state) => {
      state.pc?.close()
      state.localStream?.getTracks().forEach((track) => track.stop())
      state.stream?.clone()
      state = Object.assign(state, {
        isUse: true,
        isOffer: true,
        joinTime: new Date().getTime(),
        pc: undefined,
        dataChannel: undefined,
        candidate: undefined,
        stream: undefined
      })
    })
    builder.addCase(creatOffer.fulfilled, (state, { payload }) => {
      state = Object.assign(state, payload)
    })
    builder.addCase(creatAnswer.pending, (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = Object.assign(state, {
        isAnswer: true,
        joinTime: new Date().getTime(),
      })
    })
    builder.addCase(creatAnswer.fulfilled, (state, { payload }) => {
      state = Object.assign(state, payload)
    })
    builder.addCase(setOfferRemote.fulfilled, (state, { payload }) => {
      state = Object.assign(state, payload)
    })
    builder.addCase(initWebRTCState.pending, (state) => {
      state.pc?.close()
      state.localStream?.getTracks().forEach((track) => track.stop())
      state.stream?.clone()
      const offer = state.offer || {}
      state = Object.assign(state, {
        pc: undefined,
        media: undefined,
        offer,
      })
    })
    builder.addCase(initWebRTCState.fulfilled, (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = Object.assign(state, initialState)
    })
  },
})

export const { setOfferRequest, setAnswerChannel, setCandidate } = webRTC.actions
export default webRTC.reducer
