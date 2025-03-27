import { Badge } from 'antd';
import React, { FC, useContext, useMemo } from 'react';

import { ConfigContext } from '@szhz/tech-pc/components/config-provider/contexts';

interface RenderReviewStatusProps {
  data?: string;
  dictKey?: any;
}

const COLOR_MAP: Record<string, any> = {
  PASSED: 'success',
  AUDIT: 'processing',
  TODO: 'processing',
  RETURNED: 'error',
};

const RenderReviewStatus: FC<RenderReviewStatusProps> = ({ data, dictKey = 'flowRevieStatus' }) => {
  const { globalDict } = useContext(ConfigContext);

  const statusData = useMemo(() => data, [data]);

  if (!statusData) return <>-</>;

  if (statusData === 'AUTO_COMPLETED') return <>-</>;

  if (!globalDict?.[dictKey]) return <>-</>;

  return (
    <Badge
      status={COLOR_MAP?.[statusData]}
      text={globalDict?.[dictKey]?.[statusData]}
    />
  );
};

export default RenderReviewStatus;
