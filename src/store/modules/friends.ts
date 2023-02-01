import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Friends {
  name: string
  image: string
  account_id: string
  online: boolean
  connected: boolean
  pc?: RTCPeerConnection
  dataChannel?: RTCDataChannel
  candidate?: RTCIceCandidateInit
}

interface Remote {
  account_id: string
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
    pushRemotes(state, { payload }: PayloadAction<Remote>) {
      state.remotes.push(payload)
    },
    setFriend(state, { payload }: PayloadAction<Record<string, unknown>>) {
      const index = state.friends.findIndex(
        (friend) => friend.account_id === payload.account_id
      )
      const _friends = [...state.friends]
      const friend = { ..._friends[index], ...payload }
      _friends.splice(index, 1, friend)
      state.friends = [..._friends]
    },
    initFriend(state, { payload }: PayloadAction<Friends>) {
      const index = state.friends.findIndex(
        (friend) => friend.account_id === payload.account_id
      )
      const _friends = [...state.friends]
      const friend = { ...payload }
      _friends.splice(index, 1, friend)
      state.friends = [..._friends]
    },
  },
})
export const {
  setFriends,
  setCurrentFriendIndex,
  setRemotes,
  pushRemotes,
  setFriend,
  initFriend,
} = friends.actions
export default friends.reducer
