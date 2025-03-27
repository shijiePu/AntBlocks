import { Cascader } from 'antd';
import { isArray, isNumber, isString } from 'lodash-es';
import React, { FC, useEffect, useState } from 'react';

import { TechCascaderProps } from './types';

import { dispatchCascader, echoCascader } from '@szhz/tech-pc/utils';

const TechCascader: FC<TechCascaderProps> = (props) => {
  const [cascaderValue, setCascaderValue] = useState<any>();

  const { multiple, value, onChange, allowClear = true, ...restProps } = props;

  const initValue = () => {
    if (!value) {
      setCascaderValue(undefined);
      return;
    }

    if (isNumber(value)) {
      const data = [value];

      setCascaderValue(data);

      return;
    }

    if (isString(value)) {
      const data = echoCascader(value, multiple);

      setCascaderValue(data);
      return;
    }

    if (isArray(value)) {
      setCascaderValue(value);
    }
  };

  const handleChange = (value: any[], selectedOptions: any[]) => {
    const data = dispatchCascader(value, multiple);
    setCascaderValue(value);
    onChange?.(data as string, selectedOptions);
  };

  useEffect(() => {
    initValue();
  }, [value]);

  return (
    <Cascader
      multiple={multiple}
      value={cascaderValue}
      onChange={handleChange}
      allowClear={allowClear}
      {...restProps}
    ></Cascader>
  );
};

export default TechCascader;
