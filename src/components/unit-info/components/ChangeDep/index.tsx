import { TechForm } from '@szhz/tech-pc';
import TreeSelect from '@szhz/tech-pc/components/com-pages-componnets/TreeSelect';
import Flow from '@szhz/tech-pc/components/JSFlow';
import { Button, Drawer, Form } from 'antd';
import React, { useMemo, useState } from 'react';

import { updateDepInfo } from '@szhz/tech-pc/service/unit-info';
import { debounce } from 'lodash-es';

import './drawer.less';
type Props = {
  detailData?: any,
  run?: any,
  disabled?: boolean
  processInstanceId?: any
  hideFlowAction?: boolean
  formReadOnly?: boolean
}

const ChangeDep = ({ detailData, run, disabled, processInstanceId, hideFlowAction, formReadOnly }: Props) => {
  const [vis, setVis] = useState(false); // Drawer显隐状态
  const [loading, setLoading] = useState(false); // 提交按钮loading
  const { unitName, competentDepartment } = detailData || {};

  const [form] = Form.useForm();

  const handleSubmit = debounce(async () => {
    const res = await form.validateFields()
    try {
      setLoading(true)
      await updateDepInfo({ ...form.getFieldsValue(true), id: detailData?.id })
      run()
    } catch (error) {
      // 如果需要处理特定的错误，可以在这里添加错误处理逻辑
    } finally {
      setLoading(false); // 请求完成后总是将loading设置为false
    }
  }, 300)

  const groupItems: any = useMemo(() => {
    return [
      {
        title: '原信息',
        columns: 1,
        items: [
          {
            label: '',
            customCom: <span style={{ display: 'flex' }}><div style={{ width: 150 }}>企业名称</div>{unitName}</span>
          },
          {
            label: '',
            customCom: <span style={{ display: 'flex' }}><div style={{ width: 150 }}>原主管部门</div>{competentDepartment}</span>
          },
        ],
      },
      {
        title: '新主管部门',
        columns: 1,
        items: [
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
            label: '营业执照扫描件',
            name: 'businessLicenseFileInfo',
            type: 'TechUploadDragger',
            required: '请上传营业执照扫描件',
            fieldProps: {
              uploadUrl: "/szjs-api/gateway/program/attachment/upload",
              accept: '.pdf',
              limit: 50,
              limitSizeType: 'M',
              maxCount: 5,
              canClickName: true,
              onItemClick: (file: any) => { window.open(file?.fileUrl) }
            },
          },
          {
            label: '变更材料',
            name: 'competentUnitChangeFileInfo',
            type: 'TechUploadDragger',
            required: '请上传变更材料',
            fieldProps: {
              readOnly: formReadOnly,
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
    ]
  }, []);

  return (
    <div>
      <Button onClick={() => { setVis(true) }} type='primary' disabled={disabled}>变更主管部门</Button>
      <Drawer
        rootClassName="lib-change-dep"
        width={800}
        title={'变更主管部门'}
        open={vis}
        onClose={() => { setVis(false); form.resetFields(); }}
        footer={[<Button type="primary" onClick={handleSubmit} loading={loading}>提交</Button>]}
      >
        <TechForm.Group form={form} groupItems={groupItems} readonly={formReadOnly}></TechForm.Group>
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
