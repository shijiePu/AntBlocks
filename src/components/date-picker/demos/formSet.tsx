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
      type: 'TechDatePicker',
    },
    {
      label: '时间值二',
      name: 'time2',
      type: 'TechDatePicker',
    },
    {
      label: '时间值三',
      name: 'multipleDate',
      type: 'TechDatePicker',
      fieldProps: {
        multiple: true,
      },
    },
    {
      label: '存在异常数据的多选时间',
      name: 'multipleDate1',
      type: 'TechDatePicker',
      fieldProps: {
        multiple: true,
      },
    },
  ];

  const handleSetData = () => {
    form.setFieldsValue({
      time1: '2021-01-01',
      time2: '2021-01-02',
      multipleDate: [
        '2024-04-02',
        '2024-04-23',
        '2024-04-04',
        '2024-04-09',
        '2024-04-10',
        '2024-04-11',
      ],
      multipleDate1: ['2024-04-09', null, '2024-04-11'],
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
