import { Modal } from 'antd'
import { Fragment, PureComponent } from 'react'
import { SketchPicker } from 'react-color'
import './index.css'
import React from 'react'

interface SS {
  displayColorPicker: boolean
  color: {
    r: number
    g: number
    b: number
    a?: number
  }
}

export default class ColorPicker extends PureComponent<any, SS> {
  state = {
    displayColorPicker: false,
    color: {
      r: 225,
      g: 225,
      b: 225,
      a: 1,
    },
  }

  handleClick = () => {
    this.setState({
      displayColorPicker: true,
    })
  }

  handleChange = (color) => {
    this.setState({
      color: color.rgb,
    })
  }

  render() {
    return (
      <Fragment>
        <div className="color-picker-container" onClick={this.handleClick}>
          <div
            style={{
              width: '36px',
              height: '14px',
              borderRadius: '2px',
              background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
            }}
          ></div>
        </div>
        <Modal
          open={this.state.displayColorPicker}
          footer={null}
          width={280}
          closeIcon={''}
          onOk={() => this.setState({ displayColorPicker: false })}
          onCancel={() => this.setState({ displayColorPicker: false })}
          centered={true}
          maskClosable={true}
        >
          <SketchPicker color={this.state.color} onChange={this.handleChange} />
        </Modal>
      </Fragment>
    )
  }
}
