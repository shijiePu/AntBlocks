/**
 * title: 在form中的基本使用
 */
import { TechForm, TechFormItems } from '@szhz/tech-pc';
import { Button, Form, Space, Typography } from 'antd';
import React from 'react';
import { MockTree } from './constant';

export default () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = React.useState<any>({});

  const formItems: TechFormItems[] = [
    {
      type: 'TechCascader',
      label: '级联选择',
      name: 'cascader',
      fieldProps: {
        options: MockTree,
      },
    },
    {
      type: 'TechCascader',
      label: '级联多选选择',
      name: 'multiplyCascader',
      fieldProps: {
        multiple: true,
        options: MockTree,
      },
    },
  ];

  const handleFinish = (values: any) => {
    console.log('Success:', values);
    setFormData(values);
  };

  const setDefaultData = () => {
    const data = {
      cascader: 'rootValue/child1Value/grandchild1Value/greatgrandchild1Value',
      multiplyCascader: 'rootValue/child1Value/grandchild1Value',
    };

    form.setFieldsValue(data);

    setFormData(data);
  };

  const setArrData = () => {
    const data = {
      cascader: [
        'rootValue',
        'child1Value',
        'grandchild1Value',
        'greatgrandchild1Value',
      ],
      multiplyCascader: ['rootValue', 'child1Value', 'grandchild1Value'],
    };

    form.setFieldsValue(data);
  };

  return (
    <>
      <TechForm onFinish={handleFinish} items={formItems} form={form}>
        <Space>
          <Button onClick={setDefaultData}>设置默认数据</Button>
          <Button onClick={setArrData}>设置数组数据</Button>
          <Button htmlType="reset">重置</Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Space>
      </TechForm>

      <Typography>
        <p>form数据为：</p>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </Typography>
    </>
  );
};
