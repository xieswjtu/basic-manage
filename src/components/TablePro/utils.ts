/*
 * @Date: 2023-03-24 09:19:37
 * @Description: 工具方法
 */

import moment from 'moment'
import { stringify, parse } from 'qs'

/** 把对象转为table搜索可以用的参数 */
export function formToUrl(values = {}): string {
  const parameter = formToUrlObj(values)
  return stringify({ tableSearch: parameter })
}

export function formToUrlObj(values = {}) {
  const parameter = Object.keys(values).reduce((obj, key) => {
    if (typeof values[key] === 'boolean') {
      obj[key] = {
        type: 'boolean',
        value: values[key]
      }
    }
    if (typeof values[key] === 'string') {
      obj[key] = {
        type: 'string',
        value: values[key]
      }
    }
    if (typeof values[key] === 'number') {
      obj[key] = {
        type: 'number',
        value: values[key]
      }
    }
    if (Object.prototype.toString.call(values[key]) === '[object Object]') {
      // 如果是moment对象
      // eslint-disable-next-line no-underscore-dangle
      if (values[key]?._isAMomentObject) {
        obj[key] = {
          type: 'moment',
          value: JSON.stringify(values[key])
        }
      } else {
        obj[key] = {
          type: 'object',
          value: JSON.stringify(values[key])
        }
      }
    }
    if (Array.isArray(values[key])) {
      const [v] = values[key]
      // eslint-disable-next-line no-underscore-dangle
      if (v?._isAMomentObject) {
        // 如果是moment时间对象
        obj[key] = {
          type: 'momentArray',
          value: JSON.stringify(values[key])
        }
      } else {
        obj[key] = {
          type: 'array',
          value: JSON.stringify(values[key])
        }
      }
    }
    return obj
  }, {})
  return parameter
}

/** 从地址栏取出table参数 */
export function urlToForm(): Record<string, any> {
  const { tableSearch } = parse(decodeURIComponent(window.location.search.slice(1)))
  // 首次进入页面从url中获取请求参数
  if (!(tableSearch && typeof tableSearch === 'object' && Object.keys(tableSearch).length > 0)) {
    return {}
  }
  const values = Object.keys(tableSearch).reduce((obj, key) => {
    const item = tableSearch[key]
    if (item.type === 'boolean') {
      obj[key] = JSON.parse(item.value)
    }
    if (item.type === 'string') {
      obj[key] = item.value
    }
    if (item.type === 'number') {
      obj[key] = Number(item.value)
    }
    if (item.type === 'array') {
      obj[key] = JSON.parse(item.value)
    }
    if (item.type === 'object') {
      obj[key] = JSON.parse(item.value)
    }
    if (item.type === 'moment') {
      obj[key] = moment(JSON.parse(item.value))
    }
    if (item.type === 'momentArray') {
      obj[key] = JSON.parse(item.value).map((item) => moment(item))
    }
    return obj
  }, {})
  return values
}
