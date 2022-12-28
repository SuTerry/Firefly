import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { Box, Typography, Button } from '@mui/material'

import { useAppSelector, useAppDispatch } from '@store/index'
import { setDialogOpen } from '@store/modules/wallet'

import langHook from '@hooks/localHook'
import { connectLang, headerLang } from '@langs/index'


export default (): JSX.Element => {
  const navigator = useNavigate()

  const { isCW } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  const local = langHook()

  useEffect(() => {
    if (isCW) navigator('/')
  }, [isCW])
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 16,
      }}
    >
      <Typography sx={{ m: 8 }} variant="h2">
        Firefly
      </Typography>
      <Typography variant="h4">{local(connectLang.subTitle)}</Typography>
      <Button sx={{ width: 180, height: 50, mt: 8 }} variant="outlined" onClick={() => dispatch(setDialogOpen(true))}>
        {local(headerLang.wallet)}
      </Button>
    </Box>
  )
}
