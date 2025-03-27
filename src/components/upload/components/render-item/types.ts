import { FileItemType, ReflectFile } from '@szhz/tech-pc';
import { uploadStatusType } from '../../types';

export type UploadItemProps = {
  dataSource: {
    uid?: string;
    name?: string;
    percent?: number;
    response?: any | undefined;
  };
  nameLimit?: number;
  reflect?: ReflectFile;
  onClick?: (data: any) => void;
  status?: uploadStatusType;
  onDelete?: (id: string) => void;
  fileIconMapField?: FileItemType['fileIconMapField'];
  canClickName?: boolean
};
