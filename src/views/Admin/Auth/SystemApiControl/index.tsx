import './style.css'
import _ from 'lodash'
import { useState, useEffect } from 'react'
import { Button, Tree, Modal, Form, Input, Table } from 'antd'
import request from '@/utils/request'
import common from '@/utils/common'
import icons from '@/assets/icon.json'

function SystemApiControl() {
  const apiUrl = '/v1/api/node/admin/auth/SystemApiControl/'
  const [pagePara, setPagePara] = useState()
  const [treeData, setTreeData] = useState([])
  const [folderModalV, setFolderModalV] = useState(false)
  const [iconModalV, setIconModalV] = useState(false)
  const [folderForm] = Form.useForm()
  const [action, setAction] = useState('')
  const [actNode, setActNode] = useState(Object.create(null))

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

  const iconColumns = [
    {
      title: '图标',
      dataIndex: 'iconSource',
      key: 'iconImg',
      render: (classStr: string | undefined) => <i className={classStr}></i>,
    },
    {
      title: '图标代码',
      dataIndex: 'iconSource',
      key: 'iconStr',
    },
  ]

  const handleCheckChange = (selectedKeys: any, e: any) => {
    setActNode({
      systemmenu_id: e.node.systemmenu_id,
      systemmenu_name: e.node.systemmenu_name,
      systemmenu_icon: e.node.systemmenu_icon,
      node_type: e.node.node_type,
    })
  }

  const addFolderModal = () => {
    folderForm.resetFields()
    setAction('add')
    if (_.isEmpty(actNode)) {
      return common.warning('请选择一个目录')
    } else {
      if (actNode.node_type === '01') {
        return common.warning('菜单下不允许新增内容')
      }
      setFolderModalV(true)
    }
  }

  const submitFolder = async () => {
    try {
      const fieldsValue = await folderForm.validateFields()
      console.log(3333)
      if (action === 'add') {
        fieldsValue.parent_id = actNode.systemmenu_id
        await request.post(apiUrl + 'addFolder', fieldsValue)
        common.success('增加目录成功')
      }
      await getTreeData()
      setFolderModalV(false)
    } catch (error) {
      common.fault(error)
    }
    // if (!folderFormRef.value) return
    // const valid = await folderFormRef.value.validate()
    // if (valid) {
    //   try {
    //     if (action.value === 'add') {
    //       workPara.value.parent_id = actNode.value.systemmenu_id
    //       await request.post(apiUrl + 'addFolder', workPara.value)
    //       common.success('增加目录成功')
    //     } else if (action.value === 'modify') {
    //       await request.post(apiUrl + 'modifyFolder', workPara.value)
    //       common.success('增加目录成功')
    //     }

    //     await getTreeData()
    //     modal.folderModal = false
    //   } catch (error) {
    //     common.fault(error)
    //   }
    // }
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
        {treeData.length > 0 ? (
          <Tree
            showIcon
            defaultExpandAll
            icon={(nodeData: any) => (nodeData.node_type === '00' ? <i className="fa-regular fa-folder m-r-5"></i> : null)}
            treeData={treeData}
            fieldNames={{ title: 'name', key: 'systemmenu_id' }}
            titleRender={renderTreeNode}
            onSelect={handleCheckChange}
          />
        ) : null}
      </div>
      <Modal title="目录" centered visible={folderModalV} onCancel={() => setFolderModalV(false)} onOk={submitFolder} width={500}>
        <Form form={folderForm} name="folderForm" labelCol={{ span: 4 }}>
          <Form.Item label="目录名称" name="systemmenu_name" rules={[{ required: true, message: '缺少名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="图标" name="systemmenu_icon" rules={[{ required: true, message: '缺少图标' }]}>
            <Input.Search
              onSearch={() => {
                setIconModalV(true)
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="图标选择" centered visible={iconModalV} onCancel={() => setIconModalV(false)} width={420} footer={null}>
        <Table
          size="small"
          pagination={{ defaultPageSize: 8 }}
          columns={iconColumns}
          dataSource={icons}
          rowKey="id"
          onRow={(record) => {
            return {
              onClick: (event) => {
                folderForm.setFieldsValue({
                  systemmenu_icon: record.iconSource,
                })
                setIconModalV(false)
              }, // 点击行
            }
          }}
        />
      </Modal>
    </div>
  )
}

export default SystemApiControl
