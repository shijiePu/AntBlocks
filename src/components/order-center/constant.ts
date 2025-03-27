import { OrderType, SearchType } from './types';

export const SEARCH_TYPE_TITLE: Record<SearchType, string> = {
  PENDING: '待办事项',
  DONE: '已处理事项',
  NOTIFY: '我的知会',
  INITIATED: '我发起的'
};

export const TIME_TYPE_TITLE: Record<SearchType, string> = {
  PENDING: '产生时间',
  DONE: '处理时间',
  NOTIFY: '产生时间',
  INITIATED: '产生时间',
};

/** @description 工单类型: PROJECT-计划 EXPERT-专家 ENTERPRISE-高企 REWARD-奖励 EXPERT_ENTERPRISE-高企专家 */
export const REQ_URL_TYPE_MAP: Record<OrderType, string | null> = {
  PROJECT: '/szjs-api/gateway/program-manage/personal-center/matter/page',
  EXPERT: '/szjs-api/gateway/program-expert/personal-center/matter/page',
  ENTERPRISE: '/szjs-api/gateway/program-enterprise/personal-center/matter/page',
  REWARD: '/szjs-api/gateway/program-reward/personal-center/matter/page',
  EXPERT_ENTERPRISE: null,
};

export const PROCESS_TYPE_KEY: Record<OrderType, string | null> = {
  PROJECT: 'process_type_manage',
  REWARD: 'process_type_reward',
  ENTERPRISE: 'process_type_enterprise',
  EXPERT: 'process_type_expert',
  EXPERT_ENTERPRISE: null,
};
