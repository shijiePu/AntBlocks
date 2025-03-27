import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { firstUpdatePassword } from "@szhz/tech-pc/service/register";
import { Button, Form, Input, message, Modal } from "antd";
import { debounce } from "lodash-es";
import React, { useState } from 'react';

// 密码 (包含数字、字母大小写，特殊字符至少三种)
export const regPassword = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{12,32}$/

const UpdateFirstPassword = ({ accountName, logOut }: any) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)


  const submitUpdatePsd = debounce(async () => {
    await form.validateFields()
    const formValue = form.getFieldsValue()

    setLoading(true)
    const res = await firstUpdatePassword({
      newPassword: formValue?.newPassword
    }).finally(() => setLoading(false))

    if (res) {
      Modal.destroyAll()
      message.success('修改成功');
      logOut && logOut();
    }
  }, 300)

  return <Modal
    open={true}
    title={"修改密码"}
    closable={false}
    keyboard={false}
    footer={<Button type="primary" loading={loading} onClick={submitUpdatePsd}>提交</Button>}
  >
    <ExclamationCircleTwoTone />&nbsp;<span>您正在设置江苏省科技政务平台的登录密码，设置成功后，可在平台登录页面输入账号名（手机号）和设置密码即可完成登录。</span>
    <p></p>
    <Form form={form} colon={false} labelAlign="right" labelCol={{ span: 5 }}>
      <Form.Item
        name="accountName"
        label="账号名"
      >
        {accountName}
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="新密码"
        rules={[
          {
            required: true,
            pattern: regPassword,
            message: '必须包含大、小写字母、数字或特殊字符3种或以上，12-32位'
          }
        ]}
      >
        <Input.Password placeholder="请输入新密码" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="确认密码"
        dependencies={['newPassword']}
        rules={[
          { required: true, message: '请再次输入新密码！' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码不一致！'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="请再次输入新密码" />
      </Form.Item>
    </Form>
  </Modal>
}

export default UpdateFirstPassword
