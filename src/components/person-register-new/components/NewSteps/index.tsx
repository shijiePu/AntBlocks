import { TechDetail, createCode } from '@szhz/tech-pc';
import BindUnitForm from '@szhz/tech-pc/components/com-pages-componnets/BindUnitForm';
import { PERSONINFO, PERSONUUID, getPERSON_INFO_COLUMNS, registerSuccessCallback } from "@szhz/tech-pc/components/com-pages-utils/register";
import { programSystemRegisterByPost } from '@szhz/tech-pc/service/register';
import { Button, Form, Input, message } from 'antd';
import { debounce } from 'lodash-es';
import React, { useEffect, useRef, useState } from 'react';

export interface FormStepsProps {
  className?: string;
}

const FormSteps: React.FC<FormStepsProps> = (props) => {

  const ref = useRef<any>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const infoItems: any = getPERSON_INFO_COLUMNS();

  const onValuesChange = (changeFields: any[]) => {
    const changeDefault = changeFields[0].name?.at(-1) === 'isDefault'

    const allValues = form.getFieldsValue()

    const gIndex = changeFields[0].name?.at(1)

    if (changeDefault) {
      const updatedUnits = allValues.units.map((unit: any, unitIndex: number) => {
        if (unitIndex === gIndex) {
          return { ...unit, isDefault: true };
        } else {
          return { ...unit, isDefault: false };
        }
      });
      form.setFieldsValue({ units: updatedUnits });
    }
  };

  useEffect(() => {
    const code = createCode()
    form.setFieldValue('units', [{ collapseKey: code, isNew: true, isDefault: true }])
    ref.current.openCollapse([code])
  }, [])

  const handleSubmit = debounce(async () => {
    await form.validateFields()

    const values = form.getFieldsValue(true)
    console.log("Form Values:", values);

    try {
      setLoading(true);
      const res = await programSystemRegisterByPost({
        email: values.email,
        oldAccountInfoList: values['units']?.map((unit: any) => {
          return {
            unitId: unit.unit,
            // uuid: unit.history,
            isDefault: !!unit.isDefault,
            dept: unit.dept,
            position: unit.position,
          }
        }) || [],
        ...PERSONINFO,
        thirdCode: PERSONUUID
      })
      if (res) {
        message.success('提交成功')
        registerSuccessCallback();
      }
    } catch {
      setLoading(false);
    }
  }, 300)

  return <>
    <Form
      colon={false}
      form={form}
      labelCol={{ span: 4 }}
      labelAlign="left"
      onFieldsChange={onValuesChange}
    >
      <TechDetail
        title=""
        labelStyle={{ minWidth: 112, maxWidth: 112 }}
        dataSource={PERSONINFO}
        items={infoItems}
        column={1}
      ></TechDetail>

      <Form.Item name="email" label="电子邮箱" rules={[{
        required: true, message: '请输入电子邮箱'
      }, {
        pattern: /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/, message: '请输入正确的电子邮箱'
      }]}>
        <Input max={50} placeholder="电子邮箱" />
      </Form.Item>

      <div style={{ marginBottom: 10 }}>绑定单位</div>
      <BindUnitForm form={form} ref={ref} />
    </Form>
    <div style={{ marginTop: 24, textAlign: 'right' }}>
      <Button loading={loading} type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </div>
  </>
}

export default FormSteps
