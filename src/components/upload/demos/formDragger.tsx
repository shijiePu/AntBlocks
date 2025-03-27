/**
 * title: 拖拽上传
 * description: 初始状态
 */
import { TechForm, TechUpload } from '@szhz/tech-pc';
import { Button, Form, Space } from 'antd';
import React from 'react';

const DragUpload = () => {
  const [form] = Form.useForm();

  const getFormData = () => {
    const data = form.getFieldsValue();

    console.log(data, 'data');
  };

  const setFormData = () => {
    form.setFieldsValue({
      dragData: [
        {
          fileName: 'wallhaven-gpddld',
          fileUrl:
            '/szhz-dev-tech/tech-front/2023-10-11/wallhaven-gpddld1711986231625183232.jpg',
        },
        {
          fileName: 'wallhaven-7pllqo',
          fileUrl:
            '/szhz-dev-tech/tech-front/2023-10-11/wallhaven-7pllqo1711986241808953344.jpg',
        },
      ],
    });
  };

  return (
    <TechForm form={form}>
      <TechForm.Item name="name" label="用户名称" />

      <Form.Item name="dragData" label="附件上传">
        <TechUpload.Dragger
          multiple
          maxCount={5}
          limit={15}
          limitSizeType="M"
        ></TechUpload.Dragger>
      </Form.Item>

      <TechForm.Item
        name="customDrag"
        label="自定义提示内容"
        type="TechUploadDragger"
        fieldProps={{ multiple: true }}
      ></TechForm.Item>
      <Form.Item>
        <Space align="end">
          <Button type="primary" onClick={getFormData}>
            查询
          </Button>
          <Button type="primary" onClick={setFormData}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </TechForm>
  );
};

export default DragUpload;
