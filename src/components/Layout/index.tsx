import React, { lazy, Suspense } from 'react'

import { Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

import Header from '@components/Header'

import { useAppSelector } from '@store/index'

const Sider = lazy(() => import('@components/Sider'))

export default (): JSX.Element => {
  const { isHeader, isSider } = useAppSelector((state) => state.router)

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
    </Box>
  )
}
