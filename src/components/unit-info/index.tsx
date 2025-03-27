import { useRequest } from 'ahooks';
import { Tag } from 'antd';
import { cloneDeep } from 'lodash-es';
import React, { useMemo } from 'react';

import CompanyInfo from './company-info';
import UnitFormInfo from './unit-form-info';

import { TechPageTitle, TechSpinLoading } from '@szhz/tech-pc';
import { unitQueryInfoByGet } from '@szhz/tech-pc/service/unit-info';
import { getSexFromID } from '@szhz/tech-pc/utils/common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBirthDateFromIdCard(idCard: string) {
  // 验证身份证号码是否为18位
  if (!/^\d{18}$/.test(idCard)) {
    console.error('身份证号码格式不正确');
    return null;
  }

  // 提取出生年月日部分
  const birthYear = parseInt(idCard.substr(6, 4));
  const birthMonth = parseInt(idCard.substr(10, 2));
  const birthDay = parseInt(idCard.substr(12, 2));

  // 创建日期对象
  let birthDate = new Date(birthYear, birthMonth - 1, birthDay); // 注意月份是从0开始计数的，所以要减1

  // 验证日期有效性
  if (isNaN(birthDate.getTime())) {
    console.error('出生日期无效');
    return null;
  }

  // return dayjs(birthDate);
  return birthYear + '-' + (birthMonth + 1) + '-' + birthDay;
}

const TechUnitInfo = (props: any) => {
  const { run, data: unitData, loading: pageLoading } = useRequest(
    unitQueryInfoByGet,
    {},
  );

  const detailData = useMemo(() => {
    if (!unitData) return {};

    const localData = cloneDeep(unitData);

    localData.area = localData.area?.split(',') as any;
    localData.listedRegion = localData.listedRegion?.split(',') as any;
    // @ts-ignore
    localData.corporateSex = localData.corporateSex ? localData.corporateSex : getSexFromID(localData?.corUserCertNo); // 苏服码没有带回性别，通过身份证号转换性别
    // @ts-ignore
    localData.birthDate = localData.birthDate ? localData.birthDate : getBirthDateFromIdCard(localData?.corUserCertNo); // 苏服码没有带回出生年月，通过身份证号转换出生年月

    return localData;
  }, [unitData]);

  const activeKey = useMemo(() => {
    // if (unitData?.unitType === 'enterprise') return '2';

    // return '1';
    return '2';
  }, [unitData]);

  return (
    <div>
      <TechPageTitle
        goBack
        titleDesc={
          detailData?.updateTime && (
            <Tag color="success">{detailData?.updateTime ?? ''}</Tag>
          )
        }
      >
        单位信息
      </TechPageTitle>
      <TechSpinLoading spinning={pageLoading}>
        {activeKey === '1' && (
          <UnitFormInfo {...props} detailData={detailData} run={run}></UnitFormInfo>
        )}
        {activeKey === '2' && (
          <CompanyInfo {...props} detailData={detailData} run={run}></CompanyInfo>
        )}
      </TechSpinLoading>
    </div>
  );
};

export default TechUnitInfo;
