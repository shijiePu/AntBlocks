/**
 * title: 图片上传
 * description: 初始状态
 */
import { TechUpload } from '@szhz/tech-pc';
import React from 'react';

const PictureUpload = () => {
  const handleChange = (data: any) => {
    console.log(data, 'data');
  };
  return (
    <>
      <h4>普通使用</h4>
      <TechUpload.Picture onChange={handleChange}></TechUpload.Picture>

      <h4> 限制图片像素</h4>
      <TechUpload.Picture width={100} height={100}></TechUpload.Picture>
    </>
  );
};

export default PictureUpload;
