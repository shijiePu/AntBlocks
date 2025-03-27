import { Button, Form, message } from 'antd';
import React, { FC, useContext, useMemo } from 'react';

import BindUnitDetail from '@szhz/tech-pc/components/bind-unit/Detail';
import RenderReviewStatus from '@szhz/tech-pc/components/com-pages-componnets/RenderReviewStatus';
import BindDepDetail from '@szhz/tech-pc/components/legal-register-new/BindDepDetail';
import BindUnitManagerOldAccountDetail from '@szhz/tech-pc/components/legal-register-new/BindUnitManagerOldAccountDetail';
import BindPersonManagerOldAccountDetail from '@szhz/tech-pc/components/person-register-new/BindPersonManagerOldAccountDetail';
import {
  PROCESS_TYPE_KEY,
  REQ_URL_TYPE_MAP,
  SEARCH_TYPE_TITLE,
  TIME_TYPE_TITLE
} from './constant';
import { WorkSpaceProps } from './types';

import {
  TechCard,
  TechColumnsType,
  TechForm,
  TechFormItems,
  TechPageTitle,
  TechTable
} from '@szhz/tech-pc';
import { ConfigContext } from '@szhz/tech-pc/components/config-provider/contexts';
import useSearchTable from '@szhz/tech-pc/hooks/useSearchTable';
import { personalCenterMatterPageByPost } from '@szhz/tech-pc/service/workSpace';

const TechOrderCenter: FC<WorkSpaceProps> = ({
  orderType,
  searchType,
  handleDetail,
}) => {
  const [form] = Form.useForm();
  const { globalDict } = useContext(ConfigContext);

  // 请求路径
  const reqUrl = useMemo(() => {
    // 【我发起的】需使用特定的列表请求接口
    if (searchType === 'INITIATED') {
      return '/szjs-api/gateway/program/personal-center/matter/pageMySubmit'; // 我发起的接口，待替换
    } else {
      return REQ_URL_TYPE_MAP[orderType];
    }
  }, [orderType, searchType]);

  const { getPageData, dataSource, handleReset, pagination, loading } =
    useSearchTable({
      // 接口地址需自定义
      requestFn: async (params: Record<string, any>) => {
        if (!orderType || !searchType) {
          message.error('orderType与searchType为必传字段');
          return;
        }

        let reqParams = {
          ...params,
          startTime: params?.time?.startTime,
          endTime: params?.time?.endTime,
          orderType,
          searchType,
        };

        // @ts-ignore
        delete reqParams.time;

        if (!reqUrl) return {};

        const result = await personalCenterMatterPageByPost(reqUrl, reqParams);

        return result;
      },
      form,
      serviceProps: {
        refreshDeps: [reqUrl],
      },
    });

  const handleClick = (record: any) => {
    handleDetail?.(record);
  };

  const process_type_key = useMemo(() => {
    // 【我发起的】需使用特定的字典key
    if (searchType === 'INITIATED') {
      return 'process_type_submit'
    } else {
      return PROCESS_TYPE_KEY?.[orderType];
    }
  }, [globalDict, orderType]);

  const timeLabel = useMemo(() => {
    return TIME_TYPE_TITLE[searchType];
  }, [searchType]);

  // 查询表单配置
  const formItems: TechFormItems[] = [
    {
      label: '事项名称',
      name: 'matterName',
    },
    {
      label: '事项类型',
      name: 'processType',
      type: 'select',
      fieldProps: {
        dictKey: process_type_key ?? '',
      },
    },
    {
      label: timeLabel,
      name: 'time',
      type: 'TechDatePickerRange',
      fieldProps: {
        rangeKeys: ['startTime', 'endTime'],
      },
    },
    {
      label: '审核节点',
      name: 'reviewNodeName',
    },
    {
      label: '审核状态',
      name: 'reviewStatus',
      type: 'select',
      fieldProps: {
        dictKey: searchType === 'INITIATED' ? 'startFlowRevieStatus' : 'flowRevieStatus',
      },
    },
  ];

  // 表格配置
  const columns: TechColumnsType<any> = [
    {
      title: '事项名称',
      dataIndex: 'businessName',
      render: (text: string) => <div>{text}</div>,
      width: 300,
    },
    {
      title: '事项类型',
      dataIndex: 'processType',
      dictKey: 'process_type',
      width: 200,
    },
    {
      title: timeLabel,
      dataIndex: 'matterTime',
      width: 160,
    },
    {
      title: '审核节点',
      dataIndex: 'reviewNodeName',
      width: 150,
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      dictKey: searchType === 'INITIATED' ? 'startFlowRevieStatus' : 'flowRevieStatus',
      width: 110,
      render: (text: string) => <RenderReviewStatus data={text} dictKey={searchType === 'INITIATED' ? 'startFlowRevieStatus' : 'flowRevieStatus'} />,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // "CHANGE_UNIT_COMPETENT_DEPT": "变更主管部门",
      // "ADD_BIND_UNIT": "新增绑定单位",
      // "enterprise_declare": "企业申报",
      // "BIND_PERSON_MANAGER_OLD_ACCOUNT": "绑定个人历史账号",
      // "BIND_UNIT_MANAGER_OLD_ACCOUNT": "绑定单位管理员历史账号",
      // "SAVE_UNIT_COMPETENT_DEPT": "绑定主管部门"
      render: (_text: any, _record: any) => {
        switch (_record?.processType) {
          case 'BIND_UNIT_MANAGER_OLD_ACCOUNT':
            return (
              <BindUnitManagerOldAccountDetail
                run={getPageData}
                businessCode={_record?.businessCode}
                processInstanceId={_record?.processInstanceId}
                hideFlowAction={searchType !== 'PENDING'}
              />
            );
          case 'BIND_PERSON_MANAGER_OLD_ACCOUNT':
            return (
              <BindPersonManagerOldAccountDetail
                run={getPageData}
                businessCode={_record?.businessCode}
                processInstanceId={_record?.processInstanceId}
                hideFlowAction={searchType !== 'PENDING'}
              />
            );
          case 'CHANGE_UNIT_COMPETENT_DEPT':
            return (
              <BindDepDetail
                isChange={true}
                run={getPageData}
                businessCode={_record?.businessCode}
                processInstanceId={_record?.processInstanceId}
                hideFlowAction={searchType !== 'PENDING'}
              />
            );
          case 'ADD_BIND_UNIT':
            return (
              <BindUnitDetail
                run={getPageData}
                businessCode={_record?.businessCode}
                processInstanceId={_record?.processInstanceId}
                hideFlowAction={searchType !== 'PENDING'}
              />
            );
          case 'SAVE_UNIT_COMPETENT_DEPT':
            return (
              <BindDepDetail
                run={getPageData}
                businessCode={_record?.businessCode}
                processInstanceId={_record?.processInstanceId}
                hideFlowAction={searchType !== 'PENDING'}
              />
            );
          default:
            return (
              <Button
                style={{ marginLeft: '-16px' }}
                type="link"
                onClick={() => handleClick(_record)}
              >
                详情
              </Button>
            );
        }
      },
    },
  ];

  if (!searchType || !orderType) return <></>;

  return (
    <>
      <TechPageTitle>{SEARCH_TYPE_TITLE?.[searchType] ?? ''}</TechPageTitle>
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
  );
};

export default TechOrderCenter;
