import { useRequest } from 'ahooks';
import { Cascader } from 'antd';
import React, { FC, useEffect, useState } from 'react';

import { expertListTreeCodeByGet } from '@szhz/tech-pc/service/unit-info';
import './index.less';

const { SHOW_CHILD } = Cascader;

interface AdministrativeDivisionProps {
  value?: any;
  onChange?: (data: any[]) => void;
  multiple?: boolean;
  edit?: boolean;
}

// 行政区划级联选择框
const AdministrativeDivision: FC<AdministrativeDivisionProps> = (props) => {
  const { value, onChange, multiple = true, edit } = props;

  const [cascaderData, setCascaderData] = useState<any[]>([]);

  const { data: treeData } = useRequest(expertListTreeCodeByGet, {
    defaultParams: [{ code: 'administrativeDivision' }],
  });

  const handleChange = (value: any[]) => {
    setCascaderData(value);

    onChange?.(value);
  };

  useEffect(() => {
    if (!treeData) return;

    setCascaderData(value);
  }, [treeData, value]);

  return (
    <Cascader
      className={edit ? '' : 'ant-cascader-readonly'}
      showCheckedStrategy={SHOW_CHILD}
      maxTagCount={3}
      fieldNames={{
        label: 'name',
      }}
      multiple={multiple}
      value={cascaderData}
      onChange={handleChange}
      options={treeData}
      placeholder="请选择"
    />
  );
};

export default AdministrativeDivision;
