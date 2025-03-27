import { requestUpload } from '@szhz/tech-pc/plugins/request';
import { RequestType } from '@szhz/tech-pc/plugins/request/types';

interface TechUploadReqProps {
  url?: string;
  data?: any;
  config?: RequestType;
}

/**
 * 上传文件
 */
export const TechUploadReq = ({ url, data, config }: TechUploadReqProps) => {
  return requestUpload(
    url ?? '/szjs-api/gateway/program/attachment/upload',
    data,
    config,
  );
};
