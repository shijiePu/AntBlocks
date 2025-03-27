/**
 * title: 自定义返回点击事件
 * description: 通过**onBackClick**自定义返回点击事件
 */
import { TechPageTitle } from '@szhz/tech-pc';
import React from 'react';

export default () => {
  const routerPage = () => {
    alert('展示标题');
  };

  return (
    <TechPageTitle goBack={true} onBackClick={routerPage}>
      页面标题
    </TechPageTitle>
  );
};
