import { UnitInfoRequest, UnitInfoVO } from './types';

import { requestGet, requestPost } from '@szhz/tech-pc/plugins/request';

/**
 * @description 判断是否需要跳转单位信息
 * @tags 单位信息
 * @request get:/program-manage/unit/confirm-info
 */
export const unitConfirmInfoByGet = () =>
  requestGet<boolean>('/szjs-api/gateway/program-manage/unit/confirm-info');

/**
 * @description 查询单位信息
 * @tags 单位信息
 * @request get:/program-manage/unit/query-info
 */
export const unitQueryInfoByGet = () =>
  requestGet<UnitInfoVO>('/szjs-api/gateway/program/user-info/query-unit-info');

/**
 * @description 保存单位信息
 * @tags 单位信息
 * @request post:/program-manage/unit/save-info
 */
export const unitSaveInfoByPost = (data: UnitInfoRequest) =>
  requestPost<UnitInfoVO>('/szjs-api/gateway/program/user-info/save-unit-info', data);

/**
 * @description 主管部门列表查询
 * @tags 单位信息
 * @request post:/program-manage/unit/save-info
 */
export const getDepList = (data: any) =>
  // requestPost<any>('/szjs-api/gateway/program/competent-department-info/list', data);
  requestGet<any>('/szjs-api/gateway/program/unit/dept-tree', data);

/**
 * @description 修改主管部门信息
 * @tags 单位信息
 * @request post:/program-manage/unit/save-info
 */
export const updateDepInfo = (data: any) =>
  requestPost<any>('/szjs-api/gateway/program/unit/changeCompetentDept', data);

/**
 * @description 我的发起-根据id查询变更主管部门信息详情
 * @tags 单位信息
 * @request post:/program-manage/unit/save-info
 */
export const getDepChangeInfo = (data: any) =>
  requestGet<any>('/szjs-api/gateway/program/unit/change/record/get', data);

export const expertListTreeCodeByGet = (params: { code: string }) =>
  requestGet<any>('/szjs-api/gateway/program/dictionary/list-tree-code', params);

// 获取组织
export const systemOrgListByGet = (params: { orgName: string }) =>
  requestGet(`/szjs-api/gateway/program/system/getOrg`, params);


// 获取单位基础信息
export const getUnitBasicInfo = (params: any) =>
  requestGet(`/szjs-api/gateway/gateway/program/unit/getBasicInfo`, params);
