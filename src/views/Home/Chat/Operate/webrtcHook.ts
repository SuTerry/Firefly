import { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '@store/index'
import { setAnswerChannel } from '@store/modules/webRTC'

export default (account_id: string): void => {
  const webrtc= useAppSelector(
    (store) => store.webRTC
  )
  const { socket } = useAppSelector((store) => store.user)

  const dispatch = useAppDispatch()

  useEffect(() => {
    
    if (webrtc.pc) {
      if (webrtc.isOffer) {
        socket?.emit('offer', {
          type: 'media',
          offer: webrtc.pc.localDescription,
          toId: account_id,
          media: webrtc.media,
          isMeta: webrtc.isMeta,
        })
      } else {
        socket?.emit('answer', {
          type: 'media',
          answer: webrtc.pc.localDescription,
          toId: account_id,
        })
        webrtc.pc.ondatachannel = (event) => {
          if (!webrtc.dataChannel) dispatch(setAnswerChannel(event.channel))
        }
      }

      webrtc.pc.onicecandidate = (event) => {
        if (event.candidate)
          socket?.emit('candidate', {
            type: 'media',
            candidate: event.candidate,
            toId: account_id,
          })
      }
      
    } else if (webrtc.offer && !webrtc.media) {
      // socket?.emit('close', {
      //   type: 'media',
      //   toId: account_id,
      // })
    }
    
    console.log(webrtc, 'webrtc')
   
  }, [webrtc])

  useEffect(() => {
    if (!webrtc.pc) return
    if (webrtc.pc.connectionState !== 'connected' && webrtc.candidate) {
      webrtc.pc.addIceCandidate(new RTCIceCandidate(webrtc.candidate))
    }
  }, [webrtc])
}
