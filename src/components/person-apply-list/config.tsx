import React from 'react';

import BindUnitDetail from '@szhz/tech-pc/components/bind-unit/Detail';
import RenderReviewStatus from '@szhz/tech-pc/components/com-pages-componnets/RenderReviewStatus';

export const getSearchItems = (activeType: string) => {
  return [
    {
      label: '姓名',
      name: 'userName',
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
      label: '所在部门',
      name: 'dept',
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
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
    },
    {
      title: '新账号名',
      dataIndex: 'newAccount',
      key: 'newAccount',
      width: 150,
    },
    {
      title: '所在部门',
      dataIndex: 'dept',
      key: 'dept',
      width: 150,
    },
    {
      title: '具体职务',
      dataIndex: 'position',
      key: 'position',
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
          <BindUnitDetail
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
