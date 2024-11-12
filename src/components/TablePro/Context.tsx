/*
 * @Date: 2022-05-30 10:00:46
 * @Description: context
 */

import { createContext, useState, useImperativeHandle, forwardRef } from 'react'
import type { ReactNode } from 'react'
import type { FormInstance } from 'antd/lib/form'
import { Form } from 'antd'
import { useSelector, dispatch, actions } from '@/core/store'

export type TableProviderType = {
  onRefreshTable?: (values?: Record<string, any>) => any
  form: FormInstance
  /** 参数设置 */
  setting?: Partial<{
    /** 高度 */
    y: number
    /** 大小 */
    size: string
  }>
  calcTableY: () => void
  setSetting?: (values) => void
}

type ContextType = {
  value: TableProviderType
  setValue: any
}

const Context = createContext<ContextType>(null)

type Props = {
  children: ReactNode
}

const TableProvider = forwardRef((props: Props, ref) => {
  const { children } = props
  const { size } = useSelector((state) => state.storage.tableSetting)
  const [form] = Form.useForm()

  const [value, setValue] = useState<TableProviderType>({
    form,
    setting: { size, y: 0 },
    calcTableY: () => {},
    setSetting(nextSetting) {
      setValue((value) => {
        const newSetting = { ...value.setting, ...nextSetting }
        dispatch(actions.storage.setItem({ key: 'tableSetting', value: newSetting }))
        return { ...value, setting: newSetting }
      })
    },
  })

  useImperativeHandle(ref, () => value)

  return <Context.Provider value={{ value, setValue }}>{children}</Context.Provider>
})

export { Context }
export default TableProvider
