import { createSlice } from '@reduxjs/toolkit'

import { creatOffer, initWebRTCState, setOfferRequest } from './webRTC'

interface Dialog {
  streamOpen: boolean
}

const initialState: Dialog = {
  streamOpen: false,
}

const dialog = createSlice({
  name: 'dialog',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(creatOffer.pending, (state) => {
      state.streamOpen = true
    })
    builder.addCase(setOfferRequest, (state) => {
      state.streamOpen = true
    })
    builder.addCase(initWebRTCState.pending, (state) => {
      state.streamOpen = false
    })
  },
})
export default dialog.reducer
