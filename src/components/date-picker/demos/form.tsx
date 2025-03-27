/**
 * title: 在表单中使用
 */
import React from 'react';

import { TechForm, TechFormItems } from '@szhz/tech-pc';
import { Button, Form } from 'antd';

export default () => {
  const [formData, setFormData] = React.useState({} as any);
  const [form] = Form.useForm();
  const formItems: TechFormItems[] = [
    {
      type: 'TechDatePicker',
      label: '格式化日期选择',
      name: 'date',
    },
    {
      type: 'TechDatePicker',
      label: '日期多选',
      name: 'multipleDate',
      fieldProps: {
        multiple: true,
      },
    },
    {
      type: 'TechDatePicker',
      label: '格式化日期选择',
      name: 'formateDate',
      fieldProps: {
        format: 'YYYY/MM/DD',
      },
    },
  ];

  const handleFinish = () => {
    const data = form.getFieldsValue();

    setFormData(data);
  };
  return (
    <>
      <TechForm items={formItems} form={form}></TechForm>

      <Button type="primary" onClick={handleFinish}>
        提交
      </Button>

      <h4>form获取的值为</h4>
      {Object.keys(formData).map((key) => {
        return (
          <div key={key}>
            {key}: {JSON.stringify(formData[key])}
          </div>
        );
      })}
    </>
  );
};
