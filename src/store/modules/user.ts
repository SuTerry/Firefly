import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { initWallet, connectWallet, disconnectWallet } from './wallet'

import { Libp2p } from 'libp2p'

interface User {
  headerImg: string
  nickname: string
  isLogin: boolean
  isCW: boolean
  libp2p: Libp2p | null
  dialogOpen: boolean
}

interface SerUser {
  headerImg: string
  nickname: string
}

const initialState: User = {
  headerImg: 'QmVRjwyDfqkpa7z7UvGShLdkoVMEBHJSzv7LgcfRRe7jVK',
  nickname: '',
  isLogin: false,
  isCW: false,
  libp2p: null,
  dialogOpen: false,
}
const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<SerUser>) {
      state = Object.assign(state, payload, { dialogOpen: false })
    },
    setDialogOpen(state, { payload }: PayloadAction<boolean>) {
      state = Object.assign(state, { dialogOpen: payload })
    },
    login(state, { payload }: PayloadAction<SerUser>) {
      state = Object.assign(state, payload, { isLogin: true })
    },
  },
  extraReducers(builder) {
    builder.addCase(initWallet.fulfilled, (state, { payload: { libp2p } }) => {
      if (libp2p) {
        state = Object.assign(state, { libp2p, isCW: true })
      }
    })
    builder.addCase(
      connectWallet.fulfilled,
      (state, { payload: { libp2p } }) => {
        if (libp2p) state = Object.assign(state, { libp2p, isCW: true })
      }
    )
    builder.addCase(
      disconnectWallet,
      (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        state = Object.assign(state, initialState)
      }
    )
  },
})
export const { setUser, setDialogOpen, login } = user.actions
export default user.reducer
