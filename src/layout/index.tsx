import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import VHeader from './compontents/Header'

const { Header, Sider, Content } = Layout

function PublicLayout() {
  return (
    <Layout className="layout">
      <Header style={{ position: 'relative', boxSizing: 'border-box', padding: '0px', backgroundColor: '#242f42', height: '60px', lineHeight: '60px' }}>
        <VHeader />
      </Header>
      <Layout>
        <Sider>left sidebar</Sider>
        <Content>
          qweqwe
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default React.memo(PublicLayout)
