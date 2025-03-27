import { requestGet, requestPost } from '@szhz/tech-pc/plugins/request';

/**
 * @description 个人注册
 * @tags 系统模块
 * @request post:/program/system/register
 */
export const programSystemRegisterByPost = (data: any) =>
  requestPost<boolean>('/szjs-api/gateway/program/register/person', data);

export const programSystemOldAccountByPost = (data: any) =>
  requestPost<boolean>('/szjs-api/gateway/program/old/account/bind', data);

export const legalInfo = () =>
  requestGet<boolean>('/szjs-api/gateway/program/user-info/query-unit-info');

export const personInfo = () =>
  requestGet<boolean>('/szjs-api/gateway/program/user-info/query-person-info');

export const savePersonInfo = (data: any) =>
  requestPost<boolean>('/szjs-api/gateway/program/user-info/save-person-info', data);

export const saveUnitInfo = (data: any) =>
  requestPost<boolean>('/szjs-api/gateway/program/user-info/save-unit-info', data);

/**
* @description 再次绑定主管部门
* @request get:/irs-front/system/getLoginConfig
*/
export const reBindDep = (data: any) =>
  requestPost<boolean>('/szjs-api/gateway/program/user-info/reBindCompetentDepartment', data);

/**
 * @description 查询老账户法人账号信息
 * @tags 单位信息
 * @request post:/program-manage/unit/save-info
 */
export const queryOldSysLegalUserInfo = (data: any) =>
  requestPost<boolean>('/szjs-api/gateway/program/register/queryOldSysLegalUserInfo', data);

/**
 * @description 主管部门列表查询
 * @tags 单位信息
 * @request post:/program-manage/unit/save-info
 */
export const getDepList = (data: any) =>
  requestPost<any>('/szjs-api/gateway/program/competent-department-info/list', data);

/**
 * @description 地区下拉框
 * @tags 单位信息
 * @request post:/program-manage/unit/save-info
 */
export const expertListTreeCodeByGet = (params: { code: string }) =>
  requestGet<any>('/szjs-api/gateway/program/dictionary/list-tree-code', params);

/**
 * @description 注册法人
 * @tags 单位信息
 * @request post:/program-manage/unit/save-info
 */
export const legalRegister = (data: any) =>
  requestPost<boolean>('/szjs-api/gateway/program/register/legal', data);
export const bindLegalAccountRegister = (data: any) =>
  requestPost<boolean>('/szjs-api/gateway/program/register/bindLegalAccount', data);

/**
 * @description 查询历史账号
 * @tags 单位信息
 * @request post:/program-manage/unit/save-info
 */
export const queryOldAccount = (params: any) =>
  requestGet<Record<string, string>>('/szjs-api/gateway/program/register/queryOldAccount', params);

/**
 * @description 校验历史账号
 * @tags 单位信息
 * @request post:/program-manage/unit/save-info
 */
export const checkOldLegalAccount = (params: any) =>
  requestGet<string>('/szjs-api/gateway/program/register/checkOldLegalAccount', params);
/**
 * @description 校验历史账号与单位
 * @tags 单位信息
 * @request post:/program-manage/unit/save-info
 */  export const checkOldLegalAccountUnit = (params: any) =>
  requestGet<boolean>('/szjs-api/gateway/program/register/checkOldLegalAccountUnit', params);

/**获取部门下的人员*/
export const getDeptListByName = (params: any) =>
  requestGet<any>(`/szjs-api/gateway/program/unit/list-by-name`, params);

/**已关联历史账号信息分页查询*/
export const getBindPageQuery = (data: any) =>
  requestPost<any>(`/szjs-api/gateway/program/old/account/binded-page-query`, data);

/**获取个人历史账号详情*/
export const getPersonOldAccountDetail = (params: any) =>
  requestGet<any>(`/szjs-api/gateway/program/old/account/detailById`, params);


/**
* @description 校验系统弹窗后，点【知道了】已读消息
* @request get:/irs-front/system/getLoginConfig
*/
export const confirmPopMsg = (data: any) =>
  requestPost('/szjs-api/gateway/program/register/confirmPopMsg', data);

export const querySystem = (data: any) =>
  requestPost('/szjs-api/gateway/program/help-center/front-page-query', data);

export const queryDetail = (data: any) =>
  requestPost('/szjs-api/gateway/program/help-center/show-detail', data);

// 历史账号关联审核分页查询 个人/单位
export const approveListQuery = (data: any) =>
  requestPost('/szjs-api/gateway/program/old/account/approve-list-query', data);

// 用户申请审核分页查询
export const unitBindQuery = (data: any) =>
  requestPost('/szjs-api/gateway/program/user-unit-bind-rel/unit-bind-query', data);

// 主管部门申请审核分页查询
export const pageCompetentAudit = (data: any) =>
  requestPost('/szjs-api/gateway/program/register/pageCompetentAudit', data);

// 审核
export const approval = (data: any) =>
  requestPost('/szjs-api/gateway/program/process-order/approval', data);
// 用户首次登录修改密码
export const firstUpdatePassword = (data: any) =>
  requestPost(
    '/szjs-api/gateway/program/user-info/first-update-password',
    data,
  );
