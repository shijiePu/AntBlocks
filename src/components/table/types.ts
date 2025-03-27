import { TableProps } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import React from 'react';
export interface DataType {
  dataIndex: React.Key;
  title: string;
  width: number;
  dictKey?: string | undefined;
  render: () => void;
}

type TechColumn<RecordType = any> = (
  | ColumnGroupType<RecordType>
  | ColumnType<RecordType>
) & {
  dictKey?: string | undefined;
};
export type TechColumnsType<RecordType> = TechColumn<RecordType>[];

export interface TechTableProps<RecordType = any>
  extends Omit<TableProps<RecordType>, 'columns'> {
  columns?: TechColumnsType<RecordType>;
  isSeq?: boolean;
  current?: number;
  pageSize?: number;
}
