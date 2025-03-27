import { Spin } from 'antd';
import React, { FC } from 'react';

import { getPrefixCls, LoadingIcon } from '@szhz/tech-pc';

import './index.less';
import { LoadingProps } from './types';

const TechSpinLoading: FC<LoadingProps> = ({
  loadingSize = 'middle',
  size = 'large',
  indicator,
  ...props
}) => {
  const prefixCls = getPrefixCls('spin-loading');

  const indicatorIcon = indicator ?? (
    <LoadingIcon className={`${prefixCls}-img ${prefixCls}-${loadingSize}`} />
  );

  // return <Spin indicator={indicatorIcon} size={size} {...props} />;
  return <Spin size={size} {...props} />;
};

export default TechSpinLoading;
