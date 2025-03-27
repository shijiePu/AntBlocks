import { Badge } from 'antd';
import React, { FC, useMemo } from 'react';


interface RenderReviewStatusProps {
  data?: string;
  text: string
}

const COLOR_MAP: Record<string, any> = {
  0: 'processing',
  1: 'success',
  2: 'error',
};

const RenderReviewStatus: FC<RenderReviewStatusProps> = ({ data, text }) => {

  const statusData = useMemo(() => data, [data]);

  if (!statusData) return <>-</>;

  return (
    <Badge
      status={COLOR_MAP?.[statusData]}
      text={text}
    />
  );
};

export default RenderReviewStatus;
