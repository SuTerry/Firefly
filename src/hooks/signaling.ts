import { useEffect, useRef } from 'react'

import { io } from 'socket.io-client'

import { useSnackbar } from 'notistack'

import { useAppSelector, useAppDispatch } from '@store/index'
import { setSocket } from '@store/modules/user'
import { setFriends, setFriend, initFriend } from '@store/modules/friends'
import {
  setOfferRequest,
  initWebRTCState,
  setOfferRemote,
  setCandidate,
} from '@store/modules/webRTC'

import {
  setRoomCandidate,
  creatRoomAnswer,
  setRoomOfferRemote,
  removePlay,
} from '@store/modules/room'

import { WEBSOCKET } from '@api/config'

import { answer, offerRemote, dataChannelMessage } from '@utils/webRTC'

export default (): void => {
  const { enqueueSnackbar } = useSnackbar()
  
  const { accountAddress } = useAppSelector((store) => store.wallet)
  const { friends } = useAppSelector((store) => store.friends)
  const webRTC = useAppSelector((store) => store.webRTC)
  const { playes } = useAppSelector((store) => store.room)

  const dispatch = useAppDispatch()

  const friendsRef = useRef(friends)
  const webRTCRef = useRef(webRTC)
  const playesRef = useRef(playes)

  useEffect(() => {
    const socket = io(WEBSOCKET, {
      query: {
        key: accountAddress,
      },
    })

    dispatch(setSocket(socket))

    socket.on('friend', (msg) => {
      const _friends = [...friendsRef.current]
      _friends.push({ ...msg, online: true, connected: false })
      dispatch(setFriends(_friends))
    })

    socket.on('offer', async ({ offer, type, media, isMeta, from, play }) => {
      console.log(`offer - from: ${from}, type ${type}`)
      const _friends = [...friendsRef.current]
      const friend = _friends.find((friend) => friend.account_id === from)
      if (type === 'friend') {
        if (!friend) return
        const { pc } = await answer({ offer, media })
        // set friends
        dispatch(setFriend({ account_id: friend.account_id, pc }))

        pc.ondatachannel = (event) => {
          const dataChannel = event.channel
          dataChannelMessage(dataChannel, dispatch, friend.account_id)
          dispatch(
            setFriend({
              account_id: friend.account_id,
              dataChannel,
              connected: true,
            })
          )
        }
        // send answer
        socket?.emit('answer', {
          type: 'friend',
          answer: pc.localDescription,
          toId: friend.account_id,
        })
        pc.onicecandidate = (event) => {
          if (event.candidate)
            socket?.emit('candidate', {
              type: 'friend',
              candidate: event.candidate,
              toId: friend.account_id,
            })
        }
      } else if (type === 'media') {
        if (!friend) return
        if (webRTCRef.current.isUse) {
          // send close
          socket?.emit('close', {
            type: 'media',
            toId: friend.account_id,
          })
        } else {
          dispatch(setOfferRequest({ friend, media, offer, isMeta }))
        }
      } else if (type === 'room') {
        dispatch(creatRoomAnswer({ offer, play }))
      }
    })

    socket.on('answer', async ({ answer, type, from }) => {
      console.log(`answer - from: ${from}, type ${type}`)
      const _friends = [...friendsRef.current]
      const friend = _friends.find((friend) => friend.account_id === from)
      if (type === 'friend') {
        if (!friend) return
        const { pc } = await offerRemote({ pc: friend.pc!, answer })
        dispatch(
          setFriend({ account_id: friend.account_id, pc, connected: true })
        )
      } else if (type === 'media') {
        if (!friend) return
        dispatch(setOfferRemote(answer))
      } else if (type === 'room') {
        dispatch(setRoomOfferRemote({answer, key: from}))
      }
    })

    socket.on('candidate', ({ candidate, type, from }) => {
      console.log(`candidate - from: ${from}, type ${type}, candidate: ${JSON.stringify(candidate)}`)
      const _friends = [...friendsRef.current]
      const friend = _friends.find((friend) => friend.account_id === from)
      if (type === 'friend') {
        if (!friend) return
        dispatch(setFriend({ account_id: friend.account_id, candidate }))
      } else if (type === 'media') {
        if (!friend) return
        dispatch(setCandidate(candidate))
      } else if (type === 'room') {
        dispatch(setRoomCandidate([from, candidate]))
      }
    })

    socket.on('close', ({ type }) => {
      if (type === 'media') {
        dispatch(initWebRTCState())
      }
    })

    socket.on('quit', ({ key }) => {
      const play = playesRef.current[key]
      dispatch(removePlay(key))
      if (!play) return
      enqueueSnackbar(` Quit ${play.name}`, {
        variant: 'warning',
      })
    })

    socket.on('leave', (id) => {
      const friend = friendsRef.current.find(
        (friend) => friend.account_id === id
      )

      if (!friend) return
      const _friends = { ...friend }
      // friends
      _friends.pc?.close()
      _friends.pc = undefined
      _friends.candidate = undefined
      _friends.dataChannel = undefined
      _friends.online = false
      _friends.connected = false
      dispatch(initFriend(_friends))

      if (webRTCRef.current.isUse) dispatch(initWebRTCState())
    })

    window.addEventListener('unload', () => {
      socket.disconnect()
    })
  }, [])

  useEffect(() => {
    friendsRef.current = friends
  }, [friends])

  useEffect(() => {
    webRTCRef.current = webRTC
  }, [webRTC])

  useEffect(() => {
    playesRef.current = playes
  }, [playes])
}
