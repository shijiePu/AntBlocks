import { isString } from 'lodash-es';
import React, { CSSProperties, memo, useMemo } from 'react';
import CountUp from 'react-countup';

export interface RenderValueProps {
  value: number | null | undefined;
  valAnimate: boolean;
  prefixCls: string;
  valueFontColor: Record<'color', CSSProperties['color']>;
}

function RenderValue({
  value,
  valAnimate,
  prefixCls,
  valueFontColor,
}: RenderValueProps) {
  const formatValue = useMemo(() => {
    if (!value) return '-';

    if (isString(value)) return value;

    return value.toLocaleString();
  }, [value]);

  if (!valAnimate || value === null || value === undefined) {
    return (
      <div className={`${prefixCls}-item-value`} style={{ ...valueFontColor }}>
        {formatValue}
      </div>
    );
  }

  return (
    <div className={`${prefixCls}-item-value`} style={{ ...valueFontColor }}>
      <CountUp end={value} decimal=","></CountUp>
    </div>
  );
}

export default memo(RenderValue);
