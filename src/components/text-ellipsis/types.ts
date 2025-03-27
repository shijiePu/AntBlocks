import { TooltipProps } from 'antd';
import { CSSProperties, RefObject } from 'react';
import Multi from './multi';
import Single from './single';

export interface TextEllipsisProps {
  maxChars?: number | undefined;
  maxWidth?: number;
  maxLines?: number | undefined;
  showTooltip?: boolean;
  tooltipProps?: TooltipProps;
  text: string;
  style?: CSSProperties;
  className?: string;
  width?: string | undefined;
  prefixCls?: string;
  fontSize?: string;
}

export type SingleEllipsisProps = {
  maxChars?: number | undefined;
  width?: string | undefined;
  maxWidth?: number;
  style?: CSSProperties;
  text: string;
  fontSize?: string;
  tooltipProps?: TooltipProps;
  className?: string;
  showTooltip?: boolean;
};

export type MultiEllipsisProps = SingleEllipsisProps & {
  line?: number;
};

export type SingleHookType = Partial<MultiEllipsisProps> & {
  singleRef: RefObject<HTMLDivElement>;
};

export type TechTextEllipsisType = {
  Single: typeof Single;
  Multi: typeof Multi;
};
