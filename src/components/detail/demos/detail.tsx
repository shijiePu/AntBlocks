/**
 * title: 详情页回显,可手动控制展示与隐藏
 * description: 支持 自定义、字典、文件、图片、文件渲染、时间范围、多选框组等回显渲染情况
 */

import { TechDetail, TechDetailItem } from '@szhz/tech-pc';
import { Button, Tag } from 'antd';
import React, { useState } from 'react';

const numberMap = {
  0: '有用',
  1: '无用',
};

const dictMap = {
  1: 'Value 1',
  2: 'Value 2',
  3: 'Value 3',
};

const detailData = {
  workAddress: '测试的地址',
  accessPointDevices: '常见的信息',
  accessServerCount: '0',
  startTime: '2020-01-01',
  endTime: '2020-02-21',
  checkboxGroup: '1,2,3',
  imgUrl:
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  errorImgUrl:
    'https://zos.alipayobjects.com/rmsportal/pUPVyRjUImniVslZfWPnJuuZ.png',
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
  fileDTO: {
    fileName: '测试文件2',
    fileUrl: 'https://oss/data.pdf',
  },
};

const FileList = () => {
  const [hidden, setHidden] = useState(false);

  const businessItems: TechDetailItem[] = [
    {
      label: '普通渲染',
      name: 'workAddress',
      maskKey: 'idCard',
    },
    {
      label: '自定义渲染',
      name: 'accessPointDevices',
      render: (data: string | undefined) => {
        if (!data) return '-';

        return <div>测试数据{data}</div>;
      },
    },
    {
      label: '字典值渲染',
      name: 'accessServerCount',
      type: 'dict',
      dictMap: numberMap,
    },
    {
      label: '动态控制',
      labelStyle: {
        color: 'blue',
      },
      hidden,
      name: 'workAddress',
    },
    {
      label: '时间范围',
      type: 'rangeTime',
      name: ['startTime', 'endTime'],
    },
    {
      label: '多选框回显',
      name: 'checkboxGroup',
      type: 'checkbox',
      dictMap: dictMap,
    },
    {
      label: '这是type为placeholder的宽度为100%占位符渲染',
      type: 'placeholder',
    },
    {
      label: '文件渲染',
      type: 'file',
      name: 'fileDTOList',
    },
    {
      label: '单项文件渲染',
      type: 'file',
      name: 'fileDTO',
    },
    {
      label: '图片渲染',
      type: 'img',
      name: 'imgUrl',
    },
    {
      label: '图片加载失败',
      type: 'img',
      name: 'errorImgUrl',
    },
  ];

  return (
    <>
      <Button
        style={{ marginBottom: '16px' }}
        type="primary"
        onClick={() => setHidden(!hidden)}
      >
        {hidden ? '显示' : '隐藏'}属性
      </Button>
      <TechDetail
        title="详情页回显示例"
        titleDesc={<Tag color="blue">测试标签</Tag>}
        titleAction={<Button type="primary">测试按钮</Button>}
        dataSource={detailData}
        items={businessItems}
        column={2}
      ></TechDetail>
      <h3>其他布局</h3>
      <TechDetail
        title="vertical布局回显"
        dataSource={detailData}
        items={businessItems.slice(0, 5)}
        layout="vertical"
        column={2}
      ></TechDetail>
    </>
  );
};

export default FileList;
