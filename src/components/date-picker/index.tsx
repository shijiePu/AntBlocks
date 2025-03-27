import { getDateVal } from '@szhz/tech-pc/utils/date';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import React, { FC, useMemo } from 'react';
import { TechDatePickerType } from './types';

const TechDatePicker: FC<TechDatePickerType> = (props) => {
  const {
    value,
    onChange,
    allowClear = true,
    placeholder = '请选择',
    style,
    ...dateProps
  } = props;

  const dateValue = useMemo(() => {
    return getDateVal(value);
  }, [value]);

  const handleChange = (date: Dayjs, dateString: string | string[] | null) => {
    onChange?.(dateString, date);
  };

  return (
    <DatePicker
      style={{ width: '100%', ...style }}
      allowClear={allowClear}
      value={dateValue as any}
      placeholder={placeholder}
      onChange={handleChange as any}
      {...dateProps}
    ></DatePicker>
  );
};

export default TechDatePicker;
