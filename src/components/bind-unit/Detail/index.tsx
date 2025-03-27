// @ts-ignore
import { TechDetail } from '@szhz/tech-pc';
import Flow from '@szhz/tech-pc/components/JSFlow';
import useGetDict from '@szhz/tech-pc/hooks/useGetDictData';
import { getBindUnitDetail } from '@szhz/tech-pc/service/bind-unit';
import { Button, Drawer, Form } from 'antd';
import React, { useEffect, useState } from 'react';

import './drawer.less';
type Props = {
  detailData?: any,
  run?: any,
  businessCode?: any
  disabled?: boolean
  reviewStatus?: any
  processInstanceId?: any
  hideFlowAction?: boolean
}

const ChangeDep = ({ run, processInstanceId, businessCode, hideFlowAction }: Props) => {
  const { dictData } = useGetDict({ dictKey: 'idTypeSimple' });
  const [vis, setVis] = useState(false); // Drawer显隐状态
  const [data, setData] = useState<any>({}); // 表单数据

  const [form] = Form.useForm();

  useEffect(() => {
    // 详情，通过我的发起任务id查询该事件类型的详情
    if (businessCode && vis) {
      getBindUnitDetail({ businessCode }).then((res: any) => {
        const { name, mobile, orgName, dept, position } = res || {};
        // 回显表单数据
        setData(res)
      })
    }
  }, [businessCode, vis])

  const items: any = [
    {
      groupTitle: '',
      groupItems: [
        {
          title: '申请信息',
          column: 1,
          items: [
            {
              label: '姓名',
              key: 'name',
            },
            {
              label: '手机号',
              key: 'mobile',
            },
            {
              label: '证件类型',
              key: 'idType',
              type: 'dict',
              dictMap: dictData,
            },
            {
              label: '证件号码',
              key: 'idNumber',
            },
            {
              label: '账号名',
              key: 'mobile',
            },
            {
              label: '绑定企业',
              key: 'orgName',
            },
            {
              label: '所在部门',
              key: 'dept',
            },
            {
              label: '具体职务',
              key: 'position',
            },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <Button onClick={() => { setVis(true) }} type='link' style={{ paddingLeft: 0 }}>详情</Button>
      <Drawer
        rootClassName="lib-bind-detail"
        width={800}
        title={'详情'}
        open={vis}
        onClose={() => { setVis(false); form.resetFields(); }}
        footer={null}
      >
        <TechDetail.Group items={items} dataSource={data}></TechDetail.Group>
        {/* 流程信息 */}
        <Flow processInstanceId={processInstanceId} handleEditCallback={() => { run(); setVis(false); }} hideAction={hideFlowAction}></Flow>
      </Drawer>
    </div>
  )

}


export default ChangeDep;
