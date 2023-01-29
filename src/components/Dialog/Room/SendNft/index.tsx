import React, { useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material'

import { useAppSelector } from '@store/index'

import { nftApi } from '@api/index'

interface CreateRoomProps {
  open: boolean
  setOpen: (value: boolean) => void
}

export default ({ open, setOpen }: CreateRoomProps): JSX.Element => {
  const { friends } = useAppSelector((store) => store.friends)
  const [nfts, setNfts] = useState<string[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _nfts = [...nfts]
    const name = event.target.name
    if (event.target.checked) {
      _nfts.push(name)
    } else {
      const index = _nfts.findIndex((nft) => nft === name)
      _nfts.splice(index, 1)
    }
    setNfts(_nfts)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSend = async () => {
    const res = await nftApi.nft_mint(nfts)
    if (res) handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Send NFT</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormGroup>
            {friends.map((friend) => (
              <FormControlLabel
                key={friend.account_id}
                control={
                  <Checkbox
                    // checked={gilad}
                    onChange={handleChange}
                    name={friend.account_id}
                  />
                }
                label={friend.name}
              />
            ))}
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSend}>Send</Button>
      </DialogActions>
    </Dialog>
  )
}
