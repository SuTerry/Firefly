import React, { useEffect, ReactNode } from 'react'

import { useLocation, Navigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '@store/index'

import { findRouterRule } from '@utils/routes'

import { setRouter } from '@store/modules/router'

interface IProps {
  children: ReactNode
}

export default ({ children }: IProps): JSX.Element => {
  const location = useLocation()

  const { name, isConnect } = useAppSelector((state) => state.router)

  const dispatch = useAppDispatch()

  const { initWallet } = useAppSelector((state) => state.wallet)
  const { isCW, isLogin } = useAppSelector((store) => store.user)

  useEffect(() => {
    const routeRule = findRouterRule(location.pathname)
    if (routeRule && name !== routeRule.name) {
      dispatch(setRouter(routeRule))
    }
  }, [location])

  return (
    <>
      {name && initWallet ? (
        isConnect ? (
          isCW ? (
            isLogin || location.pathname === '/login' ? (
              children
            ) : (
              <Navigate to="/login" />
            )
          ) : (
            <Navigate to="/connect" />
          )
        ) : (
          children
        )
      ) : (
        <></>
      )}{' '}
    </>
  )
}
