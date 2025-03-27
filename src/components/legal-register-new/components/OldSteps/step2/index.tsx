import { Form, FormInstance } from "antd";
import React, { useEffect, useRef } from "react";

import { createCode, TechDetail, TechDetailGroupItem } from "@szhz/tech-pc";
import AssociatedSystemForm from "@szhz/tech-pc/components/com-pages-componnets/AssociatedSystemForm";
import { getLEGAL_UNIT_INFO_COLUMNS, getLEGAL_USER_INFO_COLUMNS, LEGAL_UNIT_INFO, LEGAL_USER_INFO } from "@szhz/tech-pc/components/com-pages-utils/register";

export interface Step2Props {
  form: FormInstance;
}

const Step2: React.FC<Step2Props> = ({ form }) => {
  const systems = Form.useWatch('xxx', { form, preserve: true })
  const formRef = useRef<any>(null)

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
              render: () => <AssociatedSystemForm ref={formRef} form={form} type="legal" />
            },
          ]
        }
      ],
    },
  ];

  useEffect(() => {
    if (systems) {
      // 从第三步返回第二步，第二步数据不能丢失
      const groupsData = form.getFieldsValue(true)?.groups

      if (groupsData) {
        formRef.current?.openCollapse(groupsData.map((i: any) => i.collapseKey))
        return
      }

      const data = systems?.map((item: any, index: any) => ({
        ...item,
        collapseKey: createCode(),
        isNew: true,
        members: [{ isNew: true, isDefault: index === 0 }],
      }))
      form.setFieldValue('groups', data);

      formRef.current?.openCollapse(data?.map((i: any) => i.collapseKey))
    }
  }, [systems])

  return <>
    <TechDetail.Group items={items} dataSource={{ ...LEGAL_UNIT_INFO, ...LEGAL_USER_INFO }}></TechDetail.Group>
  </>
}

export default Step2
