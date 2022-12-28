import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import {
  getNearWallet,
  connectToWallet,
  getAccountId,
  onWalletEvent,
} from '@utils/wallets'

import createLibp2p from '@utils/libp2p'

import { RootState } from '..'

export interface WalletState {
  initWallet: boolean
  dialogOpen: boolean
  connecting: boolean
  currentWallet: string
  walletNetwork: string
  accountAddress: string
  accessKey: {
    publicKey: string
    secretKey: string
  } | null
}

export const initState: WalletState = {
  initWallet: false,
  dialogOpen: false,
  connecting: false,
  currentWallet: '',
  accountAddress: '',
  walletNetwork: '',
  accessKey: null,
}

export const initWallet = createAsyncThunk(
  'wallet/initWallet',
  async (_, { getState }) => {
    const { currentWallet } = (getState() as RootState).wallet
    const { libp2p } = (getState() as RootState).user
    if (!currentWallet) return {}
    const isConnected = await getNearWallet(currentWallet)
    if (!isConnected) return {}
    try {
      const accessKey = await connectToWallet(currentWallet)

      const accountAddress = getAccountId(currentWallet)

      return {
        accountAddress,
        accessKey,
        libp2p: libp2p || (await createLibp2p()),
      }
    } catch (error) {
      return {}
    }
  }
)

export const connectWallet = createAsyncThunk(
  'wallet/connectWallet',
  async (currentWallet: string, { getState }) => {
    const { libp2p } = (getState() as RootState).user
    const isConnected = await getNearWallet(currentWallet)
    if (isConnected) {
      try {
        const accessKey = await connectToWallet(currentWallet)

        const accountAddress = getAccountId(currentWallet)

        return {
          dialogOpen: false,
          connecting: false,
          currentWallet,
          accountAddress,
          accessKey,
          libp2p: libp2p || (await createLibp2p()),
        }
      } catch (error) {
        return {
          connecting: false,
        }
      }
    } else {
      return {
        connecting: false,
      }
    }
  }
)

const wallet = createSlice({
  name: 'wallet',
  initialState: initState,
  reducers: {
    setDialogOpen(state, { payload }: PayloadAction<boolean>) {
      state.dialogOpen = payload
    },
    setConnecting(state, { payload }: PayloadAction<boolean>) {
      state.connecting = payload
    },
    disconnectWallet(state) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = Object.assign(state, initState, { initWallet: true })
    },
  },
  extraReducers(builder) {
    builder.addCase(initWallet.pending, (state) => {
      state = Object.assign(state, initState, {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        currentWallet: state.currentWallet,
      })
    })

    builder.addCase(initWallet.fulfilled, (state, { payload }) => {
      if (payload) {
        const data = { ...payload }
        delete data.libp2p
        state = Object.assign(state, data, { initWallet: true })
        if (state.accountAddress) onWalletEvent(state.currentWallet)
      }
    })

    builder.addCase(connectWallet.fulfilled, (state, { payload }) => {
      if (payload) {
        const data = { ...payload }
        delete data.libp2p
        state = Object.assign(state, data)
      }
    })
  },
})

export const { setDialogOpen, setConnecting, disconnectWallet } = wallet.actions
export default wallet.reducer
