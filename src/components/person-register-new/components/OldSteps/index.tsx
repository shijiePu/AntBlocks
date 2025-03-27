import { PERSONINFO, PERSONUUID, registerSuccessCallback } from '@szhz/tech-pc/components/com-pages-utils/register';
import { programSystemOldAccountByPost, programSystemRegisterByPost } from '@szhz/tech-pc/service/register';
import { Button, Form, message, Steps } from 'antd';
import { debounce } from 'lodash-es';
import React, { useState } from 'react';

import Step1 from './step1';
import Step2 from './step2';

export interface FormStepsProps {
  isRegistry?: boolean; // 注册还是新增
  refresh?: () => void
}

const FormSteps: React.FC<FormStepsProps> = ({ isRegistry = true, refresh }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: '选择关联平台',
      content: <Step1 form={form} />,
    },
    {
      title: '关联历史账号',
      content: <Step2 form={form} isRegistry={isRegistry} />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    marginTop: 16,
  };

  const onValuesChange = (changeFields: any[]) => {
    const changeDefault = changeFields[0].name?.at(-1) === 'isDefault'

    const allValues = form.getFieldsValue()

    const gIndex = changeFields[0].name?.at(1)
    const mIndex = changeFields[0].name?.at(3)

    if (changeDefault) {

      const updatedGroups = allValues.groups.map((group: any, groupIndex: number) => ({
        ...group,
        members: group.members.map((member: any, memberIndex: number) => {

          if (groupIndex === gIndex && mIndex === memberIndex) {
            return { ...member, isDefault: true };
          }

          return { ...member, isDefault: false };
        }),
      }));
      form.setFieldsValue({ groups: updatedGroups });
    }
  };

  const handleSubmit = debounce(async () => {
    await form.validateFields()

    const values = form.getFieldsValue(true)

    const oldAccountInfoList: any[] = []

    values['groups'].forEach((group: any) => {
      group.members.forEach((m: any) => {
        oldAccountInfoList.push({
          unitId: m.unit,
          uuid: m.history,
          isDefault: !!m.isDefault
        })
      })
    })

    let res

    try {
      setLoading(true);
      if (isRegistry) {
        res = await programSystemRegisterByPost({
          email: values.email,
          oldAccountInfoList,
          ...PERSONINFO,
          thirdCode: PERSONUUID
        })
      } else {
        res = await programSystemOldAccountByPost(oldAccountInfoList)
      }
    } catch {
      setLoading(false);
    }

    if (res) {
      message.success('提交成功')
      if (isRegistry) {
        registerSuccessCallback();
      } else {
        refresh?.()
      }
    }
  }, 300)

  return <>
    <Form
      colon={false}
      form={form}
      labelCol={{ span: 4 }}
      labelAlign="left"
      onFieldsChange={onValuesChange}
    // initialValues={{
    //   groups: [
    //     {
    //       name: "江苏省科技计划管理信息平台",
    //       isNew: false,
    //       members: [{ name: "关联账号1", history: '', isNew: false, unit: '', isDefault: true }, { name: "关联账号2", isNew: true, history: '', unit: '' }]
    //     }
    //   ]
    // }}
    >
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
    </Form>
    <div style={{ marginTop: 48, textAlign: 'right' }}>
      {current > 0 && (
        <Button disabled={current === 1} style={{ margin: '0 8px' }} onClick={() => prev()}>
          上一步
        </Button>
      )}
      {current < steps.length - 1 && (
        <Button type="primary" onClick={async () => {
          await form.validateFields()
          next()
        }}>
          下一步
        </Button>
      )}

      {current === steps.length - 1 && (
        <Button loading={loading} type="primary" onClick={handleSubmit}>
          提交
        </Button>
      )}

    </div>
  </>
}

export default FormSteps
