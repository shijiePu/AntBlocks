import { requestGet } from '@szhz/tech-pc/plugins/request';

type stringObj = Record<string, string | number>;

/**
 * @description 全局字典
 * @tags 系统字典
 * @request get:/tech-front/tech-dic/query-all
 */
export const irsDicQueryAllByGet = () =>
  requestGet<Record<string, stringObj>>('/tech-front/tech-dic/query-all');

export interface LoginUserModel {
  accessToken?: string;
  admin?: boolean;
  head?: string;
  mobile?: string;
  orgCode?: string;
  orgName?: string;
  roleCodes?: string[];
  userCode?: string;
  username?: string;
}

/**
 * @description 用户信息
 * @tags 系统模块
 * @request get:/tech-front/system/getCurrentUser
 */
export const systemGetCurrentUserByGet = () =>
  requestGet<LoginUserModel>('/tech-front/system/getCurrentUser');
