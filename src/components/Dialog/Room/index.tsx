import React, { useState, useEffect } from 'react'

import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  Fab,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import { userApi, nftApi } from '@api/index'

import { useAppSelector, useAppDispatch } from '@store/index'
import { setRoom, setMeta } from '@store/modules/dialog'
import { changeRoom } from '@store/modules/room'

import CreateRoom from './CreateRoom'

import type { TransitionProps } from '@mui/material/transitions'
import type { Room } from '@store/modules/room'

import { Add, Close } from '@mui/icons-material'

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

  const { roomOpen } = useAppSelector((store) => store.dialog)
  const { accountAddress } = useAppSelector((store) => store.wallet)
  const { room } = useAppSelector((store) => store.room)

  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [roomList, setRoomList] = useState<Room[]>([])

  const getList = async () => {
    const _list = await userApi.get_room_list()
    console.log(`room list: ${_list}`)

    setRoomList(_list.map((item) => item[1]))
  }

  const handleRemoveRoom = async (id: number) => {
    const res = await userApi.destory_room(id)
    if (res) getList()
  }

  const handleJoin = async (room: Room) => {
    const nftList = await nftApi.nft_tokens_owner(accountAddress)
    const flag = nftList.some((nft) => nft.token_id.split(':')[0] === '3')
    if (!flag) await nftApi.nft_mint(accountAddress)
    dispatch(changeRoom(room))
  }

  useEffect(() => {
    if (!open && roomOpen) getList()
  }, [open])

  useEffect(() => {
    if (roomOpen) getList()
  }, [roomOpen])

  useEffect(() => {
    if (room) dispatch(setMeta(true))
  }, [room])

  return (
    <ThemeProvider theme={theme}>
      <Dialog fullScreen open={roomOpen} TransitionComponent={Transition}>
        <AppBar
          sx={{ display: 'flex', alignItems: 'end', position: 'relative' }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => dispatch(setRoom(false))}
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
          {roomList.map((room) => (
            <Card key={room.id} sx={{ width: 260, height: 120, ml: 5, mb: 5 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {room.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleJoin(room)}>
                  Join in
                </Button>
                {accountAddress === room.owner && (
                  <Button
                    color="error"
                    size="small"
                    onClick={() => handleRemoveRoom(room.id)}
                  >
                    Remove Room
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
          <Fab
            sx={{
              position: 'absolute',
              bottom: 32,
              right: 32,
            }}
            onClick={() => setOpen(true)}
          >
            <Add />
          </Fab>
        </DialogContent>
      </Dialog>
      <CreateRoom open={open} setOpen={setOpen} />
    </ThemeProvider>
  )
}
