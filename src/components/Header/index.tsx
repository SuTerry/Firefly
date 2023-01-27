import React, { useState } from 'react'

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material'

import LanguageIcon from '@mui/icons-material/Language'

import LOCAL from '@constants/local'

import langHook from '@hooks/localHook'
import { headerLang } from '@langs/index'

import { useAppSelector, useAppDispatch } from '@store/index'

import { setLocal } from '@store/modules/local'
import { setDialogOpen } from '@store/modules/wallet'
import { setDialogOpen as registerOpen } from '@store/modules/user'
import { setRoom, setNft } from '@store/modules/dialog'

export default (): JSX.Element => {
  const { headerImg, nickname, isCW, isLogin } = useAppSelector(
    (state) => state.user
  )
  const { currentFriend } = useAppSelector((state) => state.friends)

  const dispatch = useAppDispatch()

  const local = langHook()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleLocal = (lang: LOCAL) => {
    setAnchorEl(null)
    dispatch(setLocal(lang))
  }

  return (
    <Box>
      {/* AppBar */}
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, color: '#fff' }}>
            {isLogin && currentFriend?.name}
          </Box>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              sx={{ color: '#000' }}
              onClick={() => handleLocal(LOCAL.zh_cn)}
            >
              简体中文
            </MenuItem>
            <MenuItem
              sx={{ color: '#000' }}
              onClick={() => handleLocal(LOCAL.en_us)}
            >
              English
            </MenuItem>
          </Menu>
          {isCW ? (
            isLogin ? (
              <>
                <Button
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={() => dispatch(setNft(true))}
                >
                  nft
                </Button>
                <Button
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={() => dispatch(setRoom(true))}
                >
                  room
                </Button>
                <Button
                  color="primary"
                  sx={{ textTransform: 'none' }}
                  startIcon={
                    <img
                      style={{ width: '24px', height: '24px' }}
                      src={`https://ipfs.io/ipfs/${headerImg}`}
                    />
                  }
                  onClick={() => dispatch(registerOpen(true))}
                >
                  {nickname}
                </Button>
              </>
            ) : (
              <></>
            )
          ) : (
            <Button
              color="primary"
              onClick={() => dispatch(setDialogOpen(true))}
            >
              {local(headerLang.wallet)}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
