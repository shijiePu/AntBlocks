import { getPrefixCls } from '@szhz/tech-pc/utils/styles';
import React from 'react';

import { NoPageIcon } from '@szhz/tech-pc/icons';
import './index.less';

const TechNoPage = ({ text }: { text?: any }) => {
  const prefixCls = getPrefixCls('no-page');

  return (
    <div className={`${prefixCls}`}>
      <NoPageIcon className={`${prefixCls}-img`} />
      <p className={`${prefixCls}-desc`}>{text || '页面失效或不存在'}</p>
    </div>
  );
};

export default TechNoPage;
