import { TechForm, TechFormItems } from '@szhz/tech-pc';
import { Form } from 'antd';
import React from 'react';

const dictData = {
  L1: '不敏感',
  L2: '低敏感',
  L3: '较敏感',
  L4: '敏感',
  L5: '极敏感',
};

export default () => {
  const [form] = Form.useForm();

  const items: TechFormItems[] = [
    {
      type: 'input',
      regKey: 'phone',
      fieldProps: {
        allowClear: true,
      },
      itemProps: {
        label: '查询',
        name: 'key',
      },
    },
    {
      type: 'select',
      fieldProps: {
        dict: dictData,
        allowClear: true,
      },
      itemProps: {
        label: '查询',
        name: 'key1',
      },
    },
  ];

  return (
    <>
      <h3>表单校验</h3>
      <TechForm name="regForm" form={form} items={items}></TechForm>
    </>
  );
};
