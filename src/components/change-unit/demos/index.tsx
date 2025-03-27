import { ChangeUnit } from '@szhz/tech-pc';
import React from 'react';

/**
 * @userCode 当前登录用户
 *
 */

const unitList = [
  {
    orgName: '测试单位1',
    orgCode: 'org_1',
    ifDefault: true
  }
]

export default function CommonUnitInfo() {
  return <ChangeUnit unitList={unitList} color="#333" />
}
