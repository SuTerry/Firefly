import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { creatOffer, initWebRTCState, setOfferRequest } from './webRTC'

interface Dialog {
  streamOpen: boolean
  metaOpen: boolean
}

const initialState: Dialog = {
  streamOpen: false,
  metaOpen: false,
}

const dialog = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setMeta(state, { payload }: PayloadAction<boolean>) {
      state.metaOpen = payload
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
  },
})
export const { setMeta } = dialog.actions
export default dialog.reducer
