import { ReactNode, useMemo } from 'react';

const useSearchLayout = ({
  columns,
  items,
  prefixCls,
}: {
  columns: number;
  items: ReactNode[] | any[];
  prefixCls: string;
}) => {
  /**
   * @description 动态的占比
   */
  const dynamicSpan = useMemo(() => {
    return 24 / columns;
  }, [columns]);

  /**
   * 计算的操作按钮的偏移量
   */
  const dynamicOffset = useMemo(() => {
    const formItemListLength = items?.length || 0;

    // 处理一行一个占比为1/3的情况
    if (formItemListLength === 1 && columns === 4) {
      return 8;
    }

    const len = Math.ceil(formItemListLength % columns);

    const offset = columns - 1 - len;

    return offset * dynamicSpan;
  }, [items, columns, dynamicSpan]);

  // 当前表单行数
  const lines = useMemo(() => {
    const formItemListLen = items?.length || 0;

    if (formItemListLen < columns) return 1;

    if (formItemListLen === columns) return 2;

    const len = Math.ceil(formItemListLen % columns);

    return len;
  }, [items, columns]);

  const actionAlign = useMemo(() => {
    return `${prefixCls}-action-right`;
  }, [dynamicOffset, items, lines]);

  return {
    actionAlign,
    dynamicOffset,
    dynamicSpan,
  };
};

export default useSearchLayout;
