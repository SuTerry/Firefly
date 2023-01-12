import React, { useState, useEffect } from 'react'

import { Box, Button, IconButton, Tabs, Tab, TabProps } from '@mui/material'

import { styled } from '@mui/material/styles'

import { useSnackbar } from 'notistack'

import langHook from '@hooks/localHook'
import { siderLang } from '@langs/index'

import { useAppSelector, useAppDispatch } from '@store/index'
import { disconnectWallet } from '@store/modules/wallet'
import { setCurrentFriendIndex } from '@store/modules/friends'

import { userApi } from '@api/index'

import { path } from '@utils/ipfs'

import { TextField } from '@components/Customization'

import AddBoxIcon from '@mui/icons-material/AddBox'
import LinkOffIcon from '@mui/icons-material/LinkOff'

const AntTab = styled((props: TabProps) => <Tab {...props} />)(() => ({
  color: 'rgba(255, 255, 255, 0.85)',
}))

export default (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()

  const local = langHook()

  const { friends, currentFriendIndex, currentFriend } = useAppSelector(
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
    } catch (error) {}
  }

  useEffect(() => {
    if (!currentFriend) dispatch(setCurrentFriendIndex(0))
  }, [friends])

  return (
    <Box
      sx={{
        width: 300,
        height: '100vh',
        pt: 2,
        backgroundColor: '#000',
        boxSizing: 'border-box',
        borderRight: '1px solid rgba(255, 255, 255, 0.12)',
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
        <IconButton color="primary" sx={{ ml: 1 }} onClick={handle}>
          <AddBoxIcon />
        </IconButton>
      </Box>
      {/* list */}
      <Box
        sx={{
          width: '100%',
          height: 'calc(100vh - 136px)',
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
              <AntTab
                key={friend.hash}
                icon={
                  <img style={{ width: '30px' }} src={path(friend.image)} />
                }
                iconPosition="start"
                label={friend.name}
                sx={{
                  pl: 3,
                  justifyContent: 'left',
                }}
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
            color="primary"
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
