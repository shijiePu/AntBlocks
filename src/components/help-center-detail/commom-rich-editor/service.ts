import { requestPost } from '@szhz/tech-pc/plugins/request';

export const upload = (data: any) =>
  requestPost<any>('/szjs-api/gateway/program/attachment/upload', data);
