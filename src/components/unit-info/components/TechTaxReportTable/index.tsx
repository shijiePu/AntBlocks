import type { FormInstance, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { TechDatePicker } from '@szhz/tech-pc/components';
import { Button, Popconfirm } from 'antd';
import React, { FC, useState } from 'react';

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  update_at?: number;
  children?: DataSourceType[];
};

interface TechTaxReportTableProps {
  form: FormInstance;
  name: string;
  readonly?: boolean;
}

const TechTaxReportTable: FC<TechTaxReportTableProps> = ({ form, name, readonly }) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '年度（前3年度）',
      dataIndex: 'year',
      renderFormItem: (_, { value, onChange }) => {
        return (
          <TechDatePicker
            picker="year"
            value={value}
            onChange={onChange}
          ></TechDatePicker>
        );
      },
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
      width: 130,
    },
    {
      title: '企业落实科技政策减免税总额（万元）',
      dataIndex: 'taxReductionTotal',
      width: 260,
      formItemProps: () => {
        return {
          rules: [
            { required: true, message: '此项为必填项' },
            { pattern: /^\d+(\.\d+)?$/, message: '请输入数字' },
          ],
        };
      },
    },
    {
      title: '企业研发费用情况（万元）',
      children: [
        {
          title: '年度研发总投入',
          dataIndex: 'researchDevelopmentTotal',
          width: 130,
          formItemProps: () => {
            return {
              rules: [
                { required: true, message: '此项为必填项' },
                { pattern: /^\d+(\.\d+)?$/, message: '请输入数字' },
              ],
            };
          },
        },
        {
          title: '加计扣除额',
          dataIndex: 'additionalDeductionAmount',
          width: 110,
          formItemProps: () => {
            return {
              rules: [{ required: true, message: '此项为必填项' }],
            };
          },
        },
        {
          title: '加计扣除减免税额',
          dataIndex: 'additionalDeductionTaxReductionAmount',
          width: 150,
          formItemProps: () => {
            return {
              rules: [
                { required: true, message: '此项为必填项' },
                { pattern: /^\d+(\.\d+)?$/, message: '请输入数字' },
              ],
            };
          },
        },
      ],
    },

    {
      title: '高新技术企业所得税减免额（万元）',
      dataIndex: 'highTechEnterTaxReductionAmount',
      width: 250,
      formItemProps: () => {
        return {
          rules: [
            { required: true, message: '此项为必填项' },
            { pattern: /^\d+(\.\d+)?$/, message: '请输入数字' },
          ],
        };
      },
    },
    {
      title: '其他科技政策减免税额（万元）',
      dataIndex: 'otherTechPolicyTaxReductionAmount',
      width: 220,
      formItemProps: () => {
        return {
          rules: [
            { required: true, message: '此项为必填项' },
            { pattern: /^\d+(\.\d+)?$/, message: '请输入数字' },
          ],
        };
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (text, record, _, action) => [
        <Button
          key="editable"
          type="link"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
          disabled={readonly}
          style={{ padding: 'unset' }}
        >
          编辑
        </Button>,
        <Popconfirm
          title={`删除此项？`}
          description={null}
          okText={'确定'}
          cancelText={'取消'}
          onConfirm={() => {
            const tableDataSource = form?.getFieldValue(
              name,
            ) as DataSourceType[];

            form?.setFieldsValue({
              [name]: tableDataSource.filter((item) => item.id !== record.id),
            });
          }}
        >
          <Button
            key="delete"
            type="link"
            style={{ padding: 'unset' }}
          >
            删除
          </Button>
        </Popconfirm>
      ],
    },
  ];

  return (
    <EditableProTable<DataSourceType>
      rowKey="id"
      scroll={{
        x: 960,
      }}
      recordCreatorProps={readonly ? false : {
        position: 'bottom',
        record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
      }}
      dataSource={dataSource}
      onChange={setDataSource}
      maxLength={3}
      bordered
      name={name}
      columns={columns}
      editable={{
        form,
        editableKeys,
        onChange: setEditableRowKeys,
        actionRender: (row, config, defaultDom) => {
          return [defaultDom.save, defaultDom.delete || defaultDom.cancel];
        },
        onDelete: async () => {
          setEditableRowKeys([])
        }
      }}
    />
  );
};

export default TechTaxReportTable;
