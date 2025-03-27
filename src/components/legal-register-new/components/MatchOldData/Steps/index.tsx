import { Button, Form, message, Steps } from 'antd';
import React, { useEffect, useState } from 'react';

import Step1 from './step1';
import Step2 from './step2';

import { handleSubmitLegal } from '@szhz/tech-pc/components/com-pages-utils/register';
import useGetDict from '@szhz/tech-pc/hooks/useGetDictData';
import { debounce } from 'lodash-es';

export interface FormStepsProps {
  oldSystemUserInfoMap?: any;
  handleToLogin?: any
  isRegistry?: boolean;
  refresh?: () => void
}

const FormSteps: React.FC<FormStepsProps> = ({ oldSystemUserInfoMap, isRegistry = true, refresh }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);

  const { dictData } = useGetDict({ dictKey: 'BizSystemTypeEnum' });

  const steps = [
    {
      title: '关联历史账号',
      content: <Step1 form={form} />,
    },
    {
      title: '完善信息',
      content: <Step2 form={form} />,
      hide: !isRegistry
    },
  ].filter(i => !i.hide)

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

  useEffect(() => {
    if (oldSystemUserInfoMap) {
      const groups = Object.keys(oldSystemUserInfoMap).map(systemId => {
        return {
          id: systemId,
          name: dictData?.[systemId],
          isNew: false,
          members: oldSystemUserInfoMap[systemId].map((member: any) => {
            return {
              ...member,
              isNew: false,
              confirm: 'yes',
              uniInfo: member
            }
          })
        }
      })
      form.setFieldValue('groups', groups)
    }
  }, [])

  return <>

    <Form
      prefixCls="register-form"
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
    <div style={{ marginTop: 24, textAlign: 'right' }}>
      {current > 0 && (
        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
          上一步
        </Button>
      )}
      {current < steps.length - 1 && (
        <Button type="primary" onClick={async () => {
          await form.validateFields()
          // 还需要校验账户是否全部确认过了
          const values = form.getFieldsValue()
          const hasNoConfirm = values?.groups?.some((v: any) => {
            return v.members.some((m: any) => {
              if (!m.isNew && !m.confirm) {
                return true
              }
              return false
            })
          })
          if (hasNoConfirm) {
            message.error('请逐个确认账号是否属于当前企业')
            return
          }
          next()
        }}>
          下一步
        </Button>
      )}

      {current === steps.length - 1 && (
        <Button loading={loading} type="primary" onClick={debounce(() => { handleSubmitLegal(form, isRegistry, refresh, setLoading) }, 300)}>
          提交
        </Button>
      )}

    </div>
  </>
}

export default FormSteps
