import { FormComType } from '@szhz/tech-pc';
import React, { memo } from 'react';
import { FORM_ITEM_COM_MAP } from '../../constants';

// 泛型组件类型，用于约束props的类型
type DynamicItemProps<T extends FormComType> = {
  type: T;
  // 使用泛型P来约束传递给子组件的props
  [propName: string]: any; // 或者使用具体的props接口，但这里为了简单起见使用any
};

// 泛型动态组件
function DynamicItem<T extends FormComType>({
  type,
  ...restProps
}: DynamicItemProps<T>) {
  const defaultProps: { [propName: string]: any } = {}
  // 使用类型断言来确保Component是React.ComponentType<any>
  const Component = FORM_ITEM_COM_MAP[
    type ?? 'input'
  ] as React.ComponentType<any>;

  if (type === 'input') {
    defaultProps.maxLength = 50
  }
  if (type === 'textarea') {
    defaultProps.maxLength = 200
    defaultProps.showCount = true
  }
  if (type === 'inputNumber') {
    defaultProps.max = 99999
  }

  // 验证Component是否存在
  if (!Component) {
    console.error(`Component for type ${type} not found in FORM_ITEM_COM_MAP.`);
    return null; // 或者返回一个错误组件
  }

  // 渲染组件并传递props
  return <Component {...defaultProps} {...restProps} />;
}

export default memo(DynamicItem);
