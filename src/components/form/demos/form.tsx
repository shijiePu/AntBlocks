/**
 * title: 基本使用
 * description:
 */
import { Button, Form, Space } from 'antd';
import React from 'react';

import { TechForm, TechFormItems } from '@szhz/tech-pc';

const dictData = {
  L1: '不敏感',
  L2: '低敏感',
  L3: '较敏感',
};

export default () => {
  const [form] = Form.useForm();

  const items: TechFormItems[] = [
    {
      type: 'input',
      label: '用户名称22',
      name: 'userName',
      required: '请输入用户名称',
      span: 12,
    },
    {
      type: 'TechUpload',
      label: '用户名称',
      name: 'userName',
      required: '请输入用户名称',
      span: 12,
    },
    {
      type: 'select',
      label: '字典下拉选择框',
      name: 'dictSelect',
      fieldProps: {
        dict: dictData,
      },
    },
    {
      type: 'checkGroup',
      label: '字典多选框',
      name: 'dictCheckbox',
      fieldProps: {
        dict: dictData,
      },
    },
    {
      type: 'radioGroup',
      label: '字典单选框',
      fieldProps: {
        dict: dictData,
      },
    },
    {
      label: '组件库时间选择',
      type: 'TechDatePicker',
      name: 'TechDatePicker',
    },
    {
      label: '组件库时间范围选择',
      type: 'TechDatePickerRange',
      name: 'TechDatePickerRange',
    },
    {
      label: '时间选择',
      type: 'datePicker',
      name: 'datePicker',
      required: true,
    },
    {
      label: '时间范围选择',
      type: 'datePickerRange',
      name: 'datePickerRange',
    },
  ];

  const handleSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    console.log(values);
  };

  const handleReset = () => {
    form.resetFields();
  };
  return (
    <>
      <TechForm
        name="basicName"
        items={items}
        columns={3}
        form={form}
      ></TechForm>
      <Space>
        <Button onClick={handleReset}>重置</Button>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </Space>
    </>
  );
};
