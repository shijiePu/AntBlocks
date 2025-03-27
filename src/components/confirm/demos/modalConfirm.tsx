/**
 * title: modal确认框
 * description: type为modal时启用
 */
import { TechConfirm } from '@szhz/tech-pc';
import { Space } from 'antd';
import React from 'react';

const ModalConfirm = () => {
  const confirm = () => {
    console.log(66666);
  };
  return (
    <Space>
      <TechConfirm
        type="modal"
        description="这是自定义的删除文案"
        confirm={confirm}
      ></TechConfirm>
      <TechConfirm
        type="modal"
        description="这是自定义的删除文案"
        disable={true}
        confirm={confirm}
      ></TechConfirm>
    </Space>
  );
};

export default ModalConfirm;
