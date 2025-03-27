/**
 * title: 分组详情
 * background: rgba(42, 46, 54, 0.04)
 */

import { TechDetail, TechDetailGroupItem } from '@szhz/tech-pc';
import React from 'react';

export default () => {
  const items: TechDetailGroupItem[] = [
    {
      groupTitle: '项目基本情况',
      groupItems: [
        {
          title: '基本信息',
          column: 2,
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
        {
          title: '详细信息',
          column: 3,
          items: [
            {
              label: '类型',
              key: 'type',
            },
            {
              label: '地址',
              key: 'address',
            },
            {
              label: '备注',
              key: 'remark',
            },
          ],
        },
      ],
    },
    {
      groupTitle: '单项详情回显',
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
    {
      groupTitle: '其他信息',
      groupItems: [
        {
          title: '创业融资需求',
          items: [
            {
              label: '融资金额',
              key: 'money',
            },
            {
              label: '融资方式',
              key: 'moneyType',
            },
            {
              label: '融资用途',
              key: 'moneyUs',
            },
          ],
        },
        {
          title: '企业其他情况',
          items: [
            {
              label: '企业类型',
              key: 'type',
            },
            {
              label: '企业规模',
              key: 'scale',
            },
            {
              label: '企业行业',
              key: 'industry',
            },
          ],
        },
      ],
    },
  ];

  return <TechDetail.Group dataSource={{}} items={items}></TechDetail.Group>;
};
