import React, { useState } from 'react'

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

import { NFTS } from '@constants/exhibition'

import { userApi } from '@api/index'

interface CreateRoomProps {
  open: boolean
  setOpen: (value: boolean) => void
}

export default ({ open, setOpen }: CreateRoomProps): JSX.Element => {
  const [name, setName] = useState('')
  const [nfts, setNfts] = useState<string[]>(new Array(NFTS.length).fill(''))

  const changeNft = (index: number, value: string) => {
    const _nfts = [...nfts]
    _nfts.splice(index, 1, value)
    setNfts(_nfts)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (!name) return
    const res = await userApi.create_room(name, nfts)
    if (res) handleClose()
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Create Room</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="name"
          label="Room Name"
          fullWidth
          variant="standard"
          onChange={(e) => setName(e.target.value)}
        />
        {nfts.map((_, index) => (
          <TextField
            key={index}
            margin="dense"
            id="name"
            label={`#${index + 1} nft`}
            fullWidth
            variant="standard"
            onChange={(e) => changeNft(index, e.target.value)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}
