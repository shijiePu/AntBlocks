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
import { getBindingNew, userBind } from '@szhz/tech-pc/service/user-binding';
import { Button, Form, Popconfirm, Space, Spin } from 'antd';
import React from 'react';
import useSearchTable from './components/useSearchTable';

const AddBind = () => {
  const [form] = Form.useForm();

  const { getPageData, tableData, handleReset, loading } = useSearchTable({
    requestFn: getBindingNew,
    form,
  });

  const userBinding = async (cur: any) => {
    const userBindData = {
      userCode: cur?.userCode,
    };
    await userBind(userBindData);
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
      fieldProps: {
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
      dictKey: 'idType',
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
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 180,
      render: (_text: any, _record: any) => {
        return (
          <Space>
            <Popconfirm
              icon={<InfoCircleFilled style={{ color: 'bulue' }} />}
              title="绑定用户"
              description="是否确认绑定该用户"
              okText="确认"
              cancelText="取消"
              placement="left"
              onConfirm={() => userBinding(_record)}
            >
              <Button type="link">绑定</Button>
            </Popconfirm>
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

  return (
    <>
      <TechPageTitle goBack>用户绑定&gt;新增绑定</TechPageTitle>

      <TechForm.Search
        hasCardBg
        showExpand={false}
        items={formItems}
        form={form}
        onFinish={getPageData}
        onReset={handleReset}
      ></TechForm.Search>

      <TechCard>
        <Spin spinning={loading} indicator={<TechLoading />}>
          <TechPageTitle type="table">
            {`查询结果（共${tableData?.total || 0}条）`}
          </TechPageTitle>
          <TechTable
            columns={formColumns}
            dataSource={handleDataSource(tableData?.dataSource)}
            scroll={{ x: 500 }}
            pagination={{
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

export default AddBind;
