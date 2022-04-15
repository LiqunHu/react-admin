// import React from 'react'
import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
// import { Spin } from 'antd'
import Home from '@/views/Home'
// import Login from '@/views/Login'
// import Board from '@/views/Board'
import Nomatch from '@/views/Nomatch'
import dashboard from './dashboard'
const Login = lazy(() => import('@/views/Login'))

const load = (children: JSX.Element) => {
  return <Suspense fallback="">{children}</Suspense>
}

const routeList = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: load(<Login />),
    meta: {
      title: '登陆页',
    },
  },
  ...dashboard,
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
