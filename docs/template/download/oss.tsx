/**
 * title: oss地址下载
 */
import { downloadLink } from '@szhz/tech-pc/utils/download';
import { Button } from 'antd';
import React from 'react';

export default () => {
  const handleDownloadOss = () => {
    downloadLink('example.com', '模板文件.pdf');
  };

  return (
    <Button type="primary" onClick={handleDownloadOss}>
      oss地址下载
    </Button>
  );
};
