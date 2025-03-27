/**
 * title: 标题后面展示内容
 * description: 通过**titleDesc**字段可自定义title后面的内容
 */

import { TechPageTitle } from '@szhz/tech-pc';
import { Tag } from 'antd';
import React from 'react';

export default () => {
  return (
    <TechPageTitle titleDesc={<Tag color="processing">processing</Tag>}>
      页面标题
    </TechPageTitle>
  );
};
