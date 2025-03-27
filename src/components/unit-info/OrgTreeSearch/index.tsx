import { useRequest } from 'ahooks';
import { FormInstance, Select } from 'antd';
import React, { FC, useEffect, useState } from 'react';

import { systemOrgListByGet } from '@szhz/tech-pc/service/unit-info';

interface OrgTreeSearchProps {
  value?: any;
  onChange?: (data: any) => void;
  manual?: boolean;
  form?: FormInstance<any>;
}
const OrgTreeSearch: FC<OrgTreeSearchProps> = (props) => {
  const { value, onChange, manual = false, form } = props;

  const [selectData, setSelectData] = useState<string>();

  const { data: OrgData, run: getOrgData } = useRequest(systemOrgListByGet, {
    manual,
  });

  const handleSearch = (value: string) => {
    getOrgData({ orgName: value });
  };

  const handleChange = (value: string, option: Record<string, any>) => {
    form?.setFieldValue('competentDepartment', option.label);
    setSelectData(value);
    onChange?.(value);
  };

  useEffect(() => {
    setSelectData(value);
  }, [value]);

  return (
    <Select
      placeholder="请选择"
      showSearch
      value={selectData}
      filterOption={false}
      defaultActiveFirstOption={false}
      onSearch={handleSearch}
      suffixIcon={null}
      onChange={handleChange}
      options={(OrgData || [])?.map((d: any) => ({
        value: d.orgCode,
        label: d.orgName,
      }))}
    ></Select>
  );
};

export default OrgTreeSearch;
