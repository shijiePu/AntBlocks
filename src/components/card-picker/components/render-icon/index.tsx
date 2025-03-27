import { isString } from 'lodash-es';
import React, { memo } from 'react';

const RenderIcon = ({
  icon,
  prefixCls,
}: {
  prefixCls: string;
  icon: React.ReactNode;
}) => {
  if (isString(icon)) {
    return (
      <div className={`${prefixCls}-item-left-icon`}>
        <div className={`${prefixCls}-icon`}>
          <img src={icon}></img>
        </div>
      </div>
    );
  }

  return <>{icon}</>;
};

export default memo(RenderIcon);
