import React, { useState, useEffect } from 'react'

import {
  AppBar,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import { nftApi } from '@api/index'

import { useAppSelector, useAppDispatch } from '@store/index'
import { setNft } from '@store/modules/dialog'

import type { TransitionProps } from '@mui/material/transitions'
import type { Token } from '@api/nft'

import { Close } from '@mui/icons-material'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />
})

export default (): JSX.Element => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
    },
  })

  const { nftOpen } = useAppSelector((store) => store.dialog)
  const { accountAddress } = useAppSelector((store) => store.wallet)

  const dispatch = useAppDispatch()

  const [nftList, setNftList] = useState<Token[]>([])

  const getSelfNft = async () => {
    const _nftList = await nftApi.nft_tokens_owner(accountAddress)
    setNftList(_nftList)
  }

  useEffect(() => {
    if (nftOpen) getSelfNft()
  }, [nftOpen])

  return (
    <ThemeProvider theme={theme}>
      <Dialog fullScreen open={nftOpen} TransitionComponent={Transition}>
        <AppBar
          sx={{ display: 'flex', alignItems: 'end', position: 'relative' }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => dispatch(setNft(false))}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent
          sx={{
            position: 'relative',
            backgroundColor: '#f0f2f5',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {nftList.map((nft) => (
            <Card key={nft.token_id} sx={{ height: 260, ml: 5, mb: 5 }}>
              <CardContent>
                <Typography component="p">{nft.metadata.title}</Typography>
                <img
                  src={nft.metadata.media}
                  style={{ width: '217px', height: '200px', marginTop: '8px' }}
                />
              </CardContent>
            </Card>
          ))}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}
