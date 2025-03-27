import { Button, Form, FormInstance, Tag } from 'antd';
import React, { FC } from 'react';

import ChangeDep from '../ChangeDep';
import AssociateHistoryAccount from '../associateHistoryAccount';

import { GroupItemsType, TechForm } from '@szhz/tech-pc';
import AdministrativeDivision from '@szhz/tech-pc/components/com-pages-componnets/AdministrativeDivision';

/**
 * 从身份证号码中获取出生日期
 * @param idCard 身份证号码
 * @returns 返回出生日期对象，如果格式不正确或日期无效则返回null
 */

interface UnitInfoProps {
  form: FormInstance<any>;
  edit?: boolean
  handleUpdateInfo?: () => void;
  detailData?: any,
  run?: any
}

const UnitInfo: FC<UnitInfoProps> = ({ form, edit, handleUpdateInfo, detailData, run }) => {

  const { changeCompetentStatus, unifiedSocialCreditCode } = detailData || {};
  // const changeCompetentStatus = 'FAIL';
  const tagInfo: any = {
    WAITING: {
      color: 'blue',
      text: '变更中'
    },
    FAIL: {
      color: 'red',
      text: '变更失败'
    }
  }
  if (!form) return <></>;

  const groupItems2: GroupItemsType[] = [
    {
      title: <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 6 }}>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 12 }}>
          <span>更新说明：</span>
          <span>本系统的单位信息和法人代表信息源自江苏政务服务网统一身份认证平台。如需更新或修改单位基本信息中的单位名称、单位类型、统一社会信用代码，单位法定代表人中的法定代表人姓名、法定代表人证件类型、法定代表人证件号，单位法定代表人/经办人账号中的用户角色、用户角色、用户姓名、证件类型、证件号码、联系方式字段，请前往江苏政务服务网统一身份认证平台进行操作。</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end', gap: 12, alignItems: 'center' }}>
          <ChangeDep detailData={detailData} run={run} disabled={changeCompetentStatus === 'WAITING'} />
          <Button disabled={!localStorage.getItem('JSKJT_LOGIN_LEGAL_INFO')} type="primary" onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            handleUpdateInfo && handleUpdateInfo()
          }}>一键更新</Button>
          <AssociateHistoryAccount userType="legal" unifiedSocialCreditCode={unifiedSocialCreditCode}>
            <Button type="primary">关联历史账号</Button>
          </AssociateHistoryAccount>
        </div>
      </div>,
      columns: 3
    }
  ]

  const groupItems: GroupItemsType[] = [
    {
      title: '单位基本信息',
      columns: 3,
      items: [
        {
          label: '单位名称',
          name: 'unitName',
          type: 'input',
          required: '请填写单位名称',
          fieldProps: {
            disabled: true
          }
        },
        {
          label: '单位类型',
          name: 'unitType',
          type: 'select',
          required: '请选择单位类型',
          fieldProps: {
            dictKey: 'unitNatureNew',
          },
        },
        // {
        //   label: '单位性质',
        //   name: 'unitNature',
        //   type: 'select',
        //   required: '请选择单位性质',
        //   fieldProps: {
        //     dictKey: 'unitNature',
        //   },
        // },
        {
          label: '统一社会信用代码',
          name: 'unifiedSocialCreditCode',
          type: 'input',
          required: '请填写统一社会信用代码',
          fieldProps: {
            disabled: true,
            // rules: [
            //   {
            //     pattern:
            //       /^([0-9A-HJ-NPQRTUWXY]{2})([0-9]{6})([0-9A-HJ-NPQRTUWXY]{9})([0-9XxYy]{1})$/,
            //     message: '请填写正确的统一社会信用代码',
            //   },
            // ],
          },
        },
        {
          label: '成立时间',
          name: 'establishmentTime',
          type: 'TechDatePicker',
          required: '请选择成立时间',
          fieldProps: {
            style: {
              width: '100%',
            },
          },
        },
        {
          label: '注册资本',
          name: 'registeredCapital',
          type: 'input',
          required: '请填写注册资本',
          fieldProps: {
            suffix: '万元',
          },
          itemProps: {
            rules: [{ pattern: /^\d+(\.\d+)?$/, message: '请输入数字' }],
          },
        },
        {
          label: '组织机构代码',
          name: 'organizationCode',
          type: 'input',
          required: '请填写组织机构代码',
        },
        {
          label: <div>主管部门{(changeCompetentStatus === 'WAITING' || changeCompetentStatus === 'FAIL') && <Tag style={{ marginLeft: 8 }} color={tagInfo?.[changeCompetentStatus]?.color}>{tagInfo?.[changeCompetentStatus]?.text}</Tag>}</div>,
          name: 'competentDepartment',
          type: 'input',
          fieldProps: {
            disabled: true
          }
          // required: '请选择主管部门',
          // customCom: <OrgTreeSearch form={form} />,
        },
        {
          label: '地区',
          name: 'area',
          type: 'select',
          required: '请选择地区',
          customCom: <AdministrativeDivision multiple={false} edit={edit} />,
          fieldProps: {
            disabled: true
          }
        },
        {
          label: '通讯地址',
          name: 'address',
          type: 'input',
          required: '请填写通讯地址',
        },
        {
          label: '邮政编码',
          name: 'postalCode',
          type: 'input',
          required: '请填写邮政编码',
          fieldProps: {
            rules: [
              { pattern: /^[1-9]\d{5}$/, message: '请填写正确的邮政编码' },
            ],
          },
        },
      ],
    },
    // {
    //   title: '法人代表信息',
    //   columns: 3,
    //   items: [
    //     {
    //       label: '姓名',
    //       name: 'corporateName',
    //       type: 'input',
    //       required: '请填写姓名',
    //       fieldProps: {
    //         disabled: true,
    //       },
    //     },
    //     {
    //       label: '性别',
    //       name: 'corporateSex',
    //       type: 'select',
    //       required: '请选择性别',
    //       fieldProps: {
    //         dictKey: 'sex',
    //         disabled: true,
    //       },
    //     },
    //     {
    //       label: '身份证件号码',
    //       name: 'corporateIdNumber',
    //       type: 'input',
    //       required: '请填写身份证件号码',
    //       regKey: 'idCard',
    //       fieldProps: {
    //         disabled: true,
    //       },
    //     },
    //     {
    //       label: '联系方式',
    //       name: 'corporateContact',
    //       type: 'input',
    //       required: '请填写联系方式',
    //       regKey: 'phone',
    //     },
    //     {
    //       label: '出生年月',
    //       name: 'birthDate',
    //       type: 'TechDatePicker',
    //       required: '请选择写出生年月',
    //       fieldProps: {
    //         style: {
    //           width: '100%',
    //         },
    //       },
    //     },
    //   ],
    // },
    {
      title: '单位法定代表人',
      columns: 3,
      items: [
        {
          label: '法定代表人姓名',
          name: 'corUserName',
          type: 'input',
          required: '请填写法定代表人姓名',
          fieldProps: {
            disabled: true,
          },
        },
        {
          label: '法定代表人证件类型',
          name: 'corUserCertType',
          type: 'select',
          required: '请选择法定代表人证件类型',
          fieldProps: {
            disabled: true,
            dictKey: 'idTypeSimple',
          },
        },
        {
          label: '证件号码',
          name: 'corUserCertNo',
          type: 'input',
          required: '请填写证件号码',
          regKey: 'idCard',
          fieldProps: {
            disabled: true,
          },
        },
        {
          label: '出生年月',
          name: 'birthDate',
          type: 'TechDatePicker',
          required: '请选择写出生年月',
          fieldProps: {
            style: {
              width: '100%',
            },
          },
        },
        {
          label: '性别',
          name: 'corporateSex',
          type: 'select',
          required: '请选择性别',
          fieldProps: {
            dictKey: 'sex',
          },
        },
      ],
    },
    {
      title: '单位法定代表人/经办人账号',
      columns: 3,
      items: [
        {
          label: '用户角色',
          name: 'corporateUserRole',
          type: 'dependency',
          render: (text: any, form: any) => {
            return <Form.Item
              name="corporateUserRole"
              label="用户角色"
              required
            >
              <div style={{ color: 'rgba(0, 0, 0, 0.25)' }}>{form?.getFieldValue('corporateUserRole') === '2' ? '法定代表人' : text === '3' ? '经办人' : ''}</div>
            </Form.Item>;
          },
        },
        {
          label: '用户姓名',
          name: 'corporateName',
          type: 'input',
          required: '请填写用户姓名',
          fieldProps: {
            disabled: true,
          },
        },
        {
          label: '证件类型',
          name: 'corporateIdType',
          type: 'select',
          required: '请选择证件类型',
          fieldProps: {
            disabled: true,
            dictKey: 'idTypeSimple',
          },
        },
        {
          label: '证件号码',
          name: 'corporateIdNumber',
          type: 'input',
          required: '请填写证件号码',
          regKey: 'idCard',
          fieldProps: {
            disabled: true,
          },
        },
        {
          label: '联系方式',
          name: 'corporateContact',
          type: 'input',
          required: '请填写联系方式',
          regKey: 'phone',
          fieldProps: {
            disabled: true,
          },
        },
      ],
    },
    {
      title: '单位科技管理部门联系人',
      columns: 3,
      items: [
        {
          label: '姓名',
          name: 'techManageName',
          type: 'input',
          required: '请填写姓名',
        },
        {
          label: '职务',
          name: 'techManageDuty',
          type: 'input',
          required: '请填写职务',
        },
        {
          label: '手机',
          name: 'techManageMobilePhone',
          type: 'input',
          required: '请填写联系方式',
          regKey: 'phone',
        },
        {
          label: '联系电话',
          name: 'techManageTelephone',
          type: 'input',
          required: '请填写联系方式',
          regKey: 'phone',
        },
        {
          label: '邮箱',
          name: 'techManageEmail',
          type: 'input',
          required: '请填写邮箱',
          regKey: 'email',
        },
      ],
    },
    {
      title: '营业执照扫描件',
      columns: 3,
      items: [
        {
          label: '营业执照扫描件',
          name: 'businessLicenseFileInfo',
          type: 'TechUploadDragger',
          required: '请上传营业执照扫描件',
          fieldProps: {
            readOnly: !edit,
            uploadUrl: "/szjs-api/gateway/program/attachment/upload",
            accept: '.pdf',
            limit: 50,
            limitSizeType: 'M',
            maxCount: 5,
            canClickName: true,
            onItemClick: (file: any) => { window.open(file?.fileUrl) }
          },
        },
      ],
    },
  ];

  return <>
    <TechForm.Group groupItems={groupItems2}></TechForm.Group>
    <TechForm.Group readonly={!edit} form={form} groupItems={groupItems}></TechForm.Group>
  </>
};

export default UnitInfo;
