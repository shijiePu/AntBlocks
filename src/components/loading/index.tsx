import { Spin } from 'antd';
import React, { FC } from 'react';

import { getPrefixCls } from '@szhz/tech-pc/utils/styles';

import './index.less';
// eslint-disable-next-line import/order
import { TechLoadingProps } from './types';

const TechLoading: FC<TechLoadingProps> = ({ size = 'large', ...props }) => {
  const prefixCls = getPrefixCls('loading');

  return (
    <div className={prefixCls} {...props}>
      <Spin {...props} />
      {/* <LoadingIcon
        className={`${prefixCls}-img ${prefixCls}-${size}`}
      ></LoadingIcon> */}
    </div>
  );
};

export default TechLoading;
