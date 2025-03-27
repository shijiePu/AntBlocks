import { requestPost } from '@szhz/tech-pc/plugins/request';

import {
    AttachmentRequest,
    ImportProjectExcelResponse,
    ProjectApprovalPageVo,
    ProjectApprovalSearchRequest,
} from './types';

/**
 * @description 项目立项文件导入
 * @tags 项目立项控制器
 * @request post:/program-manage/project/approval/import-approval-file
 */
export const projectApprovalImportApprovalFileByPost = (
  data: AttachmentRequest,
) =>
  requestPost<ImportProjectExcelResponse>(
    '/szjs-api/gateway/program-manage/project/approval/import-approval-file', data);

/**
 * @description 分页查询项目立项列表信息
 * @tags 项目立项控制器
 * @request post:/program-manage/project/approval/page
 */
export const projectApprovalPageByPost = (data: ProjectApprovalSearchRequest) =>
  requestPost<ProjectApprovalPageVo>(
    '/szjs-api/gateway/program-manage/project/approval/page', data);

/**
 * @description 上传资金下达文
 * @tags 项目立项控制器
 * @request post:/program-manage/project/approval/upload-fund-document
 */
export const projectApprovalUploadFundDocumentByPost = (
  data: AttachmentRequest,
) =>
  requestPost<string[]>(
    '/szjs-api/gateway/program-manage/project/approval/upload-fund-document', data);
