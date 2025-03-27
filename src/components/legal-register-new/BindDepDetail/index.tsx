// @ts-ignore
import { TechDetail, TechUpload } from '@szhz/tech-pc';
import Flow from '@szhz/tech-pc/components/JSFlow';
import useGetDict from '@szhz/tech-pc/hooks/useGetDictData';
import { getDepChangeInfo } from '@szhz/tech-pc/service/unit-info';
import { Button, Drawer, Form } from 'antd';
import React, { useEffect, useState } from 'react';

import './drawer.less';
type Props = {
  run?: any,
  businessCode?: any
  processInstanceId?: any
  hideFlowAction?: boolean
  isChange?: boolean // true 变更主管部门 false 绑定主管部门
}

const ChangeDep = ({ isChange, run, processInstanceId, businessCode, hideFlowAction }: Props) => {
  const { dictData } = useGetDict({ dictKey: 'idTypeSimple' });
  const { dictData: unitNature } = useGetDict({ dictKey: 'unitNature' });
  const [vis, setVis] = useState(false); // Drawer显隐状态
  const [data, setData] = useState<any>({}); // 表单数据
  const [form] = Form.useForm();

  useEffect(() => {
    // 详情，通过我的发起任务id查询该事件类型的详情
    if (businessCode && vis) {
      getDepChangeInfo({ businessCode }).then((res: any) => {
        const { unitInfo, competentDepartment, originalCompetentDepartment, businessLicenseFileInfo, competentUnitChangeFileInfo } = res || {}
        const { unitName, unifiedSocialCreditCode, unitType, organizationCode, corUserName, corUserCertType, corUserCertNo, areaName, address, postalCode, corporateUserRole, corporateName, corporateIdType, corporateIdNumber, corporateContact } = unitInfo || {}
        // 回显表单数据
        setData({
          unitName, unifiedSocialCreditCode, unitType, organizationCode, corUserName, corUserCertType, corUserCertNo, areaName, address, postalCode,
          corporateUserRole, corporateName, corporateIdType, corporateIdNumber, corporateContact,
          competentDepartment, originalCompetentDepartment,
          businessLicenseFileInfo, competentUnitChangeFileInfo
        })
      })
    }
  }, [businessCode, vis])

  const items: any = [
    {
      groupTitle: '',
      groupItems: [
        {
          title: '单位基本信息',
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
              label: '单位类型',
              key: 'unitType',
              type: 'dict',
              dictMap: unitNature,
            },
            {
              label: '组织机构代码',
              key: 'organizationCode',
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
            {
              label: '地区',
              key: 'areaName',
            },
            {
              label: '通讯地址',
              key: 'address',
            },
            {
              label: '邮政编码',
              key: 'postalCode',
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
        {
          title: '原主管部门',
          hidden: !isChange,
          column: 1,
          items: [
            {
              label: '主管部门',
              key: 'originalCompetentDepartment',
            }
          ],
        },
        {
          title: isChange ? '新主管部门' : '绑定主管部门',
          column: 1,
          items: [
            {
              label: isChange ? '新主管部门' : '主管部门',
              key: 'competentDepartment',
            }
          ],
        },
        {
          title: '附件',
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
            {
              label: '变更材料',
              hidden: !isChange,
              name: 'competentUnitChangeFileInfo',
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
        rootClassName="lib-bind-dep-detail"
        width={800}
        title={`${isChange ? '变更' : '绑定'}主管部门详情`}
        open={vis}
        onClose={() => { setVis(false); form.resetFields(); }}
        footer={null
        }
      >
        <TechDetail.Group items={items} dataSource={data}></TechDetail.Group>
        {/* <TechForm.Group form={form} groupItems={groupItems}></TechForm.Group> */}
        {/* 流程信息 */}
        <Flow processInstanceId={processInstanceId} handleEditCallback={() => { run(); setVis(false); }} hideAction={hideFlowAction}></Flow>
      </Drawer>
    </div>
  )

}


export default ChangeDep;
