import React, { useEffect, useState } from 'react';
import EVPI from '../../../EVPI';

export interface FormStepsProps {
  className?: string;
  form?: any;
}

const FormSteps: React.FC<FormStepsProps> = ({ form }) => {
  const [initDepCode, setInitDepCode] = useState(null);

  useEffect(() => {
    const kejijihua = form.getFieldValue('groups')?.find((i: any) => (i?.id === '1'))?.members?.[0]?.uniInfo;
    const { unitNature, area, competentDepartmentCode, competentDepartment, address, postalCode } = kejijihua || {};
    setInitDepCode(competentDepartmentCode);
    form.setFieldsValue({ unitNature, area: area?.split(','), competentDepartmentCode, competentDepartment, address, postalCode })
  }, [form])

  return <>
    <EVPI form={form} initDepCode={initDepCode} />
  </>
}

export default FormSteps
