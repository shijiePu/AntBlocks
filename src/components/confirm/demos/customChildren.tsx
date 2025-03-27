/**
 * title: 确认信息
 * description: 可以修改中心区内容
 */

import { TechConfirm } from '@szhz/tech-pc';
import { Button } from 'antd';
import React from 'react';

const customChildren = () => {
  const confirm = () => {
    console.log('data');
  };

  return (
    <TechConfirm title="标题提示" description="确认信息描述" confirm={confirm}>
      <Button type="primary">自定义内容</Button>
    </TechConfirm>
  );
};

export default customChildren;
