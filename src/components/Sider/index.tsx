import React, { useState, useEffect } from 'react'

import { Box, Button, TextField, IconButton, Tabs, Tab } from '@mui/material'

import { useSnackbar } from 'notistack'

import langHook from '@hooks/localHook'
import { siderLang } from '@langs/index'

import { useAppSelector, useAppDispatch } from '@store/index'
import { disconnectWallet } from '@store/modules/wallet'
import { setCurrentFriendIndex } from '@store/modules/friends'

import { userApi, ContractError } from '@api/index'

import AddBoxIcon from '@mui/icons-material/AddBox'
import LinkOffIcon from '@mui/icons-material/LinkOff'

export default (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()

  const local = langHook()

  const { friends, currentFriendIndex } = useAppSelector(
    (state) => state.friends
  )

  const dispatch = useAppDispatch()

  const [text, setText] = useState('')

  const handle = async () => {
    if (!text) return
    try {
      await userApi.add_friend(text)
      setText('')
      enqueueSnackbar(local(siderLang.successfulRequest), {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar((error as ContractError).kind.ExecutionError, {
        variant: 'error',
        autoHideDuration: 5000,
      })
    }
  }

  useEffect(() => {
    dispatch(setCurrentFriendIndex(0))
  }, [])

  return (
    <Box
      sx={{
        width: 300,
        height: '100vh',
        pt: 2,
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        position: 'relative',
      }}
    >
      {/* title */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          pl: 2.4,
        }}
      >
        <TextField
          label={local(siderLang.search)}
          variant="outlined"
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <IconButton sx={{ ml: 1 }} onClick={handle}>
          <AddBoxIcon />
        </IconButton>
      </Box>
      {/* list */}
      <Box
        sx={{
          width: '100%',
          height: 'calc(100vh - 136px)',
          bgcolor: 'background.paper',
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={currentFriendIndex}
          onChange={(_, i) => dispatch(setCurrentFriendIndex(i))}
          sx={{
            width: '100%',
            height: '100%',
            borderRight: 1,
            borderColor: 'divider',
          }}
        >
          {friends.map((friend, index) => {
            return (
              <Tab
                key={friend.hash}
                label={friend.name}
                {...{
                  id: `vertical-tab-${index}`,
                  'aria-controls': `vertical-tabpanel-${index}`,
                }}
              />
            )
          })}
        </Tabs>
      </Box>
      {/* disconnect */}
      {
        <Box>
          <Button
            size="large"
            color="inherit"
            sx={{ width: '100%', height: 64 }}
            startIcon={<LinkOffIcon />}
            onClick={() => dispatch(disconnectWallet())}
          >
            {local(siderLang.disconnect)}
          </Button>
        </Box>
      }
    </Box>
  )
}
