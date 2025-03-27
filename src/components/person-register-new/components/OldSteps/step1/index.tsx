import ChooseSystem from "@szhz/tech-pc/components/com-pages-componnets/ChooseSystem";
import { Form } from 'antd';
import { FormInstance } from "antd/lib";
import React from "react";

export interface Step1Props {
  form?: FormInstance;
}

const Step1: React.FC<Step1Props> = ({ form }) => {
  return <>
    <Form.Item name="xxx" rules={[{ required: true, type: 'array', message: '请选择关联平台' }]}>
      <ChooseSystem type="person" />
    </Form.Item>
  </>
}

export default Step1
