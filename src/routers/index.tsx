// import React from 'react'
import { Component, lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { Spin } from 'antd'
import Home from '@/views/Home'
// import Login from '@/views/Login'
// import Board from '@/views/Board'
import Nomatch from '@/views/Nomatch'
const Login = lazy(() => import('@/views/Login'))

const load = (children: any) => {
  return <Suspense fallback={<Spin tip="Loading..." />}>{children}</Suspense>
}

const routeList = [
  {
    path: '/',
    key: 'home',
    element: <Home />,
  },
  {
    path: '/login',
    key: 'login',
    element: load(<Login />),
    meta: {
      title: '登陆页',
    },
  },
  {
    path: '*',
    element: <Nomatch />,
    meta: {
      title: '404',
    },
  },
]

const RenderRouter = () => {
  const element = useRoutes(routeList)
  return element
}

export const routers = routeList
export default RenderRouter
