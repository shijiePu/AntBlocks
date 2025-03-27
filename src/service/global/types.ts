export interface OrgModel {
  introduction?: string;
  level?: number;
  orderNum?: number;
  orgCode?: string;
  orgName?: string;
  parentOrgCode?: string;
  parentOrgName?: string;
  parentPathCode?: string;
  parentPathName?: string;
  thirdCode?: string;
}

export interface LoginUserModel {
  accessToken?: string;
  admin?: boolean;
  head?: string;
  mobile?: string;
  orgCode?: string;
  orgModelList?: OrgModel[];
  orgName?: string;
  roleCodes?: string[];
  userCode?: string;
  username?: string;
}

export interface MenuResourceModel {
  childList?: MenuResourceModel[];
  orderNo?: number;
  parentCode?: string;
  resourceCode?: string;
  resourceName?: string;
  resourceType?: string;
}

export interface RegisterInfoRequest {
  /** 手机号 */
  mobile?: string;

  /** 名称 */
  name?: string;

  /** 来源：JSGR-个人；JSFR-法人；JSMLD-管理端 */
  source?: string;

  /** 三方编码 */
  thirdCode?: string;
}

export interface Attachment {
  /** 创建时间 */
  createTime?: string;

  /** 创建人 */
  creator?: string;

  /** 创建人单位编码 */
  creatorUnit?: string;

  /** 创建人单位名称 */
  creatorUnitName?: string;

  /** 自定义名称 */
  customName?: string;

  /** 逻辑删除标志，未删除-0，已删除-1 */
  deleteFlag?: boolean;

  /** 附件名称 */
  fileName?: string;

  /** 附件地址 */
  fileUrl?: string;

  /** 自增主键 */
  id?: number;

  /** 关联业务编码 */
  relationCode?: string;

  /** 关联业务类型 */
  relationType?: string;

  /** 排序 */
  sort?: number;

  /** 附件后缀 */
  type?: string;

  /** 更新时间 */
  updateTime?: string;
}
