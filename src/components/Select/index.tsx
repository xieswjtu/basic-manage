/*
 * @Date: 2022-10-10 09:44:00
 * @Description: 下拉组件，内置搜索和清除
 */

import { PureComponent } from 'react'
import { Select } from 'antd'
import type { SelectProps } from 'antd/es/select'
import debounce from 'lodash/debounce'
import React from 'react'

type Props = Omit<SelectProps, 'children'> & {
  onService?: (values?: string) => Promise<SelectProps['options']>
  trigger?: ['focus'?, 'mount'?]
  /** 搜索的时候是否触发接口请求 */
  searchService?: boolean
  children?: (options) => React.ReactNode
  /** 固定有的选项，用于部分场景接口回显数据的问题 */
  fixedOptions?: SelectProps['options']
  onSearch?: (value: string) => void
}

class SelectPro extends PureComponent<Props> {
  static defaultProps = {
    trigger: ['mount'],
    searchService: false,
    fixedOptions: [],
  }

  static Option = Select.Option

  state = {
    options: [],
  }

  componentDidMount(): void {
    if (this.props?.trigger?.includes('mount')) {
      this.onService()
    }
  }

  onFocus = () => {
    if (this.props?.trigger?.includes('focus')) {
      this.onService()
    }
  }

  onService = (value?) => {
    const { onService, options } = this.props
    if (onService && !options) {
      onService(value).then((options) => {
        this.setState({ options })
      })
    }
  }

  onSearch = debounce((value) => {
    const { searchService, onSearch } = this.props
    if (searchService) {
      this.onService(value)
    }
    onSearch?.(value)
  }, 300)

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { options: propsOptions, onService, searchService, fieldNames, children, fixedOptions, showSearch = true, ...other } = this.props
    const options = propsOptions || this.state.options
    const valueName = fieldNames?.value || 'value'
    return (
      <Select
        showSearch={showSearch}
        allowClear
        onSearch={showSearch ? this.onSearch : null}
        onFocus={this.onFocus}
        placeholder="请选择"
        options={children ? undefined : fixedOptions?.concat(options)?.filter((item, i, arr) => arr.findIndex((r) => r[valueName] === item[valueName]) === i)}
        optionFilterProp={fieldNames?.label ? fieldNames?.label : 'label'}
        fieldNames={fieldNames}
        // eslint-disable-next-line react/no-children-prop
        children={children ? children(options) : undefined}
        {...other}
      />
    )
  }
}

export default SelectPro
