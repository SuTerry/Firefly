import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  styled,
  Button,
} from '@mui/material'

import { useAppDispatch } from '@store/index'
import { initWebRTCState } from '@store/modules/webRTC'

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
  const dispatch = useAppDispatch()

  const loacl = langHook()

  const handleClose = () => {
    setOpen(false)
    dispatch(initWebRTCState())
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
