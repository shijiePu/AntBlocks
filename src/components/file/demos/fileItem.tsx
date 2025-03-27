/**
 * title: 文件展示
 * description: 单独渲染file数据
 */

import { TechFile } from '@szhz/tech-pc';
import React from 'react';

const FileList = () => {
  return (
    <>
      <TechFile.Item
        style={{ marginBottom: '40px' }}
        fileData={{
          fileName: '这是超级超级超级超级超级超级长的文件名称.jpg',
          fileUrl: 'test/test/test.jpg',
        }}
      ></TechFile.Item>

      <TechFile.Item
        canClickName={false}
        fileData={{
          fileName: '测试文档三.jpg',
          fileUrl: 'test/test/test.jpg',
        }}
      ></TechFile.Item>
    </>
  );
};

export default FileList;
