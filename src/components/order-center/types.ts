import { tuple } from '@szhz/tech-pc/utils';

const OrderTypes = tuple(
  'PROJECT',
  'EXPERT',
  'ENTERPRISE',
  'REWARD',
  'EXPERT_ENTERPRISE',
);

export type OrderType = (typeof OrderTypes)[number];

const SearchTypes = tuple('PENDING', 'DONE', 'NOTIFY' , 'INITIATED');

export type SearchType = (typeof SearchTypes)[number];

export interface WorkSpaceProps {
  /** @description 工单类型: PROJECT-计划 EXPERT-专家 ENTERPRISE-高企 REWARD-奖励 EXPERT_ENTERPRISE-高企专家 */
  orderType: OrderType;
  /**  @description 查询类型(PENDING-待处理事项 DONE-已处理事项 NOTIFY-我的知会 INITIATED-我发起的) */
  searchType: SearchType;
  /** @description 详情处理事件 */
  handleDetail?: (data: Record<string, string>) => void;
}
