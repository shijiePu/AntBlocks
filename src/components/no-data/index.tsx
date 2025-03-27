import { getPrefixCls } from '@szhz/tech-pc/utils/styles';
import React, { FC, useMemo } from 'react';

import { NoDataIcon } from '@szhz/tech-pc/icons';
import './index.less';
import { NoDataTypes } from './types';

const TEXT_COM_MAP: Record<string, boolean> = {
  Dropdown: true,
  AutoComplete: true,
  Cascader: true,
  Select: true,
  TreeSelect: true,
};

const TechNoData: FC<NoDataTypes> = ({
  text,
  type = 'large',
  className,
  imgProps,
  componentName,
  ...props
}) => {
  const prefixCls = getPrefixCls('no-data');

  const size = useMemo(() => {
    const name = `${prefixCls}-${type}`;

    return name;
  }, [type]);

  if (componentName && TEXT_COM_MAP?.[componentName]) {
    return (
      <div
        className={`${prefixCls} ${size} ${className ? className : ''}`}
        {...props}
      >
        <div className={`${prefixCls}-title`}>{text || '暂无数据'}</div>
      </div>
    );
  }

  return (
    <div
      {...props}
      className={`${prefixCls} ${size} ${className ? className : ''}`}
    >
      <NoDataIcon className={`${prefixCls}-img`} {...imgProps}></NoDataIcon>
      <div className={`${prefixCls}-title`}>{text || '暂无数据'}</div>
    </div>
  );
};

export default TechNoData;
