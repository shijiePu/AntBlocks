import { CSSProperties, ReactNode } from 'react';

import { tuple } from '@szhz/tech-pc/utils/types';

const TitleTypes = tuple('page', 'table', 'form');

export type TitleType = (typeof TitleTypes)[number];

export interface PageTitleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  goBack?: boolean;
  type?: TitleType;
  titleDesc?: ReactNode;
  actionNode?: ReactNode;
  style?: React.CSSProperties;

  hasBottomMargin?: boolean | number | string;
  fontSize?: CSSProperties['fontSize'];
  onBackClick?: () => void;
  children?: ReactNode;

  /** @deprecated Please use `children` instead. */
  title?: ReactNode;

  /** @deprecated Please use `onBackClick` instead. */
  clickEvent?: () => void;

  /** @deprecated Please use `type` instead. */
  titleType?: TitleType;
}
