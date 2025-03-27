import { Col, Form, Row } from 'antd';
import { isString } from 'antd/es/button';
import { isArray } from 'lodash-es';
import React, { FC, ReactNode, useMemo } from 'react';

import ItemRender from '../item-render';

import {
  createCode,
  GroupItemsType,
  TechFormGroupProps,
  TechPageTitle
} from '@szhz/tech-pc';
import DynamicContainer from '@szhz/tech-pc/components/dynamic-container';

function getItemFormName(
  itemName?: string,
  groupItemName?: string,
  formName?: string,
) {
  if (itemName) return itemName;
  if (groupItemName) return groupItemName;
  if (formName) return formName;

  return;
}

const Group: FC<TechFormGroupProps> = ({
  onFinish,
  onReset,
  groupItems,
  formName,
  children,
  readonly = false,
  ...formProps
}) => {
  const formTypeConfig = useMemo(() => {
    if (!readonly) return {};

    if (readonly)
      return {
        disabled: true,
      };
  }, [readonly]);

  const handleFinish = (values: any) => {
    onFinish?.(values);
  };

  const handleReset = (e: any) => {
    onReset?.(e);
  };

  // 获取占比
  const getDynamicSpan = (column: number = 1) => {
    return 24 / column;
  };

  const renderTitle = (title: ReactNode, titleDesc?: ReactNode) => {
    if (!title) return <></>;

    if (isString(title))
      return <TechPageTitle type="form" titleDesc={titleDesc}>{title}</TechPageTitle>;

    return <>{title}</>;
  };

  //
  const renderItem = (groupItem: GroupItemsType) => {
    const dynamicSpan = getDynamicSpan(groupItem?.columns);

    return (
      <DynamicContainer
        hasCardContainer={true}
        key={createCode(6)}
        CustomContainer={groupItem?.container}
        className='tech-group-form'
      >
        {renderTitle(groupItem?.title, groupItem?.titleDesc)}
        <Row gutter={[24, 16]} {...groupItem?.rowProps}>
          {(groupItem?.items || []).map((item) => {
            if (item?.hidden) return <></>;
            const itemFormName = getItemFormName(
              item?.formName,
              groupItem?.formName,
              formName,
            );

            return (
              <Col
                key={createCode()}
                span={item.span ?? dynamicSpan}
                {...item?.colProps}
              >
                <ItemRender
                  readonly={readonly}
                  key={createCode(6)}
                  formName={itemFormName}
                  {...item}
                  className='tech-group-form-item'
                />
              </Col>
            );
          })}
        </Row>
      </DynamicContainer>
    );
  };

  const renderGroupItems = useMemo(() => {
    if (!isArray(groupItems)) return <></>;

    return groupItems?.filter((i:any)=>(!i?.hidden))?.map((groupItem) => renderItem(groupItem));
  }, [groupItems]);

  return (
    <Form
      colon={false}
      {...formTypeConfig}
      layout="vertical"
      {...formProps}
      onFinish={handleFinish}
      onReset={handleReset}
    >
      {renderGroupItems}
      {children}
    </Form>
  );
};

export default Group;
