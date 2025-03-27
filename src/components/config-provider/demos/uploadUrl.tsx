/**
 * title: 全局配置uploadUrl
 * description: 地址仅为示例，无实际用途
 */
import React from 'react';
import TechConfigProvider from '..';
import TechUpload from '../../upload';

export default () => {
  return (
    <TechConfigProvider uploadUrl="/api/upload">
      <TechUpload></TechUpload>
    </TechConfigProvider>
  );
};
