import React, { useState } from "react";
import CommonAside from "../components/commonAside";
import CommonHeader from "../components/commonHeader";
import { Outlet } from "react-router-dom";
  import { Layout, Menu } from 'antd';
  
const { Header, Sider, Content } = Layout;


const Main = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{
            height:'100vh'
        }}>
        <CommonAside/>
        <Layout className="site-layout">
            <CommonHeader/>
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

