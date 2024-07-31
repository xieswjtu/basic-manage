import React, {useState} from "react";
import MenuConfig from '../../config'
import * as Icon from '@ant-design/icons';
import { Menu, Layout } from 'antd';

const {Sider} = Layout

//动态获取icon
const iconToElement = (name) => React.createElement(Icon[name])

//处理菜单数据
const siderItem = MenuConfig.map(item => {
    //无子菜单
    const child = {
        key: item.path,
        icon: iconToElement(item.icon), 
        label: item.label 
    }
    //有子菜单
    if (item.children) {
        child.children = item.children.map(el => {
            return {
                key: el.path,
                label: el.label
            }
        })
    }
    return child
})



const CommonAside = ({collapsed}) => {
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <h3 style={{
                color: "white",
                marginLeft: "30px"
                        
            }}>{!collapsed?'通用后台管理系统':'后台'}</h3>
            <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={siderItem}
            inlineCollapsed={collapsed}
            />
        </Sider>
    )    
}

export default CommonAside