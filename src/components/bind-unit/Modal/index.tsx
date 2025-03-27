import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { TechForm } from '@szhz/tech-pc';
import { Button, Form, Modal } from "antd";
import React, { useEffect, useMemo, useState } from 'react';

import { bindUnit, getNotBindList } from '@szhz/tech-pc/service/bind-unit';

type Props = {
  firstBind: boolean;
  onFinish?: any
};

const VerificationModal = ({ onFinish, firstBind }: Props) => {
  const [form] = Form.useForm();
  const [vis, setVis] = useState(firstBind);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const handleFinish = async () => {
    const res = await form.validateFields();
    try {
      setLoading(true);
      await bindUnit({ ...res })
      if (firstBind) {
        onFinish && onFinish();
      } else {
        form.resetFields();
        setVis(false);
        onFinish && onFinish();
      }
    } catch {

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 定义一个异步函数
    async function fetchData() {
      try {
        const res = await getNotBindList({});
        setOptions(res);
      } catch (error) {
        console.error("Failed to fetch not bind list:", error);
      }
    }

    // 立即调用该异步函数
    if (vis) {
      fetchData();
    }
  }, [vis]); // 注意保持空依赖数组以确保只在组件挂载时执行

  const Items = useMemo(() => {
    return [
      {
        label: '单位名称', // 表单项的标签文本，必填项。
        name: 'unitId',
        type: 'select',
        fieldProps: {
          options: options,
          showSearch: true,
          filterOption: (input: any, option: any) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        },
        itemProps: {
          rules: [
            {
              required: true, // 是否必填，必填项。
              message: '请选择单位', // 必填项校验不通过的提示文本。
            },
          ],
        },
      },
      {
        label: '所在部门', // 表单项的标签文本，必填项。
        name: 'dept',
        type: 'input',
        fieldProps: {
          maxLength: 20,
        },
      },
      {
        label: '具体职务', // 表单项的标签文本，必填项。
        name: 'position',
        type: 'input',
        fieldProps: {
          maxLength: 20,
        },
      },
    ]
  }, [options])

  return (
    <>
      {!firstBind && <Button onClick={() => { setVis(true) }} type='primary'>新增绑定</Button>}
      <Modal
        open={vis}
        title={<>
          绑定单位
        </>}
        footer={null}
        centered
        style={{ padding: '20px' }}
        width={600}
        closable={firstBind ? false : true}
        maskClosable={firstBind ? false : true}
        onCancel={() => { setVis(false) }}
      >
        <ExclamationCircleTwoTone />&nbsp;<a onClick={() => {
          Modal.confirm({
            width: 600,
            title: '搜索不到单位怎么办？',
            // okText: '知道了',
            closable: true,
            // cancelText: '',
            footer: null,
            content: <>
              <div>
                <p>1、联系公司管理员注册苏服码并登录科技计划系统。</p>
                苏服码注册地址： <a target='_blank' href="https://jms.jszwfw.gov.cn/jpaas-jis-peruser-server/static/coruser/register/pages/registermethod.html">https://jms.jszwfw.gov.cn/jpaas-jis-peruser-server/static/coruser/register/pages/registermethod.html</a></div>
              <p></p>
              <div>2、单位登录后，可通过成员管理功能添加个人用户。个人用户也可独立登录系统并申请绑定至目标单位，但该绑定请求需经企业审核通过后方能生效。</div>
            </>,
          })
        }}>搜索不到单位怎么办？</a>
        <p></p>
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
