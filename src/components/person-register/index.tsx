import { useRequest } from 'ahooks';
import { Button, Form, message, Space } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

import {
  BindUnit,
  TechCard,
  TechForm,
  TechFormItems,
  TechPageTitle
} from '@szhz/tech-pc';
import { updatePersonInfo } from '@szhz/tech-pc/service/global';
import {
  personInfo,
  programSystemRegisterByPost,
  savePersonInfo
} from '@szhz/tech-pc/service/register';



interface PersonRegisterProps {
  state?: any;
  handleToHome?: Function;
  goBack?: boolean;
}

const PersonRegister = (props: PersonRegisterProps) => {
  const { state, handleToHome, goBack } = props || {};
  // const state = useLocation().state ?? ({} as any);
  const { userNaturalInfo, type } = state || {};
  // const isDetail = type === 'detail';
  const isDetail = true;
  console.log('state', state);
  const [edit, setEdit] = useState(!isDetail);
  const [personData, setPersonData] = useState({} as any);
  console.log('edit', edit);

  const [form] = Form.useForm();

  const uuid = useMemo(() => {
    if (!state) return null;

    return state?.userNaturalInfo?.uuid;
  }, [state]);

  const { run: register } = useRequest(programSystemRegisterByPost, {
    manual: true,
  });

  useEffect(() => {
    if (!isDetail) return;
    personInfo().then((res) => {
      console.log('res', res);
      form.setFieldsValue(res);
      setPersonData(res);
    });
  }, [type]);

  const items: TechFormItems[] = [
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
      },
    },
    {
      label: '真实姓名',
      name: 'name',
      type: 'input',
      fieldProps: {
        disabled: true,
      },
    },
    {
      label: 'Email',
      name: 'email',
      type: 'input',
      required: '请输入正确的Email',
      itemProps: {
        rules: [
          {
            required: true,
            validator(rule: any, value: any) {
              const RegExp = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
              if (!value) {
                return Promise.reject('');
              } else {
                if (!RegExp.test(value)) {
                  return Promise.reject('请输入正确的Email');
                }
              }
              return Promise.resolve();
            },
          },
        ],
      },
    },
    {
      label: '手机号码',
      name: 'mobile',
      type: 'input',
      fieldProps: {
        disabled: true,
      },
    },
  ];

  const handleUpdate = async () => {
    const info = localStorage.getItem('JSKJT_LOGIN_PERSON_INFO')
    const result = JSON.parse(info || '{}')?.result ?? {}

    const res = await updatePersonInfo({
      idNumber: result?.userNaturalInfo?.certNo,
      idType: result?.userNaturalInfo?.certType,
      mobile: result?.mobile,
      name: result?.userNaturalInfo?.name,
    }).catch((err) => {
      message.error(err.msg)
      return false
    })

    console.log('----', res)

    if (res) {
      // 更新成功，刷新页面
      message.success('平台已成功更新了您的信息。为了使更改生效，请您退出账户后重新登录，即可查看最新的用户资料。')
    }

  }

  // 提交表单
  const submitApply = async () => {
    await form.validateFields();
    const formParams = form.getFieldsValue();
    const params = {
      ...formParams,
      thirdCode: uuid || personData.thirdCode,
    };

    const api = isDetail ? savePersonInfo : register;
    const result = await api(params);
    console.log('result', result);

    if (!isDetail) {
      message.success('提交成功');
      handleToHome && handleToHome();
      // history.push('/login');
    } else {
      message.success('提交成功');
      setEdit(false);
    }

    // if (!result) return;
    // message.success('提交成功');
  };
  return (
    <div style={{ position: 'relative' }}>
      <TechPageTitle
        title={isDetail ? '个人信息' : '个人注册'}
        goBack={isDetail}
      ></TechPageTitle>
      <div>
        <TechCard>
          {isDetail && <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', marginBottom: 6 }}>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 12 }}>
              <span>更新说明：</span>
              <span>本系统的用户信息源自江苏政务服务网统一身份认证平台。如需更新或修改证件类型、证件号码、真实姓名、手机号，请前往江苏政务服务网统一身份认证平台进行操作。</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', gap: 10, alignItems: 'center' }}>
              <Button disabled={!localStorage.getItem('JSKJT_LOGIN_PERSON_INFO')} type="primary" onClick={handleUpdate}>一键更新</Button>
              <Space>
                {edit ? (
                  <Button type="primary" onClick={submitApply}>
                    提交
                  </Button>
                ) : (
                  <Button type="primary" onClick={() => setEdit(true)}>
                    编辑
                  </Button>
                )}
              </Space>
            </div>
          </div>}
          <TechForm
            readonly={!edit}
            initialValues={{
              ...userNaturalInfo,
              mobile: state?.mobile,
              idType: userNaturalInfo?.certType,
              idNumber: userNaturalInfo?.certNo,
            }}
            items={items}
            columns={2}
            form={form}
          ></TechForm>
          {/* {isDetail ? (
            <>
              {' '}
              <TechPageTitle type="form" title={'绑定状态'}></TechPageTitle>
              <div>
                {personData?.orgName}{' '}
                <Tag color={personData?.orgCode ? 'green' : 'red'}>
                  {personData?.orgCode ? '已绑定' : '未绑定'}
                </Tag>{' '}
              </div>
            </>
          ) : null} */}
        </TechCard>
        <div style={{ marginTop: 16 }}>
          <TechCard>
            <BindUnit firstBind={false} />
          </TechCard>
        </div>
        {/* <div
          style={{
            position: 'fixed',
            bottom: '16px',
            width: `calc(100% - 60px)`,
            background: '#fff',
            padding: '16px 24px',
            boxShadow: '0px -9px 7px 0px rgba(0,0,0,0.04)',
            display: 'flex',
            justifyContent: 'flex-end',
            borderRadius: '8px',
          }}
        >
          <Space>
            {edit ? (
              <Button type="primary" onClick={submitApply}>
                提交
              </Button>
            ) : (
              <Button type="primary" onClick={() => setEdit(true)}>
                编辑
              </Button>
            )}
          </Space>
        </div> */}
      </div>
    </div>
  );
};

export default PersonRegister;
