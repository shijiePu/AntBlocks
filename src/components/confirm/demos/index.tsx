/**
 * title: 二次确认
 * description: 默认为删除按钮,可设置disable属性
 */

import { TechConfirm } from '@szhz/tech-pc';
import React from 'react';

const DeleteButton = () => {
  const confirm = () => {
    console.log('data');
  };

  return (
    <>
      <TechConfirm confirm={confirm}></TechConfirm>
      <TechConfirm disable={true} confirm={confirm}></TechConfirm>
    </>
  );
};

export default DeleteButton;
