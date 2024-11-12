/*
 * @Date: 2023-01-28 14:18:13
 * @Description: 抽屉组件
 */

import { Fragment, PureComponent, cloneElement } from 'react'
import { Drawer, DrawerProps } from 'antd'
import React from 'react'

type Props = DrawerProps & {
  /** 触发显示的元素 */
  trigger?: React.ReactElement
  /** 关闭回调 */
  onClose?: () => void
  /** 显示回调 */
  onShow?: () => void
  /** 判断显示的条件 */
  showTest?: () => boolean
}

export type DrawerBodyProps = Props

export type DrawerBodyType = {
  /** 关闭弹窗 */
  onHide: () => void
  onShow: () => void
}

class Index extends PureComponent<Props> {
  static defaultProps = {
    showTest: () => true,
  }

  state = {
    visible: false,
  }

  onShow = () => {
    if (!this.props.showTest()) {
      return
    }
    this.setState({ visible: true }, () => {
      this.props.onShow?.()
    })
  }

  onHide = () => {
    this.setState({ visible: false }, () => {
      this.props.onClose?.()
    })
  }

  //1.封装触发元素，写在trigger属性上，自动绑上onclick显示抽屉的逻辑 
  //2.封装showText属性，可以对抽屉进行权限控制，写入函数在一定条件下才能点击触发抽屉打开
  render() {
    const { visible } = this.state
    const { trigger, children, ...other } = this.props
    return (
      <Fragment>
        {cloneElement(trigger, {
          onClick: () => this.onShow(),
        })}
        <Drawer
          open={visible}
          {...other}
          onClose={this.onHide}
          destroyOnClose
        >
          {children}
        </Drawer>
      </Fragment>
    )
  }
}

export default Index
