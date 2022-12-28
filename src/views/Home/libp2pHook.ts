import { useState, useEffect } from 'react'
import { pipe } from 'it-pipe'

import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

import { useAppSelector, useAppDispatch } from '@store/index'
import { setFriends, setRemotes } from '@store/modules/friends'

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
  const { friends, remotes } = useAppSelector((state) => state.friends)
  const { libp2p } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  const [topices, setTopices] = useState<string[]>([])

  const handle = async ({ connection, stream }: IncomingStreamData) => {
    const key = connection.remotePeer.toString()
    pipe(stream, async function (source) {
      for await (const msg of source) {
        const str = uint8ArrayToString(msg.subarray())
        const peer = JSON.parse(str)
        const friend = friends.find((friend) => friend.hash === peer.hash)
        switch (peer.type) {
          case 'greet':
            if (!friend) return
            if (hashMap.hasOwnProperty(key) && hashMap[key].peerId) return
            hashMap[key] = { ...friend }
            hashMap[key].peerId = connection.remotePeer
            updateFriends(hashMap[key])
            break
          case 'information':
            if (!friend) return
            const _remotes = [...remotes]
            _remotes.push({
              hash: friend.hash,
              text: peer.text,
            })
            dispatch(setRemotes(_remotes))
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
    const friend = friends.find((friend) => friend.hash === key)
    if (!friend) return
    if (hashMap.hasOwnProperty(key) && hashMap[key].peerId) return
    hashMap[key] = { ...friend }
    libp2p.dial(evt.detail.id)
  }

  const peerConnect = async (evt: CustomEvent<Connection>) => {
    if (!libp2p) return
    const connection = evt.detail
    const key = evt.detail.remotePeer.toString()
    const firend = hashMap[key]
    if (!firend) return
    if (firend.peerId) return
    firend.peerId = connection.remotePeer
    const val = JSON.stringify({
      type: 'greet',
      hash: firend.hash,
    })
    greet(connection.remotePeer, firend.topic, val)
  }

  const peerDisconnect = async (evt: CustomEvent<Connection>) => {
    const key = evt.detail.remotePeer.toString()
    if (!hashMap.hasOwnProperty(key)) return
    const friend = { ...hashMap[key] }
    delete hashMap[key]
    friend.peerId = undefined
    updateFriends(friend)
  }

  const init = async () => {
    if (!libp2p) return

    libp2p.unhandle(topices)
    libp2p.removeEventListener('peer:discovery', peerDiscovery)
    libp2p.connectionManager.removeEventListener('peer:connect', peerConnect)
    libp2p.connectionManager.removeEventListener(
      'peer:disconnect',
      peerDisconnect
    )

    libp2p.handle(topices, handle)
    libp2p.addEventListener('peer:discovery', peerDiscovery)
    libp2p.connectionManager.addEventListener('peer:connect', peerConnect)
    libp2p.connectionManager.addEventListener('peer:disconnect', peerDisconnect)
  }

  const send: Send = async (text, friend) => {
    const { peerId, topic } = friend
    const stream = await libp2p!.dialProtocol(peerId!, topic)
    const val = JSON.stringify({
      type: 'information',
      hash: libp2p!.peerId.toString(),
      text,
    })
    pipe([uint8ArrayFromString(val)], stream)
  }

  const greet = async (peer: PeerId, topic: string, val: string) => {
    try {
      const stream = await libp2p!.dialProtocol(peer, [topic])
      await pipe([uint8ArrayFromString(val)], stream)
      const key = peer.toString()
      updateFriends(hashMap[key])
    } catch (error) {
      setTimeout(() => {
        greet(peer, topic, val)
      }, 60 * 1000)
    }
  }

  const updateFriends = (_friend: Friends) => {
    const _friends = [...friends]
    const index = friends.findIndex((friend) => friend.hash === _friend.hash)
    _friends.splice(index, 1, _friend)
    dispatch(setFriends(_friends))
  }

  useEffect(() => {
    init()
  }, [libp2p, topices])

  useEffect(() => {
    const _topices = friends.map((friend) => friend.topic)
    setTopices(_topices)
  }, [friends])

  return { send }
}
