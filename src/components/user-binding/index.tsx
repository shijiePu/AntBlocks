import { InfoCircleFilled } from '@ant-design/icons';
import {
  TechCard,
  TechColumnsType,
  TechForm,
  TechFormItems,
  TechLoading,
  TechPageTitle,
  TechTable,
} from '@szhz/tech-pc';
import { getBindingUser, userUnbind } from '@szhz/tech-pc/service/user-binding';
import { Button, Form, Popconfirm, Space, Spin } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImportFile from './components/ImportFile';
import useSearchTable from './components/useSearchTable';

const UserBinding = (props: any) => {
  const { handleAddBind } = props;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { getPageData, tableData, handleReset, loading } = useSearchTable({
    requestFn: getBindingUser,
    form,
  });

  const unbind = async (cur: any) => {
    // message.success('解绑成功');
    console.log('cur', cur);
    const unbindData = {
      userCode: cur?.userCode,
    };
    await userUnbind(unbindData);
    getPageData();
  };

  const formItems: TechFormItems[] = [
    {
      label: '用户姓名',
      name: 'name',
      type: 'input',
    },
    {
      label: '证件类型',
      name: 'idType',
      type: 'select',
      // dictKey: 'idTypeSimple',
      fieldProps: {
        // dict: appStore.state['dictData'].idTypeSimple,
        dictKey: 'idTypeSimple',

        placeholder: '请选择',
      },
    },
    {
      label: '证件号码',
      name: 'idNumber',
      type: 'input',
    },
    {
      label: '手机号码',
      name: 'mobile',
      type: 'input',
    },
    {
      label: '绑定时间',
      name: 'bindDate',
      type: 'datePicker',
      fieldProps: {
        picker: 'date',
        style: { width: '100%' },
        disabledDate: (current) => {
          return current && current > dayjs().endOf('day');
        },
      },
    },
  ];

  const formColumns: TechColumnsType<any> = [
    {
      title: '用户姓名',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '证件类型',
      dataIndex: 'idType',
      width: 200,
    },
    {
      title: '证件编号',
      dataIndex: 'idNumber',
      width: 360,
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      width: 300,
    },
    {
      title: '绑定时间',
      dataIndex: 'bindDate',
      width: 400,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 180,
      render: (_text: any, _record: any) => {
        return (
          <Space>
            {/* <Button type="link" onClick={() => routerDetail(_record)}> */}
            <Popconfirm
              icon={<InfoCircleFilled style={{ color: 'rgb(72, 90, 197)' }} />}
              title="解绑用户"
              description="是否确认解绑该用户"
              okText="确认"
              cancelText="取消"
              placement="left"
              onConfirm={() => unbind(_record)}
            >
              <Button type="link">解绑</Button>
            </Popconfirm>
            {/* {_record.reviewStatus === 'TODO' ? (
                            <TechConfirm
                                buttonProps={{ type: 'link' }}
                                confirm={() => handleDelete(_record?.projectId)}
                            >
                                <Button type="link">删除</Button>
                            </TechConfirm>
                        ) : (
                            ''
                        )} */}
          </Space>
        );
      },
    },
  ];

  // 处理返回数据
  const handleDataSource = (data: any) => {
    data?.map((item: any) => {
      switch (item?.idType) {
        case '111':
          item.idType = '居民身份证';
          break;
        case '511':
          item.idType = '港澳居民来往内地通行证';
          break;
        case '516':
          item.idType = '台湾居民来往内地通行证';
          break;
        case '553':
          item.idType = '外国人永久居留身份证';
          break;
        default:
          break;
      }
    });
    return data;
  };

  const handleClick = () => {
    handleAddBind?.();
  };

  return (
    <>
      <TechPageTitle>用户绑定</TechPageTitle>

      <TechForm.Search
        hasCardBg
        showExpand={false}
        items={formItems}
        form={form}
        onFinish={getPageData}
        onReset={handleReset}
      ></TechForm.Search>

      <TechCard>
        {/* <Spin spinning={loading} indicator={<TechLoading />}> */}
        <Spin spinning={loading} indicator={<TechLoading />}>
          <TechPageTitle
            type="table"
            actionNode={
              <Space>
                <ImportFile>
                  <Button type="primary">批量绑定</Button>
                </ImportFile>
                <Button type="primary" onClick={handleClick}>
                  新增绑定
                </Button>
              </Space>
            }
          >
            {`查询结果（共${tableData?.total || 0}条）`}
          </TechPageTitle>
          <TechTable
            columns={formColumns}
            dataSource={handleDataSource(tableData?.dataSource)}
            scroll={{ x: 500 }}
            pagination={{
              showTotal: (total: any) => `共 ${total} 条`,
              current: tableData.pageNum,
              pageSize: tableData.pageSize,
              total: tableData?.total,
              onChange: (pageNum: number) => {
                getPageData(pageNum);
              },
            }}
          />
        </Spin>
      </TechCard>
    </>
  );
};

export default UserBinding;
