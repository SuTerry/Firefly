import { INFORMATION } from '@constants/libp2p'

import type { Friends } from '@store/modules/friends'

export type Send = (data: string, dataChannel: RTCDataChannel) => void
export type Out = (firend: Friends) => void
export type News = (firend: Friends, data: Record<string, unknown>) => void

interface NewsResult {
  send: Send
}

export default (): NewsResult => {
  const privateSend = async (
    dataChannel: RTCDataChannel,
    data: Record<string, unknown> = {}
  ) => {
    dataChannel.send(JSON.stringify(data))
  }

  const send: Send = async (text, dataChannel) => {
    const data = { type: INFORMATION, data: { text } }
    privateSend(dataChannel, data)
  }

  return {
    send,
  }
}
