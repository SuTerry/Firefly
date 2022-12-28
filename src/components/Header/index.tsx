import React, { useState, lazy, Suspense } from 'react'

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

const WallteDialog = lazy(() => import('@components/WallteDialog'))
const RegisterDialog = lazy(() => import('../RegisterDialog'))

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
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>{currentFriend?.name}</Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
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
            <MenuItem onClick={() => handleLocal(LOCAL.zh_cn)}>
              简体中文
            </MenuItem>
            <MenuItem onClick={() => handleLocal(LOCAL.en_us)}>
              English
            </MenuItem>
          </Menu>
          {isCW ? (
            isLogin ? (
              <Button
                color="inherit"
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
            ) : (
              <></>
            )
          ) : (
            <Button
              color="inherit"
              onClick={() => dispatch(setDialogOpen(true))}
            >
              {local(headerLang.wallet)}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Suspense>{isCW ? <RegisterDialog /> : <WallteDialog />}</Suspense>
    </Box>
  )
}
