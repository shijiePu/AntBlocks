import { requestGet, requestPost } from '@szhz/tech-pc/plugins/request';
import {
    Attachment,
    LoginUserModel,
    MenuResourceModel,
    OrgModel,
    RegisterInfoRequest,
} from './types';

export interface AuthCenterModel {
  appCode?: string;
  clientId?: string;
  sign?: string;
  sno?: string;
  tenantId?: string;
}

/**
 * @description 获取当前应用在用户权限中心的配置信息
 * @request get:/irs-front/system/getLoginConfig
 */
export const systemGetLoginConfigByGet = () =>
  requestGet<AuthCenterModel>('/program/system/getLoginConfig');

/**
 * @description 用户信息
 * @tags 系统模块
 * @request get:/program/system/getCurrentUser
 */
export const systemGetCurrentUserByGet = () =>
  requestGet<LoginUserModel>('/program/system/getCurrentUser');

/**
 * @description 个人注册
 * @tags 系统模块
 * @request post:/program/system/register
 */
export const programSystemRegisterByPost = (data: RegisterInfoRequest) =>
  requestPost<boolean>('/program/system/register', data);

/**
 * @description 退出登录
 * @tags 系统模块
 * @request get:/program/system/logout
 */
export const systemLogoutByGet = () =>
  requestGet<boolean>('/program/system/logout');

/**
 * @description 获取用户权限中心所有字典
 * @tags 系统字典
 * @request get:/program/dictionary/query-all
 */
export const dictionaryQueryAllByGet = () =>
  requestGet<Record<string, any>>('/program/dictionary/query-all');

/**
 * @description 获取后端所有的字典
 * @tags 系统字典
 * @request
 */
export const dictionaryQueryLocalAllByGet = () =>
  requestGet<Record<string, any>>('/program/dictionary/query-local-all');

/**
 * @description  系统菜单
 * @tags 系统模块
 * @request get:/szjs-api/gateway/program/system/getMenuResource
 */
export const systemGetMenuResourceByGet = (params: { resourceCodes: string }) =>
  requestGet<MenuResourceModel[]>('/program/system/getMenuResource', params);

// 获取组织
export const systemOrgListByGet = (params: { orgName: string }) =>
  requestGet<OrgModel[]>(`/szjs-api/gateway/program/system/getOrg`, params);

/**
* @description
* @tags 附件管理
* @request post:/program/attachment/query-by-types
*/
export const attachmentQueryByTypesByPost = (data: string[]) =>
  requestPost<Attachment[]>('/szjs-api/gateway/program/attachment/query-by-types', data);

/**
 * @description 个人信息更新
 * @tags 系统模块
 * @request post:program/user-info/updateUserInfo
 */
export const updatePersonInfo = (data: any) =>
  requestPost<boolean>('/szjs-api/gateway/program/user-info/updateUserInfo', data);

/**
 * @description 法人信息更新
 * @tags 系统模块
 * @request post:/program/user-info/updateLegalInfo
 */
export const updateLegalInfo = (data: any) =>
  requestPost<boolean>('/szjs-api/gateway/program/user-info/updateLegalInfo', data);