import './style.css'
import _ from 'lodash'
import { useState, useEffect } from 'react'
import { Button, Tree, Modal, Form, Input } from 'antd'
import request from '@/utils/request'
import common from '@/utils/common'

function SystemApiControl() {
  const apiUrl = '/v1/api/node/admin/auth/SystemApiControl/'
  const [pagePara, setPagePara] = useState()
  const [treeData, setTreeData] = useState([])
  const [workPara, setWorkPara] = useState({})
  const [folderModalV, setFolderModalV] = useState(false)
  const [folderForm] = Form.useForm()
  let action = ''
  let actNode = Object.create(null)

  const initPage = async () => {
    try {
      let response = await request.post(apiUrl + 'init', {})
      setPagePara(response.data.info)
      await getTreeData()
    } catch (error) {
      common.fault(error)
    }
  }

  const getTreeData = async () => {
    let response = await request.post(apiUrl + 'search', {})
    setTreeData(response.data.info)
  }

  const renderTreeNode = (nodeData: any) => {
    if (nodeData.systemmenu_id != 0) {
      return (
        <span className="tree-node">
          <span> {nodeData.name}</span>
          <span>
            <Button size="small" shape="circle" style={{ position: 'absolute', left: '500px' }}>
              <i className="fa-solid fa-xmark"></i>
            </Button>
          </span>
        </span>
      )
    } else {
      return (
        <span className="tree-node">
          <span> {nodeData.name}</span>
        </span>
      )
    }
  }

  const handleCheckChange = (selectedKeys: any, e: any) => {
    actNode.systemmenu_id = e.node.systemmenu_id
    actNode.systemmenu_name = e.node.systemmenu_name
    actNode.systemmenu_icon = e.node.systemmenu_icon
    actNode.node_type = e.node.node_type
    console.log(actNode)
  }

  const addFolderModal = () => {
    setWorkPara({})
    action = 'add'
    if (_.isEmpty(actNode)) {
      return common.warning('请选择一个目录')
    } else {
      if (actNode.node_type === '01') {
        return common.warning('菜单下不允许新增内容')
      }
      setFolderModalV(true)
    }
  }

  useEffect(() => {
    initPage()
  }, [])

  return (
    <div>
      <div className="panel-toolbar">
        <Button type="primary" className="m-r-5" onClick={addFolderModal}>
          增加目录
        </Button>
        <Button type="primary" className="m-r-5">
          增加菜单
        </Button>
        <Button type="primary">编辑</Button>
      </div>
      <div className="panel-body">
        <Tree
          showIcon
          icon={(nodeData: any) => (nodeData.node_type === '00' ? <i className="fa-regular fa-folder m-r-5"></i> : null)}
          treeData={treeData}
          fieldNames={{ title: 'name', key: 'systemmenu_id' }}
          titleRender={renderTreeNode}
          onSelect={handleCheckChange}
        />
      </div>
      <Modal title="目录" centered visible={folderModalV} onCancel={() => setFolderModalV(false)} width={500}>
        <Form name="folderForm" labelCol={{ span: 4 }}>
          <Form.Item label="目录名称" name="systemmenu_name" rules={[{ required: true, message: '缺少名称' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label="图标" name="systemmenu_icon" rules={[{ required: true, message: '缺少图标' }]}>
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default SystemApiControl
