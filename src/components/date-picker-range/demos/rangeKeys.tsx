/**
 * title: 指定区间范围的key值
 * description: rangeKeys 两个值必须都传入否则不生效
 */

import { TechDatePickerRange } from '@szhz/tech-pc';
import React from 'react';

export default () => {
  const rangeKeys = ['startTime', 'endTime'];
  const [rangeValue, setRangeValue] = React.useState<string[]>();

  const handleChange = (data: any) => {
    setRangeValue(data);
  };

  return (
    <>
      <h3>指定rangeKeys为{JSON.stringify(rangeKeys)}</h3>
      <TechDatePickerRange
        value={rangeValue}
        rangeKeys={rangeKeys}
        onChange={handleChange}
      ></TechDatePickerRange>

      <h4>返回的值为{JSON.stringify(rangeValue)}</h4>
    </>
  );
};
