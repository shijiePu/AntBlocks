import { FileListProps, PageTitleProps } from '@szhz/tech-pc';
import { tuple } from '@szhz/tech-pc/utils/types';
import { DescriptionsProps } from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';
import { ReactNode } from 'react';

const ItemTypes = tuple(
  'text',
  'empty',
  'file',
  'dict',
  'img',
  'rangeTime',
  'checkbox',
  'placeholder',
);

export type ItemType = (typeof ItemTypes)[number];

export interface DictReflect {
  label?: string;
  key?: string;
}

export type TechDetailItemType = DetailItemType & {
  label?: ReactNode;
  name?: string | string[];
  render?: (value?: any, dataSource?: any) => ReactNode;
  span?: number;
  /**
   * @desc 隐藏该属性
   */
  hidden?: boolean;

  /** @deprecated Please use `name` instead. */
  key?: string;
};

export type DetailItemType = {
  type?: ItemType;
  fileProps?: Partial<FileListProps>;
  dictReflect?: DictReflect;
  dictKey?: string;
  value?: any;
  dictMap?: Record<string, string> | any[] | null;
  render?: (value?: any, dataSource?: any) => ReactNode;
  dataSource?: Record<string, any>;
  maskKey?: string
};

export type TechDetailItem = TechDetailItemType &
  Omit<DescriptionsItemType, 'children'>;

export interface TechDetailProps
  extends Omit<DescriptionsProps, 'items' | 'title'> {
  titleDesc?: ReactNode;
  titleAction?: ReactNode;
  dataSource?: Record<string, any>;
  items?: TechDetailItem[];
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  /** @deprecated Please use `hasCardBg` instead. */
  whiteBg?: boolean;
  hasCardBg?: boolean;
  container?: ReactNode;
  title?: string | ReactNode;
  /** @description dataSource中的key */
  detailName?: string;
}

export interface TechDetailGroupItem {
  groupTitle?: string | ReactNode;
  groupTitleProps?: Omit<PageTitleProps, 'title'>;
  groupContainer?: ReactNode;
  groupItems?: TechDetailProps[];
  items?: TechDetailItem[];
  itemProps?: Omit<TechDetailProps, 'items' | 'dataSource'>;
  dataSource?: Record<string, any>;

  /*** @desc 隐藏该属性*/
  hidden?: boolean;
}

export interface TechDetailGroupProps {
  items?: TechDetailGroupItem[];
  dataSource?: Record<string, any>;
}
