import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import React, { FC, memo } from 'react';

import UploadItem from './components/render-item';
import useBeforeUpload from './hooks/useBeforeUpload';
import useUpload from './hooks/useUpload';
import { TechUploadProps } from './types';

const InternalUpload: FC<TechUploadProps> = (props) => {
  const {
    limit,
    limitSizeType,
    value,
    onChange,
    onItemClick,
    accept,
    listType,
    nameLimit,
    single,
    canClickName = false,
    btnText,
    ...resetProps
  } = props;

  const {
    handleUpload,
    handleUploadChange,
    uploadMaxCount,
    deleteUploaded,
    fileList,
  } = useUpload({
    value,
    onChange,
    reflect: props.reflect,
    listType,
    uploadUrl: props.uploadUrl,
    imageUrlPrefix: props.imageUrlPrefix,
    single,
    maxCount: props.maxCount,
  });

  const { beforeUpload } = useBeforeUpload({
    maxCount: uploadMaxCount,
    accept,
    fileList,
    limit,
    limitSizeType,
    uploadUrl: props.uploadUrl,
  });

  return (
    <Upload
      fileList={fileList as any}
      beforeUpload={beforeUpload}
      customRequest={handleUpload}
      onChange={handleUploadChange}
      maxCount={uploadMaxCount}
      accept={accept}
      listType={listType}
      itemRender={(originNode, file: any) => {
        return (
          <UploadItem
            reflect={props.reflect}
            onClick={onItemClick}
            dataSource={file}
            status={file.status}
            onDelete={deleteUploaded}
            nameLimit={nameLimit}
            canClickName={canClickName}
          ></UploadItem>
        );
      }}
      {...resetProps}
    >
      {props?.children ?? (
        <Button icon={<UploadOutlined />}>{btnText || '上传文件'}</Button>
      )}
    </Upload>
  );
};

export default memo(InternalUpload);
