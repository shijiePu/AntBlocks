import { CSSProperties, ReactNode } from 'react';

export interface TechCardPickerItem {
  icon: ReactNode;
  title: ReactNode;
  value: number;
  key: string | number;
  style?: CSSProperties;
}
export interface TechCardPickerProps {
  dataSource: TechCardPickerItem[];
  valAnimate?: boolean;
  valueColor?: CSSProperties['color'];
  defaultActiveKey?: string | number;
  titleLimit?: number;
  onChange?: (key: string | number, data: TechCardPickerItem) => void;
}
