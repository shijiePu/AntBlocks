/**
 * title: 在form数据中存储上传文件
 */
import { Button, Form, Typography } from 'antd';
import React from 'react';
import TechConfigProvider from '../../config-provider';
import TechForm from '../../form';
import { TechFormItems } from '../../form/types';

const items: TechFormItems[] = [
  {
    label: '上传多个组件',
    type: 'TechUpload',
    name: 'uploadMu',
  },
  {
    label: '设置single字段',
    type: 'TechUpload',
    name: 'singleUpload',
    fieldProps: {
      single: true,
    },
  },
];

export default () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = React.useState({});

  const handleFinish = () => {
    const values = form.getFieldsValue();

    setFormData(values);
  };

  return (
    <TechConfigProvider uploadUrl="/szjs-api/gateway/program/attachment/upload">
      <TechForm form={form} items={items}></TechForm>

      <Button type="primary" onClick={handleFinish}>
        提交
      </Button>
      <Typography style={{ maxWidth: 440, marginTop: 24 }}>
        <div>{JSON.stringify(formData, null, 2)}</div>
      </Typography>
    </TechConfigProvider>
  );
};
