/**
 * title: TechForm.Item组件
 * description: 可在TechForm与antd Form中使用,也可以自定义子组件
 */

import { TechForm } from '@szhz/tech-pc';
import { Button, Flex, Form, Input } from 'antd';
import React from 'react';

export default () => {
  const [techForm] = Form.useForm();
  const [form] = Form.useForm();

  const handleFormFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Flex justify="space-around" flex={1}>
      <div>
        <h3>在antd中的form使用</h3>
        <Form name="formItem1" form={form} onFinish={handleFormFinish}>
          <TechForm.Item
            name="name"
            label="姓名"
            type="input"
            required
          ></TechForm.Item>

          <TechForm.Item
            name="password"
            label="密码"
            type="password"
            required
          ></TechForm.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form>
      </div>
      <div>
        <h3>在TechForm中使用</h3>
        <TechForm name="formItem2" onFinish={handleFormFinish} form={techForm}>
          <TechForm.Item
            name="name"
            label="姓名"
            type="input"
            required
          ></TechForm.Item>

          <TechForm.Item label="自定义子组件，用于复杂组件">
            <Input></Input>
          </TechForm.Item>

          <TechForm.Item
            name="password"
            label="密码"
            type="password"
            required
          ></TechForm.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </TechForm>
      </div>
    </Flex>
  );
};
