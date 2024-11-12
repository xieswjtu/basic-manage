/*
 * @Date: 2023-02-07 17:04:59
 * @Description: Button组件封装了自动loading
 */

import { Button, ButtonProps } from 'antd'
import React from 'react'
import { useState } from 'react'

const ButtonLoading = (props: ButtonProps) => {
  const [loading, setLoading] = useState(false)

  const onClick = async (e) => {
    if (loading) {
      return
    }
    setLoading(true)
    try {
        await props?.onClick(e)
    } finally {
      setLoading(false)
    }
  }

  return <Button {...props} onClick={onClick} loading={loading} />
}

export default ButtonLoading
