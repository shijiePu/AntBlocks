/**
 * title: search组件
 * description: 以上的功能全部支持，并额外拓展了其他功能
 */

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
      label: '查询输入框',
      name: 'key',
      fieldProps: {
        allowClear: true,
      },
    },
    {
      type: 'select',
      label: '查询下拉框',
      name: 'key1',
      fieldProps: {
        dict: dictData,
        allowClear: true,
      },
    },
    {
      type: 'input',
      label: '查询输入框',
      name: 'key',
      fieldProps: {
        allowClear: true,
      },
    },
    {
      type: 'select',
      label: '查询下拉框',
      name: 'key1',
      fieldProps: {
        dict: dictData,
        allowClear: true,
      },
    },
  ];

  const items1: TechFormItems[] = [
    {
      label: '第三方评价总体情况）',
      span: 24,
      required: true,
      customCom: (<TechForm.Item
        label=""
        type="textarea"
        name="evaluationOne"
        fieldProps={{ showCount: false }}
        required
      />)
    },
    {
      type: 'input',
      label: '查询输入框',
      name: 'key',
      fieldProps: {
        allowClear: true,
      },
    },
    {
      type: 'select',
      label: '查询下拉框',
      name: 'key1',
      fieldProps: {
        dict: dictData,
        allowClear: true,
      },
    },
    {
      type: 'select',
      label: '查询下拉框',
      name: 'key1',
      fieldProps: {
        dict: dictData,
        allowClear: true,
      },
    },
  ];

  return (
    <>
      <h3>单行搜索</h3>
      <TechForm.Search
        name="searchForm1"
        form={form}
        layout='vertical'
        items={items1}
      ></TechForm.Search>
      <h3>多行搜索容器</h3>
      <TechForm.Search
        name="searchForm2"
        form={form}
        items={items}
      ></TechForm.Search>
    </>
  );
};
