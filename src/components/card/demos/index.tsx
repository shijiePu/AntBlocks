import { TechCard } from '@szhz/tech-pc';
import React from 'react';

export default () => {
  return (
    <div
      style={{
        background: '#f4f5f7',
        padding: '10px',
      }}
    >
      <TechCard hasBottomPadding>卡片容器拥有底部边距</TechCard>
      <TechCard>卡片容器的基本使用</TechCard>
    </div>
  );
};
