import { validateNonNegativeInteger } from '@szhz/tech-pc/components/com-pages-utils/index';
import { Form, FormInstance } from 'antd';
import React, { FC, memo } from 'react';

import { GroupItemsType, TechForm } from '@szhz/tech-pc';

interface BasicInfoFormProps {
  form: FormInstance<any>;
  edit: boolean;
}

const BasicInfoForm: FC<BasicInfoFormProps> = ({ form, edit }) => {
  const unitRegistrationType = Form.useWatch('unitRegistrationType', form);

  const groupItems: GroupItemsType[] = [
    {
      title: '单位概况',
      columns: 3,
      items: [
        {
          label: '单位注册类型',
          name: 'unitRegistrationType',
          type: 'select',
          required: true,
          fieldProps: {
            disabled: true,
            dictKey: 'unitNatureNew',
          },
        },
        {
          label: '机构类型',
          name: 'institutionType',
          type: 'select',
          required: true,
          hidden: unitRegistrationType !== 'technology_intermediary_agencies',
          fieldProps: {
            dictKey: 'orgClassify',
            mode: 'multiple',
          },
        },
        {
          label: '是否重点高校',
          name: 'keyUniversityType',
          type: 'select',
          required: true,
          hidden: unitRegistrationType !== 'provincial_universities' && unitRegistrationType !== 'affiliated_universities',
          fieldProps: {
            dictKey: 'keyUniversityType',
          },
        },
        {
          label: '单位简介',
          name: 'unitDescription',
          type: 'textarea',
          required: true,
          colProps: {
            span: 24,
          },
          fieldProps: {
            maxLength: 1000,
          },
        },
        {
          label: '单位科研条件简介',
          name: 'researchConditionsDescription',
          type: 'textarea',
          required: true,
          colProps: {
            span: 24,
          },
          fieldProps: {
            maxLength: 1000,
          },
        },
        {
          label: '内部研发机构建设情况',
          name: 'internalRAndDConstruction',
          type: 'textarea',
          required: true,
          colProps: {
            span: 24,
          },
          fieldProps: {
            maxLength: 1000,
          },
        },
      ],
    },
    {
      title: '人员情况（申报年度的上年度数据）',
      columns: 3,
      items: [
        {
          label: '职工总数（人）',
          name: 'totalEmployees',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{
              required: true, validator: (_: any, value: any) => {
                if (!value && value !== 0) {
                  if (_?.required) {
                    // return Promise.reject('请输入有效的非负整数');
                  }
                } else {
                  const isNonNegativeInteger = /^(0|[1-9]\d*)$/.test(value); // 正则匹配0和正整数
                  if (!isNonNegativeInteger) {
                    return Promise.reject('请输入有效的非负整数');
                  }
                  for (const name of [
                    'researchPersonnel',
                    'academicians',
                    'changjiangScholars',
                    'outstandingYouthsNational',
                    'professors',
                    'associateProfessors',
                  ]) {
                    if (value < form?.getFieldValue(name)) {
                      return Promise.reject(
                        '职工总数不能小于任意一类人员的数量',
                      );
                    }
                  }
                }
                return Promise.resolve();
              }
            }],
          },
        },
        {
          label: '科研人员（人）',
          name: 'researchPersonnel',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '院士（人）',
          name: 'academicians',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '长江学者（人）',
          name: 'changjiangScholars',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '国家“杰出青年”（人）',
          name: 'outstandingYouthsNational',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '正高（教授）职称（人）',
          name: 'professors',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '副高（副教授）职称（人）',
          name: 'associateProfessors',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
      ],
    },
    {
      title: '专利情况（申报年度的上年度数据）',
      columns: 3,
      items: [
        {
          label: '上年度专利申请数（件）',
          name: 'patentApplicationsLastYear',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '上年度专利授权数（件）',
          name: 'patentGrantsLastYear',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '其中：发明专利申请数（件）',
          name: 'inventionPatentApplications',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{
              required: true, validator: (_: any, value: any) => {
                if (!value && value !== 0) {
                  if (_?.required) {
                    // return Promise.reject('请输入有效的非负整数');
                  }
                } else {
                  const isNonNegativeInteger = /^(0|[1-9]\d*)$/.test(value); // 正则匹配0和正整数
                  if (!isNonNegativeInteger) {
                    return Promise.reject('请输入有效的非负整数');
                  }
                  for (const name of [
                    'patentApplicationsLastYear'
                  ]) {
                    if (value > form?.getFieldValue(name)) {
                      return Promise.reject(
                        '发明专利申请数不能大于上年度专利申请数',
                      );
                    }
                  }
                }
                return Promise.resolve();
              }
            }],
          },
        },
        {
          label: '其中：发明专利授权数（件）',
          name: 'inventionPatentGrants',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{
              required: true, validator: (_: any, value: any) => {
                if (!value && value !== 0) {
                  if (_?.required) {
                    // return Promise.reject('请输入有效的非负整数');
                  }
                } else {
                  const isNonNegativeInteger = /^(0|[1-9]\d*)$/.test(value); // 正则匹配0和正整数
                  if (!isNonNegativeInteger) {
                    return Promise.reject('请输入有效的非负整数');
                  }
                }
                if (value) {
                  for (const name of [
                    'patentGrantsLastYear'
                  ]) {
                    if (value > form?.getFieldValue(name)) {
                      return Promise.reject(
                        '发明专利授权数不能大于上年度专利授权数',
                      );
                    }
                  }
                }
                return Promise.resolve();
              }
            }],
          },
        },
        {
          label: '累计拥有专利数（件）',
          name: 'totalInventionPatents',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '累计拥有发明专利数（件）',
          name: 'totalPatents',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
      ]
    },
    {
      title: '科研成果（申报年度的前三年度合计数据）',
      columns: 3,
      items: [
        {
          label: '国家级科技奖项（项）',
          name: 'nationalScienceAwards',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '省级科技奖项（项）',
          name: 'provincialScienceAwards',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '承担国家级科技项目（项）',
          name: 'nationalProjects',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '承担省级科技项目（项）',
          name: 'provincialProjects',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: 'SCI论文（篇）',
          name: 'sciPapers',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: 'EI论文（篇）',
          name: 'eiPapers',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '植物新品种（个）',
          name: 'newPlantVarieties',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '新药证书（项）',
          name: 'newDrugCertificates',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
      ]
    },
    {
      title: '学科建设情况',
      columns: 3,
      items: [
        {
          label: '国家重点一级学科（个）',
          name: 'keyFirstLevelDisciplines',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '国家重点二级学科（个）',
          name: 'keySecondLevelDisciplines',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '博士学位授权点（个）',
          name: 'doctorateAuthorizationPoints',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '硕士学位授权点（个）',
          name: 'masterAuthorizationPoints',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '博士后科研工作站（个）',
          name: 'postdoctoralResearchStations',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
        {
          label: '省优势学科（个）',
          name: 'provincialSuperiorDisciplines',
          type: 'inputNumber',
          required: true,
          fieldProps: {
            style: {
              width: '100%',
            },
            precision: 0,
          },
          itemProps: {
            rules: [{ required: true, validator: validateNonNegativeInteger }],
          },
        },
      ]
    }
  ];

  return (
    <TechForm.Group
      readonly={!edit}
      groupItems={groupItems}
      form={form}
    ></TechForm.Group>
  );
};

export default memo(BasicInfoForm);
