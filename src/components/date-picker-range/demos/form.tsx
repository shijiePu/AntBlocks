import { TechForm, TechFormItems } from '@szhz/tech-pc';
import { Button, Form, Space } from 'antd';
import React from 'react';

export default () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = React.useState<any>({});

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    setFormData(values);
  };

  const resetFormData = () => {
    form.resetFields();
    setFormData({ dateRangeKeys: [] });
  };

  const formItems: TechFormItems[] = [
    {
      label: '日期范围',
      name: 'dateRange',
      type: 'TechDatePickerRange',
    },
    {
      label: '日期选择rangeKeys',
      name: 'dateRangeKeys',
      type: 'TechDatePickerRange',
      fieldProps: {
        rangeKeys: ['startTime', 'endTime'],
      },
    },
    {
      customCom: (
        <Space>
          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
          <Button onClick={resetFormData}>重置数据</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <TechForm items={formItems} form={form}></TechForm>
      <h4>form表单值：{JSON.stringify(formData)}</h4>
    </>
  );
};
