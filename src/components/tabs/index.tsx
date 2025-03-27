import React, { FC } from 'react';
import './index.less';

import { ConfigProvider, Tabs } from 'antd';
import { TechTabsProps } from './types';

const TechTabs: FC<TechTabsProps> = ({ ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            horizontalItemPadding: '12px 16px',
          },
        },
      }}
    >
      <Tabs {...props}></Tabs>
    </ConfigProvider>
  );
};

export default TechTabs;
