import React, { lazy, Suspense } from 'react'

import { Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

import signaling from '@hooks/signaling'

import { useAppSelector } from '@store/index'

import Header from '@components/Header'

const Sider = lazy(() => import('@components/Sider'))

const Dialog = lazy(() => import('@components/Dialog'))

export default (): JSX.Element => {
  const { isHeader, isSider } = useAppSelector((state) => state.router)

  signaling()

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Suspense>{isSider && <Sider />}</Suspense>
      <Box
        sx={{
          flex: 1,
        }}
      >
        {isHeader && <Header />}
        <Box>
          <Outlet />
        </Box>
      </Box>
      <Suspense>
        <Dialog />
      </Suspense>
    </Box>
  )
}
