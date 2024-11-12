/*
 * @Date: 2023-03-20 13:48:15
 * @Description: 表格设置
 */

import { useContext } from 'react'
import { Popover, Row, Col, InputNumber, Radio, Tooltip } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { Context } from './Context'
import React from 'react'

const sizeOptions = [
  { label: '大', value: 'large' },
  { label: '中', value: 'middle' },
  { label: '小', value: 'small' },
]

const Index = () => {
  const context = useContext(Context)
  const { setting, setSetting } = context.value

  const content = (
    <div>
      <Row style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }} gutter={12}>
        <Col>高度:</Col>
        <Col>
          <Tooltip title="0为不设置高度">
            <InputNumber
              min={0}
              value={setting?.y}
              precision={0}
              placeholder="请输入高度"
              style={{ width: 136 }}
              onChange={(v) => {
                setSetting?({ y: v })
              }}
            />
          </Tooltip>
        </Col>
      </Row>
      <Row style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }} gutter={12}>
        <Col>大小:</Col>
        <Col>
          <Radio.Group
            options={sizeOptions}
            optionType="button"
            value={setting?.size}
            onChange={(e) => setSetting?({ size: e.target.value })}
          />
        </Col>
      </Row>
    </div>
  )

  return (
    <Popover content={content} title="表格设置" placement="bottom">
      <span style={{ cursor: 'pointer', color: '#999' }}><SettingOutlined /> 设置表格</span>
    </Popover>
  )
}

export default Index
