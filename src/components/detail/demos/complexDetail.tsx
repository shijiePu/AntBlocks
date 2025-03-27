/**
 * title: 复杂列
 * description: 字典值可传入数组，默认为key，label。也可传入映射值
 */

import { TechDetail, TechDetailItem } from '@szhz/tech-pc';
import React from 'react';

const accessLineMode = {
  inner: '内链',
  outer: '外链',
};

const dictList = [
  {
    label: '外链',
    key: 'outer',
  },
  {
    label: '内链',
    key: 'inner',
  },
];

const dictReflectList = [
  {
    label: '外链',
    value: 'outer',
  },
  {
    label: '内链',
    value: 'inner',
  },
];

const detailData = {
  workAddress: '测试的地址',
  accessPointDevices: '常见的信息',
  accessLineMode: 'inner',
  access: '测试的标签',
  fileDTOList: [
    {
      fileName: '测试文件',
      fileUrl: 'https://oss/data.png',
    },
    {
      fileName: '测试文件2',
      fileUrl: 'https://oss/data.pdf',
    },
  ],
};

const FileList = () => {
  const businessDetail: TechDetailItem[] = [
    {
      label: '单位地址',
      key: 'workAddress',
    },
    {
      label: '这是一个超长超长的label',
      key: 'accessPointDevices',
      span: 2,
      render: (data: string | undefined) => {
        if (!data) return '-';

        return <div>测试数就环境环境就就好据{data}</div>;
      },
    },
    {
      label: '接入线路方式',
      key: 'accessLineMode',
      type: 'dict',
      dictMap: accessLineMode,
    },
  ];

  const businessDetail1: TechDetailItem[] = [
    {
      label: '数组字典回显',
      key: 'accessLineMode',
      type: 'dict',
      dictMap: dictList,
    },
    {
      label: '数组字典映射回显',
      key: 'accessLineMode',
      type: 'dict',
      dictMap: dictReflectList,
      dictReflect: {
        label: 'label',
        key: 'value',
      },
    },
  ];

  return (
    <>
      <TechDetail
        title="类型回显示例"
        dataSource={detailData}
        items={businessDetail}
      ></TechDetail>

      <TechDetail
        title="数组字典回显示例"
        dataSource={detailData}
        items={businessDetail1}
      ></TechDetail>
    </>
  );
};

export default FileList;
