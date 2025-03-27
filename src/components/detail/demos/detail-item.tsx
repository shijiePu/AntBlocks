/**
 * title: detail.Item详情组件
 * description: 主要应用于表格回显等场景
 */
import { TechConfigProvider, TechDetail } from '@szhz/tech-pc';
import React from 'react';

const dictionaryMap = {
  numberMap: {
    0: '有用',
    1: '无用',
  },
  dictMap: {
    1: 'Value 1',
    2: 'Value 2',
    3: 'Value 3',
  },
};
export default () => {
  return (
    // 脚手架中已集成，不需要额外配置TechConfigProvider
    <TechConfigProvider dictionaryMap={dictionaryMap}>
      <h4>回显checkbox类型数据</h4>
      {/* 可使用dictKey,与dictMap */}
      <TechDetail.Item type="checkbox" value="1,2" dictKey="dictMap" />
      <h4>回显select类型数据</h4>
      <TechDetail.Item type="dict" value="1" dictKey="numberMap" />
      <h4>回显文件</h4>
      <TechDetail.Item
        type="file"
        value={{
          fileName: '测试文件2.pdf',
          fileUrl: 'https://oss/data.pdf',
        }}
      ></TechDetail.Item>
      <h4>回显时间范围</h4>
      <TechDetail.Item
        type="rangeTime"
        value={['2021-01-01', '2021-01-02']}
      ></TechDetail.Item>
    </TechConfigProvider>
  );
};
