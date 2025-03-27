/**
 * title:  useLocal 默认设置
 * description: useLocal为true，组件内部进行字典接口调用，不需要外部传入
 */
import {
  TechCheckGroup,
  TechConfigProvider,
  TechDetail,
  TechDetailItem,
  TechRadioGroup,
  TechSelect,
} from '@szhz/tech-pc';
import React from 'react';

const businessItems: TechDetailItem[] = [
  {
    label: '字典值回显',
    key: 'AUTO_COMPLETED',
    type: 'dict',
    dictKey: 'nodeStatus',
  },
];

const detailData = {
  accessMode: 'AUTO_COMPLETED',
};

export default () => {
  return (
    <>
      <h3>自动设置全局字典值</h3>
      <TechConfigProvider useLocal={true}>
        <h4>并在TechDetail中使用dictKey字段</h4>
        <TechDetail
          column={2}
          items={businessItems}
          dataSource={detailData}
        ></TechDetail>
        <h4>下拉选择框使用dictKey字段</h4>
        <TechSelect style={{ width: 140 }} dictKey="nodeStatus"></TechSelect>
        <h4>多选框组使用dictKey字段</h4>
        <TechCheckGroup dictKey="app_processType"></TechCheckGroup>
        <h4>单选框组使用dictKey字段</h4>
        <TechRadioGroup dictKey="nodeStatus"></TechRadioGroup>
      </TechConfigProvider>
    </>
  );
};
