import { fileSizeType } from '@szhz/tech-pc';

export const DEFAULT_ACCEPT_LIST = [
  'doc',
  'docx',
  'jpg',
  'png',
  'jpeg',
  'pdf',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
];

/**
 * 判断文件大小是否超过限制
 * @param param0
 * @returns
 */
export const checkFileSize = ({
  file,
  limit,
  type = 'M',
}: {
  file: any;
  limit: number | undefined;
  type?: fileSizeType;
}) => {
  if (!limit) return true;

  const limitSize = type === 'K' ? limit : limit * 1024;

  return file / 1024 < limitSize;
};

// export const
