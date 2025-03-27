import { ReactNode } from 'react';
import { FallbackProps } from 'react-error-boundary';

export interface TechErrorBoundaryTypes {
  children: ReactNode;
  fallbackRender?: (props: FallbackProps) => ReactNode;
}
