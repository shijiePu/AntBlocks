import { Form, FormInstance, Input } from 'antd';
import React, { FC, memo, useMemo } from 'react';

import AdministrativeDivision from '@szhz/tech-pc/components/com-pages-componnets/AdministrativeDivision';
import CustomRadio from '../CustomRadio';
import OpinionInputGroup from '../OpinionInputGroup';
import TechTaxReportTable from '../TechTaxReportTable';

import { GroupItemsType, TechForm } from '@szhz/tech-pc';

interface BasicInfoFormProps {
  form: FormInstance<any>;
  edit: boolean;
}

const BasicInfoForm: FC<BasicInfoFormProps> = ({ form, edit }) => {
  const financingRequired = Form.useWatch('financingRequired', form);

  const financingStatus = useMemo(
    () => (msg: string) => {
      if (financingRequired === 'YES') return msg;

      return false;
    },
    [financingRequired],
  );

  const groupItems: GroupItemsType[] = [
    {
      title: '企业概况',
      columns: 3,
      items: [
        {
          label: '企业注册类型',
          type: 'select',
          name: 'enterRegisterType',
          required: '请选择企业注册类型',
          fieldProps: {
            dictKey: 'enterRegisterType',
          },
        },
        {
          label: '控股方',
          type: 'input',
          name: 'controlParty',
          required: '请输入控股方',
        },
        {
          label: '企业规模',
          type: 'select',
          name: 'enterSize',
          required: '请选择企业规模',
          fieldProps: {
            dictKey: 'enterSize',
          },
        },
        {
          label: '企业认定情况',
          type: 'checkGroup',
          name: 'enterRecognizeSituation',
          required: '请选择企业认定情况',
          fieldProps: {
            style: {
              width: '100%',
              justifyContent: 'space-around',
              marginBottom: '10PX',
            },
            dictKey: 'enterRecognizeSituation',
            disabled: !edit
          },
          itemProps: {
            style: {
              marginBottom: 0,
            },
          },
          colProps: {
            span: 24,
          },
        },
        {
          type: 'dependency',
          depNames: ['enterRecognizeSituation'],
          colProps: {
            span: 24,
          },
          render: (data) => {
            const { enterRecognizeSituation } = data;

            if (!enterRecognizeSituation?.length) {
              return <></>;
            }

            return (
              <Form.Item name="certificationNumber" label="">
                <OpinionInputGroup entData={enterRecognizeSituation} edit={edit}/>
              </Form.Item>
            );
          },
        },
        {
          label: '是否为上市企业',
          type: 'radioGroup',
          name: 'listedEnterprise',
          required: '请选择是否为上市企业',
          fieldProps: {
            dictKey: 'whetherOrNot',
          },
        },
        {
          type: 'dependency',
          depNames: ['listedEnterprise'],
          render: (data) => {
            const { listedEnterprise } = data;

            if (listedEnterprise === 'NO') return <></>;

            return (
              <Form.Item
                name="listedRegion"
                label="上市地区"
                rules={[
                  {
                    required: listedEnterprise === 'NO' ? false : true,
                    message: '请输入上市地区',
                  },
                ]}
              >
                <AdministrativeDivision multiple={false} edit={edit} />
              </Form.Item>
            );
          },
        },
        {
          type: 'dependency',
          depNames: ['listedEnterprise'],
          render: (data, record) => {
            const { listedEnterprise } = data;

            if (listedEnterprise === 'NO') return <></>;

            return (
              <Form.Item
                name="listedCode"
                label="上市代码"
                rules={[
                  {
                    required: listedEnterprise === 'NO' ? false : true,
                    message: '请输入上市代码',
                  },
                ]}
              >
                {
                  edit ? <Input placeholder="请输入代码"></Input> : <span style={{ color: 'rgba(0, 0, 0, 0.25)' }}>{record.getFieldValue('listedCode')}</span>
                }
              </Form.Item>
            );
          },
        },
        {
          label: '主营业务所属产业领域',
          name: 'industrialSector',
          type: 'input',
          required: '请输入主营业务所属产业领域',
          fieldProps: {
            placeholder: '请输入主营业务所属产业领域',
          },
        },
        {
          label: '主要品牌',
          type: 'input',
          name: 'mainBrand',
          required: '请输入主要品牌',
          fieldProps: {
            placeholder: '请输入主要品牌',
          },
        },
        {
          label: '主要产品',
          type: 'input',
          name: 'mainProduct',
          required: '请输入主要产品',
          fieldProps: {
            placeholder: '请输入主要产品',
          },
        },
        {
          label: '内部研发机构建设情况',
          type: 'radioGroup',
          name: 'researchInstitutionDevelopment',
          required: '请选择内部研发机构建设情况',
          colProps: {
            span: 24,
          },
          fieldProps: {
            placeholder: '请选择内部研发机构建设情况',
            dictKey: 'researchInstitutionDevelopment',
          },
        },
        {
          label: '产学研重点合作单位',
          type: 'input',
          name: 'keyCooperateUnit',
          required: '请输入产学研重点合作单位',
          fieldProps: {
            placeholder: '请输入产学研重点合作单位',
          },
        },
      ],
    },
    {
      title: '企业相关情况',
      columns: 3,
      items: [
        {
          label: '是否在国家级高新区',
          name: 'nationalHighTechZone',
          required: '请选择是否在国家级高新区',
          customCom: (
            <CustomRadio
              form={form}
              inputName="nationalHighTechZoneArea"
            ></CustomRadio>
          ),
        },
        {
          label: '是否在省级高新区',
          type: 'radioGroup',
          name: 'provincialHighTechZone',
          required: '请选择是否在省级高新区',
          customCom: (
            <CustomRadio
              form={form}
              inputName="provincialHighTechZoneArea"
            ></CustomRadio>
          ),
        },
        {
          label: '是否在省级科技产业园',
          type: 'radioGroup',
          name: 'provincialScienceTechIndustrialPark',
          required: '请选择是否在省级科技产业园',
          customCom: (
            <CustomRadio
              form={form}
              inputName="provincialScienceTechIndustrialParkArea"
            ></CustomRadio>
          ),
        },
        {
          label: '是否在省级科技企业孵化器或加速器',
          name: 'provincialIncubatorOrAccelerator',
          required: '请选择是否在省级科技企业孵化器或加速器',
          customCom: (
            <CustomRadio
              form={form}
              inputName="provincialIncubatorOrAcceleratorArea"
            ></CustomRadio>
          ),
        },
        {
          label: '是否在省级现代农业科技示范园区',
          type: 'radioGroup',
          name: 'provincialAgriculturalDemonstrationPark',
          required: '请选择是否在省级现代农业科技示范园区',
          customCom: (
            <CustomRadio
              form={form}
              inputName="provincialAgriculturalDemonstrationParkArea"
            ></CustomRadio>
          ),
        },
        {
          label: '是否在国家高新技术产业基地',
          type: 'radioGroup',
          name: 'nationalHighTechIndustrialBase',
          required: '请选择是否在国家高新技术产业基地',
          customCom: (
            <CustomRadio
              form={form}
              inputName="nationalHighTechIndustrialBaseArea"
            ></CustomRadio>
          ),
        },
        {
          label: '是否在省创新型市县',
          name: 'provincialInnovativeCityAndCountry',
          required: '请选择是否在省创新型市县',
          customCom: (
            <CustomRadio
              form={form}
              inputName="provincialInnovativeCityAndCountryArea"
            ></CustomRadio>
          ),
        },
        {
          label: '是否在省创新型乡镇',
          type: 'radioGroup',
          name: 'provincialInnovativeTownship',
          required: '请选择是否在省创新型乡镇',
          customCom: (
            <CustomRadio
              form={form}
              inputName="provincialInnovativeTownshipArea"
            ></CustomRadio>
          ),
        },
        {
          label: '是否在产业技术创新战略联盟',
          type: 'radioGroup',
          name: 'industrialTechnologyInnovationStrategicAlliance',
          required: '请选择是否在在产业技术创新战略联盟',
          customCom: (
            <CustomRadio
              form={form}
              inputName="industrialTechnologyInnovationStrategicAllianceArea"
            ></CustomRadio>
          ),
        },
      ],
    },
    {
      title: '主要经济情况（申报年度的上年度数据）',
      columns: 3,
      items: [
        {
          label: '注册资本（万元）',
          name: 'previousRegisteredCapital',
          type: 'input',
          required: '请输入注册资本',
          fieldProps: {
            placeholder: '请输入注册资本',
          },
          itemProps: {
            rules: [{ pattern: /^\d+(\.\d+)?$/, message: '请输入数字' }],
          },
        },
        {
          label: '总资产（万元）',
          name: 'previousTotalAssets',
          type: 'input',
          required: '请输入总资产',
          fieldProps: {
            placeholder: '请输入总资产',
          },
          itemProps: {
            rules: [{ pattern: /^\d+(\.\d+)?$/, message: '请输入数字' }],
          },
        },
        {
          label: '主营业务收入（万元）',
          name: 'previousMainBusinessIncome',
          type: 'input',
          required: '请输入主营业务收入',
          fieldProps: {
            placeholder: '请输入主营业务收入',
          },
          itemProps: {
            rules: [{ pattern: /^\d+(\.\d+)?$/, message: '请输入数字' }],
          },
        },
        {
          label: '产品销售收入（万元）',
          name: 'previousProductSalesIncome',
          type: 'input',
          required: '请输入产品销售收入',
          fieldProps: {
            placeholder: '请输入产品销售收入',
          },
          itemProps: {
            rules: [{ pattern: /^\d+(\.\d+)?$/, message: '请输入数字' }],
          },
        },
        {
          label: '净利润（万元）',
          name: 'previousNetProfit',
          type: 'input',
          required: '请输入净利润',
          fieldProps: {
            placeholder: '请输入净利润',
          },
          itemProps: {
            rules: [{ pattern: /^\d+(\.\d+)?$/, message: '请输入数字' }],
          },
        },
        {
          label: '上缴税费总额（万元）',
          name: 'previousTaxTotal',
          type: 'input',
          required: '请输入上缴税费总额',
          fieldProps: {
            placeholder: '请输入上缴税费总额',
          },
          itemProps: {
            rules: [{ pattern: /^\d+(\.\d+)?$/, message: '请输入数字' }],
          },
        },
        {
          label: '研发支出（万元）',
          name: 'previousDevelopExpense',
          type: 'input',
          required: '请输入研发支出',
          fieldProps: {
            placeholder: '请输入研发支出',
          },
          itemProps: {
            rules: [{ pattern: /^\d+(\.\d+)?$/, message: '请输入数字' }],
          },
        },
        {
          label: '研发支出占比（%）',
          type: 'input',
          name: 'previousDevelopExpenseProportion',
          required: '请输入研发支出占比',
          fieldProps: {
            placeholder: '请输入研发支出占比',
          },
          itemProps: {
            rules: [
              {
                pattern: /^(?:100(?:\.0+)?|0(?:\.0+)?|\d{1,2}(?:\.\d+)?)$/,
                message: '请输入0-100百分比数字',
              },
            ],
          },
        },
        {
          label: '技术改造支出（万元）',
          name: 'previousTechnicalRenovationExpense',
          type: 'input',
          required: '请输入技术改造支出',
          fieldProps: {
            placeholder: '请输入技术改造支出',
          },
          itemProps: {
            rules: [{ pattern: /^\d+(\.\d+)?$/, message: '请输入数字' }],
          },
        },
        {
          label: '技术引进支出（万元）',
          name: 'previousTechnologyIntroductionExpense',
          type: 'input',
          required: '请输入技术引进支出',
          fieldProps: {
            placeholder: '请输入技术引进支出',
          },
          itemProps: {
            rules: [{ pattern: /^\d+(\.\d+)?$/, message: '请输入数字' }],
          },
        },
      ],
    },
    {
      title: '人员情况',
      columns: 3,
      items: [
        {
          label: '从业人员（人）',
          name: 'previousPractitioner',
          type: 'input',
          regKey: 'intNumber',
          required: '请输入从业人员',
          fieldProps: {
            placeholder: '请输入从业人员',
          },
        },
        {
          label: '研发人员（人）',
          name: 'previousDeveloper',
          regKey: 'intNumber',
          type: 'input',
          required: '请输入从业人员',
          fieldProps: {
            placeholder: '请输入从业人员',
          },
        },
        {
          label: '引进“双创人才”（人）',
          name: 'previousInnovativeEntrepreneurialTalent',
          regKey: 'intNumber',
          type: 'input',
          required: '请输入引进“双创人才”',
          fieldProps: {
            placeholder: '请输入引进“双创人才”',
          },
        },
        {
          label: '聘用外籍研究人员（人）',
          name: 'previousHireForeignResearcher',
          regKey: 'intNumber',
          type: 'input',
          required: '请输入聘用外籍研究人员',
          fieldProps: {
            placeholder: '请输入聘用外籍研究人员',
          },
        },
        {
          label: '高级职称（人）',
          name: 'previousSeniorProfessionalTitle',
          regKey: 'intNumber',
          type: 'input',
          required: '请输入高级职称',
          fieldProps: {
            placeholder: '请输入高级职称',
          },
        },
        {
          label: '其中：博士（人）',
          name: 'previousDoctor',
          regKey: 'intNumber',
          type: 'input',
          required: '请输入其中：博士（人）',
          fieldProps: {
            placeholder: '请输入',
          },
          itemProps: {
            rules: [
              // {
              //   required: true,
              // },
              {
                validator(rule, value) {
                  if (value) {
                    for (const name of [
                      'previousSeniorProfessionalTitle',
                    ]) {
                      if (value > form?.getFieldValue(name)) {
                        return Promise.reject(
                          '博士总数不能大于高级职称人员的数量',
                        );
                      }
                    }
                  }
                  return Promise.resolve();
                },
              },
            ],
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
          name: 'previousPatentApplicationNum',
          regKey: 'intNumber',
          type: 'input',
          required: '请输入上年度专利申请数',
          fieldProps: {
            placeholder: '请输入上年度专利申请数',
          },
        },
        {
          label: '其中：发明专利申请数（件）',
          name: 'previousInventionPatentApplicationNum',
          regKey: 'intNumber',
          type: 'input',
          required: '请输入其中：发明专利申请数',
          fieldProps: {
            placeholder: '请输入其中：发明专利申请数',
          },
          itemProps: {
            rules: [
              {
                required: true,
              },
              {
                validator(rule, value) {
                  if (value) {
                    for (const name of [
                      'previousPatentApplicationNum',
                    ]) {
                      if (value > form?.getFieldValue(name)) {
                        return Promise.reject(
                          '发明专利申请数不能大于上年度专利申请数',
                        );
                      }
                    }
                  }
                  return Promise.resolve();
                },
              },
            ],
          },
        },
        {
          label: '累计拥有专利数（件）',
          name: 'previousPatentAccumulateNum',
          regKey: 'intNumber',
          type: 'input',
          required: '请输入累计拥有专利数',
          fieldProps: {
            placeholder: '请输入累计拥有专利数',
          },
        },
        {
          label: '上年度专利授权数（件）',
          name: 'previousPatentAuthorizationNum',
          regKey: 'intNumber',
          type: 'input',
          required: '请输入上年度专利授权数',
          fieldProps: {
            placeholder: '请输入上年度专利授权数',
          },
        },
        {
          label: '其中：发明专利授权数（件）',
          name: 'previousInventionPatentAuthorizationNum',
          regKey: 'intNumber',
          type: 'input',
          required: '请输入发明专利授权数',
          fieldProps: {
            placeholder: '请输入发明专利授权数',
          },
          itemProps: {
            rules: [
              {
                required: true,
              },
              {
                validator(rule, value) {
                  if (value) {
                    for (const name of [
                      'previousPatentAuthorizationNum',
                    ]) {
                      if (value > form?.getFieldValue(name)) {
                        return Promise.reject(
                          '发明专利申请数不能大于上年度专利申请数',
                        );
                      }
                    }
                  }
                  return Promise.resolve();
                },
              },
            ],
          },
        },
        {
          label: '累计拥有发明专利数（件）',
          name: 'previousInventionPatentAccumulateNum',
          type: 'input',
          regKey: 'intNumber',
          required: '请输入累计拥有发明专利数',
          fieldProps: {
            placeholder: '请输入累计拥有发明专利数',
          },
        },
      ],
    },
    {
      title: '企业落实科技减免税政策情况表（万元）',
      columns: 1,
      items: [
        {
          label: '企业落实科技减免税政策情况表',
          name: 'taxReductionInfoRequestList',
          required: '请输入企业落实科技减免税政策情况表',
          customCom: (
            <TechTaxReportTable
              form={form}
              name="taxReductionInfoRequestList"
              readonly={!edit}
            />
          ),
        },
        {
          label:
            '有关说明（主要包括：1、其他科技政策减免税的请说明具体内容；2、无法享受科技减免税政策的请说明情况）',
          name: 'instruction',
          type: 'textarea',
          required: '请输入有关说明',
          fieldProps: {
            placeholder: '请输入有关说明',
            style: {
              height: '100px',
            },
          },
        },
      ],
    },
    {
      title: '创业融资需求',
      columns: 2,
      items: [
        {
          label: '企业是否需要融资',
          type: 'radioGroup',
          name: 'financingRequired',
          required: '请选择企业是否需要融资',
          fieldProps: {
            dictKey: 'whetherOrNot',
            placeholder: '请选择企业是否需要融资',
          },
        },
        {
          label: '目前发展阶段',
          type: 'select',
          name: 'currentDevelopmentStage',
          required: '请选择目前发展阶段',
          fieldProps: {
            placeholder: '请选择目前发展阶段',
            dictKey: 'currentDevelopmentStage',
          },
        },
        {
          label: '已获融资情况',
          type: 'checkGroup',
          name: 'financingStatusObtained',
          required: financingStatus('请选择已获融资情况'),
          colProps: {
            span: 24,
          },
          fieldProps: {
            placeholder: '请选择已获融资情况',
            dictKey: 'financingStatusObtained',
            disabled: !edit
          },
        },
        {
          label: '希望融资类型',
          type: 'checkGroup',
          name: 'expectedFinancingType',
          colProps: {
            span: 24,
          },
          required: financingStatus('请选择希望融资类型'),
          fieldProps: {
            placeholder: '请选择希望融资类型',
            dictKey: 'expectedFinancingType',
            disabled: !edit
          },
        },
        {
          label: '希望融资金额(万元)',
          type: 'input',
          name: 'expectedFinancingAmount',
          required: financingStatus('请输入希望融资金额'),
          fieldProps: {
            placeholder: '请输入希望融资金额',
          },
          itemProps: {
            rules: [{ pattern: /^\d+(\.\d+)?$/, message: '请输入数字' }],
          },
        },
      ],
    },
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
