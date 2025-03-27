import { requestGet, requestPost } from '@szhz/tech-pc/plugins/request';

/**
 * @description 查询用户操作日志
 * @tags 操作日志
 * @request get:/program-manage/unit/confirm-info
 */
export const getUserOperationLogList = (data: any) =>
  requestPost('/szjs-api/gateway/program/api/v1/opt/log/searchUserLog', data);

/**
 * @description 查询用户操作日志详情
 * @tags 操作日志
 * @request get:/program-manage/unit/confirm-info
 */
export const getUserOperationLogDetail = (data: any) =>
  requestGet('/szjs-api/gateway/program/api/v1/opt/log/getUserLogDetail', data);

/**
 * @description 列举功能模块
 * @tags 操作日志
 * @request get:/program-manage/unit/confirm-info
 */
export const getFunctionalModuleList  = (params: any) =>
  requestGet('/szjs-api/gateway/program/api/v1/opt/log/listModule', params);


/**
 * @description 列举操作类型
 * @tags 操作日志
 * @request get:/program-manage/unit/confirm-info
 */
export const getUserOperationLogOptType  = (params: any) =>
  requestGet('/szjs-api/gateway/program/api/v1/opt/log/listOptType', params);
