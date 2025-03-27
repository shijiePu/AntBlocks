import TechCard from '@szhz/tech-pc/components/card';
import React, { FC, ReactNode } from 'react';

export interface ContainerProps {
  CustomContainer?: any;
  children?: ReactNode;
  hasBottomPadding?: boolean;
}

const BaseContainer: FC<ContainerProps> = ({
  CustomContainer,
  children,
  hasBottomPadding = true,
}) => {
  if (CustomContainer) return <CustomContainer>{children}</CustomContainer>;

  return <TechCard hasBottomPadding={hasBottomPadding}>{children}</TechCard>;
};

export default BaseContainer;
