/**
 * title: orderType与searchType 为必传字段
 * description: 相关类型已在类型文档上说明
 */
import React from 'react';

import HelpCenterDetail from '../index';

export default () => {
  return <HelpCenterDetail state={{ id: 11, project: '1,2,3,4,5', searchWord: '' }} />;
};
