import { Descriptions } from 'antd';
import { cloneDeep, has, isArray, isString } from 'lodash-es';
import React, { CSSProperties, useMemo } from 'react';

import { TechPageTitle } from '@szhz/tech-pc';
import { createCode } from '@szhz/tech-pc/utils/common';
import { getPrefixCls } from '@szhz/tech-pc/utils/styles';

import { DescriptionsItemType } from 'antd/es/descriptions';
import DynamicContainer from '../dynamic-container';
import DetailItem from './components/item-render';
import { DEFAULT_LABEL_WIDTH, DETAIL_ITEM_KEY, DETAIL_LABEL_STYLE, getMaskData } from './constant';
import useDetail from './hook';
import './index.less';
import { ItemType, TechDetailProps } from './types';

const getItemLabelStyle = (
  type: ItemType,
  labelStyle?: CSSProperties,
): CSSProperties => {
  const defaultStyle = {
    width: type === 'placeholder' ? '100%' : ``,
    ...(labelStyle ?? {}),
  };

  return defaultStyle;
};

const getDetailVal = (
  name: string | string[],
  dataSource?: Record<string, any>,
) => {
  if (!dataSource) return null;
  if (isString(name)) return dataSource?.[name];

  if (isArray(name)) return name.map((item: string) => dataSource?.[item]);
};

const DetailInstance: React.FC<TechDetailProps> = ({
  items = [],
  dataSource = {},
  labelStyle = {},
  column = 3,
  title = '',
  style = {},
  className,
  colon = false,
  titleDesc,
  titleAction,
  whiteBg = false,
  hasCardBg = false,
  layout = 'horizontal',
  detailName,
  ...props
}) => {
  const prefixCls = getPrefixCls('detail');

  // 使用 useMemo 来记忆化 dataSource，避免在每次渲染中重新创建
  const memoizedDataSource = useMemo(() => {
    if (!detailName) return dataSource;

    return dataSource?.[detailName] ?? {};
  }, [dataSource, detailName]);

  const { CriterionLabelStyle, componentId } = useDetail({
    column,
  });

  // label宽度样式
  const labelWidthStyle = useMemo<CSSProperties>(() => {
    if (layout === 'vertical') {
      return {
        width: '100%',
      };
    }

    if (column === 1) {
      return {
        width: '40%',
      };
    }

    return {
      minWidth: DEFAULT_LABEL_WIDTH,
      maxWidth: DEFAULT_LABEL_WIDTH
    }

  }, [CriterionLabelStyle, column]);

  const hasCardContainer = useMemo(() => {
    if (hasCardBg || whiteBg) return true;

    if (!hasCardBg) return false;
  }, [hasCardBg, whiteBg]);

  // 渲染标题
  const detailTitle = useMemo(() => {
    if (!title) return '';

    if (isString(title)) {
      return (
        <TechPageTitle
          style={{ marginBottom: '0' }}
          hasBottomMargin={false}
          type="form"
          titleDesc={titleDesc}
          actionNode={titleAction}
        >
          {title}
        </TechPageTitle>
      );
    }

    return title;
  }, []);

  /**
   * 处理传入的配置项
   * @param config
   * @returns
   */
  const dispatchItemConfig = (config: any, dataSource: Record<string, any>) => {
    const localConfig = cloneDeep(config);

    const valName = config?.key ?? config?.name;

    const itemConfig: Record<string, any> = {
      key: createCode(6),
      labelStyle: { ...getItemLabelStyle(config?.type) },
    };

    DETAIL_ITEM_KEY.forEach((key: any) => {
      if (has(localConfig, key)) {
        itemConfig[key] = localConfig[key];
        delete localConfig[key];
      }
    });

    const detailConfig = {
      ...localConfig,
      value: !!localConfig?.maskKey ? getMaskData(getDetailVal(valName, dataSource), localConfig?.maskKey) : getDetailVal(valName, dataSource), // label  maskKey
    };

    return {
      itemConfig,
      detailConfig,
    };
  };

  const detailItems = useMemo<DescriptionsItemType[]>(() => {
    const result: DescriptionsItemType[] = [];

    if (!isArray(items) || items?.length === 0) return result;

    (items ?? [])?.forEach((item) => {
      if (!item || item.hidden) return;

      const { itemConfig, detailConfig } = dispatchItemConfig(
        item,
        memoizedDataSource,
      );

      result.push({
        ...itemConfig,
        children: (
          <DetailItem dataSource={memoizedDataSource} {...detailConfig} />
        ),
      });
    });

    return result;
  }, [items]);

  return (
    <DynamicContainer
      id={componentId}
      style={{ ...style }}
      className={`${prefixCls} ${className && className}`}
      hasCardContainer={hasCardContainer}
      CustomContainer={props.container}
    >
      <Descriptions
        colon={colon}
        column={column}
        title={detailTitle}
        items={detailItems}
        layout={layout}
        labelStyle={{
          ...DETAIL_LABEL_STYLE,
          ...labelWidthStyle,
          ...labelStyle,
        }}
        {...props}
      ></Descriptions>
    </DynamicContainer>
  );
};

export default React.memo(DetailInstance);
