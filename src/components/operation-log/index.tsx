import {
  TechCard,
  TechForm,
  TechPageTitle,
  TechTable
} from '@szhz/tech-pc';
import { Form } from 'antd';
import React, { useEffect, useState } from 'react';

import Detail from './Detail';

import useSearchTable from '@szhz/tech-pc/hooks/useSearchTable';
import { getFunctionalModuleList, getUserOperationLogList, getUserOperationLogOptType } from '@szhz/tech-pc/service/operation-log';
import { cloneDeep } from 'lodash-es';

const TechOperationLog = ({ bizSystem }: any) => {

  const [form] = Form.useForm();

  const [options_module, setOptions_module] = useState([]);
  const [options_type, setOptions_type] = useState([]);

  useEffect(() => {
    getFunctionalModuleList({ bizSystem }).then(res => {
      setOptions_module(res)
    })
    getUserOperationLogOptType({}).then(res => {
      setOptions_type(res)
    })
  }, []);

  const { getPageData, dataSource, handleReset, pagination, loading } =
    useSearchTable({
      requestFn: getUserOperationLogList,
      form,
      extraParams: {
        bizSystem,
        startTime: '',
        endTime: '',
      },
      dispatchParams: (params) => {
        let localParams = cloneDeep(params);
        localParams = { ...localParams, ...(params?.time ?? {}) };
        delete localParams.time;
        return localParams;
      },
      serviceProps: {
        manual: true,
        refreshDeps: [],
      },
    });

  // 查询表单配置
  const formItems: any = [
    {
      label: '操作人员',
      name: 'operatorName',
    },
    {
      label: '手机号',
      name: 'operatorPhone',
    },
    {
      label: 'IP',
      name: 'ipAddress',
    },
    {
      label: '操作时间',
      name: 'time',
      type: 'TechDatePickerRange',
      fieldProps: {
        rangeKeys: ['startTime', 'endTime'],
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
      },
    },
    {
      label: '功能模块',
      name: 'functionModule',
      type: 'select',
      fieldProps: {
        options: options_module
      },
    },
    {
      label: '操作类型',
      name: 'operationType',
      type: 'select',
      fieldProps: {
        options: options_type
      },
    },
  ];

  // 表格配置
  const columns = [
    {
      title: '操作人员',
      dataIndex: 'operatorName',
      render: (text: string) => <div>{text}</div>,
      width: 120,
    },
    {
      title: '手机号',
      dataIndex: 'operatorPhone',
      width: 120,
    },
    {
      title: '功能模块',
      dataIndex: 'functionModule',
      width: 150,
    },
    {
      title: '操作类型',
      dataIndex: 'operationType',
      width: 100,
    },
    {
      title: 'IP地址',
      dataIndex: 'ipAddress',
      width: 110,
    },
    // {
    //   title: 'IP归属地',
    //   dataIndex: 'ipRegion',
    //   width: 110,
    // },
    {
      title: '操作状态',
      dataIndex: 'operationStatus',
      width: 100,
      render: (_: any, _record: any) => {
        return <>{_ ? '成功' : '失败'}</>
      },
    },
    {
      title: '操作时间',
      dataIndex: 'operationTime',
      width: 110,
    },
    {
      title: '操作',
      dataIndex: 'operationId',
      key: 'action',
      width: 100,
      render: (_: any) => {
        return <Detail operationId={_} />
      },
    },
  ];

  return (
    <>
      <TechPageTitle>日志管理</TechPageTitle>
      <TechForm.Search
        hasCardBg
        items={formItems}
        form={form}
        onFinish={getPageData}
        onReset={handleReset}
        showExpand={false}
      ></TechForm.Search>

      <TechCard>
        <TechPageTitle type="table">
          {/** @ts-ignore */}
          {`查询结果（共${pagination?.total || 0}条）`}
        </TechPageTitle>
        <TechTable
          isSeq
          columns={columns}
          dataSource={dataSource}
          // @ts-ignore
          pagination={{ ...pagination, current: pagination?.pageNum }}
          scroll={{ x: 1200 }}
          loading={loading}
        ></TechTable>
      </TechCard>
    </>
  )
};

export default TechOperationLog;
