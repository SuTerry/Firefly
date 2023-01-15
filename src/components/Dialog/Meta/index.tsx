import React, { useState } from 'react'

import { Dialog, DialogContent, IconButton, Slide, styled } from '@mui/material'

import { useAppSelector } from '@store/index'

import Lingo3D from './Lingo3D'
import Menu from './Menu'

import type { TransitionProps } from '@mui/material/transitions'

import { DensityMedium } from '@mui/icons-material'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    backgroundColor: '#000'
  },
}))

export default (): JSX.Element => {
  const { metaOpen } = useAppSelector((store) => store.dialog)

  const [open, setOpen] = useState(false)

  return (
    <>
      <BootstrapDialog fullScreen open={metaOpen} TransitionComponent={Transition}>
        <DialogContent sx={{ position: 'relative' }}>
          <Lingo3D />
          <IconButton
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
            }}
            onClick={() => setOpen(true)}
          >
            <DensityMedium sx={{ color: '#fff' }} />
          </IconButton>
        </DialogContent>
      </BootstrapDialog>
      <Menu open={open} setOpen={setOpen} />
    </>
  )
}
