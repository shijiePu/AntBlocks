/**
 * title: formName 数据嵌套模式
 */

import { Button, Form, Typography } from 'antd';
import React, { useState } from 'react';

import { TechForm, TechFormItems } from '@szhz/tech-pc';

const { Paragraph } = Typography;

export default () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState({});

  const items: TechFormItems[] = [
    {
      name: 'name',
      label: '姓名',
      type: 'input',
    },
    {
      name: 'age',
      label: '年龄',
    },
    {
      name: 'age',
      label: '年龄',
      type: 'inputNumber',
    },
  ];

  const handleChange = () => {
    const data = form.getFieldsValue();

    setValue(data);
  };

  return (
    <>
      <TechForm
        name="formName"
        formName="basicInfo"
        items={items}
        form={form}
      ></TechForm>
      <Button onClick={handleChange}>提交</Button>
      <Paragraph style={{ maxWidth: 440, marginTop: 24 }}>
        <pre style={{ border: 'none' }}>{JSON.stringify(value, null, 2)}</pre>
      </Paragraph>
    </>
  );
};
