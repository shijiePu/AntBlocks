import TreeSelect from '@szhz/tech-pc/components/com-pages-componnets/TreeSelect';
import { useRequest } from 'ahooks';
import { Button, Form, message, Space } from 'antd';
import React, { useMemo } from 'react';

import Modal from './Modal';

import {
  TechCard,
  TechForm,
  TechPageTitle
} from '@szhz/tech-pc';
import { legalRegister } from '@szhz/tech-pc/service/register';

interface PersonRegisterProps {
  state?: any;
  handleToLogin?: Function;
  handleToHome?: Function;
  againBindDep?: boolean
  unitId?: any
  msg?: any
}

const PersonRegister = (props: PersonRegisterProps) => {
  const { state, handleToLogin, handleToHome, againBindDep, unitId, msg } = props || {};
  // const state = useLocation().state ?? ({} as any);
  const { userLegalInfo, type } = state || {};
  const isDetail = type === 'detail';
  console.log('state', state);

  const [form] = Form.useForm();

  const uuid = useMemo(() => {
    if (!state) return null;

    return state?.userLegalInfo?.uuid;
  }, [state]);

  const { run: register } = useRequest(legalRegister, {
    manual: true,
  });

  const Items = useMemo(() => {
    return [
      {
        label: '单位名称',
        name: 'corporationName',
        type: 'input',
        fieldProps: {
          placeholder: '请输入',
        },
        itemProps: {
          rules: [{ required: true, message: '请输入' }],
        },
      },
      {
        label: '单位类型',
        name: 'unitType',
        type: 'select',
        fieldProps: {
          // disabled: true,
          dict: {
            enterprise: '企业',
            educational_institution: '教育机构',
            scientific_research_institution: '科研机构',
            government_functional_department: '政府职能部门',
          },
        },
      },
      {
        label: '统一社会信用代码',
        name: 'creditCode',
        type: 'input',
        fieldProps: {
          disabled: true,
        },
      },
      {
        label: '证件类型',
        name: 'idType',
        type: 'select',
        fieldProps: {
          disabled: true,
          dict: {
            111: '身份证',
            516: '港澳通行证',
            511: '台湾通行证',
            553: '外籍人士永久居留证',
          },
        },
      },
      {
        label: '证件号码',
        name: 'idNumber',
        type: 'input',
        fieldProps: {
          disabled: true,
          placeholder: '请输入',
        },
        itemProps: {
          rules: [{ required: true, message: '请输入' }],
        },
      },
      {
        label: '法人姓名',
        name: 'name',
        type: 'input',
        fieldProps: {
          placeholder: '请输入',
        },
        itemProps: {
          rules: [{ required: true, message: '请输入' }],
        },
      },
      {
        label: '手机号码',
        name: 'mobile',
        type: 'input',
        fieldProps: {
          placeholder: '请输入',
        },
        itemProps: {
          rules: [{ required: true, message: '请输入' }],
        },
      },
      {
        label: '单位性质',
        name: 'unitNature',
        type: 'select',
        required: '请选择单位性质',
        fieldProps: {
          dictKey: 'unitNature',
        },
      },
      {
        label: '主管部门',
        name: 'competentDepartmentCode',
        required: '请选择主管部门',
        customCom: <TreeSelect form={form} field="competentDepartment" />,
      },
      {
        label: '主管部门',
        name: 'competentDepartment',
        type: 'select',
        hidden: true,
      },
    ];
  }, [])

  // 提交表单
  const submitApply = async () => {
    await form.validateFields();
    const formParams = form.getFieldsValue(true);
    const params = {
      ...formParams,
      thirdCode: formParams.creditCode,
      competentDepartmentName: '111',
      corporationType: userLegalInfo?.corporationType,
    };
    // if (id) {
    //   params.id = id;
    // }
    const result = await register(params);
    console.log('result', result);
    message.success('提交成功');
    handleToLogin && handleToLogin();
    // history.push('/login');
    // if (!result) return;
    // message.success('提交成功');
  };
  return againBindDep ? (
    <Modal unitId={unitId} handleToHome={handleToHome} msg={msg} />
  )
    : (
      <div style={{ position: 'relative' }}>
        <TechPageTitle
          title={isDetail ? '法人信息' : '法人注册'}
        // goBack
        ></TechPageTitle>
        <div>
          <TechCard>
            <TechForm
              initialValues={{
                ...userLegalInfo,
                idType: userLegalInfo?.certType,
                idNumber: userLegalInfo?.certNo,
                name: userLegalInfo?.corUserName,
              }}
              // @ts-ignore
              items={Items}
              columns={2}
              form={form}
            ></TechForm>
          </TechCard>

          <div
            style={{
              position: 'fixed',
              bottom: '16px',
              width: 'calc(100% - 32px)',
              background: '#fff',
              padding: '16px 24px',
              boxShadow: '0px -9px 7px 0px rgba(0,0,0,0.04)',
              display: 'flex',
              justifyContent: 'flex-end',
              borderRadius: '8px',
            }}
          >
            <Space>
              {/* <Button onClick={routerListPage}>取消</Button> */}
              <Button type="primary" onClick={submitApply}>
                提交
              </Button>
            </Space>
          </div>
        </div>
      </div>
    );
};

export default PersonRegister;
