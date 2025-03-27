import { TechFile } from '@szhz/tech-pc';
import { Upload } from 'antd';
import React, { FC, useMemo } from 'react';

import useBeforeUpload from '../../hooks/useBeforeUpload';
import useUpload from '../../hooks/useUpload';
import { TechUploadProps } from '../../types';
import UploadItem from '../render-item';

const { Dragger } = Upload;

const TechDragger: FC<TechUploadProps> = ({
  readOnly,
  limit,
  limitSizeType,
  value,
  onChange,
  children,
  onItemClick,
  reflect,
  accept,
  maxCount,
  listType,
  nameLimit,
  single,
  canClickName = false,
  ...props
}) => {
  const {
    handleUpload,
    uploadMaxCount,
    handleUploadChange,
    deleteUploaded,
    fileList,
  } = useUpload({
    value,
    onChange,
    reflect,
    listType,
    uploadUrl: props.uploadUrl,
    imageUrlPrefix: props.imageUrlPrefix,
    single,
    maxCount,
    extraData: props.data,
  });

  const { beforeUpload } = useBeforeUpload({
    maxCount: uploadMaxCount,
    accept,
    fileList,
    limit,
    limitSizeType,
    uploadUrl: props.uploadUrl,
  });

  const acceptText = useMemo(() => {
    if (!accept) return `，暂无文件类型限制`;

    return `支持${accept.split(',').join('、')}格式文件`;
  }, [accept]);

  return (
    <div className="upload">
      {
        readOnly ?
          <TechFile.List fileList={fileList} />
          :
          <Dragger
            {...props}
            listType={listType}
            maxCount={uploadMaxCount}
            accept={accept}
            fileList={fileList as any}
            beforeUpload={beforeUpload}
            customRequest={handleUpload}
            onChange={handleUploadChange}
            itemRender={(originNode, file: any) => {
              return (
                <UploadItem
                  reflect={reflect}
                  onClick={onItemClick}
                  dataSource={file}
                  status={file.status}
                  nameLimit={nameLimit}
                  onDelete={deleteUploaded}
                  canClickName={canClickName}
                ></UploadItem>
              );
            }}
          >
            {children ? (
              children
            ) : (
              <>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ color: '#2d7af7' }}>点击上传</span> / 拖拽到此区域
                </div>
                <div style={{ color: 'gray' }}>
                  单个文件不超过{limit}
                  {limitSizeType}
                  {acceptText}
                </div>
              </>
            )}
          </Dragger>
      }
    </div>
  );
};

export default TechDragger;
