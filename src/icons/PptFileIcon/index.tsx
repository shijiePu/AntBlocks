import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import type { HTMLAttributes } from 'react';
import React from 'react';
import IconComponent from './PPT';

export default (
  props: Partial<CustomIconComponentProps> & HTMLAttributes<HTMLSpanElement>,
) => <Icon component={IconComponent} {...props} />;
