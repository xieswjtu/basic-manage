import React, { useState } from "react";
import CommonAside from "../components/commonAside";
import CommonHeader from "../components/commonHeader/index.tsx";
import { Outlet } from "react-router-dom";
  import { Layout, Menu } from 'antd';
import { useSelector } from "react-redux";
  
const { Header, Sider, Content } = Layout;


const Main = () => {
    //获取展开收起状态
    const collapsed = useSelector(state => state.tab.isCollapse)

    return (
        <>
        <Layout style={{
            height:'100vh'
        }}>
            <CommonAside collapsed={collapsed}/>
            <Layout className="site-layout">
                <CommonHeader collapsed={collapsed}/>
                <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                }}
                >
                  <Outlet/>
                </Content>
            </Layout>
        </Layout>
        </>
    );
    }

export default Main

