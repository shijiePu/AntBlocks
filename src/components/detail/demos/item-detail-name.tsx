/**
 * title: detailName字段
 * description: 支持嵌套数据的渲染
 */

import { Typography } from 'antd';
import React from 'react';
import TechDetail from '../index';
import { TechDetailGroupItem, TechDetailItem } from '../types';

const dataSource = {
  base: {
    workAddress: '测试的地址',
    accessPointDevices: '常见的信息',
  },
};

const GroupDataSource = {
  base: {
    name: '张三',
    sex: '男',
    birthDay: '1990-01-01',
    phone: '13800138000',
  },
  base1: {
    name1: '李四',
    sex1: '女',
    birthDay1: '1992-05-15',
    phone1: '13900139000',
  },
  money: '500万',
  moneyType: '股权融资',
  moneyUs: '产品研发',
};

const items: TechDetailItem[] = [
  {
    label: '普通渲染',
    name: 'workAddress',
  },
  {
    label: '自定义渲染',
    name: 'accessPointDevices',
    render: (data: string | undefined) => {
      if (!data) return '-';

      return <div>测试数据{data}</div>;
    },
  },
];

const groupItems: TechDetailGroupItem[] = [
  {
    groupTitle: '嵌套数据base',
    groupItems: [
      {
        title: '基本信息',
        column: 2,
        detailName: 'base',
        items: [
          {
            label: '姓名',
            key: 'name',
          },
          {
            label: '性别',
            key: 'sex',
          },
          {
            label: '出生年月',
            key: 'birthDay',
          },
          {
            label: '电话',
            key: 'birthDay',
          },
        ],
      },
    ],
  },
  {
    groupTitle: '嵌套数据base1',
    itemProps: {
      detailName: 'base1',
    },
    items: [
      {
        label: '姓名',
        key: 'name1',
      },
      {
        label: '性别',
        key: 'sex1',
      },
      {
        label: '出生年月',
        key: 'birthDay1',
      },
      {
        label: '电话',
        key: 'birthDay1',
      },
    ],
  },
];

export default () => {
  return (
    <>
      <h3>TechDetail的detailName为base</h3>
      <TechDetail
        items={items}
        detailName="base"
        dataSource={dataSource}
      ></TechDetail>
      <Typography>
        <p>dataSource为</p>
        <pre>{JSON.stringify(dataSource, null, 2)}</pre>
      </Typography>

      <h3>TechDetail.Group组件的detailName为base2</h3>
      <TechDetail.Group
        items={groupItems}
        dataSource={GroupDataSource}
      ></TechDetail.Group>
      <Typography>
        <p>GroupDataSource为</p>
        <pre>{JSON.stringify(GroupDataSource, null, 2)}</pre>
      </Typography>
    </>
  );
};
