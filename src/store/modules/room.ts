import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { offer, answer, offerRemote } from '@utils/webRTC'

import type { RootState } from '..'
import type { Friends } from './friends'

interface Position {
  x: number
  y: number
  z: number
}

export interface Play {
  name: string
  id: string
  pc: RTCPeerConnection
  dataChannel: RTCDataChannel | undefined
  stream: MediaStream | undefined
  localStream: MediaStream
  identity: 'offer' | 'answer'
  friend: Friends
  initPosition?: Position
  audioContext: AudioContext
}

export interface Room {
  id: number
  name: string
  topic: string
  nft: string[]
  owner: string
}

interface RoomInit {
  playes: Record<string, Play>
  room: Room | undefined
  discovery: Friends[]
}

interface CreatRoomAnswerProps {
  offer: RTCSessionDescription
  friend: Friends
  position: Position | undefined
}

interface SetRoomOfferRemoteProps {
  answer: RTCSessionDescription
  key: string
}

interface SetAnswerChannelProps {
  key: string
  dataChannel: RTCDataChannel
}

const initialState: RoomInit = {
  playes: {},
  room: undefined,
  discovery: [],
}

export const creatRoomOffer = createAsyncThunk('room/creatRoomOffer', offer)

export const creatRoomAnswer = createAsyncThunk(
  'room/creatRoomAnswer',
  async ({ offer, friend, position }: CreatRoomAnswerProps) => {
    const media = { video: false, audio: true }
    return await answer({ offer, friend, media, position })
  }
)

export const setRoomOfferRemote = createAsyncThunk(
  'weRTC/setRoomOfferRemote',
  async ({ answer, key }: SetRoomOfferRemoteProps, { getState }) => {
    const { playes } = (getState() as RootState).room
    const { pc, friend } = playes[key]
    return await offerRemote({ pc: pc!, answer, friend })
  }
)

const room = createSlice({
  name: 'room',
  initialState,
  reducers: {
    addPlay(state, { payload }: PayloadAction<Play>) {
      const newPlay = { [payload.id]: payload }
      state.playes = { ...state.playes, ...newPlay }
    },
    removePlay(state, { payload }: PayloadAction<string>) {
      const _playes = { ...state.playes }
      delete _playes[payload]
      state.playes = { ..._playes }
    },
    changeRoom(state, { payload }: PayloadAction<Room | undefined>) {
      state.room = payload
    },
    addDiscovery(state, { payload }: PayloadAction<Friends>) {
      const _discovery = [...state.discovery]
      _discovery.push(payload)
      state.discovery = _discovery
    },
    shiftDiscovery(state) {
      const _discovery = [...state.discovery]
      _discovery.shift()
      state.discovery = _discovery
    },
    setAnswerChannel(state, { payload }: PayloadAction<SetAnswerChannelProps>) {
      const { key, dataChannel } = payload
      console.log(`set dataChannel of ${state.playes[key].name}`)
      const _playes = { ...state.playes }
      _playes[key].dataChannel = dataChannel
      state.playes = Object.assign(state.playes, _playes)
    },
    initRoom(state) {
      const { playes } = state
      Object.values(playes).forEach((play) => {
        play.pc.close()
        play.audioContext.close()
        play.localStream?.getTracks().forEach((track) => track.stop())
      })
      state = Object.assign(state, {
        playes: {},
        room: undefined,
        discovery: [],
      })
    },
  },
  extraReducers(builder) {
    builder.addCase(creatRoomOffer.fulfilled, (state, { payload }) => {
      const { pc, dataChannel, friend, localStream } = payload
      const { name, account_id } = friend
      const id = account_id
      const _playes = { ...state.playes }
      _playes[id] = {
        identity: 'offer',
        pc,
        dataChannel,
        name,
        id,
        friend,
        localStream,
        audioContext: new AudioContext(),
        stream: undefined,
      }
      state.playes = Object.assign(state.playes, _playes)
    })
    builder.addCase(creatRoomAnswer.fulfilled, (state, { payload }) => {
      const { pc, friend, stream, position, localStream } = payload
      const { name, account_id } = friend
      const id = account_id
      const _playes = { ...state.playes }
      _playes[id] = {
        identity: 'answer',
        pc,
        stream,
        name,
        id,
        friend,
        localStream,
        audioContext: new AudioContext(),
        dataChannel: undefined,
        initPosition: position,
      }
      state.playes = Object.assign(state.playes, _playes)
    })
    builder.addCase(setRoomOfferRemote.fulfilled, (state, { payload }) => {
      const { stream, friend } = payload
      const _playes = { ...state.playes }
      const id = friend.account_id
      _playes[id] = {
        ..._playes[id],
        stream,
      }
      state.playes = Object.assign(state.playes, _playes)
    })
  },
})
export const {
  addPlay,
  removePlay,
  changeRoom,
  addDiscovery,
  shiftDiscovery,
  setAnswerChannel,
  initRoom,
} = room.actions
export default room.reducer
