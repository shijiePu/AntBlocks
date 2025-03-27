/**
 * title: 多选列表功能页面
 * background: rgba(42, 46, 54, 0.04)
 */
import {
  TechCard,
  TechColumnsType,
  TechForm,
  TechFormItems,
  TechPageTitle,
  TechTable,
} from '@szhz/tech-pc';
import useSearchTable from '@szhz/tech-pc/hooks/useSearchTable';
import { Button, Form } from 'antd';
import React, { useState } from 'react';

// 查询表单配置
const formItems: TechFormItems[] = [
  {
    label: '查询',
    name: 'data',
    type: 'input',
  },
  {
    label: '查询2',
    name: 'data1',
    type: 'input',
  },
];
// 表格配置
const columns: TechColumnsType<any> = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '操作',
    key: 'action',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (_text: any, _record: any) => {
      return (
        <>
          <Button type="link">详情</Button>
          <Button type="link">编辑</Button>
        </>
      );
    },
  },
];

const mockRequest = async () => {
  return {
    dataSource: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
  };
};

// todo  loading,多选,依赖某个参数更新，弹框模板，导出功能，入库申请审核
export default () => {
  const [form] = Form.useForm();

  const { getPageData, handleReset, dataSource, pagination } = useSearchTable({
    // 接口地址需自定义
    requestFn: mockRequest,
    form,
  });

  // 多选的值
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  // 多选出发事件
  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <>
      <TechPageTitle>模板标题</TechPageTitle>
      <TechForm.Search
        items={formItems}
        form={form}
        onFinish={getPageData}
        onReset={handleReset}
      ></TechForm.Search>

      <TechCard>
        <TechPageTitle type="table">{`查询结果（共${
          pagination?.total || 0
        }条）`}</TechPageTitle>
        <TechTable
          isSeq
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
        ></TechTable>
      </TechCard>
    </>
  );
};
