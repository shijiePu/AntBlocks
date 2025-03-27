import { Radio } from 'antd';
import React, { FC } from 'react';

import { TechRadioGroupProps } from './types';

import useDispatchDict from '@szhz/tech-pc/hooks/useDispatchDict';
import useGetDict from '@szhz/tech-pc/hooks/useGetDictData';

const TechRadioGroup: FC<TechRadioGroupProps> = ({
  dict,
  hideDictKeys,
  disableKeys,
  dictKey,
  options,
  onChange,
  ...props
}) => {
  const { dictData } = useGetDict({ dict, dictKey });

  const { dOptions } = useDispatchDict({
    dict: dictData,
    disableKeys,
    hideDictKeys,
    options,
  });

  const handleChange = (e: any) => {
    onChange?.(e.target.value);
  };

  return (
    <Radio.Group
      onChange={handleChange}
      options={dOptions}
      {...props}
    ></Radio.Group>
  );
};

export default TechRadioGroup;
