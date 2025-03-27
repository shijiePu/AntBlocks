// import { history } from '@umijs/max';
import { Button, Form, message } from 'antd';
import React, { FC, useEffect } from 'react';

// import appStore from '@/store/app';

import BottomContainer from '../BottomContainer';
import RegistrationForm from '../components/RegistrationForm';

import { TechCard } from '@szhz/tech-pc';
import { updateLegalInfo } from '@szhz/tech-pc/service/global';
import {
  unitSaveInfoByPost,
} from '@szhz/tech-pc/service/unit-info';
console.log('888888888888');

// import { MOCK_DATA } from './constants';

interface UnitFormInfoProps {
  detailData?: any;
  run?: any;
}

const UnitFormInfo: FC<UnitFormInfoProps> = ({ detailData, run }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    await form.validateFields();

    const params = form.getFieldsValue();

    params.area = params.area?.join(',');

    const result = await unitSaveInfoByPost(params);

    if (!result) return;

    message.success('操作成功');

    // appStore.setUnitInfo(false);
    // history.push('/login');
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

  useEffect(() => {
    if (!detailData) return;

    form.setFieldsValue(detailData);
  }, [detailData]);

  console.log('&&&&&&&&&&&&&&&&&&&&***********************');


  return (
    <>
      <TechCard style={{ marginBottom: 80 }}>
        <RegistrationForm form={form} handleUpdateInfo={handleUpdateInfo} detailData={detailData} run={run}></RegistrationForm>
      </TechCard>

      <BottomContainer full={true}>
        {/* <Button onClick={() => form.setFieldsValue(MOCK_DATA)}>
          设置默认值
        </Button> */}
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </BottomContainer>
    </>
  );
};

export default UnitFormInfo;
