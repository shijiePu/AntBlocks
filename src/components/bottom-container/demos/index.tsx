/**
 * title: 基础使用
 * description: 底部容器自带Space组件包裹
 * transform: true
 */
import { TechBottomContainer } from '@szhz/tech-pc';
import { Button } from 'antd';
import React, { CSSProperties } from 'react';

const styles: CSSProperties = {
  right: '64px',
  width: '80%',
  bottom: '64px',
};
export default () => {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'scroll',
        height: '300px',
      }}
    >
      <div style={{ height: '600px', width: '100%', background: '#999' }}>
        这是一个页面容器
      </div>
      <TechBottomContainer
        // 组件演示设置，项目使用时请删除
        style={styles}
      >
        <Button>取消</Button>
        <Button type="primary">确认</Button>
      </TechBottomContainer>
    </div>
  );
};
