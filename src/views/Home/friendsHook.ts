import { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '@store/index'
import { Friends, setFriends, setFriend } from '@store/modules/friends'

import { userApi } from '@api/index'

import { dataChannelMessage, offer } from '@utils/webRTC'

export default (): void => {
  const { accountAddress } = useAppSelector((store) => store.wallet)
  const { nickname, socket } = useAppSelector((store) => store.user)
  const { friends } = useAppSelector((store) => store.friends)

  const dispatch = useAppDispatch()

  const getFriends = async () => {
    const res = await userApi.get_friend_list(accountAddress)
    const ids = res.map((friend) => friend.account_id)

    socket?.emit('online', ids)

    socket?.on('online', (msg) => {
      const _friends = res.map((friend, index) => ({
        ...friend,
        connected: false,
        online: msg[index],
      }))
      dispatch(setFriends(_friends))
    })
  }

  const sendOffer = async (friend: Friends) => {
    const media = { video: false, audio: false }
    const isMeta = false
    const { pc, dataChannel } = await offer({ media, isMeta })
    friend.pc = pc
    friend.dataChannel = dataChannel
    
    socket?.emit('offer', {
      type: 'friend',
      offer: pc.localDescription,
      toId: friend.account_id,
      media,
    })
    pc.onicecandidate = (event) => {
      if (event.candidate)
        socket?.emit('candidate', {
          type: 'friend',
          candidate: event.candidate,
          toId: friend.account_id,
        })
    }

    dataChannelMessage(dataChannel, dispatch, friend.account_id)

    dispatch(setFriend({ ...friend }))
  }

  useEffect(() => {
    if (nickname) getFriends()
  }, [nickname])

  useEffect(() => {
    console.log(friends, 'friends-friends')

    friends.forEach((friend) => {
      
      const { online, pc, candidate } = friend
      if (online && !pc) sendOffer({ ...friend })
      
      if (pc?.connectionState !== 'connected' && candidate) {
        pc?.addIceCandidate(new RTCIceCandidate(friend.candidate))
      }
        
    })
  }, [friends])
}
