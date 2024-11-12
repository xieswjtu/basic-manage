/*
 * @Date: 2022-05-30 09:43:44
 * @Description: 搜索组件
 */

import React, { useMemo, useContext, useState, cloneElement, useEffect, useLayoutEffect } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Form, Row, Col, FormInstance, FormItemProps, Tooltip } from 'antd'
import { Context } from './Context'
import ButtonLoading from '@/components/ButtonLoading'
import Visible from '@/components/Visible'
import Setting from './Setting'
import { NamePath } from 'antd/lib/form/interface'
import { Rule } from 'antd/lib/form'
import styles from './index.module.less'
import { debounce } from 'lodash'

export type SearchItem = {
  label: string
  name: NamePath
  render: (form?: FormInstance) => React.ReactElement
  /** 初始化的值 */
  initialValue?: any
  rules?: Rule[]
  shouldUpdate?: boolean
  /** 是否渲染 */
  visible?: (form: FormInstance) => boolean
} & FormItemProps

type Props = {
  search: SearchItem[]
  clearInitialValue?: boolean
  /** 是否使用展开功能 */
  isExpand?: boolean
  /** 是否展示查询按钮 */
  showButton?: boolean
  /** 搜索框文字 */
  searchText?: string
  onValuesChange?: (changedValues: any, values: any) => void
  /** 默认是否展开 */
  defaultExpand?: boolean
  /** 搜索按钮提示信息 */
  searchTip?: React.ReactNode
  /** 是否展示table大小设置 */
  showTableSize?: boolean
}

const Index = (props: Props) => {
  const {
    search,
    clearInitialValue = false,
    isExpand = true,
    showButton = true,
    searchText = '搜索',
    onValuesChange,
    defaultExpand = false,
    searchTip,
    showTableSize = true,
  } = props
  const context = useContext(Context)
  const { form } = context.value
  const [expand, setExpand] = useState(defaultExpand)
  const [count, setCount] = useState<number>(2)

  useEffect(() => {
    const handleResize = debounce(() => {
      const screenWidth = window.screen.availWidth
      if (screenWidth < 768 && screenWidth >= 576) {
        setCount(1)
      } else if (screenWidth < 992 && screenWidth >= 768) {
        setCount(2)
      } else if (screenWidth < 1200 && screenWidth >= 992) {
        setCount(2)
      } else if (screenWidth < 1600 && screenWidth >= 1200) {
        setCount(3)
      } else if (screenWidth <= 1920 && screenWidth >= 1600) {
        setCount(4)
      }
    }, 30)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const list = useMemo(() => {
    const listTemp = search.map((item) => {
      const { shouldUpdate = false, label, name, initialValue, rules, render, visible, ...other } = item
      if (typeof visible === 'function') {
        return (
          <Form.Item key={1} shouldUpdate noStyle>
            {() => {
              if (!visible(form)) {
                return null
              }
              return (
                <Col
                  key={JSON.stringify(item.name)}
                  sm={{ span: '24' }}
                  md={{ span: '12' }}
                  lg={{ span: '12' }}
                  xl={{ span: '8' }}
                  xxl={{ span: '6' }}
                >
                  {shouldUpdate ? (
                    render(form)
                  ) : (
                    <Form.Item label={label} name={name} initialValue={initialValue} rules={rules} {...other}>
                      {render()}
                    </Form.Item>
                  )}
                </Col>
              )
            }}
          </Form.Item>
        )
      }

      return (
        <Col
          key={JSON.stringify(item.name)}
          sm={{ span: '24' }}
          md={{ span: '12' }}
          lg={{ span: '12' }}
          xl={{ span: '8' }}
          xxl={{ span: '6' }}
        >
          {shouldUpdate ? (
            <Form.Item shouldUpdate={true} noStyle>
              {item.render}
            </Form.Item>
          ) : (
            <Form.Item label={label} name={name} initialValue={initialValue} rules={rules} {...other}>
              {render()}
            </Form.Item>
          )}
        </Col>
      )
    })

    // 处理是否展开逻辑
    if (isExpand) {
      return listTemp.map((item, i) => {
        // eslint-disable-next-line no-nested-ternary
        const display = expand ? 'block' : i < count ? 'block' : 'none'
        return cloneElement(item, { style: { display } })
      })
    }
    return listTemp
  }, [search, isExpand, expand, count])

  const onRefresh = () => {
    return context.value.onRefreshTable({ currentPage: 1 })
  }

  const onReset = () => {
    return new Promise((resolve) => {
      if (clearInitialValue) {
        const values = search.reduce((obj, item: any) => ({ ...obj, [item.name]: undefined }), {})
        form.setFieldsValue(values)
      } else {
        form.resetFields()
      }
      setTimeout(async () => {
        try {
          await context.value.onRefreshTable({ currentPage: 1 })
        } finally {
          resolve(null)
        }
      })
    })
  }

  function getButtonSpan(len) {
    if (count === 4 && len % count === 1) {
      return 18
    }
    if (count === 4 && len % count === 2) {
      return 12
    }
    if (count === 4 && len % count === 3) {
      return 6
    }
    if (count === 3 && len % count === 1) {
      return 16
    }
    if (count === 3 && len % count === 2) {
      return 8
    }
    if (count === 2 && len % count === 1) {
      return 12
    }
    return 24
  }

  // 处理展开逻辑的按钮宽度问题
  const btnSpan = getButtonSpan(!isExpand || expand || list.length < count ? list.length : count)

  useLayoutEffect(() => {
    context.value.calcTableY()
  }, [expand])

  return (
    <div>
      <Form
        form={form}
        labelAlign="left"
        labelCol={{
          sm: { span: 6 },
          md: { span: 8 },
          lg: { span: 6 },
          xl: { span: 8 },
          xxl: { span: 6 },
        }}
        wrapperCol={{
          sm: { span: 18 },
          md: { span: 16 },
          lg: { span: 18 },
          xl: { span: 16 },
          xxl: { span: 18 },
        }}
        onFinish={onRefresh}
        onValuesChange={onValuesChange}
      >
        <Row gutter={24} justify="start" >
          {list}
          {showButton ? (
            <Col span={btnSpan}>
              <div className={styles.settingBar}>
                {showTableSize && <Setting />}
                <ButtonLoading style={{ marginLeft: 24 }} onClick={onReset}>
                  重置
                </ButtonLoading>
                {searchTip ? (
                  <Tooltip title={searchTip}>
                    <ButtonLoading style={{ marginLeft: 24 }} onClick={onRefresh} type="primary">
                      {searchText}
                    </ButtonLoading>
                  </Tooltip>
                ) : (
                  <ButtonLoading style={{ marginLeft: 24 }} onClick={onRefresh} type="primary">
                    {searchText}
                  </ButtonLoading>
                )}
                <Visible visible={btnSpan && list.length > count}>
                  <Visible visible={expand}>
                    <a style={{ lineHeight: '32px', marginLeft: 12 }} onClick={() => setExpand(!expand)}>
                      收起
                      <UpOutlined />
                    </a>
                  </Visible>
                  <Visible visible={!expand}>
                    <a style={{ lineHeight: '32px', marginLeft: 12 }} onClick={() => setExpand(!expand)}>
                      展开
                      <DownOutlined />
                    </a>
                  </Visible>
                </Visible>
              </div>
            </Col>
          ) : null}
        </Row>
        {/* 有助于可以回车搜索 */}
        <button type="submit" style={{ display: 'none' }}></button>
      </Form>
    </div>
  )
}

export default Index
