import React from 'react';

import RenderReviewStatus from '@szhz/tech-pc/components/com-pages-componnets/RenderReviewStatus';
import BindDepDetail from '@szhz/tech-pc/components/legal-register-new/BindDepDetail';

export const getSearchItems = (activeType: string) => {
  return [
    {
      label: '单位名称',
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
      label: '审核类型',
      name: 'processType',
      type: 'select',
      fieldProps: {
        dictKey: 'process_type_compentent_opt',
        placeholder: '请选择',
        showSearch: true,
        allowClear: true,
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
        placeholder: '请选择',
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
      title: '单位名称',
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
      title: '地区',
      dataIndex: 'areaName',
      key: 'areaName',
      width: 150,
    },
    {
      title: '审核类型',
      dataIndex: 'processType',
      key: 'processType',
      dictKey: 'process_type_compentent_opt',
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
          <BindDepDetail
            isChange={_record?.processType === 'CHANGE_UNIT_COMPETENT_DEPT'}
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
