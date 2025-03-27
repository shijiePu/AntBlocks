import { Form } from 'antd';
import { isNumber, isString } from 'lodash-es';
import React, { FC, memo, ReactNode, useMemo } from 'react';

import { ItemsProps } from '../../types';
import DynamicItem from '../dynamic-item';

import { genRequiredRule, getDefaultConfig, getRegData } from './constant';

import TechDependency from '@szhz/tech-pc/components/dependency';
import TechErrorBoundary from '@szhz/tech-pc/components/error-boundary';
import { RegKeyType } from '@szhz/tech-pc/types/reg';

const ItemRender: FC<ItemsProps> = ({
  type,
  label,
  name,
  itemProps,
  fieldProps,
  style,
  customCom,
  depNames,
  render,
  regKey,
  required,
  readonly,
  formName,
  children,
  ...restProps
}) => {
  // 获取默认的配置
  const defaultConfig = useMemo(() => {
    if (type === 'placeholder') return {};

    return getDefaultConfig(type, readonly);
  }, [type, readonly]);

  // 合并之后的属性
  const formItemProps = useMemo(() => {
    return {
      ...restProps,
      ...itemProps,
    };
  }, [restProps, itemProps]);

  // 生成表单校验规则
  const itemRules = useMemo(() => {
    const defaultRules = formItemProps?.rules ?? [];

    const curReg = getRegData(regKey as RegKeyType) ?? [];

    // @ts-ignore
    const requiredRule = genRequiredRule(required, type, label) ?? [];

    return [...defaultRules, ...requiredRule, ...curReg];
  }, [formItemProps?.rules, regKey, required]);

  // FormItem的name
  const itemName = useMemo(() => {
    if (!formName) return name;

    if (!name) return name;

    return [formName, name];
  }, [name, formName]);

  if (children) {
    return (
      <Form.Item
        style={style}
        label={label}
        name={itemName}
        rules={itemRules}
        {...formItemProps}
      >
        {children}
      </Form.Item>
    );
  }

  if (type === 'placeholder') {
    return <div style={style}>{label}</div>;
  }

  if (type === 'dependency') {
    return (
      <TechDependency depNames={depNames ?? []} {...formItemProps}>
        {(values, form) => {
          return render?.(values, form);
        }}
      </TechDependency>
    );
  }

  if (type === 'textarea') {
    const mergeProps: any = {
      ...defaultConfig,
      ...fieldProps,
    };
    if (isNumber(mergeProps?.style?.height) || isString(mergeProps?.style?.height)) {
      mergeProps.autoSize = false
    }
    return <TechErrorBoundary >
      <Form.Item
        style={style}
        label={label}
        name={itemName}
        {...formItemProps}
        rules={itemRules}
        dependencies={formItemProps?.dependencies}
      >
        {customCom ? (
          (customCom as ReactNode)
        ) : (
          <DynamicItem type={type as any} {...mergeProps} />
        )}
      </Form.Item>
    </TechErrorBoundary >
  }

  return (
    <TechErrorBoundary>
      <Form.Item
        style={style}
        label={label}
        name={itemName}
        {...formItemProps}
        rules={itemRules}
        dependencies={formItemProps?.dependencies}
      >
        {customCom ? (
          (customCom as ReactNode)
        ) : (
          <DynamicItem type={type as any} {...defaultConfig} {...fieldProps} />
        )}
      </Form.Item>
    </TechErrorBoundary>
  );
};

export default memo(ItemRender);
