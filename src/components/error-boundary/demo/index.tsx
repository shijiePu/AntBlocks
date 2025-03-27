/**
 * title: 基本使用
 */

import { TechErrorBoundary } from '@szhz/tech-pc';
import React from 'react';

const ErrorBoundaryPage = () => {
  const renderSuccessCom = () => {
    return <>错误组件</>;
  };

  return (
    <div>
      <TechErrorBoundary>{renderSuccessCom()}</TechErrorBoundary>
    </div>
  );
};

export default ErrorBoundaryPage;
