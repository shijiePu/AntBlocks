export interface getBindingUserProps {
    /** 用户名 */
    name?: string;

    /** 证件类型 */
    idType?: string;

    /** 证件号码 */
    idNumber?: string;

    /** 当前页码，默认为1 */
    pageNum?: number;

    /** 分页大小，默认为10 */
    pageSize?: number;

    /** 手机号码 */
    mobile?: string;

    /** 绑定时间 */
    bindDate?: string;
}

export interface getBindingNewProps {
    /** 用户姓名 */
    name?: string;

    /** 证件类型 */
    idType?: string;

    /** 证件号码 */
    idNumber?: string;

    /** 当前页码，默认为1 */
    pageNum?: number;

    /** 分页大小，默认为10 */
    pageSize?: number;

    /** 手机号码 */
    mobile?: string;

    /** 绑定时间 */
    bindDate?: string;
}

export interface userUnbindProps {
    /** 用户权限中心编码 */
    userCode: string;
}

export interface userBindProps {
    /** 用户权限中心编码 */
    userCode: string;
}


export interface batchBindingResultProps {
    /** 导入失败条数 */
    failedRows?: number;
    /** 导入失败报告名称 */
    fileName?: string;
    /** 导入失败报告地址 */
    fileUrl?: string;
    /** 导入成功条数 */
    successRows?: number;
  }
  