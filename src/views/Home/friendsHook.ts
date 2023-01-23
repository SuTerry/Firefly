import { useEffect, useRef } from 'react'

import { useAppSelector, useAppDispatch } from '@store/index'
import { Friends, setFriends } from '@store/modules/friends'

import { userApi } from '@api/index'

let timer: NodeJS.Timer

let originaFriends = ''

export default (): void => {
  const { friends } = useAppSelector((store) => store.friends)
  const { accountAddress } = useAppSelector((store) => store.wallet)

  const dispatch = useAppDispatch()

  const savedCallback = useRef<Friends[]>([])

  const getFriends = async () => {
    const res = await userApi.get_friend_list(accountAddress)   
    const strFriends = JSON.stringify(res)
    if (strFriends === originaFriends) return
    originaFriends = strFriends
    const _friens = res.map((friend, index) => ({
      ...friend,
      peerId: savedCallback.current[index]?.peerId,
    }))

    dispatch(
      setFriends(_friens)
    )
  }

  useEffect(() => {
    savedCallback.current = friends
    console.log(friends, 'friends')
  })

  useEffect(() => {
    getFriends()
    timer = setInterval(getFriends, 60 * 1000)

    return () => clearInterval(timer)
  }, [])
}
