import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { PeerId } from '@libp2p/interface-peer-id'

export interface Friends {
  name: string
  image: string
  topic: string
  hash: string
  account_id: string
  peerId?: PeerId
}

interface Remote {
  account_id: string
  text: string
}

interface Position {
  x: number
  y: number
  z: number
}

const _friends: Friends[] = []
const remotes: Remote[] = []
const position: Position = {x: 0, y: 0, z: 0}

const friends = createSlice({
  name: 'friends',
  initialState: {
    friends: _friends,
    currentFriendIndex: 0,
    currentFriend: _friends[0],
    remotes,
    position,
  },
  reducers: {
    setFriends(state, { payload }: PayloadAction<Friends[]>) {
      state.friends = [...payload]
    },
    setCurrentFriendIndex(state, { payload }: PayloadAction<number>) {
      state.currentFriendIndex = payload
      state.currentFriend = state.friends[payload]
    },
    setRemotes(state, { payload }: PayloadAction<Remote[]>) {
      state.remotes = [...payload]
    },
    pushRemotes(state, { payload }: PayloadAction<Remote>) {
      state.remotes.push(payload)
    },
    setPosition(state, { payload }: PayloadAction<Position>) {
      state.position = payload
    },
  },
})
export const {
  setFriends,
  setCurrentFriendIndex,
  setRemotes,
  pushRemotes,
  setPosition,
} = friends.actions
export default friends.reducer
