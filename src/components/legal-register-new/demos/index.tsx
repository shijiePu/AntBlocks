/**
 * title: orderType与searchType 为必传字段
 * description: 相关类型已在类型文档上说明
 */
import { message } from 'antd';
import React from 'react';

import TechLegalRegisterNew from '../index';

export default () => {
  return <TechLegalRegisterNew handleToLogin={() => { message?.success('注册成功，跳转到登录页') }} />;
};
