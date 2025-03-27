import { ExtraComType } from '@szhz/tech-pc/types/base';
import { Checkbox } from 'antd';
// @ts-ignore
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { ComponentProps, HTMLAttributes, ReactNode } from 'react';

export type CheckboxGroupType = HTMLAttributes<object> &
  Omit<ComponentProps<typeof Checkbox.Group>, 'onChange' | 'value'>;

export type TechCheckGroupProps = CheckboxGroupType &
  ExtraComType & {
    value?: CheckboxValueType[] | undefined | string;
    onChange?: (value: string | undefined) => void;
    children?: ReactNode;
  };
