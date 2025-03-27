import { TechForm, TechFormItems } from '@szhz/tech-pc';
import { attachmentQueryByTypesByPost } from '@szhz/tech-pc/service/global';
import { ImportProjectExcelResponse } from '@szhz/tech-pc/service/proj-init/types';
import { batchBinding } from '@szhz/tech-pc/service/user-binding';
import { getLocation } from '@szhz/tech-pc/utils/download';
import { Button, Form, message, Modal, Space } from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';
import { isString } from 'lodash-es';
import React, { FC, useMemo, useState } from 'react';

interface ImportFileProps {
  children?: React.ReactNode;

  // 默认按钮的配置属性
  buttonProps?: BaseButtonProps;
  // 禁用
  disabled?: boolean;
  buttonDisabled?: boolean;

  callback?: (data?: boolean) => void;
}

const ImportFile: FC<ImportFileProps> = ({
  children,
  buttonDisabled,
  buttonProps,
  callback,
}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [importData, setImportData] =
    useState<ImportProjectExcelResponse | null>(null);

  // 下载模板
  const handleImport = async () => {
    const result = await attachmentQueryByTypesByPost([
      'USER_BIND_TEMPLATE_FILE',
    ]);

    if (!result?.length) {
      message.error('模板文件导出异常');
      return;
    }

    const data = result?.[0];

    window.open(getLocation(data?.fileUrl as string));
  };

  // 导出失败文件
  const handleExport = () => {
    if (!importData?.fileUrl) return;

    window.open(getLocation(importData?.fileUrl as string));
  };

  // 导入结果渲染
  const renderResult = useMemo(() => {
    if (!importData) return <></>;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p>导入用户{importData?.successRows}人,<span style={{ color: 'red' }}>失败{importData?.failedRows}人</span></p>
        {importData?.fileUrl && (
          <Button type="link" onClick={handleExport}>
            下载导入失败文件
          </Button>
        )}
      </div>
    );
  }, [importData]);

  // 提交导入文件
  const handleSubmit = async () => {
    await form.validateFields();

    const params = form.getFieldsValue();
    setLoading(true);

    const { attachment } = params;

    // 文件导入
    const uploadResult = await batchBinding({
      filePath: attachment?.fileUrl,
    });
    setLoading(false);
    setImportData(uploadResult);
  };

  const handleModalOpen = () => {
    form.resetFields();
    setImportData(null);
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
    callback?.();
  };

  const formItems: TechFormItems[] = [
    {
      label: '请先下载「批量导入模板」并按照模板内容填写后上传文档',
      customCom: (
        <Button type="primary" onClick={handleImport}>
          下载模板
        </Button>
      ),
    },
    {
      label: '上传文件',
      type: 'TechUploadDragger',
      name: 'attachment',
      required: '请上传文件',
      fieldProps: {
        single: true,
        accept: '.xls, .xlsx',
        limitSizeType: 'M',
        limit: 15,
      },
    },
  ];

  const handleCancel = () => {
    setOpen(false);
    callback?.();
  };

  return (
    <div>
      <Modal
        open={open}
        title={!importData ? '文件导入' : '导入完成'}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        width={'50%'}
        footer={
          <Space>
            <Button onClick={handleCancel}> 取消</Button>
            {!importData && (
              <Button loading={loading} type="primary" onClick={handleSubmit}>
                提交
              </Button>
            )}
            {!!importData && (
              <Button type="primary" onClick={handleOk}>
                确认
              </Button>
            )}
          </Space>
        }
      >
        {!importData ? <TechForm form={form} items={formItems} /> : ''}

        {renderResult}
      </Modal>
      {isString(children) ? (
        <Button
          type="primary"
          disabled={buttonDisabled}
          {...buttonProps}
          onClick={handleModalOpen}
          ghost
        >
          {children}
        </Button>
      ) : (
        <div onClick={handleModalOpen}>{children}</div>
      )}
    </div>
  );
};

export default ImportFile;
