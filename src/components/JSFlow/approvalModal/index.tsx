import { TechForm, TechFormItems } from '@szhz/tech-pc';
import { Button, Form, message, Modal } from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';
import { debounce } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { processOrderApprovalByPost } from './service';

interface ApprovalModalProps {
  // 通过 true 退回 false
  approve?: boolean;
  // 流程id[]
  taskIds: string[];
  // 需要输入审批意见
  needOpinion?: boolean;
  // 需要上传附件
  needFile?: boolean;
  children?: React.ReactNode;
  // 默认的按钮文本
  text?: string;
  // 默认按钮的配置属性
  buttonProps?: BaseButtonProps;
  // 禁用
  disabled?: boolean;
  callback?: (data?: boolean) => void;
  // 回调函数 用于判断是否可以接着审核
  callbackCheck: (data?: boolean) => void;
  //流程id
  processInstanceId: string;
  // 自定义的审批表单
  customerApprovalFormConfig?: any;
  checkPassPromise?: any;
  textTitle?: string
  isAuth?: boolean;
  projectId?: string;
}

const ApprovalModal = ({
  approve = true,
  taskIds,
  needOpinion = false,
  needFile = false,
  children,
  buttonProps,
  text,
  disabled = false,
  callback,
  customerApprovalFormConfig,
  checkPassPromise,
  textTitle,
  isAuth = false,
  projectId = ''
}: ApprovalModalProps) => {
  console.log('needFile', needFile);

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {

  //   if (approve) {
  //     console.log('同意');

  //     form.setFieldsValue({
  //       approveOpinion:'同意'
  //     })
  //   }
  // }, [approve]);


  const handleOk = debounce(async () => {
    if (!taskIds || !taskIds?.length) {
      message.error('缺少流程id字段');
      return;
    }

    await form.validateFields();

    const formData = form.getFieldsValue();

    const params = {
      ...formData,
      approve,
      taskIds,
    };

    const authParam = {
      ...formData,
      approve,
      taskIds,
      projectIds: [projectId]
    }
    setLoading(true);
    processOrderApprovalByPost(params)
      .then((res) => {
        setLoading(false);
        message.success('操作成功');
        setOpen(false);
        form.resetFields();
        callback?.(true);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, 300);

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const formConfig: TechFormItems[] = [
    {
      type: 'textarea',
      label: '审批意见',
      name: 'approveOpinion',
      itemProps: {
        rules: needOpinion
          ? [{ required: true, message: '请输入审批意见' }]
          : [],
      },
    },
    // {
    //   type: 'TechUpload',
    //   label: '审核附件',
    //   name: 'attachmentRequestList',
    //   itemProps: {
    //     rules: needFile ? [{ required: true, message: '请上传审核附件' }] : [{ required: false }],
    //   },
    //   fieldProps: {
    //     accept: '.pdf',
    //     limitSizeType: 'M',
    //     limit: 60,
    //     canClickName: true,
    //     onItemClick: (file) => { window.open(file?.fileUrl) },
    //     children: (
    //       <>
    //         <Button icon={<UploadOutlined />}>上传文件</Button>
    //         <span style={{ marginLeft: '10px', color: '#999', fontSize: 14 }}>
    //           请上传pdf文件，大小在60M以内
    //         </span>
    //       </>
    //     ),
    //   },
    // },
  ];

  const formItems = customerApprovalFormConfig || formConfig;

  const renderTitle = useMemo(() => {
    if (approve) return '审批通过';

    return '审批不通过';
  }, [approve]);

  const handleModalOpen = debounce(async () => {
    let pass = true;
    if (checkPassPromise) {
      pass = await checkPassPromise();
    }
    console.log('pass', pass);

    if (disabled || !pass) return;

    setOpen(true);
  }, 300);

  return (
    <div>
      <Modal
        open={open}
        title={textTitle || renderTitle}
        onOk={handleOk}
        okButtonProps={{ loading }}
        onCancel={handleCancel}
        destroyOnClose
      >
        <TechForm initialValues={{ approveOpinion: approve ? '同意' : '' }} form={form} items={formItems} />
      </Modal>
      {children ? (
        <div onClick={handleModalOpen}>{children}</div>
      ) : (
        <Button
          type="primary"
          disabled={disabled}
          {...buttonProps}
          onClick={handleModalOpen}
        >
          {text}
        </Button>
      )}
    </div>
  );
};

export default ApprovalModal;
