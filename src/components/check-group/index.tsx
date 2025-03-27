import { Checkbox } from 'antd';
// @ts-ignore
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { isArray, isString } from 'lodash-es';
import React, { FC, useEffect, useState } from 'react';

import { TechCheckGroupProps } from './types';

import useDispatchDict from '@szhz/tech-pc/hooks/useDispatchDict';
import useGetDict from '@szhz/tech-pc/hooks/useGetDictData';

const initValue = (data: any) => {
  if (!data) return data;

  if (isArray(data)) return data;

  if (isString(data)) return data?.split(',');
};

const disPatchData = (data: CheckboxValueType[] | undefined) => {
  if (!data) return data;

  if (isArray(data)) return data?.join(',');
};

const TechCheckGroup: FC<TechCheckGroupProps> = ({
  dict,
  hideDictKeys,
  options,
  dictKey,
  disableKeys,
  children,
  ...props
}) => {
  const { value, onChange, ...restProps } = props;
  const [checkVal, setCheckVal] = useState<CheckboxValueType[] | undefined>();

  const { dictData } = useGetDict({ dict, dictKey });
  const { dOptions } = useDispatchDict({
    dict: dictData,
    disableKeys,
    hideDictKeys,
    options,
  });

  const handleChange = (val: CheckboxValueType[]) => {
    const newVal = disPatchData(val);

    setCheckVal(val);
    onChange?.(newVal);
  };

  useEffect(() => {
    const data = initValue(value);

    setCheckVal(data);
  }, [value]);

  return (
    <Checkbox.Group
      value={checkVal}
      onChange={handleChange}
      options={dOptions}
      {...restProps}
    >
      {children}
    </Checkbox.Group>
  );
};

export default TechCheckGroup;
