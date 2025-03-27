/**
 * title: 文件属性映射
 * description: reflect 设置文件属性映射
 */

import { TechFile } from '@szhz/tech-pc';
import React from 'react';

const fileList = [
  {
    name: '测试文档一.png',
    url: 'test/test/test.png',
  },
  {
    name: '测试文档二.pdf',
    url: 'test/test/test.pdf',
  },
  {
    name: '测试文档三.jpg',
    url: 'test/test/test.jpg',
  },
];

const reflectProps = {
  fileName: 'name',
  fileUrl: 'url',
};

const ReflectFileList = () => {
  return (
    <TechFile.List fileList={fileList} reflect={reflectProps}></TechFile.List>
  );
};

export default ReflectFileList;
