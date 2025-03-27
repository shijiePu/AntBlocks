
import { Progress } from 'antd';
import { get } from 'lodash-es';
import React, { FC, memo, useMemo } from 'react';

import { UploadItemProps } from './types';

import { FileDataType, TechFile } from '@szhz/tech-pc';
import { CircleCloseIcon } from '@szhz/tech-pc/icons';

const UploadItem: FC<UploadItemProps> = ({
  dataSource,
  onDelete,
  status = 'done',
  reflect,
  onClick,
  nameLimit = 40,
  fileIconMapField,
  canClickName = false
}) => {
  /**
   * 获取渲染的文件数据
   * @param fileData
   * @returns
   */
  const getUploadData = (fileData: any): any => {
    const result = get(fileData, 'response', null);
    const isEcho = get(fileData, 'isEcho', null);

    if (result) {
      return {
        ...result,
      };
    }

    if (isEcho) {
      return {
        ...fileData,
      };
    }

    return {
      fileName: fileData.name,
      fileUrl: fileData.name,
      irsId: fileData?.irsId,
    };
  };

  const fileData = useMemo(() => {
    if (!dataSource) return {};

    return getUploadData(dataSource);
  }, [dataSource]);

  console.log('dataSource',dataSource);
  

  const { percent } = dataSource;

  const isUploading = useMemo(() => {
    if (!dataSource.percent) return false;

    return dataSource?.percent > 0 && dataSource?.percent < 100;
  }, [dataSource]);

  /**
   * 删除已上传的文件
   * @param id
   */
  const deleteUploaded = (id: string) => {
    if (!id) return;

    onDelete?.(id);
  };

  /**
   * 点击事件
   */
  const handleClick = () => {
    if (!Boolean(fileData)) return;

    onClick?.(fileData);
  };

  if (!dataSource) return <></>;

  console.log('status',status);
  

  return (
    <div style={{ lineHeight: '15px' }}>
      <TechFile.Item
      status={status}
        nameLimit={nameLimit}
        reflect={reflect}
        onFileHandle={handleClick}
        style={{
          marginTop: '10px',
          marginBottom: `${isUploading ? '2px' : '3px'}`,
          color: `${status === 'error' ? 'red' : '#333'}`,
        }}
        fileData={fileData as unknown as FileDataType}
        fileIconMapField={fileIconMapField}
        canClickName={canClickName}
      >
       
        <CircleCloseIcon
          style={{ position: 'relative', top: '1px' }}
          onClick={(event) => { deleteUploaded(fileData.irsId); event.stopPropagation();  }}
        />
      </TechFile.Item>
      {/* <Progress
          style={{ marginBottom: '0' }}
          type="line"
          size={[-1, 3]}
          // showInfo={false}
          percent={percent}
        ></Progress> */}
      {status === 'uploading' ? (
        <Progress
          style={{ marginBottom: '0' }}
          type="line"
          size={[-1, 3]}
          showInfo={false}
          percent={percent}
        ></Progress>
      ) : (
        <></>
      )}
    </div>
  );
};

export default memo(UploadItem);
