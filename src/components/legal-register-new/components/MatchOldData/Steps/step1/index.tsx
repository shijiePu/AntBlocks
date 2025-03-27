import { FormInstance } from "antd";
import React from "react";

import { TechDetail, TechDetailGroupItem, } from "@szhz/tech-pc";
import AssociatedSystemForm from "@szhz/tech-pc/components/com-pages-componnets/AssociatedSystemForm";
import { LEGAL_UNIT_INFO, LEGAL_USER_INFO, getLEGAL_UNIT_INFO_COLUMNS, getLEGAL_USER_INFO_COLUMNS } from "@szhz/tech-pc/components/com-pages-utils/register";

export interface Step1Props {
  form: FormInstance;
}

const Step1: React.FC<Step1Props> = ({ form }) => {

  const items: TechDetailGroupItem[] = [
    {
      groupTitle: '',
      groupItems: [
        {
          title: '单位基本信息',
          column: 1,
          // @ts-ignore
          items: getLEGAL_UNIT_INFO_COLUMNS(),
        },
        {
          title: '用户信息',
          column: 1,
          // @ts-ignore
          items: getLEGAL_USER_INFO_COLUMNS(),
        },
        {
          title: '匹配账号',
          column: 1,
          items: [
            {
              label: '',
              key: 'associatedSystemForm',
              render: () => <AssociatedSystemForm form={form} type="legal" />
            },
          ]
        }
      ],
    },
  ];

  return <>
    <TechDetail.Group items={items} dataSource={{ ...LEGAL_UNIT_INFO, ...LEGAL_USER_INFO }}></TechDetail.Group>
  </>
}

export default Step1
