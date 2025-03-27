import { DumiSiteProvider, Hero } from 'dumi-theme-antd-style';
import React from 'react';
import { Center } from 'react-layout-kit';

export default () => (
  <DumiSiteProvider>
    <Center style={{ height: 600, width: '100%' }}>
      <Hero
        title={' @szhz/tech-pc'}
        // actions={[
        //   { text: '主按钮', link: '/components/hero' },
        //   { text: '辅助按钮', link: '/' },
        // ]}
        description={'炫酷的 Hero 头部组件'}
      />
    </Center>
  </DumiSiteProvider>
);
