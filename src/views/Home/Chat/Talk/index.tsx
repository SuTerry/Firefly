import React, { useState, useRef, useEffect } from 'react'

import { Box, Typography } from '@mui/material'

interface TalkProps {
  account_id: string
}
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

export default ({ account_id }: TalkProps): TalkReturn => {
  if (!listHistory.hasOwnProperty(account_id)) listHistory[account_id] = []

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
              }}
            >
              <Typography
                sx={{
                  p: 1,
                  backgroundColor: item.type === 'self' ? '#fff' : '#1AAD19',
                }}
              >
                {item.text}
              </Typography>
            </Box>
          )
        })}
      </Box>
    )
  }

  return { self, remote, Talk }
}
