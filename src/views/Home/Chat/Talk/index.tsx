import React, { useState } from 'react'

import { Box, Typography } from '@mui/material'

interface TalkReturn {
  self: (text: string) => void
  remote: (text: string) => void
  Talk: () => JSX.Element
}

interface Item {
  type: 'self' | 'remote'
  text: string
}

export default (): TalkReturn => {
  const [list, setList] = useState<Item[]>([])

  const self = (text: string): void => {
    const _list = [...list]
    _list.push({
      type: 'self',
      text,
    })
    setList(_list)
  }

  const remote = (text: string): void => {
    const _list = [...list]
    _list.push({
      type: 'remote',
      text,
    })
    setList(_list)
  }

  const Talk = (): JSX.Element => {
    return (
      <Box sx={{ flexGrow: 1, overflowY: 'auto', pt: 1 }}>
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
              <Typography sx={{
                p: 1,
                backgroundColor: item.type === 'self' ? '#fff' : '#1AAD19'
              }}>{item.text}</Typography>
            </Box>
          )
        })}
      </Box>
    )
  }

  return { self, remote, Talk }
}
