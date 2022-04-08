import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import request from '@/utils/request'
import './login.css'

function Login() {
  const [logindata, setLogindata] = useState({})
  const onLogin = async () => {
    try {
      let response = await request.post('/v1/api/node/auth/signin', {
        identify_code: 'Sxc6dbdIeNEMnj1nCF6ZaA==',
        login_type: 'ADMIN',
        magic_no: '1b4be3e317826d0c9ca2e8b54bd04710',
        username: '18698729476',
      })
      console.log(response)
      setLogindata(response)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="login-wrap">
      <div className="ms-login">
        <div className="ms-title">后台管理系统</div>
        <Form onFinish={onLogin}>
          <Form.Item label="" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
