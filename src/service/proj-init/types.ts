export interface AttachmentRequest {
  /** 文件类型 */
  customName?: string;

  /** 附件名称 */
  fileName?: string;

  /** 附件地址 */
  fileUrl?: string;

  relationCode?: string;
  relationType?: string;
  /** 排序 */
  sort?: number;
}

export interface ProjectApprovalPageVo {
  /** 业务主键 */
  businessCode?: string;

  /** 是否当前环节审核人 */
  checkFlag?: boolean;

  /** 承担单位 */
  constructionUnit?: string;

  /** 资金下达文路径 */
  fundIssuanceDocumentUrl?: string;

  /** 数据主键 */
  id?: number;

  /** 流程实例ID */
  processInstanceId?: string;

  /** 审核类型 */
  processType?: string;

  /** 项目名称 */
  projectName?: string;

  /** 项目受理号 */
  projectNo?: string;

  /** 项目年份 */
  projectYear?: string;

  /** 审核节点 */
  reviewNodeName?: string;

  /** 审核状态 */
  reviewStatus?: string;

  /** 提交时间 */
  submitTime?: string;

  /** 任务ID */
  taskId?: string;
}

export interface ProjectApprovalSearchRequest {
  /** 承担单位 */
  constructionUnit?: string;

  /** 当前页码，默认为1 */
  pageNum?: number;

  /** 分页大小，默认为10 */
  pageSize?: number;

  /** 项目名称 */
  projectName?: string;

  /** 项目受理号 */
  projectNo?: string;

  /** 申报年份 */
  projectYear?: number;

  /** 审核节点名称 */
  reviewNodeName?: string;

  /** 审核状态 */
  reviewStatus?: string;
}

export interface ImportProjectExcelResponse {
  /** 导入失败报告名称 */
  fileName?: string;

  /** 导入失败报告地址 */
  fileUrl?: string;

  /** 导入是否成功 */
  isSuccess?: boolean;

  /** 导入成功条数 */
  successRows?: number;

  /** 导入失败条数 */
  failedRows?: number;
}
