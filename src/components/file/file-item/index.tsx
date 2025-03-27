import { CheckCircleTwoTone } from '@ant-design/icons';
import React, { FC, memo, useMemo } from 'react';

import { FILE_NAME_FIELD, FILE_URL_FIELD } from '../constant';

import {
  FileDataType,
  FileIconMapFieldType,
  FileItemType,
  ReflectFile,
} from '@szhz/tech-pc';
import { createCode, dispatchFileName } from '@szhz/tech-pc/utils/common';
import { convertFileDataTypeToImg } from '@szhz/tech-pc/utils/fileList';
import { getPrefixCls } from '@szhz/tech-pc/utils/styles';

import { Tag } from 'antd';
import './index.less';

const FileItem: FC<FileItemType> = memo(
  ({
    fileData,
    reflect,
    onFileHandle,
    nameLimit = 8,
    style,
    className,
    children,
    canClickName = true,
    fileIconMapField = 'fileName',
    status,
    isNewFile
  }) => {
    const prefixCls = getPrefixCls('file-item');
    // 确保nameLimit是正整数
    const effectiveNameLimit = useMemo(
      () => Math.max(0, Number(nameLimit)),
      [nameLimit],
    );

    // 可以点击的class名称
    const canClickNameCls = canClickName ? `${prefixCls}-left-canClick` : '';

    const fileConfig: FileDataType = useMemo<ReflectFile>(() => {
      return {
        [FILE_NAME_FIELD]: reflect
          ? reflect?.[FILE_NAME_FIELD]
          : FILE_NAME_FIELD,
        [FILE_URL_FIELD]: reflect ? reflect?.[FILE_URL_FIELD] : FILE_URL_FIELD,
      };
    }, [reflect]);

    /**
     * 点击文件标题
     * @param file
     * @returns
     */
    const handleFileClick = (file: FileDataType) => {
      if (!canClickName) return;

      const fileUrl = file[fileConfig['fileUrl'] as 'fileUrl'];

      if (!fileUrl) return;

      if (onFileHandle) {
        onFileHandle(file);
        return;
      }

      window.open(file[fileConfig['fileUrl'] as 'fileUrl']);
    };

    const getFileType = () => {
      return (
        fileData?.[fileConfig[fileIconMapField] as FileIconMapFieldType]
          ?.split('.')
          .at(-1) ?? ''
      );
    };
    const fileName = useMemo(() => {
      return dispatchFileName(
        fileData[fileConfig['fileName'] as 'fileName'],
        effectiveNameLimit,
      );
    }, [effectiveNameLimit, fileData]);

    if (!fileData) return <></>;

    return (
      <div
        style={{ ...style }}
        className={`${prefixCls} ${className || ''}`}
        onClick={() => handleFileClick(fileData)}
        key={createCode()}
      >
        <div className={`${prefixCls}-left`}>
          {convertFileDataTypeToImg(getFileType())({
            className: `${prefixCls}-left-icon`,
            style: { fontSize: '16px' },
          })}

          <div
            title={fileData[fileConfig['fileName'] as 'fileName']}
            className={`${prefixCls}-left-fileName ${canClickNameCls}`}
          >
            {fileName}
            {status === 'done' && <CheckCircleTwoTone style={{ margin: '0 8px 0 12px' }} twoToneColor="#01ba01" />}
            {isNewFile && <Tag style={{ transform: 'scale(0.7)', transformOrigin: 'center', marginTop: 5 }} color="success">NEW</Tag>}
          </div>
        </div>

        {children && <div className={`${prefixCls}-action`}>{children}</div>}
      </div>
    );
  },
);

export default FileItem;
