import { Button, Space } from 'antd'
import ButtonLoading from '../ButtonLoading/index.tsx'
import React from 'react'

type Props = {
  showOkBtn?: boolean
  showCancelBtn?: boolean
  okBtnText?: string
  onOk?: () => Promise<any>
  onCancel?: (e: React.MouseEvent) => void
}

const Footer = (props: Props) => {
  const { onCancel, onOk, showOkBtn = true, showCancelBtn = true, okBtnText = '确定' } = props

  return (
    <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {showCancelBtn && <Button onClick={onCancel}>取消</Button>}
      {showOkBtn && (
        <ButtonLoading className="mx-3" type="primary" onClick={onOk}>
          {okBtnText}
        </ButtonLoading>
      )}
    </Space>
  )
}

export default Footer
