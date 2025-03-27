import { TechDetail, TechUpload } from "@szhz/tech-pc";
import Flow from '@szhz/tech-pc/components/JSFlow';
import useGetDict from '@szhz/tech-pc/hooks/useGetDictData';
import { Button, Drawer, Form } from 'antd';
import React, { useEffect, useState } from 'react';

import { getPersonOldAccountDetail } from '@szhz/tech-pc/service/register';

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
      getPersonOldAccountDetail({ id: businessCode }).then((res) => {
        const { businessLicenseFileInfo, unitInfo, userInfo, admTYxtUserUnitInfo } = res || {}
        const { unitName, corporateUserRole, corporateName, unifiedSocialCreditCode, corUserName, corUserCertType, corUserCertNo, corporateIdType, corporateIdNumber, corporateContact } = unitInfo || {};
        const { mobile } = userInfo || {};
        const { xtlx, yhm, yhqc, yhsjhm, dwmc } = admTYxtUserUnitInfo || {}
        // 回显表单数据
        setData({ unitName, corporateUserRole, corporateName, unifiedSocialCreditCode, mobile, corUserName, corUserCertType, corUserCertNo, corporateIdType, corporateIdNumber, corporateContact, xtlx, yhm, yhqc, yhsjhm, dwmc, businessLicenseFileInfo })
      })
    }
  }, [businessCode, vis])

  const items: any = [
    {
      groupTitle: '新账号单位管理员账号信息',
      groupItems: [
        {
          title: '单位信息',
          column: 1,
          items: [
            {
              label: '单位名称',
              key: 'unitName',
            },
            {
              label: '统一社会信用代码',
              key: 'unifiedSocialCreditCode',
            },
            {
              label: '账号名',
              key: 'mobile',
            },
            {
              label: '法定代表人姓名',
              key: 'corUserName',
            },
            {
              label: '法定代表人证件类型',
              key: 'corUserCertType',
              type: 'dict',
              dictMap: dictData,
            },
            {
              label: '法定代表人证件号',
              key: 'corUserCertNo',
            },
          ],
        },
        {
          title: '用户信息',
          column: 1,
          items: [
            {
              label: '用户角色',
              key: 'corporateUserRole',
              render: (text: any, record: any) => {
                return text === '2' ? '法定代表人' : text === '3' ? '经办人' : '';
              },
            },
            {
              label: '姓名',
              key: 'corporateName',
            },
            {
              label: '证件类型',
              key: 'corporateIdType',
              type: 'dict',
              dictMap: dictData,
            },
            {
              label: '证件号码',
              key: 'corporateIdNumber',
            },
            {
              label: '联系方式',
              key: 'corporateContact',
            },
          ],
        },
      ],
    },
    {
      groupTitle: '绑定老账号信息',
      groupItems: [
        {
          title: '绑定老账号信息',
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
    {
      groupTitle: '附件',
      groupItems: [
        {
          title: '',
          column: 1,
          items: [
            {
              label: '营业执照扫描件',
              name: 'businessLicenseFileInfo',
              render(value: any) {
                return (
                  <TechUpload.Dragger
                    value={value}
                    readOnly={true}
                  ></TechUpload.Dragger>
                );
              }
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
        rootClassName="lib-bind-legal-old-detail"
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
