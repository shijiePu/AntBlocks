import { CaretDownFilled } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { TechCollapseProps } from './types';

const TechCollapse = ({
  collapse,
  setCollapse,
  onExpand,
}: TechCollapseProps) => {
  // 处理展开收起功能
  const handleExpand = () => {
    setCollapse(!collapse);
    onExpand?.(!collapse);
  };

  return (
    <Button
      type="link"
      style={{ fontSize: 14, padding: '4px 0' }}
      onClick={handleExpand}
    >
      {collapse ? '展开' : '收起'}
      <CaretDownFilled rotate={collapse ? 0 : 180} />
    </Button>
  );
};

export default TechCollapse;
