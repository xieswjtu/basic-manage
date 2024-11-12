/*
 * @Date: 2022-05-30 09:42:01
 * @Description: TablePro
 */

import { PureComponent, ContextType, Fragment } from 'react'
import { Table, Pagination } from 'antd'
import type { TableProps } from 'antd/lib/table/Table'
import { Context } from './Context'
import qs from 'qs'
import { formToUrlObj, urlToForm } from './utils'
import styles from './index.module.less'
import { delNulOp, generateUniqueID } from '@/core/utils'
import { cloneDeep } from 'lodash'
import React from 'react'

export type Result<T> = {
  data: T[]
  paginator: {
    currentPage: number
    orderSegment: number
    pageSize: number
    totalPage: number
    totalRecord: number
  }
}

type Props<T> = TableProps<T> & {
  onService: (values: Record<string, any>) => [Result<T>, any] | Promise<[Result<T>, any]>
  initRefresh?: boolean
  pageSize?: number
  /** 是否展示分页 */
  pagination?: boolean
  /** 是否清除前后空格 */
  trim?: boolean
  /** 是否读取地址栏设置到form表单里面 */
  setUrlToForm?: boolean
  /** 是否限制最大条数 */
  maxTotal?: number
  /** 分页器发生改变时的回调 */
  onPaginationChange?: (currentPage: number, pageSize: number) => void
}

class Index<T extends object> extends PureComponent<Props<T>> {
  static contextType = Context

  static defaultProps = {
    initRefresh: true,
    pagination: true,
    pageSize: 10,
    trim: false,
    setUrlToForm: true,
  }

  declare context: ContextType<typeof Context>

  div: HTMLDivElement

  id = generateUniqueID()

  state = {
    dataSource: [],
    loading: false,
    pageSize: this.props.pageSize,
    currentPage: 1,
    total: 0,
    $sortField: null,
    $sortOrder: null,
  }

  async componentDidMount() {
    this.calcY()
    if (this?.context?.setValue) {
      this.context.setValue((value) => ({ ...value, onRefreshTable: this.onRefreshTable, calcTableY: this.calcY }))
    }
    if (this.props.setUrlToForm) {
      await this.setUrlToForm()
    }
    if (this.props.initRefresh) {
      // search Form 中有条件渲染时，需要等 Form 渲染结束 form.validate() 才能拿到最终值
      setTimeout(() => {
        this.onRefreshTable()
      }, 200)
    }
  }

  componentDidUpdate(prevProps: Readonly<Props<T>>): void {
    if (prevProps.scroll?.y !== this.props.scroll?.y) {
      this.calcY()
    }
  }

  /** 计算Y高度 */
  calcY = () => {
    if (!this.props?.scroll?.y || this.props?.scroll?.y === 'auto') {
      const { div } = this
      const innerHeight = window.innerHeight
      // 136 为表格的头部和底部分页的高度
      this.context.value.setSetting({
        y: innerHeight - div.getBoundingClientRect().top - 150,
      })
    } else {
      this.context.value.setSetting({
        y: this.props?.scroll?.y,
      })
    }
  }

  // 地址栏参数赋值到form表单
  setUrlToForm = async () => {
    // 首次进入页面从url中获取请求参数
    const { currentPage, pageSize, ...values } = urlToForm()
    const pageValues: { currentPage?: number; pageSize?: number } = {}
    if (currentPage) {
      pageValues.currentPage = currentPage
    }
    if (pageSize) {
      pageValues.pageSize = pageSize
    }
    if (currentPage || pageSize) {
      this.setState(pageValues)
    }
    await this.context.value.form.setFieldsValue(values)
  }

  // 表单参数赋值到地址栏
  setFormToUrl = (values) => {
    // 地址栏有的
    const defaultSearch = qs.parse(window.location.search.slice(1))
    // 合并新的
    const newSearch = qs.stringify({ ...defaultSearch, tableSearch: formToUrlObj(values) })
    // 地址栏替换
    $.history.replace(`${window.location.origin}${window.location.pathname}?${newSearch}`)
  }

  trimData = (values = {}) => {
    if (values === null) {
      return values
    }
    if (typeof values !== 'object') {
      return values
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        const item = values[key]
        if (typeof item === 'string') {
          values[key] = item.trim()
        }
      }
    }
    return values
  }

  onRefreshTable = async (values = {} as any) => {
    if (this.state.loading) {
      return
    }
    this.setState({ loading: true })
    const { trim } = this.props
    try {
      const { form } = this.context.value
      const searchValues = await form.validateFields()
      const currentPage = values.currentPage || this.state.currentPage
      const pageSize = values.pageSize || this.state.pageSize
      const { $sortField, $sortOrder, ...rest } = values
      const sortField = $sortField || this.state.$sortField
      const sortOrder = $sortOrder || this.state.$sortOrder
      if (this.props.setUrlToForm) {
        this.setFormToUrl({
          ...searchValues,
          currentPage,
          pageSize,
        })
      }
      const parameter = {
        currentPage,
        pageSize,
        ...searchValues,
        ...rest,
        ...delNulOp({ $sortField: sortField && sortOrder ? sortField : null, $sortOrder: sortField && sortOrder ? sortOrder : null }),
      }
      const [data] = await this.props.onService(trim ? this.trimData(cloneDeep(parameter)) : cloneDeep(parameter))
      this.setState({
        dataSource: data?.data,
        pageSize: data.paginator?.pageSize || pageSize,
        currentPage: data.paginator?.currentPage || currentPage,
        total: data.paginator?.totalRecord,
        $sortField: parameter.$sortField,
        $sortOrder: parameter.$sortOrder,
      })
    } finally {
      this.setState({ loading: false })
    }
  }

  /** 切换分页操作 */
  onChange = async (currentPage, pageSize) => {
    this.props.onPaginationChange?.(currentPage, pageSize)
    await this.onRefreshTable({ currentPage, pageSize })
    // 换页滚动到顶部
    const tableBody = document.querySelector(`#${this.id} .ant-table-body`)
    if (tableBody) {
      tableBody.scrollTo({ top: 0 })
    }
  }

  /** 表格排序操作等 */
  onChangeTable = (pagination, filters, sorter) => {
    this.onRefreshTable({ $sortField: sorter.field, $sortOrder: sorter.order?.slice(0, sorter.order.length - 3) })
  }

  render() {
    const { columns, pagination, scroll = {}, ...tableProps } = this.props
    const { dataSource, loading, currentPage, pageSize, total } = this.state
    const { setting } = this.context.value

    return (
      <div
        className={styles.body}
        id={this.id}
        ref={(div) => {
          this.div = div
        }}
      >
        <Table<T>
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey="id"
          onChange={this.onChangeTable}
          pagination={false}
          size={setting.size as any}
          {...tableProps}
          scroll={{ x: scroll.x, y: setting.y || undefined }}
        />
        <div className={styles.pagination}>
          {pagination ? (
            <Fragment>
              {this.props.maxTotal && total > this.props.maxTotal ? (
                <div style={{ marginRight: 24, color: '#555' }}>总共 {this.props.maxTotal}+ 条数据</div>
              ) : (
                <div style={{ marginRight: 24, color: '#555' }}>总共 {total} 条数据</div>
              )}
              <Pagination current={currentPage} pageSize={pageSize} total={total} onChange={this.onChange} showQuickJumper showSizeChanger/>
            </Fragment>
          ) : null}
        </div>
      </div>
    )
  }
}

export default Index
