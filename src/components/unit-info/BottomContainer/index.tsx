import { Space } from 'antd';
import React, { CSSProperties, FC, useMemo } from 'react';

interface BottomContainerProps {
  children?: React.ReactNode;
  full?: boolean;
}

const containerStyle: CSSProperties = {
  position: 'fixed',
  bottom: 16,
  background: '#fff',
  padding: '16px 24px',
  boxShadow: '0px -9px 7px 0px rgba(0,0,0,0.04)',
  display: 'flex',
  justifyContent: 'flex-end',
  zIndex: 1000,
  borderRadius: '8px',
};

const BottomContainer: FC<BottomContainerProps> = ({
  children,
  full = false,
}) => {
  const widthStyle = useMemo(() => {
    if (full) return { width: 'calc(100% - 36px)' };

    return { width: 'calc(100vw - 268px)' };
  }, [full]);

  return (
    <div style={{ ...containerStyle, ...widthStyle }}>
      <Space>{children}</Space>
    </div>
  );
};

export default BottomContainer;
