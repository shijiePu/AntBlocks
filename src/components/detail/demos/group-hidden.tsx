/**
 * title: detail.Group hidden属性，动态隐藏配置
 */
import { TechCard, TechDetail, TechDetailGroupItem } from '@szhz/tech-pc';
import { Button } from 'antd';
import React, { useState } from 'react';

export default () => {
  const [hidden, setHidden] = useState(false);

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
      ],
    },
    {
      groupTitle: '单项详情回显',
      hidden,
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
      ],
    },
  ];

  return (
    <>
      <TechCard hasBottomPadding>
        <Button type="primary" onClick={() => setHidden(!hidden)}>
          {hidden ? '展示' : '隐藏'}单项详情回显
        </Button>
      </TechCard>
      <TechDetail.Group items={items}></TechDetail.Group>
    </>
  );
};
