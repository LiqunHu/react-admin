import './style.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Menu, Dropdown } from 'antd'
import { Link, useLocation, useMatch } from 'react-router-dom'
import { AppState } from '@/store'

function Tags() {
  const tagsList = useSelector((state: AppState) => state.dashboard.tagsList)
  const location = useLocation()
  const match = useMatch(location.pathname)

  const clickItem = (item: any) => {
    console.log(`Click on item ${item}`)
  }

  const menu = (
    <Menu onClick={clickItem}>
      <Menu.Item key="other">关闭其他</Menu.Item>
      <Menu.Item key="all">关闭所有</Menu.Item>
    </Menu>
  )

  const genTags = () => {
    return tagsList.map((item) => (
      <li className="tags-li">
        <Link to={item.path} className="tags-li-title">
          {item.title}
        </Link>
        <span className="tags-li-icon">
          <i className="fa-solid fa-xmark"></i>
        </span>
      </li>
    ))
  }

  useEffect(() => {
    // let match = useMatch(location.pathname)
    console.log(location)
    console.log(match)
  }, [location])

  return (
    <div className="tags">
      <div className="tags-body">
        <ul>{genTags()}</ul>
        <div className="tags-close-box">
          <Dropdown overlay={menu}>
            <Button size="small" type="primary">
              标签选项
              <i className="m-l-5 fa-solid fa-angle-down"></i>
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
export default Tags
