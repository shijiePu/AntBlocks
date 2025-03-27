/**
 * title: 设置size
 * description: 设置 size large middle small  默认为large
 */

import { LoadingSizeType, TechLoading, TechRadioGroup } from '@szhz/tech-pc';
import { RadioChangeEvent } from 'antd';
import React, { useState } from 'react';

const SizeType = {
  large: 'large',
  middle: 'middle',
  small: 'small',
};

export default () => {
  const [value, setValue] = useState<LoadingSizeType>('large');

  const onChange = (data?: RadioChangeEvent) => {
    setValue(data?.target?.value);
  };

  return (
    <>
      <TechRadioGroup
        dict={SizeType}
        onChange={onChange as any}
        value={value}
        optionType="button"
      />
      <br />
      <TechLoading size={value} />
    </>
  );
};
