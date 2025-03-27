import { ExtraComType } from '@szhz/tech-pc/types/base';
import { Radio } from 'antd';
import { ComponentProps, HTMLAttributes } from 'react';

export type RadioType = HTMLAttributes<object> &
  ComponentProps<typeof Radio.Group>;

export type TechRadioGroupProps = RadioType & ExtraComType;
