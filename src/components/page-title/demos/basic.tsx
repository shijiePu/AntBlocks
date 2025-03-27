/**
 * title: 基本使用
 * description: 页面标题，子页面标题，表格标题
 */

import { TechPageTitle } from '@szhz/tech-pc';
import React from 'react';

export default () => {
  return (
    <>
      <TechPageTitle>主页面标题</TechPageTitle>

      <div style={{ marginTop: '40px' }}>
        <TechPageTitle goBack={true}>子页面标题</TechPageTitle>
      </div>

      <div style={{ marginTop: '40px', width: '200px' }}>
        <TechPageTitle type="table">表格标题</TechPageTitle>
      </div>

      <div style={{ marginTop: '40px', width: '200px' }}>
        <TechPageTitle type="form">表单标题</TechPageTitle>
      </div>
    </>
  );
};
