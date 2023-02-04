import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { answer, offerRemote } from '@utils/webRTC'

import type { RootState } from '..'

interface Position {
  x: number
  y: number
  z: number
}

export interface Play {
  name: string
  id: string
  identity: 'offer' | 'answer'
  connected: boolean
  pc: RTCPeerConnection
  localStream: MediaStream
  audioContext: AudioContext
  dataChannel: RTCDataChannel | undefined
  stream: MediaStream | undefined
  candidate?: RTCIceCandidateInit
  model?: string
  position?: Position
}

export interface InitPlay {
  name: string
  id: string
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
  initPlays: InitPlay[]
}

interface CreatRoomAnswerProps {
  offer: RTCSessionDescription
  play: InitPlay
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
  initPlays: [],
}


export const creatRoomAnswer = createAsyncThunk(
  'room/creatRoomAnswer',
  async ({ offer, play }: CreatRoomAnswerProps, { getState }) => {
    const { socket } = (getState() as RootState).user
    const media = { video: false, audio: true }
    const type = 'room'
    const res = await answer({ offer, media, play })
    res.pc.onicecandidate = (event) => {
      if (event.candidate && event.candidate.sdpMid === '0')
        socket?.emit('candidate', {
          type,
          candidate: event.candidate,
          toId: play.id,
        })
    }
    // send answer
    socket?.emit('answer', {
      type: 'room',
      answer: res.pc.localDescription,
      toId: play.id,
    })
    return res
  }
)

export const setRoomOfferRemote = createAsyncThunk(
  'weRTC/setRoomOfferRemote',
  async ({ answer, key }: SetRoomOfferRemoteProps, { getState }) => {
    const { playes } = (getState() as RootState).room
    const { pc } = playes[key]
    const res = await offerRemote({ pc: pc!, answer })
    return { ...res, key }
  }
)

const room = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setInitPlays(state, { payload }: PayloadAction<InitPlay[]>) {
      state.initPlays = payload
    },
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
        initPlays: [],
      })
    },
    setRoomCandidate(state, { payload }: PayloadAction<[string, RTCIceCandidateInit]>) {
      const _playes = { ...state.playes }
      if (!_playes[payload[0]]) {
        _playes[payload[0]] = { candidate: payload[1], connected: false } as Play
      } else {
        _playes[payload[0]].candidate = payload[1]
      }
      state.playes = { ..._playes }
    },
    setConnected(state, { payload }: PayloadAction<string>) {
      const _playes = { ...state.playes }
      _playes[payload].connected = true
      state.playes = { ..._playes }
    },
    setModel(state, { payload }: PayloadAction<[string, string, Position]>) {
      const _playes = { ...state.playes }
      _playes[payload[0]].model = payload[1]
      _playes[payload[0]].position = payload[2]
      state.playes = { ..._playes }
    },
  },
  extraReducers(builder) {
    builder.addCase(creatRoomAnswer.fulfilled, (state, { payload }) => {
      const { pc, stream, localStream, play } = payload
      const id = play!.id
      const _playes = { ...state.playes }
      const candidate = _playes[id] ? _playes[id].candidate : undefined
      _playes[id] = {
        identity: 'offer',
        connected: false,
        pc,
        stream,
        name: play!.name,
        id,
        localStream: localStream!,
        audioContext: new AudioContext(),
        dataChannel: undefined,
        candidate
      }
      state.playes = Object.assign(state.playes, _playes)
    })
    builder.addCase(setRoomOfferRemote.fulfilled, (state, { payload }) => {
      const { stream, key } = payload
      const _playes = { ...state.playes }
      _playes[key] = {
        ..._playes[key],
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
  setAnswerChannel,
  initRoom,
  setInitPlays,
  setRoomCandidate,
  setConnected,
  setModel,
} = room.actions
export default room.reducer
