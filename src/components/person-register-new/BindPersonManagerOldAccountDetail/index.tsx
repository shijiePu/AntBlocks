import { TechDetail } from "@szhz/tech-pc";
import Flow from '@szhz/tech-pc/components/JSFlow';
import useGetDict from '@szhz/tech-pc/hooks/useGetDictData';
import { getPersonOldAccountDetail } from '@szhz/tech-pc/service/register';
import { Button, Drawer, Form } from 'antd';
import React, { useEffect, useState } from 'react';

import './drawer.less';
type Props = {
  detailData?: any,
  run?: any,
  businessCode?: any
  disabled?: boolean
  processInstanceId?: any
  hideFlowAction?: boolean
  formReadOnly?: boolean
}

const ChangeDep = ({ run, businessCode, processInstanceId, hideFlowAction }: Props) => {
  const { dictData } = useGetDict({ dictKey: 'idTypeSimple' });
  const { dictData: dictData_xtlx } = useGetDict({ dictKey: 'BizSystemTypeEnum' });

  const [vis, setVis] = useState(false); // Drawer显隐状态
  const [data, setData] = useState({}); // 表单数据

  const [form] = Form.useForm();

  useEffect(() => {
    // 详情，通过我的发起任务id查询该事件类型的详情
    if (businessCode && vis) {
      getPersonOldAccountDetail({ id: businessCode }).then((res: any) => {
        // 回显表单数据
        setData({ ...res?.admTYxtUserUnitInfo, ...res?.unitInfo, ...res?.userInfo })
      })
    }
  }, [businessCode, vis])

  const items: any = [
    {
      groupTitle: '',
      groupItems: [
        {
          title: '新账号信息',
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
          ],
        },
        {
          title: '绑定老账号',
          column: 1,
          items: [
            {
              label: '绑定老系统',
              key: 'xtlx',
              type: 'dict',
              dictMap: dictData_xtlx,
            },
            {
              label: '账号',
              key: 'yhm',
            },
            {
              label: '姓名',
              key: 'yhqc',
            },
            {
              label: '手机号',
              key: 'yhsjhm',
            },
            {
              label: '账号所在单位名称',
              key: 'dwmc',
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
        rootClassName="lib-bind-person-old-detail"
        width={800}
        title={'详情'}
        open={vis}
        onClose={() => { setVis(false); form.resetFields(); }}
        footer={null}
      >
        <TechDetail.Group items={items} dataSource={data}></TechDetail.Group>
        {/* 流程信息 */}
        {
          processInstanceId &&
          <Flow processInstanceId={processInstanceId} hideAction={hideFlowAction} handleEditCallback={() => { run(); setVis(false); }}></Flow>
        }
      </Drawer>
    </div>
  )

}


export default ChangeDep;
