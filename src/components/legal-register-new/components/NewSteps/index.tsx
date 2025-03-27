import { handleSubmitLegal } from '@szhz/tech-pc/components/com-pages-utils/register';
import { Button, Form } from 'antd';
import { debounce } from 'lodash-es';
import React, { useState } from 'react';
import EVPI from '../EVPI';

export interface FormStepsProps {
  className?: string;
}

const FormSteps: React.FC<FormStepsProps> = ({ }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  return <>
    <EVPI form={form} />
    <div style={{ marginTop: 24, textAlign: 'right' }}>
      <Button loading={loading} type="primary" onClick={debounce(() => { handleSubmitLegal(form, true, () => { }, setLoading) }, 300)}>
        提交
      </Button>
    </div>
  </>
}

export default FormSteps
