/**
 * title: 分布式表单开发模板
 * background: rgba(42, 46, 54, 0.04)
 * transform: true
 */

import { Button, Form, FormInstance, message, Space, Steps } from 'antd';
import { history } from 'dumi';
import React, { FC, useEffect } from 'react';

import {
  TechCard,
  TechConfirm,
  TechErrorBoundary,
  TechForm,
  TechFormItems,
  TechNoData,
} from '@szhz/tech-pc';
import useStepForm from '@szhz/tech-pc/hooks/useStepForm';

const stepsItems = [
  {
    title: '分布表单一',
    key: 0,
  },
  {
    title: '分布表单二',
    key: 8,
  },
];

const formItems: TechFormItems[] = [
  {
    type: 'input',
    label: '用户名称',
    name: 'userName',
    required: '请输入用户名称',
  },
  {
    label: '组件库时间选择',
    type: 'TechDatePicker',
    name: 'SDatePicker',
  },
];

interface StepFormProps {
  form: FormInstance<any>;
  formName?: string;
}

const Form1: FC<StepFormProps> = ({ form, formName }) => {
  // 该表单所有的值都存放在 formName
  return (
    <TechForm form={form} formName={formName} items={formItems}></TechForm>
  );
};

const Form2: FC<StepFormProps> = ({ form }) => {
  return <TechForm form={form} items={formItems}></TechForm>;
};

const StepForm = () => {
  // 项目基本情况
  const [step1Form] = Form.useForm();
  const [step2Form] = Form.useForm();

  const formInstanceList = [step1Form, step2Form];

  // formData 表单填写的数据
  const { formData, current, handleNext, handlePrevious } = useStepForm({
    formInstanceList,
  });

  // 提交数据
  const handleSubmit = async (type: 'save' | 'submit') => {
    // 如果是提交，则需要校验最后一步表单
    if (type === 'submit') {
      const currentFormInstance = formInstanceList?.[current];
      await currentFormInstance?.validateFields();
    }

    const params = formData;

    const res = await fetch('/api/stepForm', params);

    if (!res) return;

    if (type === 'submit') {
      message.success('提交成功');
      // 跳转路由
      return;
    }

    message.success('保存成功');
  };

  // 获取表单详情数据
  const getFormDetailData = async () => {
    // 获取详情数据
    const detailData = await (async () => ({}));

    if (!detailData) return;

    // ...对详情数据的处理加工

    // 设置表单数据
    formInstanceList.forEach((formInstance) => {
      formInstance.setFieldsValue(detailData);
    });
  };

  useEffect(() => {
    getFormDetailData();
  }, []);

  const formStepMap: Record<number, any> = {
    0: <Form1 formName="cover" form={step1Form} />,
    1: <Form2 form={step2Form} />,
  };

  const RenderButtons = () => {
    return (
      <Space>
        <Button onClick={() => history.back()}>取消</Button>
        <Button
          onClick={() => {
            handleSubmit('save');
          }}
        >
          保存草稿
        </Button>

        {current !== 0 && <Button onClick={handlePrevious}>上一页</Button>}
        {current !== formInstanceList?.length - 1 && (
          <Button type="primary" onClick={() => handleNext()}>
            下一步
          </Button>
        )}

        {current === formInstanceList?.length - 1 && (
          <TechConfirm
            title="提交"
            description="是否确认提交"
            confirm={() => {
              handleSubmit('submit');
            }}
          >
            <Button type="primary">提交</Button>
          </TechConfirm>
        )}
      </Space>
    );
  };

  return (
    <>
      <TechCard hasBottomPadding style={{ overflow: 'auto' }}>
        <Steps current={current} items={stepsItems} />
      </TechCard>

      <TechCard hasBottomPadding>
        <TechErrorBoundary>
          {formStepMap?.[current] ?? <TechNoData />}
        </TechErrorBoundary>
      </TechCard>

      {/* 实际使用时请替换为 TechBottomContainer */}
      <TechCard>{RenderButtons()}</TechCard>
    </>
  );
};

export default StepForm;
