import { pipe } from 'it-pipe'

import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'

import { useAppSelector } from '@store/index'

import { ANSWER, INFORMATION, OFFER, OUT } from '@constants/libp2p'

import type { Friends } from '@store/modules/friends'

export type Send = (data: string, firend: Friends) => void
export type Out = (firend: Friends) => void
export type News = (firend: Friends, data: Record<string, unknown>) => void

interface NewsResult {
  send: Send
  out: Out
  offer: News
  answer: News
}

export default (): NewsResult => {
  const { libp2p } = useAppSelector((state) => state.user)
  const { accountAddress } = useAppSelector((state) => state.wallet)

  const privateSend = async (
    type: string,
    friend: Friends,
    data: Record<string, unknown> = {}
  ) => {
    if (!libp2p) return
    const { peerId, topic } = friend
    const stream = await libp2p.dialProtocol(peerId!, topic)
    const val = JSON.stringify({
      type,
      account_id: accountAddress,
      ...data,
    })
    pipe([uint8ArrayFromString(val)], stream)
  }

  const send: Send = async (text, friend) => {
    const data = { text }
    privateSend(INFORMATION, friend, data)
  }

  const out: Out = async (friend) => {
    privateSend(OUT, friend)
  }

  const offer: News = async (friend, data) => {
    privateSend(OFFER, friend, data)
  }

  const answer: News = async (friend, data) => {
    privateSend(ANSWER, friend, data)
  }


  return {
    send,
    out,
    offer,
    answer,
  }
}
