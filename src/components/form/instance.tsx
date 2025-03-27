import { Col, Form, Row } from 'antd';
import React, { FC, memo, useMemo } from 'react';

import ItemRender from './components/item-render';
import { TechFormProps } from './types';

import { createCode, getPrefixCls } from '@szhz/tech-pc/utils';

const InstanceForm: FC<TechFormProps> = ({
  rowProps,
  columns = 1,
  items,
  actionNode,
  onFinish,
  onReset,
  readonly = false,
  children,
  formName,
  ...formProps
}) => {
  const prefixCls = getPrefixCls('form');

  const formTypeConfig = useMemo(() => {
    if (!readonly) return {};

    if (readonly)
      return {
        disabled: true,
      };
  }, [readonly]);

  /**
   * @description 动态的占比
   */
  const dynamicSpan = useMemo(() => {
    return 24 / columns;
  }, [columns]);

  const handleFinish = (values: any) => {
    onFinish?.(values);
  };

  const handleReset = (e: any) => {
    onReset?.(e);
  };

  return (
    <Form
      colon={false}
      layout="vertical"
      {...formProps}
      {...formTypeConfig}
      onFinish={handleFinish}
      onReset={handleReset}
      className={prefixCls}
    >
      <Row gutter={[24, 16]} {...rowProps}>
        {(items || []).map((item) => {
          if (item?.hidden) return <></>;

          return (
            <Col
              key={item.name ?? createCode(8)}
              // 将span放在item中
              span={item?.span ?? dynamicSpan}
              {...item?.colProps}
            >
              <ItemRender readonly={readonly} formName={formName} {...item} />
            </Col>
          );
        })}
      </Row>

      {children}
      {actionNode && actionNode}
    </Form>
  );
};

export default memo(InstanceForm);
