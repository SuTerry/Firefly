import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { Friends } from './friends'

import { RootState } from '..'
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
}

interface CreateOfferParams {
  friend: Friends
  media: MediaStreamConstraints
}

interface OfferRequestParams {
  friend: Friends
  media: MediaStreamConstraints
  offer: RTCSessionDescription
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
  stream: undefined,
  offer: undefined,
  isVideo: false,
}

export const creatOffer = createAsyncThunk(
  'weRTC/creatOffer',
  async ({ friend, media }: CreateOfferParams) => {
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
    const dataChannel = pc.createDataChannel(friend.topic)
    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream))
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    await new Promise((resolve) => {
      pc.onicecandidate = (event) => {
        if (event.candidate) setTimeout(() => resolve(pc.localDescription), 300)
      }
    })
    return {
      localStream,
      pc,
      friend,
      media,
      dataChannel,
      isVideo: media.video,
    }
  }
)

export const creatAnswer = createAsyncThunk(
  'weRTC/creatAnswer',
  async (_, { getState }) => {
    const { media, offer } = (getState() as RootState).webRTC

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
    let stream: MediaStream | undefined

    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream))

    pc.ontrack = (event) => {
      stream = event.streams[0]
    }
    await pc.setRemoteDescription(offer!)
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    await new Promise((resolve) => {
      pc.onicecandidate = (event) => {
        if (event.candidate) setTimeout(() => resolve(pc.localDescription), 300)
      }
    })

    return { localStream, pc, media, stream }
  }
)

export const setOfferRemote = createAsyncThunk(
  'weRTC/setOfferRemote',
  async (answer: RTCSessionDescription, { getState }) => {
    const { pc } = (getState() as RootState).webRTC

    let stream: MediaStream | undefined

    pc!.ontrack = (event) => {
      stream = event.streams[0]
    }

    if (!pc!.currentRemoteDescription) {
      await pc!.setRemoteDescription(answer)
    }

    await new Promise((resolve) => setTimeout(() => resolve(1), 300))

    return { pc, stream }
  }
)

export const initWebRTCState = createAsyncThunk(
  'weRTC/initWebRTCState',
  async () => {
    await new Promise((resolve) => setTimeout(() => resolve(1), 300))

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
      })
    },
    setAnswerChannel(state, { payload }: PayloadAction<RTCDataChannel>) {
      const { pc } = state
      state = Object.assign(state, {
        dataChannel: payload,
        pc,
      })
    },
  },
  extraReducers(builder) {
    builder.addCase(creatOffer.pending, (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = Object.assign(state, {
        isUse: true,
        isOffer: true,
        joinTime: new Date().getTime(),
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

export const { setOfferRequest, setAnswerChannel } = webRTC.actions
export default webRTC.reducer
