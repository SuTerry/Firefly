import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Box, Typography, Button } from '@mui/material'

import LoadingButton from '@mui/lab/LoadingButton'

import { useSnackbar } from 'notistack'

import { useAppSelector, useAppDispatch } from '@store/index'
import { setDialogOpen, login } from '@store/modules/user'

import langHook from '@hooks/localHook'
import { loginLang } from '@langs/index'

import { userApi, ContractError } from '@api/index'

export default (): JSX.Element => {
  const navigator = useNavigate()

  const { enqueueSnackbar } = useSnackbar()

  const { libp2p, isLogin } = useAppSelector((store) => store.user)

  const dispatch = useAppDispatch()

  const local = langHook()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const [nickname, headerImg] = await userApi.login(
        libp2p!.peerId.toString()
      )
      dispatch(login({ nickname, headerImg }))
    } catch (error) {
      enqueueSnackbar((error as ContractError).kind.ExecutionError, {
        variant: 'error',
        autoHideDuration: 5000,
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isLogin) navigator('/')
  }, [isLogin])

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 128px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>{local(loginLang.title)}</Typography>
      <LoadingButton
        sx={{ mt: 6, textTransform: 'none' }}
        variant="contained"
        disabled={!libp2p}
        loading={loading}
        onClick={handleSubmit}
      >
        {local(loginLang.login)}
      </LoadingButton>
      <Button
        sx={{
          mt: 4,
          fontSize: 14,
          // color: '#333',
          textTransform: 'none',
        }}
        onClick={() => dispatch(setDialogOpen(true))}
      >
        {local(loginLang.unregistered)}
      </Button>
    </Box>
  )
}
