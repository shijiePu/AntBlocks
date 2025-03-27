import { Button, Form, message, Steps } from 'antd';
import { isString } from 'antd/es/button';
import React, { FC, useEffect, useState } from 'react';

// import appStore from '@/store/app';

import BottomContainer from '../BottomContainer';

// import { history } from '@umijs/max';

import BasicInfoForm from '../components/BasicInfoForm';
import BasicInfoForm2 from '../components/BasicInfoForm2';
import RegistrationForm from '../components/RegistrationForm';

import { TechCard } from '@szhz/tech-pc';
import { updateLegalInfo } from '@szhz/tech-pc/service/global';
import { getUnitBasicInfo, unitSaveInfoByPost } from '@szhz/tech-pc/service/unit-info';

const stepItems = [
  {
    title: '注册登记表',
    key: 0,
  },
  {
    title: '基本情况表',
    key: 1,
  },
];

interface CompanyInfoProps {
  detailData?: any;
  type?: string
  run?: any
}

function joinArray(arr: string[]) {
  if (arr?.includes(',') || isString(arr)) return arr;

  console.log(arr, 'arrarr');

  return arr?.join(',');
}
function splitArray(arr: string) {
  return arr;
}

const needDisPatchKeys = [
  'area',
  'listedRegion',
  'expectedFinancingType',
  'financingStatusObtained',
];

const dispatchParams = (params: Record<string, any>) => {
  needDisPatchKeys.forEach((key) => {
    params[key] = joinArray(params[key]);
  });

  params.taxReductionInfoRequestList = params.taxReductionInfoRequestList?.map(
    (item: any) => {
      delete item.id;

      return item;
    },
  );

  return params;
};

const dispatchEchoData = (data: Record<string, any>) => {
  needDisPatchKeys.forEach((key) => {
    data[key] = splitArray(data[key]);
  });

  console.log(data.certificationNumber, 'data.certificationNumber');
  return data;
};

const CompanyInfo: FC<CompanyInfoProps> = ({ detailData, type, run }) => {
  const [activeKey, setActiveKey] = useState(0);
  const [registrationForm] = Form.useForm();
  const [basicInfoForm] = Form.useForm();
  const [formData, setFormData] = useState<any>(detailData); // 表单数据
  const QYorQT = formData?.unitType === 'enterprise' || formData?.unitType === 'other'
  const [edit, setEdit] = useState(type !== 'detail');

  const FORM_INSTANCE_LIST = [registrationForm, basicInfoForm];

  const handleTabsChange = async (activeKey: number) => {
    setActiveKey(activeKey);
    if (!QYorQT) {
      await getUnitBasicInfo({}).then((res) => {
        if (res) {
          basicInfoForm?.setFieldsValue(res);
        }
      })
    }
  };

  const handleNext = async () => {
    await FORM_INSTANCE_LIST?.[activeKey].validateFields();

    const formData = FORM_INSTANCE_LIST?.[activeKey].getFieldsValue(true);
    // 单位类型为【企业和其他】用户可填写原系统基本情况表；其余类型需调getUnitBasicInfo接口获取单位基本信息
    if (formData?.unitType === 'enterprise' || formData?.unitType === 'other') {
      setFormData((pre: any) => ({ ...pre, ...formData }));
      setActiveKey(1);
    } else {
      await getUnitBasicInfo({}).then((res) => {
        if (res) {
          basicInfoForm?.setFieldsValue(res);
        }
      })
      basicInfoForm?.setFieldValue('unitRegistrationType', formData.unitType);
      setFormData((pre: any) => ({ ...pre, ...formData }));
      setActiveKey(1);
    }
  };

  const echoPageData = () => {
    if (!detailData) return;

    const data = dispatchEchoData(detailData);

    // 设置默认数据
    FORM_INSTANCE_LIST.forEach((form) => {
      form.setFieldsValue(data);
    });
  };

  useEffect(() => {
    echoPageData();
    setFormData(detailData);
  }, [detailData]);

  const handleSubmit = async () => {
    await basicInfoForm.validateFields();

    const basicInfoFormData = FORM_INSTANCE_LIST?.[activeKey].getFieldsValue();
    // 单位类型为【企业和其他】参数铺平；其余类型都塞进unitBasicInfoReq中
    const basicInfoParams = QYorQT ? basicInfoFormData : { unitBasicInfoReq: basicInfoFormData }
    let params = {
      ...formData,
      ...basicInfoParams,
    };

    params = dispatchParams(params);

    const result = await unitSaveInfoByPost({ ...params, unitNature: params?.unitType });

    if (!result) return;

    message.success('操作成功');
    setEdit(false)
    // appStore.setUnitInfo(false);

    // history.push('/home');
  };


  // 根据身份证号判断性别
  function getGenderByID(idNumber: string) {
    if (!idNumber || idNumber.length !== 18) {
      return 'MALE'
    }

    const sexCode = parseInt(idNumber.charAt(16), 10);
    if (sexCode % 2 === 0) {
      return 'FEMALE'; // 偶数代表女性
    } else {
      return 'MALE'; // 奇数代表男性
    }
  }

  const handleUpdateInfo = async () => {
    const baseInfo = localStorage.getItem('JSKJT_LOGIN_LEGAL_INFO')
    const state = JSON.parse(baseInfo || '{}')?.result ?? {}

    console.log(state, 'state---')
    const res = await updateLegalInfo({
      idNumber: state?.userLegalInfo?.certNo,
      name: state?.userLegalInfo?.corUserName,
      mobile: state?.mobile,
      corporationName: state?.userLegalInfo?.corporationName,
      corporationType: state?.userLegalInfo?.corporationType,
      creditCode: state?.userLegalInfo?.creditCode,
      gender: getGenderByID(state?.userLegalInfo?.certNo),
    }).catch((err) => {
      message.error(err.msg)
      return false
    })

    if (res) {
      message.success('平台已成功更新了您的信息。为了使更改生效，请您退出账户后重新登录，即可查看最新的用户资料。')
    }
  }

  return (
    <div>
      <TechCard hasBottomPadding>
        <Steps
          style={{ width: '60%', margin: '0 auto' }}
          current={activeKey}
          items={stepItems}
        />
      </TechCard>

      <TechCard style={{ marginBottom: 60 }}>
        {activeKey === 0 && (
          <RegistrationForm edit={edit} form={registrationForm} handleUpdateInfo={handleUpdateInfo} detailData={detailData} run={run}></RegistrationForm>
        )}
        {activeKey === 1 && (
          (QYorQT ?
            <BasicInfoForm edit={edit} form={basicInfoForm}></BasicInfoForm>
            :
            <BasicInfoForm2 edit={edit} form={basicInfoForm} />
          )
        )}
      </TechCard>

      {!edit ? (
        <BottomContainer full={true}>
          {activeKey === 1 && (
            <Button onClick={() => handleTabsChange(0)} size="large">
              上一步
            </Button>
          )}

          {activeKey === 0 && (
            <Button type="primary" onClick={() => handleTabsChange(1)} size="large">
              下一步
            </Button>
          )}
          <Button type="primary" size="large" onClick={() => setEdit(true)}>
            编辑
          </Button>
        </BottomContainer>
      ) : (
        <BottomContainer full={true}>
          {/* <Button
          onClick={() =>
            registrationForm.setFieldsValue(REGISTRATION_MOCK_DATA)
          }
        >
          设置注册登记表默认值
        </Button>
        <Button onClick={() => basicInfoForm.setFieldsValue(BASE_INFO_DATA)}>
          设置接触信息
        </Button> */}

          {activeKey === 1 && (
            <Button onClick={() => handleTabsChange(0)} size="large">
              上一步
            </Button>
          )}

          {activeKey === 0 && (
            <Button type="primary" onClick={handleNext} size="large">
              下一步
            </Button>
          )}

          {activeKey === 1 && (
            <Button type="primary" size="large" onClick={handleSubmit}>
              提交
            </Button>
          )}
        </BottomContainer>
      )}
    </div>
  );
};

export default CompanyInfo;
