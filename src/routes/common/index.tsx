import React, { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import { lazyLoad } from '@utils/routes'

const Home = lazy(() => import('@views/Home/index'))
const Connect = lazy(() => import('@views/Connect/index'))
const Login = lazy(() => import('@views/Login/index'))

export const routeMap = {
  '/': {
    name: '/',
    isConnect: true,
    isHeader: true,
    isSider: true,
  },
  '/connect': {
    name: '/connect',
    isConnect: false,
    isHeader: true,
    isSider: false,
  },
  '/login': {
    name: '/login',
    isConnect: true,
    isHeader: true,
    isSider: false,
  },
}

export const routes: RouteObject[] = [
  {
    index: true,
    element: lazyLoad(<Home />),
  },
  {
    path: '/connect',
    element: lazyLoad(<Connect />),
  },
  {
    path: '/login',
    element: lazyLoad(<Login />),
  },
]