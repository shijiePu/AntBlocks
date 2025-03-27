import { CardProps } from 'antd';
import { ReactNode } from 'react';

export interface TechCardProps extends Omit<CardProps, 'children'> {
  children?: ReactNode;
  hasBottomPadding?: boolean; // 底部是否包含边距
}
