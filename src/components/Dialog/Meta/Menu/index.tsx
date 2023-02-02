import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  styled,
  Button,
} from '@mui/material'

import { useAppDispatch, useAppSelector } from '@store/index'
import { initWebRTCState } from '@store/modules/webRTC'
import { initRoom } from '@store/modules/room'

import langHook from '@hooks/localHook'
import { metaLang } from '@langs/index'

export interface MwnuProps {
  open: boolean
  setOpen: (value: boolean) => void
}

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    backgroundColor: '#000',
  },
}))

export default ({ open, setOpen }: MwnuProps): JSX.Element => {
  const { roomOpen } = useAppSelector((store) => store.dialog)
  const { room } = useAppSelector((store) => store.room)
  const { socket } = useAppSelector((store) => store.user)
  const dispatch = useAppDispatch()

  const loacl = langHook()

  const handleClose = () => {
    if (roomOpen) {
      socket?.emit('quit', { room: room?.id })
      dispatch(initRoom())
    } else {
      dispatch(initWebRTCState())
    }

    setOpen(false)
  }

  return (
    <BootstrapDialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>{loacl(metaLang.menu)}</DialogTitle>
      <DialogContent>
        <Button
          variant="outlined"
          size="large"
          sx={{ width: 200 }}
          onClick={handleClose}
        >
          {loacl(metaLang.close)}
        </Button>
      </DialogContent>
    </BootstrapDialog>
  )
}
