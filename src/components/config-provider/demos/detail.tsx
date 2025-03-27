/**
 * title:  dictionaryMap 全局字典值
 * description: 子组件可以通过dictKey 进行使用
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

const dictionaryMap = {
  dataPromise: {
    L1: '不敏感',
    L2: '低敏感',
    L3: '较敏感',
    L4: '敏感',
    L5: '极敏感',
  },
};

const businessItems: TechDetailItem[] = [
  {
    label: '字典值回显',
    key: 'accessMode',
    type: 'dict',
    dictKey: 'dataPromise',
  },
];

const detailData = {
  accessMode: 'L1',
};

export default () => {
  return (
    <>
      <h3>手动设置全局字典值</h3>
      <TechConfigProvider dictionaryMap={dictionaryMap}>
        <h4>并在TechDetail中使用dictKey字段</h4>
        <TechDetail
          column={2}
          items={businessItems}
          dataSource={detailData}
        ></TechDetail>
        <h4>下拉选择框使用dictKey字段</h4>
        <TechSelect style={{ width: 140 }} dictKey="dataPromise"></TechSelect>
        <h4>多选框组使用dictKey字段</h4>
        <TechCheckGroup dictKey="dataPromise"></TechCheckGroup>
        <h4>单选框组使用dictKey字段</h4>
        <TechRadioGroup dictKey="dataPromise"></TechRadioGroup>
      </TechConfigProvider>
    </>
  );
};
