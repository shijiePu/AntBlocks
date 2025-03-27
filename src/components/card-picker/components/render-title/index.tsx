import { TechTextEllipsis } from '@szhz/tech-pc';
import React, { memo } from 'react';

const RenderTitle = ({
  prefixCls,
  title,
  limit = 4,
}: {
  prefixCls: string;
  title: React.ReactNode;
  limit?: number;
}) => {
  if (typeof title === 'string') {
    return (
      <div className={`${prefixCls}-item-left-title`}>
        {/* 优化rerender时tooltip异常问题 */}
        {title?.length > limit && (
          <TechTextEllipsis.Single
            maxChars={limit}
            text={title}
            fontSize="14px"
          />
        )}

        {title?.length <= limit && title}
      </div>
    );
  }

  return <>{title}</>;
};

export default memo(RenderTitle);
