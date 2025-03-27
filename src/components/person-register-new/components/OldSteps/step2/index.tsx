import { Form, FormInstance, Input } from "antd";
import React, { useEffect, useRef } from "react";

import { createCode, TechDetail } from "@szhz/tech-pc";
import AssociatedSystemFormPerson from "@szhz/tech-pc/components/com-pages-componnets/AssociatedSystemFormPerson";
import { getPERSON_INFO_COLUMNS, PERSONINFO } from "@szhz/tech-pc/components/com-pages-utils/register";

export interface Step2Props {
  form: FormInstance;
  isRegistry?: boolean
}

const Step2: React.FC<Step2Props> = ({ form, isRegistry = true }) => {

  const systems = Form.useWatch('xxx', { form, preserve: true })
  const infoItems: any = getPERSON_INFO_COLUMNS();
  const formRef = useRef<any>(null)

  useEffect(() => {
    if (systems) {
      const data = systems?.map((item: any, index: any) => ({
        ...item,
        collapseKey: createCode(),
        isNew: true,
        members: [{ isNew: true, isDefault: isRegistry && index === 0 }],
      }))
      form.setFieldValue('groups', data);
      formRef.current?.openCollapse(data?.map((i: any) => i.collapseKey))
    }
  }, [systems])

  return <>
    <TechDetail
      title=""
      labelStyle={{ minWidth: 112, maxWidth: 112 }}
      dataSource={PERSONINFO}
      items={infoItems}
      column={1}
    ></TechDetail>

    {isRegistry && <Form.Item name="email" label="电子邮箱" rules={[{
      required: true, message: '请输入电子邮箱'
    }, {
      pattern: /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/, message: '请输入正确的电子邮箱'
    }]}>
      <Input max={50} placeholder="电子邮箱" />
    </Form.Item>}

    <span style={{ marginBottom: 10 }}>绑定账号</span>
    <AssociatedSystemFormPerson ref={formRef} form={form} />
  </>
}

export default Step2
