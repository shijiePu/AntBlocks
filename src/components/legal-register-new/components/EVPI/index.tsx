import { Form } from 'antd';
import React, { useMemo } from 'react';

import { TechCard, TechDetail, TechDetailGroupItem, TechForm, TechUpload } from "@szhz/tech-pc";
import AdministrativeDivision from '@szhz/tech-pc/components/com-pages-componnets/AdministrativeDivision';
import TreeSelect from '@szhz/tech-pc/components/com-pages-componnets/TreeSelect';
import { LEGAL_UNIT_INFO, LEGAL_USER_INFO, getLEGAL_UNIT_INFO_COLUMNS, getLEGAL_USER_INFO_COLUMNS } from "@szhz/tech-pc/components/com-pages-utils/register";
import CryptoJS from 'crypto-js';


export interface FormStepsProps {
  className?: string;
  form?: any;
  initDepCode?: any;
}

const FormSteps: React.FC<FormStepsProps> = ({ form, initDepCode }) => {
  const items: TechDetailGroupItem[] = [
    {
      groupTitle: '',
      groupItems: [
        {
          title: '单位基本信息',
          column: 1,
          // @ts-ignore
          items: getLEGAL_UNIT_INFO_COLUMNS(),
        }
      ],
    },
    {
      groupTitle: '',
      groupItems: [
        {
          title: '用户信息',
          column: 1,
          // @ts-ignore
          items: getLEGAL_USER_INFO_COLUMNS(),
        }
      ],

    },
  ];

  const timeStr: any = new Date().getTime().toString();
  const Items = useMemo(() => {
    return [
      {
        label: '单位类型',
        name: 'unitNature',
        type: 'select',
        required: '请选择单位性质',
        fieldProps: {
          dictKey: 'unitNatureNew',
        },
      },
      {
        label: '地区',
        name: 'area',
        type: 'select',
        required: '请选择地区',
        customCom: <AdministrativeDivision multiple={false} />,
        fieldProps: {
          disabled: true
        }
      },
      {
        label: '主管部门',
        name: 'competentDepartmentCode',
        required: '请选择主管部门',
        customCom: <TreeSelect form={form} field="competentDepartment" />,
      },
      {
        label: '主管部门',
        name: 'competentDepartment',
        hidden: true,
      },
      {
        label: '通讯地址',
        name: 'address',
        type: 'input',
        required: '请填写通讯地址',
        itemProps: {
          maxLength: 50,
        }
      },
      {
        label: '邮政编码',
        name: 'postalCode',
        type: 'input',
        required: '请填写邮政编码',
        itemProps: {
          rules: [
            { pattern: /^[1-9]\d{5}$/, message: '请填写正确的邮政编码' },
          ],
        },
      },
      {
        label: '营业执照扫描件',
        name: 'businessLicenseFileInfo',
        type: 'TechUploadDragger',
        required: '请上传营业执照扫描件',
        fieldProps: {
          uploadUrl: "/szjs-api/gateway/program/attachment/uploadWithSign",
          data: { sign: CryptoJS.MD5(timeStr), salt: timeStr },
          accept: '.pdf',
          limit: 50,
          limitSizeType: 'M',
          maxCount: 5,
          canClickName: true,
          onItemClick: (file: any) => { window.open(file?.fileUrl) }
        },
      },
      {
        type: 'dependency',
        depNames: ['competentDepartmentCode'],
        render: (props: any) => {
          const { competentDepartmentCode } = props;
          // 从关联账号带出主管部门时，需校验主管部门是否发生变更
          return initDepCode && initDepCode !== competentDepartmentCode
            ? (
              <Form.Item
                label="主管部门变更材料"
                name="competentUnitChangeFileInfo"
                rules={[{ required: true, message: '请上传主管部门变更材料' }]}
              >
                <TechUpload.Dragger
                  uploadUrl="/szjs-api/gateway/program/attachment/uploadWithSign"
                  data={{ sign: CryptoJS.MD5(timeStr), salt: timeStr }}
                  accept=".pdf" limit={50}
                  limitSizeType="M"
                  maxCount={5}
                  canClickName={true}
                  onItemClick={(file: any) => { window.open(file?.fileUrl) }} />
              </Form.Item>
            )
            : null
        },
      },
    ];
  }, [])

  return <>
    <TechDetail.Group items={items} dataSource={{ ...LEGAL_UNIT_INFO, ...LEGAL_USER_INFO }}></TechDetail.Group>
    <TechCard>
      <TechForm
        layout='vertical'
        initialValues={{}}
        // @ts-ignore
        items={Items}
        columns={1}
        form={form}
      ></TechForm>
    </TechCard>
  </>
}

export default FormSteps
