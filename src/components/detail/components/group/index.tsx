import {
  createCode,
  PageTitleProps,
  TechDetailGroupProps,
  TechDetailProps,
  TechPageTitle,
} from '@szhz/tech-pc';
import DynamicContainer from '@szhz/tech-pc/components/dynamic-container';
import { isString } from 'antd/es/button';
import { isArray } from 'lodash-es';
import React, { FC, memo, ReactNode, useMemo } from 'react';
import DetailInstance from '../../instance';

const DetailGroup: FC<TechDetailGroupProps> = ({ dataSource, items }) => {
  const memoizedDataSource = useMemo(() => dataSource, [dataSource]);

  // 渲染标题
  const renderTitle = (
    title: string | ReactNode,
    titleProps?: Omit<PageTitleProps, 'title'>,
  ) => {
    if (!title) return '';

    if (isString(title)) {
      return <TechPageTitle {...titleProps}>{title}</TechPageTitle>;
    }

    return title;
  };

  // 渲染详情实例
  const renderGroupDetail = (props: TechDetailProps | undefined) => {
    if (!props) return <></>;

    if (!isArray(props?.items) || !props?.items?.length) return <></>;

    const data = props?.dataSource ?? memoizedDataSource;

    return (
      <DetailInstance
        key={createCode(6)}
        {...props}
        hasCardBg={true}
        dataSource={data ?? {}}
      ></DetailInstance>
    );
  };

  const renderGroup = useMemo(() => {
    if (!items || !Array(items)) return <></>;

    return items.map((item) => {
      const {
        groupTitleProps,
        groupTitle,
        groupContainer,
        groupItems,
        items,
        dataSource,
        itemProps,
        hidden,
      } = item;

      if (hidden) return <></>;

      return (
        <DynamicContainer key={createCode(6)} CustomContainer={groupContainer}>
          {renderTitle(groupTitle, groupTitleProps)}

          {renderGroupDetail({ items, dataSource, ...itemProps })}

          {(groupItems ?? [])?.filter((i: any) => (!i?.hidden))?.map((detailItem) =>
            renderGroupDetail(detailItem),
          )}
        </DynamicContainer>
      );
    });
  }, [items, dataSource]);

  return <>{renderGroup}</>;
};

export default memo(DetailGroup);
