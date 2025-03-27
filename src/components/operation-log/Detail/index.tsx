// @ts-ignore
import { TechForm } from '@szhz/tech-pc';
import { Button, Drawer, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactJson from "react-json-view";

import { getUserOperationLogDetail } from '@szhz/tech-pc/service/operation-log';

import './drawer.less';
type Props = {
  operationId?: any,
}

const ChangeDep = ({ operationId }: Props) => {
  const [vis, setVis] = useState(false); // Drawer显隐状态
  const [data, setData] = useState<any>({});
  const { name, phone, ipAddress, functionModule, operationType, operationStatus, operationTime, resParams } = data || {};
  const [form] = Form.useForm();

  useEffect(() => {
    // 详情
    if (operationId && vis) {
      getUserOperationLogDetail({ operationId }).then((res: any) => {
        const { operationDetail, userInfo } = res || {}
        // 回显表单数据
        setData({ ...operationDetail, ...userInfo })
        form.setFieldsValue({ ...operationDetail, ...userInfo })
      })
    }
  }, [operationId, vis])

  const groupItems: any = [
    {
      title: '操作人员信息',
      columns: 1,
      items: [
        {
          label: '操作人员',
          name: 'name',
          customCom: <span>{name}</span>
        },
        {
          label: '手机号',
          name: 'phone',
          customCom: <span>{phone}</span>
        },
      ],
    },
    {
      title: '操作明细',
      columns: 1,
      items: [
        {
          label: 'IP地址',
          name: 'ipAddress',
          customCom: <span>{ipAddress}</span>
        },
        {
          label: '功能模块',
          name: 'functionModule',
          customCom: <span>{functionModule}</span>

        },
        {
          label: '操作类型',
          name: 'operationType',
          customCom: <span>{operationType}</span>

        },
        {
          label: '操作状态',
          name: 'operationStatus',
          customCom: <span>{form.getFieldValue('operationStatus') === true ? '成功' : '失败'}</span>
        },
        {
          label: '操作时间',
          name: 'operationTime',
          customCom: <span>{operationTime}</span>
        },
        {
          label: '出参',
          // name: 'resParams',
          customCom: <ReactJson src={resParams} name={false} />
        },
      ],
    },
  ];

  return (
    <div>
      <Button onClick={() => { setVis(true) }} type='link' style={{ padding: 0 }}>详情</Button>
      <Drawer
        rootClassName="lib-operation-log-detail"
        width={800}
        title={'日志详情'}
        open={vis}
        onClose={() => { setVis(false); }}
      >
        <TechForm.Group readonly={false} form={form} groupItems={groupItems} layout='horizontal' labelCol={{ span: 4 }}></TechForm.Group>
      </Drawer>
    </div>
  )

}


export default ChangeDep;
