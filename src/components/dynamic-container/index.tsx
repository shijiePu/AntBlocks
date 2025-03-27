import React, { FC, ReactNode } from 'react';

import TechCard from '@szhz/tech-pc/components/card';
import { TechCardProps } from '@szhz/tech-pc/components/card/types';

export interface ContainerProps extends TechCardProps {
  CustomContainer?: any;
  children?: ReactNode;
  hasBottomPadding?: boolean;
  hasCardContainer?: boolean;
}

const DynamicContainer: FC<ContainerProps> = ({
  CustomContainer,
  children,
  hasBottomPadding = true,
  hasCardContainer = false,
  ...props
}) => {
  if (CustomContainer) return <CustomContainer>{children}</CustomContainer>;

  if (!hasCardContainer) return <>{children}</>;

  return (
    <TechCard hasBottomPadding={hasBottomPadding} {...props}>
      {children}
    </TechCard>
  );
};

export default DynamicContainer;
