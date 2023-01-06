import React, { useState, useRef, useEffect } from 'react'

import { Box, Typography } from '@mui/material'

import { useAppSelector, useAppDispatch } from '@store/index'
import { setRemotes, Friends } from '@store/modules/friends'

import { path } from '@utils/ipfs'

import './index.less'

interface TalkReturn {
  self: (text: string) => void
  remote: (text: string) => void
  Talk: () => JSX.Element
}

interface Item {
  type: 'self' | 'remote'
  text: string
}

const listHistory: Record<string, Item[]> = {}

export default ({ account_id, image }: Friends): TalkReturn => {
  if (!listHistory.hasOwnProperty(account_id)) listHistory[account_id] = []

  const { remotes } = useAppSelector((store) => store.friends)
  const { headerImg } = useAppSelector((store) => store.user)

  const dispatch = useAppDispatch()

  const [list, setList] = useState<Item[]>(listHistory[account_id])

  const viewRef = useRef<HTMLDivElement>()

  const self = (text: string): void => {
    const item: Item = { type: 'self', text }
    appendChild(item)
  }

  const remote = (text: string): void => {
    const item: Item = { type: 'remote', text }
    appendChild(item)
  }

  const appendChild = (item: Item) => {
    const _list = [...list]
    _list.push(item)
    listHistory[account_id].push(item)
    setList(_list)
  }

  useEffect(() => {
    if (remotes.length === 0) return
    remotes.forEach((item) => {
      if (!listHistory.hasOwnProperty(item.account_id)) listHistory[item.account_id] = []
      item.account_id === account_id
        ? remote(item.text)
        : listHistory[item.account_id].push({ type: 'remote', text: item.text })
    })

    dispatch(setRemotes([]))
  }, [remotes])

  useEffect(() => {
    viewRef.current?.scrollTo({
      top: viewRef.current.scrollHeight,
    })
  }, [list])

  const Talk = (): JSX.Element => {
    return (
      <Box ref={viewRef} sx={{ flexGrow: 1, overflowY: 'auto', pt: 1 }}>
        {list.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                ml: 1,
                mr: 1,
                mb: 2,
                justifyContent: item.type === 'self' ? 'end' : 'start',
                alignItems: 'center',
              }}
            >
              {item.type === 'remote' && (
                <img className="header_image" src={path(image)} />
              )}
              <Typography
                sx={{
                  maxWidth: '42%',
                  p: 1,
                  mr: item.type === 'self' ? 1 : 0,
                  ml: item.type === 'remote' ? 1 : 0,
                  borderRadius: '6px',
                  backgroundColor: item.type === 'self' ? '#fff' : '#1AAD19',
                }}
              >
                {item.text}
              </Typography>
              {item.type === 'self' && (
                <img className="header_image" src={path(headerImg)} />
              )}
            </Box>
          )
        })}
      </Box>
    )
  }

  return { self, remote, Talk }
}
