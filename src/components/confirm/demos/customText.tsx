/**
 * title: 确认信息
 * description: 可以修改自定义标题与提示信息
 */

import { TechConfirm } from '@szhz/tech-pc';
import React from 'react';

const customText = () => {
  const confirm = () => {
    console.log('data');
  };

  return (
    <TechConfirm
      title="标题提示"
      description="确认信息描述"
      confirm={confirm}
    ></TechConfirm>
  );
};

export default customText;
