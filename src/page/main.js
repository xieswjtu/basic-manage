import React, { useState } from "react";
import CommonAside from "../components/commonAside";
import { Outlet } from "react-router-dom";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  
const { Header, Sider, Content } = Layout;


const Main = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
        <CommonAside/>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
            })}
            </Header>
            <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
            >
            Content
            </Content>
        </Layout>
        </Layout>
    );
    }

export default Main