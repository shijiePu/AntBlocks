import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance } from "antd";
import React, { useEffect, useState } from "react";
import "./index.less";

export interface ConfirmAccountProps {
  onConfirm: (state: string | undefined) => void;
  name: string[]
  form: FormInstance
}

const ConfirmAccount: React.FC<ConfirmAccountProps> = ({ onConfirm, name, form }) => {
  // 状态：未确认：undefined  确实是本人账号：yes  确定不是本人账号：no
  const [state, setState] = useState<string | undefined>()
  const confirm = Form.useWatch(name, form)

  useEffect(() => {
    if (confirm) {
      setState(confirm)
    }
  }, [confirm])

  const handleConfirm = (s: string) => {
    setState(s)
    onConfirm(s)
  }

  const handleCancel = () => {
    setState(undefined)
    onConfirm(undefined)
  }

  return state ? (
    state === 'yes' ? <div className={'flex'}>
      <a onClick={handleCancel}>取消确认</a>
      <div className={'littleFlex'}>
        <CheckCircleOutlined style={{ color: '#52c41a' }} />
        已确认
      </div>
    </div> : <div className={'flex'}>
      <a onClick={handleCancel}>取消</a>
      <div className={'littleFlex'}>
        <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
        不是我的账号
      </div>
    </div>
  ) : <div className={'flex'}>
    <a onClick={() => handleConfirm('no')}>不是我的账号</a>
    <Button size="small" type="primary" onClick={() => handleConfirm('yes')}>确认</Button>
  </div>
}

export default ConfirmAccount
