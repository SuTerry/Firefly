import { randomExamId } from '@utils/index'

import { INFORMATION } from '@constants/libp2p'

import { Friends, pushRemotes } from '@store/modules/friends'

import type { AppDispatch } from '@store/index'
import type { InitPlay } from '@store/modules/room'



interface OfferParams {
  media: MediaStreamConstraints
  isMeta: boolean
  friend?: Friends
}

interface OfferRes {
  localStream: MediaStream | undefined
  pc: RTCPeerConnection
  media: MediaStreamConstraints
  dataChannel: RTCDataChannel
  isVideo: boolean | MediaTrackConstraints | undefined
  isMeta: boolean
  friend?: Friends
}

interface AnswerParams {
  offer: RTCSessionDescription
  media: MediaStreamConstraints
  play?: InitPlay
}

interface AnswerRes {
  localStream: MediaStream | undefined
  pc: RTCPeerConnection
  media: MediaStreamConstraints | undefined
  stream: MediaStream | undefined
  play?: InitPlay
}

interface OfferRemoteParams {
  pc: RTCPeerConnection
  answer: RTCSessionDescription
}

interface OfferRemoteRes {
  pc: RTCPeerConnection | undefined
  stream: MediaStream | undefined
}

export const options = {
  iceServers: [
    {
      urls: [
        'stun:stun.gmx.net:3478',
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:54.250.193.38:3478',
      ],
    },
    {
      urls: ['turn:54.250.193.38:3478'],
      username: 'firefly',
      credential: 'firefly12345',
    },
  ],
}

export const offer = async ({
  media,
  isMeta,
  friend
}: OfferParams): Promise<OfferRes> => {
  let localStream: MediaStream | undefined
  if (media.video || media.audio)
    localStream = await navigator.mediaDevices.getUserMedia(media)
  const pc = new RTCPeerConnection(options)
  const dataChannel = pc.createDataChannel(randomExamId())

  localStream?.getTracks().forEach((track) => pc.addTrack(track, localStream!))
  const offer = await pc.createOffer()
  await pc.setLocalDescription(offer)
  return {
    localStream,
    pc,
    media,
    dataChannel,
    isVideo: media.video,
    isMeta,
    friend,
  }
}

export const answer = async ({
  offer,
  media,
  play,
}: AnswerParams): Promise<AnswerRes> => {
  let localStream: MediaStream | undefined
  if (media.video || media.audio)
    localStream = await navigator.mediaDevices.getUserMedia(media)
  const pc = new RTCPeerConnection(options)
  let stream: MediaStream | undefined

  localStream?.getTracks().forEach((track) => pc.addTrack(track, localStream!))

  pc.ontrack = (event) => {
    stream = event.streams[0]
  }

  await pc.setRemoteDescription(offer)
  const answer = await pc.createAnswer()
  await pc.setLocalDescription(answer)

  return { localStream, pc, media, stream, play }
}

export const offerRemote = async ({
  pc,
  answer,
}: OfferRemoteParams): Promise<OfferRemoteRes> => {
  let stream: MediaStream | undefined

  pc!.ontrack = (event) => {
    stream = event.streams[0]
  }

  if (!pc.currentRemoteDescription) {
    await pc!.setRemoteDescription(answer)
  }

  return { pc, stream }
}

export const dataChannelMessage = (
  dataChannel: RTCDataChannel,
  dispatch: AppDispatch,
  account_id: string
): void => {
  dataChannel.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data)
    if (type === INFORMATION) {
      dispatch(
        pushRemotes({
          account_id,
          text: data.text,
        })
      )
    }
  }
}
