import React, { CSSProperties, FC, useEffect, useMemo } from 'react';
import './index.less';

import { getPrefixCls, getStyle } from '@szhz/tech-pc/utils';
import RenderIcon from './components/render-icon';
import RenderTitle from './components/render-title';
import RenderValue from './components/render-value';
import { TechCardPickerItem, TechCardPickerProps } from './types';

const TechCardPicker: FC<TechCardPickerProps> = ({
  dataSource,
  valueColor = '#2d7af7',
  onChange,
  defaultActiveKey,
  valAnimate = false,
  titleLimit = 4,
  ...props
}) => {
  const prefixCls = getPrefixCls('card');
  const [activeKey, setActiveKey] = React.useState<string | number>(0);

  const valueFontColor = useMemo(() => {
    return getStyle('color', valueColor) as { color: CSSProperties['color'] };
  }, [valueColor]);

  /**
   * 处理click事件触发onChange事件
   * @param data
   * @returns
   */
  const handleClick = (data: TechCardPickerItem) => {
    if (!data?.key) return;

    setActiveKey(data.key);

    onChange?.(data.key, data);
  };

  /**
   * 初始化activeKey
   * @returns
   */
  const initActiveKey = () => {
    if (defaultActiveKey) {
      setActiveKey(defaultActiveKey);
      return;
    }

    if (dataSource?.length) {
      setActiveKey(dataSource[0]?.key);
    }
  };

  useEffect(() => {
    initActiveKey();
  }, [defaultActiveKey]);

  return (
    <div className={prefixCls} {...props}>
      {dataSource?.map((item) => {
        const activeCls =
          activeKey === item?.key ? `${prefixCls}-item-active` : '';

        return (
          <div
            key={item.key}
            data-key={item.key}
            style={{ ...(item?.style || {}) }}
            className={`${prefixCls}-item  ${activeCls} `}
            onClick={() => handleClick(item)}
          >
            <div className={`${prefixCls}-item-left`}>
              <RenderIcon icon={item?.icon} prefixCls={prefixCls}></RenderIcon>

              <RenderTitle
                limit={titleLimit}
                title={item?.title}
                prefixCls={prefixCls}
              ></RenderTitle>
            </div>

            <RenderValue
              value={item?.value}
              prefixCls={prefixCls}
              valAnimate={valAnimate}
              valueFontColor={valueFontColor}
            ></RenderValue>
          </div>
        );
      })}
    </div>
  );
};

export default TechCardPicker;
