import { requestPost } from '@szhz/tech-pc/plugins/request';

export interface PersonalCenterMatterRequest {
  /** 处理人 */
  assigneeId?: string;

  /** 产生或处理时间(结束) */
  endTime?: string;

  /** 事项类别 */
  matterCategory?: string;

  /** 事项名称 */
  matterName?: string;

  /** 工单类型: PROJECT-计划 EXPERT-专家 ENTERPRISE-高企 REWARD-奖励 EXPERT_ENTERPRISE-高企专家 */
  orderType: string;

  /** 当前页码，默认为1 */
  pageNum?: number;

  /** 分页大小，默认为10 */
  pageSize?: number;

  /** 审核节点 */
  reviewNodeName?: string;

  /** 审核状态 */
  reviewStatus?: string;

  /** 查询类型(PENDING-待处理事项 DONE-已处理事项 NOTIFY-我的知会) */
  searchType: string;

  /** 产生或处理时间(开始) */
  startTime?: string;
}

export interface PersonalCenterMatterVO {
  /** 业务编码 */
  businessCode?: string;

  /** 事项名称 */
  businessName?: string;

  /** 自增主键 */
  id?: number;

  /** 产生时间/处理时间 */
  matterTime?: string;

  /** 流程实例编号 */
  processInstanceId?: string;

  /** 申请（流程）类型 */
  processType?: string;

  /** 审核节点 */
  reviewNodeName?: string;

  /** 审核状态(PASSED-已通过 AUDIT-待审核 RETURNED-已退回) */
  reviewStatus?: string;
}

/**
 * @description 获取事项分页数据
 * @tags 工作台
 * @request get:/tech-front/system/getCurrentUser
 */
export const personalCenterMatterPageByPost = (
  url: string,
  data: PersonalCenterMatterRequest,
) => requestPost<PersonalCenterMatterVO[]>(url, data);
