import { requestPost } from '@szhz/tech-pc/plugins/request';

/**
 * @description 法人搜索该单位下用户列表
 * @tags 用户管理
 * @request get:/program-manage/unit/confirm-info
 */
export const getUserListByLegal = (data: any) =>
  requestPost('/szjs-api/gateway/program/user-unit-bind-rel/listUnitUser', data);

/**
 * @description 单位编辑成员信息
 * @tags 用户管理
 * @request get:/program-manage/unit/confirm-info
 */
export const updateMemberInfo = (data: any) =>
  requestPost('/szjs-api/gateway/program/user-unit-bind-rel/modify', data);
/**
 * @description 单位新增成员信息
 * @tags 用户管理
 * @request get:/program-manage/unit/confirm-info
 */
export const addMember = (data: any) =>
  requestPost('/szjs-api/gateway/program/user-unit-bind-rel/addUnitUser', data);
