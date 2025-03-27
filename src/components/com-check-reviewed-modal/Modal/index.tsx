import { TechForm, TechUpload } from '@szhz/tech-pc';
import { Button, Form, Modal } from "antd";
import React, { useMemo, useState } from 'react';

import TreeSelect from '@szhz/tech-pc/components/com-pages-componnets/TreeSelect';
import { confirmPopMsg, reBindDep } from '@szhz/tech-pc/service/register';
import { updateDepInfo } from '@szhz/tech-pc/service/unit-info';

type Props = {
  unitId: any;
  result: any;
  history?: any
};

const TITLE_MAPS: any = {
  BIND_PERSON_MANAGER_OLD_ACCOUNT: "绑定老账号通知",
  SAVE_UNIT_COMPETENT_DEPT: "绑定主管部门",
  CHANGE_UNIT_COMPETENT_DEPT: "变更主管部门",
  BIND_UNIT_MANAGER_OLD_ACCOUNT: "绑定单位管理员老账号"
}

const VerificationModal = ({ result, unitId, history }: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { bizType, popMsg, id } = result || {};

  const handleFinish = async () => {
    const res = await form.validateFields();
    try {
      setLoading(true);
      if (bizType === 'CHANGE_UNIT_COMPETENT_DEPT') {
        await updateDepInfo({ ...form.getFieldsValue(true), id: unitId })
        handleConfirm();
      } else if (bizType === 'SAVE_UNIT_COMPETENT_DEPT') {
        await reBindDep({ unitId, ...form.getFieldsValue(true) })
        handleConfirm();
      }
      history.push('/')
      // window.location.href = `${window.location.origin}/${window.location.pathname?.split('/')[1]}/`;
    } catch {

    } finally {
      setLoading(false);
    }
  };

  const Items: any = useMemo(() => {
    return [
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
        type: 'dependency',
        depNames: ['competentDepartmentCode'],
        hidden: bizType === 'SAVE_UNIT_COMPETENT_DEPT',
        render: (props: any) => {
          return <Form.Item
            label="主管部门变更材料"
            name="competentUnitChangeFileInfo"
            rules={[{ required: true, message: '请上传主管部门变更材料' }]}
          >
            <TechUpload.Dragger
              uploadUrl="/szjs-api/gateway/program/attachment/upload"
              accept=".pdf" limit={50}
              limitSizeType="M"
              maxCount={5}
              canClickName={true}
              onItemClick={(file: any) => { window.open(file?.fileUrl) }} />
          </Form.Item>
        },
      },
    ]
  }, [])

  const handleConfirm = async (path: string = '/home') => {
    await confirmPopMsg({ id })
    history.push(path)
    // window.location.href = `${window.location.origin}/${window.location.pathname?.split('/')[1]}${path}`;
  }

  return (
    <>
      <Modal
        open={true}
        title={TITLE_MAPS[bizType]}
        footer={null}
        centered
        style={{ padding: '20px' }}
        width={600}
        closable={false}
        maskClosable={false}
      >
        <p>{popMsg}</p>
        {
          (bizType === 'SAVE_UNIT_COMPETENT_DEPT' || bizType === 'CHANGE_UNIT_COMPETENT_DEPT') &&
          <>
            <TechForm form={form} items={Items} />
            <div style={{ textAlign: 'right', marginTop: 20 }}>
              <Button type="primary" htmlType="submit" onClick={handleFinish} loading={loading}>
                提交
              </Button>
            </div>
          </>
        }
        {
          bizType === 'BIND_PERSON_MANAGER_OLD_ACCOUNT' &&
          <div style={{ textAlign: 'right', marginTop: 20 }}>
            <Button onClick={() => { handleConfirm(); }} style={{ marginRight: 8 }}>
              知道了
            </Button>
            <Button type="primary" onClick={() => { handleConfirm('/person-info'); }}>
              前往绑定
            </Button>
          </div>
        }
        {
          bizType === 'BIND_UNIT_MANAGER_OLD_ACCOUNT' &&
          <div style={{ textAlign: 'right', marginTop: 20 }}>
            <Button onClick={() => { handleConfirm(); }} style={{ marginRight: 8 }}>
              知道了
            </Button>
            <Button type="primary" onClick={() => { handleConfirm('/common-unit-info') }}>
              前往绑定
            </Button>
          </div>
        }
      </Modal>
    </>
  );
};

export default VerificationModal;
