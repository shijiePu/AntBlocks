import React, { FC, ReactNode } from 'react';

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
}

const Placeholder: FC<PlaceholderProps> = ({ label, ...props }) => {
  return <div {...props}>{label}</div>;
};

export default Placeholder;
