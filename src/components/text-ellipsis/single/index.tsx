import { getPrefixCls } from '@szhz/tech-pc/utils';
import { Tooltip } from 'antd';
import React, { FC, useRef } from 'react';

import useTextEllipsis from '../hook';
import '../index.less';
import { SingleEllipsisProps } from '../types';

const Single: FC<SingleEllipsisProps> = ({
  maxChars,
  width,
  style = {},
  text,
  fontSize = '14px',
  tooltipProps = {},
  className,
  showTooltip,
}) => {
  const prefixCls = getPrefixCls('ellipsis-single');
  const singleRef = useRef<HTMLDivElement>(null);

  const { displayedText, needTooltip, dispatchStyle } = useTextEllipsis({
    text,
    maxChars,
    fontSize,
    width,
    singleRef,
    showTooltip,
  });

  return (
    <div
      ref={singleRef}
      style={{
        ...style,
        ...dispatchStyle('fontSize', fontSize),
        ...dispatchStyle('width', width),
      }}
      className={`${prefixCls ?? ''}  ${className ?? ''}`}
    >
      {needTooltip && (
        <Tooltip placement="top" title={text} {...tooltipProps} style={{}}>
          <div
            className={`${prefixCls}-tooltip`}
            style={{
              ...dispatchStyle('fontSize', fontSize),
              ...dispatchStyle('width', width),
            }}
          >
            {displayedText}
          </div>
        </Tooltip>
      )}

      {displayedText}
    </div>
  );
};

export default Single;
