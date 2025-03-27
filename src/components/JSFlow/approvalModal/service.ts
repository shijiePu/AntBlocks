import { requestGet, requestPost } from '@szhz/tech-pc/plugins/request';

export interface AttachmentRequest {
  /** 附件名称 */
  name?: string;

  /** 附件地址 */
  url?: string;
}

export interface ApprovalRequest {
  /** 审批结果，同意为true，不同意为false */
  approve?: boolean;

  /** 审核意见 */
  approveOpinion?: string;

  /** 审核附件 */
  attachmentRequestList?: AttachmentRequest[];

  /** 任务编号 */
  taskIds: string[];
}

/**
 * @description
 * @tags 流程工单
 * @request post:/szjs-api/gateway/program/process-order/approval
 */
export const processOrderApprovalByPost = (data: ApprovalRequest) =>
  requestPost<boolean>('/szjs-api/gateway/program/process-order/approval', data);
/**
* @description
* @tags 流程工单
* @request post:/szjs-api/gateway/program/process-order/approval
*/
export const processOrderApprovalByget = (params: { processInstanceId: string }) =>
  requestGet<boolean>(`/api-flow/process/instance/detail-with-future-rollback-nodes`, params);

//获取是否当前环节审核人标志
export const getCheckFlag = (params: { processInstanceId: string }) =>
  requestGet<any>('/szjs-api/gateway/program/process-order/get-check-flag', params);

//获取审批附件
export const getTaskAttachment = (params: { processInstanceId: string }) =>
  requestGet<any>('/szjs-api/gateway/program/process-order/get-task-attachment', params);


/**
* @description
* @tags new 流程工单
* @request post:/szjs-api/gateway/program/process-order/approval
*/
export const uploadRecommendFileNew = (data: ApprovalRequest) =>
  requestPost<boolean>('/szjs-api/gateway/program-manage/project/declare/upload-recommend-file-new', data);
