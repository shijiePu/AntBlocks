/**
 * title: 新增白色背景样式,默认为透明
 * description: 通过whiteBg属性设置白色背景样式
 * background: rgba(42, 46, 54, 0.04)
 */

import { TechDetail, TechDetailItem } from '@szhz/tech-pc';
import { Button, Tag } from 'antd';
import React from 'react';

const detailData = {
  workAddress: '测试的地址',
  accessPointDevices: '常见的信息',
  inner: '内链',
};

const FileList = () => {
  const businessItems: TechDetailItem[] = [
    {
      label: '普通渲染',
      key: 'workAddress',
    },
    {
      label: '自定义渲染渲染渲染',
      key: 'accessPointDevices',
      render: (data: string | undefined) => {
        if (!data) return '-';

        return <div>测试数据{data}</div>;
      },
    },
    {
      label: '字典值回显',
      key: 'inner',
    },
  ];

  return (
    <TechDetail
      whiteBg
      title="详情页回显示例"
      titleDesc={<Tag color="blue">测试标签</Tag>}
      titleAction={<Button type="primary">测试按钮</Button>}
      dataSource={detailData}
      items={businessItems}
      column={2}
    ></TechDetail>
  );
};

export default FileList;
