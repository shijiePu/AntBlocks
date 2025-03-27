import { UploadProps } from 'antd';
import { UploadListType } from 'antd/es/upload/interface';

import { FileDataType, FileItemType, ReflectFile } from '@szhz/tech-pc';
import { tuple } from '@szhz/tech-pc/utils/types';

const fileSizeTypes = tuple('K', 'M');
export type fileSizeType = typeof fileSizeTypes[number];

const uploadStatusTypes = tuple('uploading', 'done', 'error');
export type uploadStatusType = typeof uploadStatusTypes[number];

export type uploadFileType = FileDataType & {
  progress?: number;
  status?: uploadStatusType;
  uid: string;
  irsId: string;
  isEcho?: boolean;
};

export type TechUploadProps = Omit<UploadProps, 'onChange'> & {
  readOnly?: boolean | undefined; // 是否禁用
  nameLimit?: number;
  limit?: number;
  limitSizeType?: fileSizeType;
  acceptList?: string[];
  value?: any;
  onChange?: (data: any) => void;
  onItemClick?: (data: any) => void;
  reflect?: ReflectFile;
  fileIconMapField?: FileItemType['fileIconMapField'];
  uploadUrl?: string;
  imageUrlPrefix?: string;
  /** @description 是否只能上传单个文件，设置之后maxCount默认为1 */
  single?: boolean;
  canClickName?: boolean;
  btnText?: string;
  // 自定义preview窗口的title，如果是string则使用自定义值
  customPreviewTitle?: string
};

export type TechPictureProps = TechUploadProps & {
  width?: number;
  height?: number;
  // 达到上传上限是隐藏上传按钮
  hideOnLimit?: boolean;
};

export type UploadHookType = {
  value?: any;
  onChange?: (data: any) => void;
  reflect?: ReflectFile;
  listType?: UploadListType;
  uploadUrl?: string;
  imageUrlPrefix?: string;
  single?: boolean;
  maxCount?: number;
  extraData?: any
};

export type UseBeforeUploadType = {
  checkPicSize?: boolean;
  fileList: any[];
  width?: number;
  height?: number;
  maxCount?: number;
  limit?: number;
  limitSizeType?: fileSizeType;
  accept?: string;
  uploadUrl?: string;
};
