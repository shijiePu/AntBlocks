import React from 'react';

import RenderReviewStatus from '@szhz/tech-pc/components/com-pages-componnets/RenderReviewStatus';
import BindUnitManagerOldAccountDetail from '@szhz/tech-pc/components/legal-register-new/BindUnitManagerOldAccountDetail';

export const getSearchItems = (activeType: string) => {
  return [
    {
      label: '新帐号单位名称',
      name: 'unitName',
      type: 'input',
      fieldProps: {
        placeholder: '请输入',
      },
    },
    {
      label: '统一社会信用代码',
      name: 'unifiedSocialCreditCode',
      type: 'input',
      fieldProps: {
        placeholder: '请输入',
      },
    },
    {
      label: '新帐号名',
      name: 'newAccount',
      type: 'input',
      fieldProps: {
        placeholder: '请输入',
      },
    },
    {
      label: '老系统名称',
      name: 'bizSystem',
      type: 'select',
      fieldProps: {
        dictKey: 'BizSystemTypeEnum',
        placeholder: '请选择',
        showSearch: true,
        allowClear: true,
      },
    },
    {
      label: '老帐号名',
      name: 'oldAccount',
      type: 'input',
      fieldProps: {
        placeholder: '请输入',
      },
    },
    {
      label: '申请时间',
      name: 'applyTime',
      type: 'TechDatePickerRange',
      fieldProps: {
        picker: 'date',
        style: { width: '100%' },
      },
    },
    {
      label: '审核状态',
      name: 'reviewStatus',
      type: 'select',
      fieldProps: {
        placeholder: '请输入',
        dictKey: 'reviewStatus',
        showSearch: true,
        allowClear: true,
        disableKeys: activeType === '1' ? 'AUDIT' : ''
      },
      hide: activeType === '0'
    },
  ].filter(i => !i.hide)
}

export const getColumns = (getPageData: any) => {
  return [
    {
      title: '新账号单位名称',
      dataIndex: 'unitName',
      key: 'unitName',
      width: 150,
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'unifiedSocialCreditCode',
      key: 'unifiedSocialCreditCode',
      width: 150,
    },
    {
      title: '新账号名',
      dataIndex: 'newAccount',
      key: 'newAccount',
      width: 150,
    },
    {
      title: '老系统名称',
      dataIndex: 'bizSystem',
      key: 'bizSystem',
      width: 150,
    },
    {
      title: '老账号名',
      dataIndex: 'oldAccount',
      key: 'oldAccount',
      width: 150,
    },
    {
      title: '老账号姓名',
      dataIndex: 'oldName',
      key: 'oldName',
      width: 150,
    },
    {
      title: '老账号单位',
      dataIndex: 'oldUnitName',
      key: 'oldUnitName',
      width: 150,
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
    },
    {
      title: '审核节点',
      dataIndex: 'activityName',
      key: 'activityName',
      width: 150,
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      key: 'reviewStatus',
      dictKey: 'reviewStatus',
      width: 150,
      render: (text: string) => <RenderReviewStatus data={text} dictKey={'reviewStatus'} />,
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      render: (_: any, _record: any) => {
        return (
          <BindUnitManagerOldAccountDetail
            run={getPageData}
            businessCode={_record?.businessCode}
            processInstanceId={_record?.processInstanceId}
            hideFlowAction={_record?.reviewStatus !== 'AUDIT'}
          />
        );
      },
    }
  ]
}

export const getFormItems = (needOpinion: boolean) => {
  return [
    {
      type: 'textarea',
      label: '审批意见',
      name: 'approveOpinion',
      itemProps: {
        rules: needOpinion
          ? [{ required: true, message: '请输入审批意见' }]
          : [],
      },
    },
  ]
}
