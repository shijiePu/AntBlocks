import { Select } from 'antd';
import React, { FC } from 'react';

import { TechSelectProps } from './types';

import useDispatchDict from '@szhz/tech-pc/hooks/useDispatchDict';
import useGetDict from '@szhz/tech-pc/hooks/useGetDictData';

const TechSelect: FC<TechSelectProps> = ({
  dict,
  hideDictKeys,
  disableKeys,
  dictKey,
  options,
  allowClear = true,
  placeholder = '请选择',
  ...props
}) => {
  const { dictData } = useGetDict({ dict, dictKey });

  const { dOptions } = useDispatchDict({
    dict: dictData,
    disableKeys,
    hideDictKeys,
    options,
  });

  return (
    <Select
      allowClear={allowClear}
      placeholder={placeholder}
      options={options || dOptions}
      {...props}
    ></Select>
  );
};

export default TechSelect;
