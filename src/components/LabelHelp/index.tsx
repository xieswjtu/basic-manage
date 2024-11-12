/*
 * @Date: 2022-05-31 14:43:10
 * @Description: 标签帮助组件
 */

import { ReactNode } from 'react'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import React from 'react'

type Props = {
  children: ReactNode
  title: ReactNode
}

const LabelHelp = (props: Props) => {
  return (
    <div>
      <span style={{ marginRight: 2 }}>{props.children}</span>
      <Tooltip title={props.title}>
        <QuestionCircleOutlined />
      </Tooltip>
    </div>
  )
}

export default LabelHelp
