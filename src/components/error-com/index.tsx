import { LoadErrorPageIcon } from '@szhz/tech-pc/icons';
import { getPrefixCls } from '@szhz/tech-pc/utils';
import React, { FC } from 'react';
import './index.less';

import { TechErrorComProps } from './types';

const TechErrorCom: FC<TechErrorComProps> = ({
  text,
  style = {},
  iconStyle = {},
}) => {
  const prefixCls = getPrefixCls('error-com');

  return (
    <div style={{ ...style }} className={`${prefixCls}`}>
      <LoadErrorPageIcon
        style={{ ...iconStyle }}
        className={`${prefixCls}-img`}
      />
      <p className={`${prefixCls}-desc`}>{text || '加载异常，请稍后重试'}</p>
    </div>
  );
};

export default TechErrorCom;
