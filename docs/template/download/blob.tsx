/**
 * title: 下载文档流文件
 * description: 需要再接口处进行配置
 */

import { downloadBlob } from '@szhz/tech-pc/utils/download';
import { Button } from 'antd';
import React from 'react';
import RequestConfigPng from './request-config.png';

export default () => {
  // 接口推荐配置
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const requestConfig = {
    responseType: 'blob',
    skipErrorHandler: true,
    getResponse: true,
  };

  const requestFn = () => {
    return new Promise((resolve) => {
      resolve(false);
    });
  };

  // 下载文档流文件
  const download = async () => {
    const res = await requestFn();
    if (!res) return;

    downloadBlob(res, '入库审核.xlsx');
  };

  return (
    <div>
      <h3>接口配置示例</h3>
      <img src={RequestConfigPng}></img>
      <br />
      <Button type="primary" onClick={download}>
        文档流下载
      </Button>
    </div>
  );
};
