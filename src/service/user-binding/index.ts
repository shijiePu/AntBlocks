import { requestGet, requestPost } from '@szhz/tech-pc/plugins/request';
import {
    getBindingNewProps,
    getBindingUserProps,
    userBindProps,
    userUnbindProps,
} from './type';
/**
 * @description
 * @tags 分页获取组织下的绑定用户
 * @request post:/szjs-api/gateway/program/user-info/org-user/page
 */
export const getBindingUser = (data: getBindingUserProps) =>
    requestPost<getBindingUserProps[]>(
        '/szjs-api/gateway/program/user-info/org-user/page',data
    );

/**
 * @description
 * @tags 新增绑定列表页请求数据
 * @request post:/szjs-api/gateway/program/user-info/unbind/page
 */
export const getBindingNew = (data: getBindingNewProps) =>
    requestPost<getBindingNewProps[]>(
        '/szjs-api/gateway/program/user-info/unbind/page',data
    );


/**
 * @description
 * @tags 用户绑定
 * @request post:/szjs-api/gateway/program/user-info/bind
 */
export const userBind = (data: userBindProps) =>
    requestPost<userBindProps>(
        '/szjs-api/gateway/program/user-info/bind',data
    );

/**
 * @description
 * @tags 用户解绑
 * @request post:/szjs-api/gateway/program/user-info/unbind
 */
export const userUnbind = (data: userUnbindProps) =>
    requestPost<userUnbindProps>(
        '/szjs-api/gateway/program/user-info/unbind',data
    );

/**
 * @description
 * @tags 批量绑定
 */
export const batchBinding = (params: { filePath: string }) =>
    requestGet<any>(
        '/szjs-api/gateway/program/user-info/batch-bind',params
    );


