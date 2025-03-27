import { Button, Col, Form, Row, Space } from 'antd';
import React, { FC, memo, useMemo } from 'react';

import { SearchProps, TechFormItems } from '../../types';
import ItemRender from '../item-render';

import TechCollapse from '@szhz/tech-pc/components/collapse';
import DynamicContainer from '@szhz/tech-pc/components/dynamic-container';
import useExpand from '@szhz/tech-pc/hooks/useExpand';
import useResize from '@szhz/tech-pc/hooks/useResize';
import useSearchLayout from '@szhz/tech-pc/hooks/useSearchLayout';
import { createCode, genArrFromNum, getPrefixCls } from '@szhz/tech-pc/utils';

import './index.less';

/** 配置表单列变化的容器宽度断点 */
const BREAKPOINTS = {
  default: [
    [513, 1],
    [701, 2],
    [1062, 3],
    [1440, 3],
    [Infinity, 4],
  ],
};

const Search: FC<SearchProps> = memo(
  ({
    rowProps,
    columns,
    items,
    actionNode,
    showExpand = true,
    defaultExpand,
    hasCardBg = true,
    readonly = false,
    actionCol,
    ...props
  }) => {
    const prefixCls = getPrefixCls('form-search');
    const { width } = useResize();

    // 动态列数
    const dynamicColumns = useMemo(() => {
      if (columns && typeof columns === 'number') return columns;

      const breakPoint = BREAKPOINTS.default.find(
        (item) => width < (item[0] as number) + 16, // 16 = 2 * (ant-row -8px margin)
      );

      if (!breakPoint) return 4;

      return breakPoint[1] as number;
    }, [columns, width]);

    const { showCollapse, expandNum, collapse, setCollapse } = useExpand({
      columns: dynamicColumns,
      items,
      showExpand,
      defaultExpand,
    });

    const { actionAlign, dynamicOffset, dynamicSpan } = useSearchLayout({
      columns: dynamicColumns,
      items: genArrFromNum(expandNum ?? 0),
      prefixCls,
    });

    const formTypeConfig = useMemo(() => {
      if (!readonly) return {};

      if (readonly)
        return {
          disabled: true,
        };
    }, [readonly]);

    const handleFinish = (values: any) => {
      props?.onFinish?.(values);
    };

    const handleReset = (e: any) => {
      props?.onReset?.(e);
    };

    const renderItemFields = (items: TechFormItems[] | undefined) => {
      if (!expandNum || !items) {
        return <></>;
      }

      const children = [];

      if (!items?.length) {
        return <></>;
      }

      for (let i = 0; i < expandNum; i++) {
        const item = items[i];

        if (item?.hidden) continue;

        children.push(
          <Col
            key={createCode()}
            span={item?.span ?? dynamicSpan}
            {...item?.colProps}
          >
            <ItemRender
              readonly={readonly}
              style={{ marginBottom: '0' }}
              key={createCode(6)}
              {...item}
            />
          </Col>,
        );
      }

      return children;
    };

    const itemFields = useMemo(() => {
      return renderItemFields(items);
    }, [expandNum, dynamicColumns, items]);

    const actionColData = useMemo(() => {
      if (!actionCol) return {};

      if (!showCollapse) return actionCol?.(false) ?? {};

      return actionCol?.(collapse) ?? {};
    }, [collapse, showCollapse, actionCol]);

    const renderCollapse = useMemo(() => {
      if (!showCollapse) return <></>;

      return (
        <TechCollapse
          collapse={collapse}
          setCollapse={setCollapse}
          onExpand={props?.onExpand}
        ></TechCollapse>
      );
    }, [showCollapse, collapse, dynamicColumns]);

    return (
      <DynamicContainer className='tech-search' hasCardContainer={hasCardBg}>
        <Form
          {...formTypeConfig}
          colon={false}
          {...props}
          onFinish={handleFinish}
          onReset={handleReset}
        >
          <Row gutter={[24, 16]} align="middle" {...rowProps}>
            {itemFields}

            <Col span={dynamicSpan} offset={dynamicOffset} {...actionColData}>
              <div className={`${prefixCls}-action`}>
                {actionNode ?? (
                  <div className={`${prefixCls}-action-content ${actionAlign}`}>
                    <Space style={{ columnGap: '12px' }}>
                      {renderCollapse}
                      <Button htmlType="reset">重置</Button>
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                    </Space>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Form>
      </DynamicContainer>
    );
  },
);

export default Search;
