import { TechColumnsType, TechForm, TechFormItems, TechTable } from '@szhz/tech-pc';
import useSearchTable from '@szhz/tech-pc/hooks/useSearchTable';
import { getBindPageQuery } from '@szhz/tech-pc/service/register';
import { Button, Drawer, Form } from 'antd';
import React, { Children, cloneElement, isValidElement, useState } from "react";
import AddRelation from '../addRelation';
import AsyncStatus from '../asyncStatus';

export interface AssociateHistoryAccountProps {
  children: React.ReactNode;
  userType: 'person' | 'legal';
  unifiedSocialCreditCode: string;
}

const AssociateHistoryAccount: React.FC<AssociateHistoryAccountProps> = ({ children, userType, unifiedSocialCreditCode }) => {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  // 查询表单配置
  const formItems: TechFormItems[] = [
    {
      label: '',
      name: 'account',
      fieldProps: {
        placeholder: '请输入账号名进行搜索',
      }
    },
  ];

  // 表格配置
  const columns: TechColumnsType<any> = [
    {
      title: '平台',
      dataIndex: 'bizSystem',
      dictKey: 'BizSystemTypeForUserEnum',
      width: 300,
    },
    {
      title: '账号名',
      dataIndex: 'account',
      width: 120,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 140,
    },
    {
      title: '同步进展',
      dataIndex: 'syncStatus',
      width: 120,
      render: (text: string, record: any) => <AsyncStatus data={text} text={record?.syncStatusName} />,
    },
  ];

  const { getPageData, dataSource, handleReset, pagination, loading } = useSearchTable({
    // 接口地址需自定义
    requestFn: getBindPageQuery,
    form,
    extraParams: {
      userType
    }
  });

  const handleClick = () => {
    setOpen(true)
    getPageData()
  }
  const handleClose = () => {
    setOpen(false)
  }

  const refresh = () => {
    getPageData()
  }

  return <>
    {Children.map(children, (child) => {
      // 不是 react 元素，原样返回
      if (!isValidElement(child)) {
        return child
      }

      return cloneElement(child, { onClick: handleClick, ...child.props })
    })}
    <Drawer title="关联历史账号" footer={null} onClose={handleClose} open={open} width={800}>
      <div style={{ position: 'relative' }}>
        <TechForm.Search
          hasCardBg={false}
          actionNode={<></>}
          items={formItems}
          form={form}
          onFinish={getPageData}
          onReset={handleReset}
          showExpand={false}
        ></TechForm.Search>
        {/* 新建关联 */}
        <AddRelation refresh={refresh} unifiedSocialCreditCode={unifiedSocialCreditCode}>
          <Button type="primary" style={{ position: 'absolute', right: 0, top: 0 }}>新建关联</Button>
        </AddRelation>
        <TechTable
          style={{ marginTop: '10px' }}
          rowKey="account"
          columns={columns}
          loading={loading}
          dataSource={dataSource || []}
          pagination={{ ...pagination, current: pagination?.pageNum }}>
        </TechTable>
      </div>
    </Drawer>
  </>
}

export default AssociateHistoryAccount
