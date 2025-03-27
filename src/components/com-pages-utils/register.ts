// 从统一信用代码中截取组织机构代码
export const extractOrgCode = (unifiedSocialCreditCode: string) => {
  // 检查输入是否为18位的字符串
  if (typeof unifiedSocialCreditCode !== 'string' || unifiedSocialCreditCode.length !== 18) {
    return '';
  }

  // 截取第9到第17位作为组织机构代码
  return unifiedSocialCreditCode.slice(8, 17);
}

// 从苏福码登录获取到的单位信息、法人信息
const JSKJT_LOGIN_LEGAL_INFO = JSON.parse(localStorage.getItem('JSKJT_LOGIN_LEGAL_INFO') || '{}')?.result;
export const userLegalInfo = JSKJT_LOGIN_LEGAL_INFO?.userLegalInfo;
// 单位基本信息
export const LEGAL_UNIT_INFO = {
  corporationName: userLegalInfo?.corporationName,
  creditCode: userLegalInfo?.creditCode,
  corporationType: userLegalInfo?.corporationType,
  institutionCode: extractOrgCode(userLegalInfo?.creditCode),
  corUserName: userLegalInfo?.corUserName,
  corUserCertType: userLegalInfo?.corUserCertType,
  corUserCertNo: userLegalInfo?.corUserCertNo,
}
export const LEGALUUID = userLegalInfo?.uuid

// 用户信息
export const LEGAL_USER_INFO = {
  userRole: userLegalInfo?.corUserRole,
  name: userLegalInfo?.name,
  idType: userLegalInfo?.corUserRole === '2' ? userLegalInfo?.corUserCertType : userLegalInfo?.certType,
  idNumber: userLegalInfo?.corUserRole === '2' ? userLegalInfo?.corUserCertNo : userLegalInfo?.certNo,
  mobile: JSKJT_LOGIN_LEGAL_INFO?.mobile,
}
/**                 从苏福码登录获取到的个人信息                    */
const JSKJT_LOGIN_PERSON_INFO = JSON.parse(localStorage.getItem('JSKJT_LOGIN_PERSON_INFO') || '{}')?.result;
const userNaturalInfo = JSKJT_LOGIN_PERSON_INFO?.userNaturalInfo;
export const PERSONUUID = userNaturalInfo?.uuid
export const PERSONINFO = {
  name: userNaturalInfo?.name,
  mobile: JSKJT_LOGIN_PERSON_INFO?.mobile,
  idType: userNaturalInfo?.certType,
  idNumber: userNaturalInfo?.certNo
}

import useGetDict from '@szhz/tech-pc/hooks/useGetDictData';
export const getPERSON_INFO_COLUMNS = () => {
  const { dictData } = useGetDict({ dictKey: 'idTypeSimple' });
  return [
    {
      label: '姓名',
      key: 'name',
    },
    {
      label: '手机号',
      key: 'mobile',
    },
    {
      label: '证件类型',
      key: 'idType',
      type: 'dict',
      dictMap: dictData,
    },
    {
      label: '证件号码',
      key: 'idNumber',
    },
  ];
}

// 法人-单位信息
export const getLEGAL_UNIT_INFO_COLUMNS = () => {
  const { dictData } = useGetDict({ dictKey: 'idTypeSimple' });
  return [
    {
      label: '单位名称',
      key: 'corporationName',
    },
    {
      label: '统一社会信用代码',
      key: 'creditCode',
    },
    // {
    //   label: '单位类型',
    //   key: 'corporationType',
    //   type: 'dict',
    //   dictMap: dictData['nationality'],
    // },
    {
      label: '组织结构代码',
      key: 'institutionCode',
    },
    {
      label: '法定代表人姓名',
      key: 'corUserName',
    },
    {
      label: '法定代表人证件类型',
      key: 'corUserCertType',
      type: 'dict',
      dictMap: dictData,
    },
    {
      label: '法定代表人证件号',
      key: 'corUserCertNo',
    },
  ]
}

// 法人-用户信息
export const getLEGAL_USER_INFO_COLUMNS = () => {
  const { dictData } = useGetDict({ dictKey: 'idTypeSimple' });
  return [
    {
      label: '用户角色',
      key: 'userRole',
      render: (text: any, record: any) => {
        return text === '2' ? '法定代表人' : text === '3' ? '经办人' : '';
      },
    },
    {
      label: '姓名',
      key: 'name',
    },
    {
      label: '证件类型',
      key: 'idType',
      type: 'dict',
      dictMap: dictData,
    },
    {
      label: '证件号码',
      key: 'idNumber',
    },
    {
      label: '联系方式',
      key: 'mobile',
    },
  ]
}


// 法人注册
import { bindLegalAccountRegister, legalRegister } from "@szhz/tech-pc/service/register";
import { message } from 'antd';

export const handleSubmitLegal = async (form: any, isRegistry = true, refresh?: any, setLoading?: any) => {
  console.log(form.getFieldsValue(true))
  await form.validateFields();

  const values = form.getFieldsValue(true)
  const { groups, unitNature, area, competentDepartmentCode, competentDepartment, address, postalCode, businessLicenseFileInfo } = values;

  // 关联老账号uuid集合，保留匹配到且已确认的数据 + 新增的数据
  let oldUuidList: any = [];
  groups?.forEach((platform: any) => {
    platform?.members?.forEach((member: any) => {
      if (member.isNew || member.confirm === 'yes') {
        oldUuidList.push(member.uniInfo?.uuid);
      }
    });
  });
  const params = {
    ...LEGAL_UNIT_INFO,
    ...LEGAL_USER_INFO,
    thirdCode: userLegalInfo?.creditCode,
    oldUuidList,
    unitType: unitNature, unitNature, area: area?.join(','), competentDepartmentCode, competentDepartment, address, postalCode, businessLicenseFileInfo
  };

  let result
  try {
    setLoading(true);
    if (isRegistry) {
      result = await legalRegister(params);
    } else {
      result = await bindLegalAccountRegister({ oldUuidList });
    }
  } catch {
    setLoading(false);
  }

  if (result) {
    message.success('提交成功');
    if (isRegistry) {
      registerSuccessCallback()
    } else {
      refresh?.()
    }
  }
};

export const registerSuccessCallback = () => {
  // if (localStorage.getItem('isLoginFromHome') === 'true') {
  //   window.location.href = `${window.location.origin}/js-home/home`;
  // } else {
  window.location.href = `${window.location.origin}/${window.location.pathname?.split('/')[1]}/`;
  // }
};
