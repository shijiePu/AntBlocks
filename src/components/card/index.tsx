import { Card } from 'antd';
import { assign } from 'lodash-es';
import React, { useMemo } from 'react';
import { TechCardProps } from './types';

const CARD_STYLE: React.CSSProperties = {
  padding: '16px 24px',
  borderRadius: '8px',
};

export default function TechCard({
  children,
  hasBottomPadding = false,
  style,
  ...props
}: TechCardProps) {
  const cardStyle = useMemo(() => {
    if (!hasBottomPadding) return CARD_STYLE;

    return assign({ marginBottom: '16px' }, CARD_STYLE);
  }, [hasBottomPadding]);

  return (
    <Card
      style={{ ...cardStyle, ...(style ?? {}) }}
      styles={{ body: { padding: '0' } }}
      {...props}
    >
      {children}
    </Card>
  );
}
