import { CascaderProps } from 'antd';

export type SingleValueType = (string | number)[];
export type ValueType = SingleValueType | SingleValueType[] | undefined;

export type TechCascaderProps = Omit<
  CascaderProps<any>,
  'onChange' | 'value'
> & {
  onChange?: (value: string, selectOptions?: any[]) => void;
  value?: string | null | ValueType;
  options?: any[];
  // multiple?: boolean;
};
