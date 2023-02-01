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

import { userApi } from '@api/index'

import { useAppSelector, useAppDispatch } from '@store/index'
import { setRoom, setMeta } from '@store/modules/dialog'
import { changeRoom, setInitPlays } from '@store/modules/room'

import CreateRoom from './CreateRoom'
import SendNft from './SendNft'

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
  const { socket, nickname } = useAppSelector((store) => store.user)

  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [openNft, setOpenNft] = useState(false)
  const [roomList, setRoomList] = useState<Room[]>([])

  const getList = async () => {
    const _list = await userApi.get_room_list()
    setRoomList(_list.map((item) => item[1]))
  }

  const handleRemoveRoom = async (id: number) => {
    const res = await userApi.destory_room(id)
    if (res) getList()
  }

  const handleJoin = async (room: Room) => {
    socket?.emit('join', {
      room: room.id,
      play: {
        name: nickname,
        id: accountAddress
      }
    })
    socket?.on('join', ({plays}) => {
      if (!plays) return 
      dispatch(changeRoom(room))
      dispatch(setInitPlays(plays))
    })
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
            <Card key={room.id} sx={{ width: 300, height: 120, ml: 5, mb: 5 }}>
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
                  <>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleRemoveRoom(room.id)}
                    >
                      Remove Room
                    </Button>
                    <Button
                      size="small"
                      onClick={() => setOpenNft(true)}
                    >
                      Send NFT
                    </Button>
                  </>
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
      <SendNft open={openNft} setOpen={setOpenNft} />
    </ThemeProvider>
  )
}
