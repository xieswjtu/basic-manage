import { Col, Card, Row } from "antd";
import React from "react";
import './home.css'

const Home = () => {
    const userimg = require('../../assets/images/user1.png')
    return (
        <Row className="home">
            <Col span={8}>
              <Card hoverable> 
                <div className="user">
                    <img src={userimg}/>
                    <div className="userInfo">
                        <div>admin</div>
                        <div>超级管理员</div>
                    </div> 
                </div>
                <div className="loginInfo">
                    <p>上次登录时间<span >2022-7-19</span></p>
                    <p>上次登录地点<span >上海</span></p>
                </div>
              </Card>
            </Col>
            <Col span={16}>
            </Col>

        </Row>
    )
}

export default Home