import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, combineReducers, Dispatch } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

import wallet from './modules/wallet'
import local from './modules/local'
import router from './modules/router'
import friends from './modules/friends'
import user from './modules/user'
import webRTC from './modules/webRTC'
import dialog from './modules/dialog'
import room from './modules/room'

const reducers = combineReducers({
  wallet,
  local,
  router,
  friends,
  user,
  webRTC,
  dialog,
  room,
})

const persistConfig = {
  key: 'Firefly',
  storage,
  blacklist: ['router', 'friends', 'user', 'webRTC', 'dialog', 'room'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction> &
  Dispatch<AnyAction>

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
