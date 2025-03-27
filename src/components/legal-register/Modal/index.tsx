import { TechForm } from '@szhz/tech-pc';
import TreeSelect from '@szhz/tech-pc/components/com-pages-componnets/TreeSelect';
import { Button, Form, Modal } from "antd";
import React, { useMemo, useState } from 'react';

import { reBindDep } from '@szhz/tech-pc/service/register';

type Props = {
  unitId: any;
  handleToHome: any
  msg: any
};

const VerificationModal = ({ unitId, handleToHome, msg }: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    const res = await form.validateFields();
    try {
      setLoading(true);
      await reBindDep({ unitId, ...form.getFieldsValue(true) })
      handleToHome && handleToHome();
    } catch {

    } finally {
      setLoading(false);
    }
  };

  const Items = useMemo(() => {
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
        type: 'select',
        hidden: true,
      },
    ]
  }, [])

  return (
    <>
      <Modal
        open={true}
        title={<>
          绑定主管部门
        </>}
        footer={null}
        centered
        style={{ padding: '20px' }}
        width={600}
        closable={false}
        maskClosable={false}
      >
        <p>{msg}</p>
        {/* @ts-ignore */}
        <TechForm form={form} items={Items} />
        <div style={{ textAlign: 'right', marginTop: 20 }}>
          <Button type="primary" htmlType="submit" onClick={handleFinish} loading={loading}>
            提交
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default VerificationModal;
