import { lazy, Suspense } from 'react'
import LayoutPage from '@/layout'
const SystemApiControl = lazy(() => import('@/views/Admin/Auth/SystemApiControl'))

const load = (children: JSX.Element) => {
  return <Suspense fallback="">{children}</Suspense>
}

const admin = [
  {
    path: '/admin',
    element: <LayoutPage />,
    children: [
      {
        path: 'auth/SystemApiControl',
        element: load(<SystemApiControl />),
        meta: {
          title: '系统菜单维护',
        },
      },
    ],
  },
]

export default admin
