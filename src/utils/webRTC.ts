import type { Friends } from '@store/modules/friends'

interface Position {
  x: number
  y: number
  z: number
}

interface OfferParams {
  friend: Friends
  media: MediaStreamConstraints
  isMeta: boolean
}

interface OfferRes {
  localStream: MediaStream
  pc: RTCPeerConnection
  friend: Friends
  media: MediaStreamConstraints
  dataChannel: RTCDataChannel
  isVideo: boolean | MediaTrackConstraints | undefined
  isMeta: boolean
}

interface AnswerParams {
  offer: RTCSessionDescription
  media: MediaStreamConstraints
  friend: Friends
  position?: Position
}

interface AnswerRes {
  localStream: MediaStream
  pc: RTCPeerConnection
  media: MediaStreamConstraints | undefined
  stream: MediaStream | undefined
  friend: Friends
  position?: Position
}

interface OfferRemoteParams {
  pc: RTCPeerConnection
  answer: RTCSessionDescription
  friend: Friends
}

interface OfferRemoteRes {
  pc: RTCPeerConnection | undefined
  stream: MediaStream | undefined
  friend: Friends
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
  friend,
  media,
  isMeta,
}: OfferParams): Promise<OfferRes> => {
  const localStream = await navigator.mediaDevices.getUserMedia(media)
  const pc = new RTCPeerConnection(options)
  const dataChannel = pc.createDataChannel(friend.topic)
  localStream.getTracks().forEach((track) => pc.addTrack(track, localStream))
  const offer = await pc.createOffer()
  await pc.setLocalDescription(offer)
  await new Promise((resolve) => {
    pc.onicecandidate = (event) => {
      if (event.candidate) setTimeout(() => resolve(pc.localDescription), 1000)
    }
  })
  return {
    localStream,
    pc,
    friend,
    media,
    dataChannel,
    isVideo: media.video,
    isMeta,
  }
}

export const answer = async ({
  offer,
  media,
  friend,
  position,
}: AnswerParams): Promise<AnswerRes> => {
  const localStream = await navigator.mediaDevices.getUserMedia(media)
  const pc = new RTCPeerConnection(options)
  let stream: MediaStream | undefined

  localStream.getTracks().forEach((track) => pc.addTrack(track, localStream))

  pc.ontrack = (event) => {
    stream = event.streams[0]
  }
  await pc.setRemoteDescription(offer)
  const answer = await pc.createAnswer()
  await pc.setLocalDescription(answer)
  await new Promise((resolve) => {
    pc.onicecandidate = (event) => {
      if (event.candidate) setTimeout(() => resolve(pc.localDescription), 1000)
    }
  })

  return { localStream, pc, media, stream, friend, position }
}

export const offerRemote = async ({
  pc,
  friend,
  answer,
}: OfferRemoteParams): Promise<OfferRemoteRes> => {
  let stream: MediaStream | undefined

  pc!.ontrack = (event) => {
    stream = event.streams[0]
  }

  if (!pc!.currentRemoteDescription) {
    await pc!.setRemoteDescription(answer)
  }

  await new Promise((resolve) => setTimeout(() => resolve(1), 1000))

  return { pc, stream, friend }
}
