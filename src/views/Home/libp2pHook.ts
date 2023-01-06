import { useEffect, useRef } from 'react'
import { pipe } from 'it-pipe'

import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

import { useAppSelector, useAppDispatch } from '@store/index'
import { setFriends, pushRemotes } from '@store/modules/friends'
import {
  creatAnswer,
  setAnswerChannel,
  setOfferRemote,
} from '@store/modules/webRTC'

import { INFORMATION, GREET, OFFER, ANSWER } from '@constants/libp2p'

import type { PeerId } from '@libp2p/interface-peer-id'
import type { PeerInfo } from '@libp2p/interface-peer-info'
import type { Connection } from '@libp2p/interface-connection'
import type { IncomingStreamData } from '@libp2p/interface-registrar'
import type { Friends } from '@store/modules/friends'

export type Send = (data: string, firend: Friends) => void

interface Libp2pResult {
  send: Send
}

const hashMap: Record<string, Friends> = {}

export default (): Libp2pResult => {
  const { friends } = useAppSelector((state) => state.friends)
  const { libp2p } = useAppSelector((state) => state.user)
  const { accountAddress } = useAppSelector((state) => state.wallet)
  const { webRTC } = useAppSelector((state) => state)

  const dispatch = useAppDispatch()

  const friendsCallback = useRef<Friends[]>([])

  const handle = async ({ connection, stream }: IncomingStreamData) => {
    const key = connection.remotePeer.toString()
    pipe(stream, async function (source) {
      for await (const msg of source) {
        const str = uint8ArrayToString(msg.subarray())
        const action = JSON.parse(str)
        console.log('action', action)
        const friend = friends.find(
          (_friend) => _friend.account_id === action.account_id
        )
        if (!friend) return
        switch (action.type) {
          case GREET:
            if (friend.peerId) return
            if (!hashMap[key].account_id) {
              const { peerId } = hashMap[key]
              hashMap[key] = Object.assign(hashMap[key], friend, { peerId })
              greet(connection.remotePeer, friend.topic)
            }
            console.log(`connected: ${friend.name}, peer: ${key}`)
            updateFriends(hashMap[key])
            break
          case INFORMATION:
            dispatch(
              pushRemotes({
                account_id: friend.account_id,
                text: action.text,
              })
            )
            break
          case OFFER:
            console.log('111111')

            const { media, offer } = action
            console.log('22222222')

            dispatch(creatAnswer({ friend, media, offer }))
            break
          case ANSWER:
            const { answer } = action
            dispatch(setOfferRemote(answer))
            break
          default:
            break
        }
      }
    })
  }

  const peerDiscovery = async (evt: CustomEvent<PeerInfo>) => {
    if (!libp2p) return
    const key = evt.detail.id.toString()
    const friend = friendsCallback.current.find((friend) => friend.hash === key)
    if (!friend) return
    if (hashMap.hasOwnProperty(key) && hashMap[key].peerId) return
    hashMap[key] = { ...friend }
    console.log(`discovery: ${friend.name}, peerId: ${key}`)
    libp2p.dial(evt.detail.id).catch((error) => console.log(error))
  }

  const peerConnect = async (evt: CustomEvent<Connection>) => {
    if (!libp2p) return
    const connection = evt.detail
    const key = connection.remotePeer.toString()
    console.log(`connect: ${key}`)

    if (!hashMap.hasOwnProperty(key)) {
      hashMap[key] = {
        name: '',
        image: '',
        topic: '',
        account_id: '',
        hash: key,
        peerId: connection.remotePeer,
      }
    } else {
      hashMap[key].peerId = connection.remotePeer
    }

    const friend = friendsCallback.current.find(
      (_friend) => _friend.hash === key
    )
    if (!friend) return

    greet(connection.remotePeer, friend.topic)
  }

  const peerDisconnect = async (evt: CustomEvent<Connection>) => {
    const key = evt.detail.remotePeer.toString()
    if (!hashMap.hasOwnProperty(key)) return
    const friend = { ...hashMap[key] }
    console.log(`quit: ${friend.name}`)
    delete hashMap[key]
    friend.peerId = undefined
    updateFriends(friend)
  }

  const init = async () => {
    if (!libp2p) return

    libp2p.removeEventListener('peer:discovery', peerDiscovery)
    libp2p.connectionManager.removeEventListener('peer:connect', peerConnect)
    libp2p.connectionManager.removeEventListener(
      'peer:disconnect',
      peerDisconnect
    )

    libp2p.addEventListener('peer:discovery', peerDiscovery)
    libp2p.connectionManager.addEventListener('peer:connect', peerConnect)
    libp2p.connectionManager.addEventListener('peer:disconnect', peerDisconnect)
  }

  const send: Send = async (text, friend) => {
    const data = { text }
    privateSend(INFORMATION, friend, data)
  }

  const greet = async (peer: PeerId, topic: string) => {
    try {
      const stream = await libp2p!.dialProtocol(peer, [topic])
      const val = JSON.stringify({
        type: GREET,
        account_id: accountAddress,
      })
      await pipe([uint8ArrayFromString(val)], stream)
      console.log(`greet: ${peer.toString()}`)
    } catch (error) {
      console.log(`greet-fail: ${peer.toString()}`)
      setTimeout(() => {
        greet(peer, topic)
      }, 60 * 1000)
    }
  }

  const updateFriends = (_friend: Friends) => {
    const _friends = [...friendsCallback.current]
    const index = friendsCallback.current.findIndex(
      (friend) => friend.hash === _friend.hash
    )
    _friends.splice(index, 1, _friend)
    dispatch(setFriends(_friends))
  }

  const privateSend = async (
    type: string,
    friend: Friends,
    data: Record<string, unknown> = {}
  ) => {
    const { peerId, topic } = friend
    const stream = await libp2p!.dialProtocol(peerId!, topic)
    const val = JSON.stringify({
      type,
      account_id: accountAddress,
      ...data,
    })
    pipe([uint8ArrayFromString(val)], stream)
  }

  useEffect(() => {
    console.log(`libp2pPeerId:${libp2p!.peerId.toString()}`)
    init()
    return () => {
      libp2p?.stop()
    }
  }, [])

  useEffect(() => {
    friendsCallback.current = friends
    const topices = friends.map((friend) => friend.topic)
    libp2p?.unhandle(topices)
    libp2p?.handle(topices, handle)
  }, [friends])

  useEffect(() => {
    if (webRTC.isOffer) {
      privateSend(OFFER, webRTC.friend!, {
        offer: webRTC.pc?.localDescription,
        media: webRTC.media,
      })
    } else {
      //
    }
  }, [webRTC.isOffer])

  useEffect(() => {
    console.log('webRTC.isAnswer')

    if (webRTC.isAnswer) {
      privateSend(ANSWER, webRTC.friend!, {
        answer: webRTC.pc?.localDescription,
      })
      webRTC.pc!.ondatachannel = (event) => {
        if (!webRTC.dataChannel) dispatch(setAnswerChannel(event.channel))
      }
    } else {
      //
    }
  }, [webRTC.isAnswer])

  return { send }
}
