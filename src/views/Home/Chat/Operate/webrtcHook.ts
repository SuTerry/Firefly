import { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '@store/index'
import { setAnswerChannel } from '@store/modules/webRTC'

export default (account_id: string): void => {
  const { pc, media, isOffer, isMeta, offer, candidate, dataChannel } = useAppSelector(
    (store) => store.webRTC
  )

  const { socket } = useAppSelector((store) => store.user)

  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log(pc, 'pc')
    
    if (pc) {
      if (isOffer) {
        socket?.emit('offer', {
          type: 'media',
          offer: pc.localDescription,
          toId: account_id,
          media,
          isMeta,
        })
      } else {
        socket?.emit('answer', {
          type: 'media',
          answer: pc.localDescription,
          toId: account_id,
        })
      }

      pc.ondatachannel = (event) => {
        if (!dataChannel) dispatch(setAnswerChannel(event.channel))
      }

      pc.onicecandidate = (event) => {
        if (event.candidate)
          socket?.emit('candidate', {
            type: 'media',
            candidate: event.candidate,
            toId: account_id,
          })
      }
      
    } else if (offer && !media) {
      socket?.emit('close', {
        type: 'media',
        toId: account_id,
      })
    }

  }, [pc, media])

  

  useEffect(() => {
    if (!pc) return
    if (pc?.connectionState !== 'connected' && candidate) {
      pc?.addIceCandidate(new RTCIceCandidate(candidate))
    }
  }, [candidate, pc])
}
