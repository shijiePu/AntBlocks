/**
 * title: 值初始值
 * description: 默认值支持 string[], Date[],时间戳， null,等类型
 */
import { TechDatePickerRange } from '@szhz/tech-pc';
import dayjs from 'dayjs';
import React from 'react';

export default () => {
  const stringDefault = ['2022-01-01', '2022-01-05'];
  const dateDefault = [1643673600000, 1660953600000];
  const dayjsDefault = [dayjs('2022-01-01'), dayjs('2022-01-05')];

  const objDefault = {
    key1: '2022-02-18',
    key2: '2022-03-23',
  };

  return (
    <>
      <h4>字符串时间回显</h4>
      <h5>字符串初始值为：{JSON.stringify(stringDefault)}</h5>
      <TechDatePickerRange value={stringDefault}></TechDatePickerRange>

      <h4>对象值回显()</h4>
      <h5>字符串初始值为：{JSON.stringify(objDefault)}</h5>
      <TechDatePickerRange value={objDefault}></TechDatePickerRange>

      <h4>时间戳时间回显</h4>
      <h5>时间戳初始值为：{JSON.stringify(dateDefault)}</h5>
      <TechDatePickerRange value={dateDefault}></TechDatePickerRange>

      <h4>dayjs时间回显</h4>
      <h5>
        初始值为：{JSON.stringify([dayjs('2022-01-01'), dayjs('2022-01-05')])}
      </h5>
      <TechDatePickerRange value={dayjsDefault}></TechDatePickerRange>
    </>
  );
};
