---
toc: content
group:
  title: 业务组件
  order: 1
---

# TechLegalRegisterNew 法人注册新

<code src="./demos/index.tsx"></code>

| 属性名       | 描述                                                                                      | 类型               | 默认值 |
| ------------ | ----------------------------------------------------------------------------------------- | ------------------ | ------ |
| orderType    | 工单类型: PROJECT-计划 EXPERT-专家 ENTERPRISE-高企 REWARD-奖励 EXPERT_ENTERPRISE-高企专家 | string             |        |
| searchType   | 查询类型(PENDING-待处理事项 DONE-已处理事项 NOTIFY-我的知会)                              | string             |        |
| handleDetail | 详情处理回调事件                                                                          | (data:any) => void |        |
