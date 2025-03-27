import TechFile from '@szhz/tech-pc/components/file';
import {
  dispatchCheckboxDictData,
  dispatchDictData,
  getDictMap,
  getPrefixCls,
} from '@szhz/tech-pc/utils';
import { Image } from 'antd';
import { isArray, isNil } from 'lodash-es';
import React, { FC, ReactNode, useContext, useMemo } from 'react';

import { ConfigContext } from '@szhz/tech-pc/components/config-provider/contexts';
import { FALL_BACK_STRING } from '../../constant';
import { DetailItemType, ItemType } from '../../types';

const DetailItem: FC<DetailItemType> = ({
  render,
  type = 'text',
  value,
  dictMap,
  fileProps,
  dictKey,
  dataSource,
  dictReflect = {
    label: 'label',
    key: 'key',
  },
}) => {
  const prefixCls = getPrefixCls('detail');
  const { globalDict } = useContext(ConfigContext);

  const renderValue = useMemo(() => {
    if (render) {
      return (
        <div className={`${prefixCls}-value`}>
          {render(value, dataSource) as ReactNode}
        </div>
      );
    }

    const TYPE_MAP: Record<ItemType, () => ReactNode> = {
      text: () => (isNil(value) ? '-' : value),
      empty: () => '-',
      placeholder: () => '',
      dict: () => {
        const localDictMap = getDictMap({ dictMap, globalDict, dictKey });

        const result = dispatchDictData(localDictMap, value, dictReflect);

        return result;
      },
      file: () => {
        if (isNil(value)) return '-';

        if (!isArray(value))
          return (
            <TechFile.Item
              {...fileProps}
              style={{ color: '#1677ff' }}
              fileData={value}
            ></TechFile.Item>
          );

        return <TechFile.List {...fileProps} fileList={value ?? []} />;
      },
      img: () => {
        return (
          <Image
            style={{
              backgroundColor: 'rgba(8, 16, 30, 0.15)',
              objectFit: 'scale-down',
            }}
            placeholder
            width={88}
            height={88}
            src={value}
            fallback={FALL_BACK_STRING}
          ></Image>
        );
      },
      rangeTime: () => {
        if (!value?.length || value?.length !== 2) return '-';

        const startTime = value?.[0];
        const endTime = value?.[1];

        return `${startTime ?? ''} - ${endTime ?? ''}`;
      },
      checkbox: () => {
        const localDictMap = getDictMap({ dictMap, globalDict, dictKey });

        const result = dispatchCheckboxDictData(
          localDictMap,
          value,
          dictReflect,
        );

        return result;
      },
    };
    return TYPE_MAP[type]();
  }, [
    type,
    value,
    dictMap,
    fileProps,
    dictKey,
    dataSource,
    globalDict,
    render,
  ]);

  return <div className={`${prefixCls}-value`}>{renderValue}</div>;
};

export default React.memo(DetailItem);
