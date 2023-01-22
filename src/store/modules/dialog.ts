import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { creatOffer, initWebRTCState, setOfferRequest } from './webRTC'
import { initRoom } from './room'

interface Dialog {
  streamOpen: boolean
  metaOpen: boolean
  roomOpen: boolean
}

const initialState: Dialog = {
  streamOpen: false,
  metaOpen: false,
  roomOpen: false,
}

const dialog = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setMeta(state, { payload }: PayloadAction<boolean>) {
      state.metaOpen = payload
    },
    setRoom(state, { payload }: PayloadAction<boolean>) {
      state.roomOpen = payload
    },
  },
  extraReducers(builder) {
    builder.addCase(creatOffer.pending, (state) => {
      state.streamOpen = true
    })
    builder.addCase(setOfferRequest, (state) => {
      state.streamOpen = true
    })
    builder.addCase(initWebRTCState.pending, (state) => {
      state.streamOpen = false
      state.metaOpen = false
    })
    builder.addCase(initRoom, (state) => {
      state.metaOpen = false
    })
  },
})
export const { setMeta, setRoom } = dialog.actions
export default dialog.reducer
