import { TechErrorCom } from '@szhz/tech-pc';
import React, { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { TechErrorBoundaryTypes } from './types';

const TechErrorBoundary: FC<TechErrorBoundaryTypes> = ({
  children,
  fallbackRender,
}) => {
  const renderFallbackRender = () => {
    return <TechErrorCom />;
  };
  return (
    <ErrorBoundary fallbackRender={fallbackRender ?? renderFallbackRender}>
      {children}
    </ErrorBoundary>
  );
};

export default TechErrorBoundary;
