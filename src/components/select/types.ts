import { ExtraComType } from '@szhz/tech-pc/types/base';
import { Select } from 'antd';
import { ComponentProps, HTMLAttributes } from 'react';

export type SelectType = HTMLAttributes<object> & ComponentProps<typeof Select>;

export type TechSelectProps = SelectType & ExtraComType;
