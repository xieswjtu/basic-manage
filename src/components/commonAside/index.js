import React, {useState} from "react";
import MenuConfig from '../../config'
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
  const {Sider} = Layout


const CommonAside = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <h3 style={{
                color: "white",
                marginLeft: "20px"
                        
            }}>通用后台管理系统</h3>
            <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
                {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1',
                },
                {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
                },
                {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
                },
            ]}
            />
        </Sider>
    )    
}

export default CommonAside