/**
 * title: 时间选择器设置默认值
 */
import { TechForm, TechFormItems } from '@szhz/tech-pc';
import { Button, Form } from 'antd';
import React from 'react';

export default () => {
  const [form] = Form.useForm();

  const formItem: TechFormItems[] = [
    {
      label: '时间值一',
      name: 'time1',
      type: 'TechDatePickerRange',
    },
    {
      label: '时间值二',
      name: 'time2',
      type: 'TechDatePickerRange',
    },
  ];

  const handleSetData = () => {
    form.setFieldsValue({
      time1: ['2021-01-01', '2022-01-01'],
      time2: ['2019-01-02', '2021-01-02'],
    });
  };

  return (
    <>
      <TechForm form={form} items={formItem}></TechForm>
      <Button type="primary" onClick={handleSetData}>
        设置默认值
      </Button>
    </>
  );
};
