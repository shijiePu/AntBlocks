import React, { FC, useMemo } from 'react';

import './index.less';

import { createCode } from '@szhz/tech-pc/utils/common';
import { getPrefixCls } from '@szhz/tech-pc/utils/styles';
import FileItem from './file-item';
import { FileListProps } from './types';

const TechFileList: FC<FileListProps> = ({
  fileList,
  label,
  onFileHandle,
  style = {},
  direction = 'column',
  nameLimit = 8,
  reflect,
  itemRender,
  ...props
}) => {
  const prefixCls = getPrefixCls('file');

  // 设置单独文件的class
  const fileItemCls = useMemo(() => {
    if (fileList?.length > 1 || !fileList?.length) return '';

    return `${prefixCls}-list-sole`;
  }, [fileList]);

  const fileDirection = useMemo(() => {
    if (direction === 'line') return `${prefixCls}-list-item`;
    return '';
  }, [direction]);

  return (
    <div
      className={`${prefixCls} `}
      style={{ ...style, display: label ? 'flex' : 'block' }}
    >
      {label ? <div className={`${prefixCls}-label`}>{label}</div> : <></>}

      <div className={`${prefixCls}-list ${prefixCls}-list-${direction}`}>
        {fileList.map((item) => {
          if (!item) return <></>;

          if (itemRender) {
            return itemRender(item);
          }

          return (
            <FileItem
              style={{ color: '#1677ff' }}
              key={createCode()}
              nameLimit={nameLimit}
              reflect={reflect}
              onFileHandle={onFileHandle}
              fileData={item}
              className={`${fileItemCls}  ${fileDirection}`}
              {...props}
            ></FileItem>
          );
        })}
      </div>
    </div>
  );
};

export default TechFileList;
