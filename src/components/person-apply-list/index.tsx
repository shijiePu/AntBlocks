import { Button, Dropdown, Form, MenuProps, message, Modal, Tabs } from "antd";
import { cloneDeep } from "lodash-es";
import React, { useState } from "react";

import { getColumns, getFormItems, getSearchItems } from "./config";

import { TechCard, TechForm, TechPageTitle, TechTable } from "@szhz/tech-pc";
import useSearchTable from "@szhz/tech-pc/hooks/useSearchTable";
import { approval, unitBindQuery } from "@szhz/tech-pc/service/register";

export interface IndexProps {
  className?: string;
}

const tabItems = [
  {
    label: '待处理',
    key: '0',
  },
  {
    label: '已处理',
    key: '1',
  },
  {
    label: '全量',
    key: '2',
  },
];


const Index: React.FC<IndexProps> = () => {
  const [activeType, setActiveType] = useState(tabItems[0].key);
  const [selectedMenuKey, setSelectedMenuKey] = useState<string>();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [approvalForm] = Form.useForm();
  // 多选的值
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  // 多选出发事件
  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };


  const { loading, getPageData, handleReset, dataSource, pagination } = useSearchTable({
    // 接口地址需自定义
    requestFn: unitBindQuery,
    form,
    dispatchParams: (params) => {
      const cloneParams = cloneDeep({ taskState: activeType, ...params, });
      if (cloneParams.applyTime?.length === 2) {
        cloneParams.startTime = cloneParams.applyTime[0];
        cloneParams.endTime = cloneParams.applyTime[1];
        delete cloneParams.applyTime;
      }
      return cloneParams;
    }
  });

  const handleChangeTab = (activeKey: string) => {
    setActiveType(activeKey);
    setSelectedRowKeys([]);
    getPageData({ taskState: activeKey })
  };
  // 业务处室
  const items: MenuProps['items'] = [
    {
      label: '批量通过',
      key: '1',
    },
    {
      label: '批量不通过',
      key: '2',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = async (e) => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择至少一个条目')
      return
    }

    setSelectedMenuKey(e.key)
    setOpen(true)
    approvalForm.setFieldsValue({ approveOpinion: e.key === '1' ? '同意' : '' })
  }

  const handleClose = () => {
    setOpen(false)
    approvalForm.resetFields()
  }

  const handleConfirm = async () => {
    await approvalForm.validateFields()
    setSubmitting(true)

    const values = approvalForm.getFieldsValue()
    await approval({
      approve: selectedMenuKey === '1',
      taskIds: selectedRowKeys,
      approveOpinion: values.approveOpinion
    }).finally(() => setSubmitting(false))

    message.success('操作成功')
    handleClose()
    getPageData()
  }

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };


  const Items: any = getSearchItems(activeType)

  const columns: any = getColumns(getPageData)

  const formItems: any = getFormItems(selectedMenuKey === '2')

  return <>
    <TechPageTitle>用户申请审核</TechPageTitle>

    <Tabs
      style={{ marginBottom: '-14px' }}
      defaultActiveKey={tabItems[0].key}
      type="card"
      onChange={handleChangeTab}
      items={tabItems}
    />

    <TechForm.Search
      showExpand={false}
      items={Items}
      key={activeType}
      form={form}
      onFinish={getPageData}
      onReset={handleReset}
      columns={4}
    ></TechForm.Search>

    <TechCard>
      <TechPageTitle
        title={`查询结果（共${pagination?.total || 0}条）`}
        type="table"
        actionNode={
          activeType === '0' && <Dropdown menu={menuProps}>
            <Button type="primary">批量审核</Button>
          </Dropdown>
        }
      />
      <TechTable
        rowKey="taskId"
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        columns={columns}
        loading={loading}
        dataSource={dataSource}
        isSeq={true}
        scroll={{ x: 1300 }}
        pagination={pagination}
      />
    </TechCard>
    <Modal open={open} onCancel={handleClose} title="批量审批" okButtonProps={{ loading: submitting }} onOk={handleConfirm}>
      <TechForm form={approvalForm} items={formItems}></TechForm>
    </Modal>
  </>
}

export default Index
