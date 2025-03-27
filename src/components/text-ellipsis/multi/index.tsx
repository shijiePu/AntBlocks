import { getPrefixCls } from '@szhz/tech-pc/utils';
import { Tooltip } from 'antd';
import React, { FC, useRef } from 'react';
import useTextEllipsis from '../hook';
import '../index.less';
import { MultiEllipsisProps } from '../types';

const Multi: FC<MultiEllipsisProps> = ({
  maxChars,
  width,
  style = {},
  text,
  line = 2,
  fontSize = '14px',
  tooltipProps = {},
  className,
  showTooltip,
}) => {
  const prefixCls = getPrefixCls('ellipsis-multi');
  const singleRef = useRef<HTMLDivElement>(null);

  const { displayedText, needTooltip, dispatchStyle } = useTextEllipsis({
    text,
    maxChars,
    fontSize,
    width,
    singleRef,
    showTooltip,
    line,
  });

  return (
    <div
      ref={singleRef}
      className={`${prefixCls}  ${className ?? ''}`}
      style={{
        ...style,
        ...dispatchStyle('WebkitLineClamp', line),
        ...dispatchStyle('fontSize', fontSize),
        ...dispatchStyle('width', width),
      }}
    >
      {needTooltip && (
        <Tooltip placement="top" title={text} {...tooltipProps} style={{}}>
          <div
            className={`${prefixCls}-tooltip`}
            style={{
              ...dispatchStyle('WebkitLineClamp', line),
              ...dispatchStyle('width', width),
              ...dispatchStyle('fontSize', fontSize),
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

export default Multi;
