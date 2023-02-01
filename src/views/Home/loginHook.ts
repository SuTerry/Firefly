import { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '@store/index'
import { login } from '@store/modules/user'
import { setDialogOpen } from '@store/modules/user'

import { userApi } from '@api/index'

export default (): void => {
  const { accountAddress } = useAppSelector((store) => store.wallet)

  const dispatch = useAppDispatch()

  const setUserInfo = async () => {
    try {
      const [nickname, headerImg] = await userApi.account_info(accountAddress)
      dispatch(login({ nickname, headerImg }))
    } catch (error) {
      dispatch(setDialogOpen(true))
    }
  }
  useEffect(() => {
    setUserInfo()
  }, [])
}
