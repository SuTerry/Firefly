import React, { ChangeEvent, forwardRef, useState } from 'react'

import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
} from '@mui/material'

import { styled } from '@mui/material/styles'

import LoadingButton from '@mui/lab/LoadingButton'

import { TransitionProps } from '@mui/material/transitions'

import { useSnackbar } from 'notistack'

import { useAppSelector, useAppDispatch } from '@store/index'
import { setUser, setDialogOpen } from '@store/modules/user'

import langHook from '@hooks/localHook'
import { registerLang } from '@langs/index'

import { truncateMiddle } from '@utils/index'
import { add } from '@utils/ipfs'

import { userApi, ContractError } from '@api/index'

import { TextField } from '@components/Customization'

import { PhotoCamera, ContentCopy, Close } from '@mui/icons-material'

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement
    },
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="up" ref={ref} {...props} />
  }
)

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    backgroundColor: '#000',
  },
}))

export default (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()

  const { accountAddress } = useAppSelector((state) => state.wallet)
  const user = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  const local = langHook()

  const [headerImg, setHeaderImg] = useState(user.headerImg)
  const [nickname, setNickname] = useState(user.nickname)
  const [helperText, setHelperText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(accountAddress)
    enqueueSnackbar(local(registerLang.copied), {
      variant: 'success',
    })
  }

  const handleHeaderImg = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return
    const file = files[0]
    const hash = await add(file)
    setHeaderImg(hash)
  }

  const handleNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setHelperText('')
    setNickname(event.target.value)
  }

  const handleSubmit = async () => {
    if (!nickname) {
      setHelperText(local(registerLang.required))
      return
    }
    setLoading(true)
    try {
      await userApi.register(nickname, headerImg)
      dispatch(setUser({ headerImg, nickname }))
    } catch (error) {
      enqueueSnackbar((error as ContractError).kind.ExecutionError, {
        variant: 'error',
        autoHideDuration: 5000,
      })
    }
    setLoading(false)
  }
  return (
    <BootstrapDialog
      fullScreen
      open={user.dialogOpen}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ display: 'flex', alignItems: 'end' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="primary"
            onClick={() => dispatch(setDialogOpen(false))}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'center',
          alignItems: 'center',
          pt: 30,
        }}
      >
        {/* headerImg */}
        <Box
          sx={{
            position: 'relative',
            width: 100,
            height: 100,
            mb: 2,
          }}
        >
          <img
            style={{ width: '100%', height: '100%', borderRadius: '12px' }}
            src={`https://ipfs.io/ipfs/${headerImg}`}
          />
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0,
              transition: 'opacity 0.8s',
              borderRadius: '12px',
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            <IconButton color="inherit" size="large" component="label">
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleHeaderImg}
              />
              <PhotoCamera />
            </IconButton>
          </Box>
        </Box>
        {/* accountAddress */}
        <Button
          color="primary"
          sx={{ pb: 6 }}
          endIcon={<ContentCopy />}
          onClick={handleCopy}
        >
          {truncateMiddle(accountAddress, 5)}
        </Button>
        {/* nickname */}
        <TextField
          error={!!helperText}
          label={local(registerLang.nickname)}
          value={nickname}
          onChange={handleNickname}
          helperText={helperText}
          sx={{ mb: 8 }}
        />
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={handleSubmit}
        >
          {local(registerLang.submitted)}
        </LoadingButton>
      </Box>
    </BootstrapDialog>
  )
}
