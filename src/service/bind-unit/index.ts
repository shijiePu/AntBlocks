import { requestGet, requestPost } from '@szhz/tech-pc/plugins/request';

/**
 * @description 待绑定单位列表
 * @tags 绑定单位
 * @request get:/program-manage/unit/confirm-info
 */
export const getNotBindList = (data: any) =>
  requestGet('/szjs-api/gateway/program/user-unit-bind-rel/listChooseUnit', data);


/**
 * @description 用户绑定单位
 * @tags 绑定单位
 * @request get:/program-manage/unit/confirm-info
 */
export const bindUnit = (data: any) =>
  requestPost('/szjs-api/gateway/program/user-unit-bind-rel/bind', data);
/**
 * @description 用户解绑单位
 * @tags 绑定单位
 * @request get:/program-manage/unit/confirm-info
 */

export const unbindUnit = (data: any) =>
  requestPost('/szjs-api/gateway/program/user-unit-bind-rel/unBind', data);

/**
 * @description 绑定单位列表（已绑定，绑定中，已拒绝）
 * @tags 绑定单位
 * @request get:/program-manage/unit/confirm-info
 */
export const getBindList = (data: any) =>
  requestPost('/szjs-api/gateway/program/user-unit-bind-rel/list', data);

/**
 * @description 用户解绑单位
 * @tags 绑定单位
 * @request get:/program-manage/unit/confirm-info
 */
export const setDefaultUnit = (data: any) =>
  requestPost('/szjs-api/gateway/program/user-unit-bind-rel/setDefaultUnit', data);

/**
 * @description 获取绑定单位详情
 * @tags 绑定单位
 * @request get:/program-manage/unit/confirm-info
 */
export const getBindUnitDetail = (data: any) =>
  requestGet('/szjs-api/gateway/program/user-unit-bind-rel/getDetail', data);
