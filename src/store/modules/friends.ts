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
  hash: string
  text: string
}

const _friends: Friends[] = []
const remotes: Remote[] = []

const friends = createSlice({
  name: 'friends',
  initialState: {
    friends: _friends,
    currentFriendIndex: 0,
    currentFriend: _friends[0],
    remotes,
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
  },
})
export const { setFriends, setCurrentFriendIndex, setRemotes } = friends.actions
export default friends.reducer
