

import { Form, FormInstance, Select } from "antd";
import React, { useEffect, useState } from "react";

import { queryOldAccount } from "@szhz/tech-pc/service/register";

export interface AccountSelectProps {
  systemField: string[];
  form?: FormInstance;
  placeholder?: any;
}

const AccountSelect: React.FC<AccountSelectProps> = ({ systemField, form, ...restProps }) => {
  const system = Form.useWatch(systemField, { form, preserve: true })
  const [options, setOptions] = useState<any>([])

  const getOptions = async (value: string) => {
    if (!system) return

    const res = await queryOldAccount({
      account: value,
      bizSystem: system
    })
    if (res) {
      setOptions([res].map(item => {
        return {
          label: item?.account,
          value: item?.uuid
        }
      }))
    }
  }

  useEffect(() => {
    getOptions('')
  }, [system])

  return <>
    <Select
      onSearch={(val) => {
        if (val) {
          getOptions(val);
        }
      }}
      showSearch
      optionFilterProp="label"
      options={options}
      placeholder="请选择"
      {...restProps}
    />
  </>
}

export default AccountSelect
