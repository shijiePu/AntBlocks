/**
 * title: dateFormate属性基础使用
 * description: 选择框内部的值通过formate属性进行格式化，值由dateFormate进行格式化
 */
import { TechDatePickerRange } from '@szhz/tech-pc';
import React, { useState } from 'react';

export default () => {
  const [dateValue, setDateValue] = useState();
  const [dateFormateValue, setDateFormateValue] = useState();

  const handleChange = (value: any) => {
    setDateValue(value);
  };

  const handleFormateChange = (data: any) => {
    setDateFormateValue(data);
  };

  return (
    <>
      <h4>默认格式</h4>
      <TechDatePickerRange
        value={dateValue}
        onChange={handleChange}
      ></TechDatePickerRange>
      <h5>时间结果</h5>
      {JSON.stringify(dateValue)}

      <h4>指定格式化 YYYY/MM/DD</h4>
      <TechDatePickerRange
        value={dateFormateValue}
        onChange={handleFormateChange}
        format="YYYY/MM/DD"
      ></TechDatePickerRange>
      <h5>时间结果</h5>
      {JSON.stringify(dateFormateValue)}
    </>
  );
};
