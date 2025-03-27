import { Table } from 'antd';
import React, { FC, useContext, useMemo } from 'react';

import { ConfigContext } from '../config-provider';

import {
  TechColumnsType,
  TechTableProps,
  TechTextEllipsis,
} from '@szhz/tech-pc';
// todo 序号

// table cell 超出长度样式设置展示...
const cellStyle = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  display: 'block',
};

const TechTable: FC<TechTableProps> = ({
  isSeq,
  current,
  pageSize,
  columns,
  ...props
}) => {
  const { globalDict } = useContext(ConfigContext);

  const getDictDataByKey = useMemo(
    () => (dictKey?: string | number) => {
      if (!dictKey) return null;

      return globalDict?.[dictKey];
    },
    [globalDict],
  );

  // 获取序号
  const getColumnsSeq = (
    isSeq?: boolean,
    current?: number,
    pageSize?: number,
  ) => {
    return isSeq
      ? [
          {
            title: '序号',
            dataIndex: '',
            width: 80,
            render: (_: any, __: any, index: number) => {
              if (!!current && !!pageSize) {
                return (
                  <div style={{ minWidth: '60px' }}>
                    {(current - 1) * pageSize + (index + 1)}
                  </div>
                );
              } else {
                return <div style={{ minWidth: '60px' }}>{index + 1}</div>;
              }
            },
          },
        ]
      : null;
  };

  // 默认添加table cell单行展示
  const getColumnsNew = (columns: TechColumnsType<any>) => {
    // 是否存在固定列
    const isFixed = columns?.some((item: any) => item.fixed) && props?.scroll;
    return (columns || []).map((col: any) => {
      if (!!col?.render) return { ...col };

      // 控制Tooltip显隐
      function showToolTip(e: any) {
        if (e.target.clientWidth >= e.target.scrollWidth) {
          e.target.style.pointerEvents = 'none'; // 阻止鼠标事件
        }
      }

      return {
        ...col,
        // align:isNumber()
        render: (t: any) => {
          let text =
            typeof t === 'object'
              ? '-'
              : t === 0 || t === null || t === undefined || t === ''
              ? '-'
              : t; // fix:当columns中没有设置dataIndex render方法会获取record对象 判断为0 或者为 空
          // 存在全局字典映射
          if (col?.dictKey) {
            const dictData = getDictDataByKey(col?.dictKey);

            text = dictData?.[text] || text;
          }
          // @ts-ignore
          if (!!col?.maxChars) {
            return (
              <TechTextEllipsis.Single
                // @ts-ignore
                maxChars={col?.maxChars || 12}
                text={`${text}`} // fix: 数字0
              />
            );
          }

          return (
            // <Tooltip
            //   title={`${text}`}
            //   // @ts-ignore
            //   onMouseEnter={showToolTip}
            // >
            //   <span
            //     style={
            //       col?.width
            //       ? { ...cellStyle, width: !isFixed ? col?.width : '' }
            //         : { width: !isFixed ? col?.width : '' }
            //     }
            //   >
            //     {text}
            //   </span>
            // </Tooltip>
            <>{text}</>
          );
        },
      };
    });
  };

  const columnsCell = useMemo(() => {
    if (!columns) return [];

    // 获取序号
    let columnsSeq = getColumnsSeq(isSeq, current, pageSize);
    // 默认添加table cell单行展示
    let columnsNew = getColumnsNew(columns);

    return !!columnsSeq ? columnsSeq.concat(columnsNew) : columnsNew;
  }, [columns, globalDict]);

  return (
    <Table
      {...props}
      columns={columnsCell || []}
      pagination={props?.pagination || false}
    />
  );
};

export default TechTable;
