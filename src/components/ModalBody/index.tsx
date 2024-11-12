/*
 * @Date: 2023-05-08 17:32:28
 * @Description: 弹窗组件
 */

import { Fragment, PureComponent, cloneElement } from 'react'
import { Modal, ModalProps } from 'antd'

type Props = ModalProps & {
  /** 触发显示的元素 */
  trigger?: React.ReactElement
  /** 关闭回调 */
  onClose?: () => void
  /** 显示回调 */
  onShow?: () => void
}

export type DrawerBodyProps = Props

export type DrawerBodyType = {
  /** 关闭弹窗 */
  onHide: () => void
}

class Index extends PureComponent<Props> {
  state = {
    visible: false,
  }

  onShow = () => {
    this.setState({ visible: true }, () => {
      this.props.onShow?.()
    })
  }

  onHide = () => {
    this.setState({ visible: false }, () => {
      this.props.onClose?.()
    })
  }

  render() {
    const { visible } = this.state
    const { trigger, children, ...other } = this.props
    return (
      <Fragment>
        {cloneElement(trigger, {
          onClick: () => this.onShow(),
        })}
        <Modal
          open={visible}
          {...other}
          onCancel={this.onHide}
          destroyOnClose
          closable={false}
        >
          {children}
        </Modal>
      </Fragment>
    )
  }
}

export default Index
