import {
  TechCard,
  TechConfirm,
  TechForm,
  TechPageTitle,
  TechTable
} from '@szhz/tech-pc';
import { Button, Flex, Form, Tag, Tooltip } from 'antd';
import React from 'react';

import AddUser from './AddUser';

import useGetDict from '@szhz/tech-pc/hooks/useGetDictData';
import useSearchTable from '@szhz/tech-pc/hooks/useSearchTable';
import { getUserListByLegal, updateMemberInfo } from '@szhz/tech-pc/service/member-manage';

const TechOperationLog = ({ userCode }: any) => {

  const [form] = Form.useForm();
  const { dictData } = useGetDict({ dictKey: 'memberRole' });

  const { getPageData, dataSource, handleReset, pagination, loading } =
    useSearchTable({
      requestFn: getUserListByLegal,
      form,
      serviceProps: {
        manual: true,
        refreshDeps: [],
      },
    });

  // 更新角色
  const updateRoleCode = async (record: any) => {
    await updateMemberInfo({ roleCode: record.roleCode === 'unit_user' ? 'unit_manager' : 'unit_user', id: record.id })
    getPageData();
  }

  // 移除成员
  const handleRemove = async (id: any) => {
    await updateMemberInfo({ id, remove: true })
    getPageData();
  }

  // 查询表单配置
  const formItems: any = [
    {
      label: '用户姓名',
      name: 'name',
    },
    {
      label: '手机号',
      name: 'mobile',
    },
    {
      label: '所属部门',
      name: 'dept',
    },
    {
      label: '职位',
      name: 'position',
    },
    {
      label: '所属角色',
      name: 'roleCode',
      type: 'select',
      fieldProps: {
        dictKey: 'UserBindUnitRoleEnum',
      },
    },
  ];

  // 表格配置
  const columns = [
    {
      title: '用户姓名',
      dataIndex: 'name',
      render: (text: string) => <div>{text}</div>,
      width: 120,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      width: 120,
    },
    {
      title: '所属部门',
      dataIndex: 'dept',
      width: 150,
    },
    {
      title: '职位',
      dataIndex: 'position',
      width: 110,
    },
    // {
    //   title: '角色',
    //   dataIndex: 'roleCode',
    //   width: 110,
    //   render: (_: any, record: any) => {
    //     return <Tag color={_ === 'unit_manager' ? 'orange' : 'processing'}>{dictData?.[_]}</Tag>
    //   },
    // },
    {
      title: '角色',
      dataIndex: 'roleCode',
      width: 320,
      render: (_: any, record: any) => {
        const arr = _.split(',');
        const maxTags = 2; // 最多展示的标签数量
        const tagsToShow = arr.slice(0, maxTags); // 只展示前两个标签
        const remainingTags = arr.slice(maxTags); // 剩余的标签

        return (
          <>
            {tagsToShow.map((item: any) => (
              <Tag color={item === 'unit_user' ? 'orange' : 'green'} key={item}>
                {dictData?.[item]}
              </Tag>
            ))}
            {remainingTags.length > 0 && (
              <Tooltip color="#fff" title={
                <Flex gap="4px 0" wrap>
                  {
                    remainingTags.map((item: any) => (
                      <Tag color={item === 'unit_user' ? 'orange' : 'green'} key={item}>
                        {dictData?.[item]}
                      </Tag>
                    ))
                  }
                </Flex>
              }>
                <Tag>...</Tag>
              </Tooltip>
            )}
          </>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'action',
      width: 200,
      render: (_: any, record: any) => {
        const disabled = userCode === record?.userCode || record?.userType === 'legal';
        const roleCodeText = record?.roleCode === 'unit_manager' ? '取消管理员' : '设为管理员';
        return (<>
          {/* <TechConfirm
            title={`确认${roleCodeText}吗`}
            description={null}
            confirm={() => {
              updateRoleCode(record)
            }}
          >
            <Button type="link" disabled={disabled}>{roleCodeText}</Button>
          </TechConfirm> */}
          <AddUser run={getPageData} id={_} record={record} />
          <TechConfirm
            title="确认移除吗"
            description={null}
            confirm={() => {
              handleRemove(record.id);
            }}
          >
            <Button
              disabled={record?.roleCode?.includes('super_admin')}
              type="link"
              style={{ paddingLeft: 0 }}
            >
              移除
            </Button>
          </TechConfirm>
        </>)
      },
    },
  ];

  return (
    <>
      <TechPageTitle goBack>成员管理</TechPageTitle>
      <TechForm.Search
        hasCardBg
        items={formItems}
        form={form}
        onFinish={getPageData}
        onReset={handleReset}
        showExpand={false}
      ></TechForm.Search>
      <TechCard>
        <TechPageTitle type="table" actionNode={<AddUser run={getPageData} />}>
          {`查询结果（共${pagination?.total || 0}条）`}
        </TechPageTitle>
        <TechTable
          isSeq
          columns={columns}
          dataSource={dataSource}
          pagination={{ ...pagination, current: pagination?.pageNum }}
          scroll={{ x: 1200 }}
          loading={loading}
        ></TechTable>
      </TechCard>
    </>
  )
};

export default TechOperationLog;
