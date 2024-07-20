import React from "react";
import { Layout, Button, Avatar, Dropdown, Menu } from "antd";
import { MenuFoldOutlined } from '@ant-design/icons'

const { Header} = Layout


const CommonHeader = () => {
    //登出
    const logout = () => {

    }
    const dropDownItem = 
    <Menu
    items = {[
                {
                    key: '1',
                    label: (
                        <a target="_blank" rel='noopener noreferrer'>
                            个人中心
                        </a>
                    )
                },
                {
                    key: '2',
                    label: (
                        <a onclick={() => logout} target="_blank" rel='noopener noreferrer'>
                            退出
                        </a>
                    )
                }
            ]}
    />
    return(
        <Header style = {{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Button
              type="text"
              icon={<MenuFoldOutlined/>}
              style={{
                fontsize: '16px',
                width: 64,
                height: 32,
                backgroundColor: 'white'
              }}
            />
            <Dropdown
            overlay={dropDownItem}
            >
              <Avatar size={36} src = {<img src = {require("../../assets/images/user1.png")}/>} />   
            </Dropdown>        
        </Header>
    )
}

export default CommonHeader