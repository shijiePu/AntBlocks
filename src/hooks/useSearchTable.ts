import { useRequest } from 'ahooks';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { FormInstance, TablePaginationConfig } from 'antd';
import { useCallback, useEffect, useMemo } from 'react';

interface useSearchTableProps {
  requestFn: (data?: any) => Promise<any>;
  form: FormInstance<any>;
  extraParams?: Record<string, any>;
  dispatchParams?: (params?: any) => any;
  serviceProps?: Options<any, any>;
}

interface useSearchTableReturnType {
  getPageData: (params?: any) => void;
  handleReset: () => void;
  dataSource: any[];
  pagination?: false | TablePaginationConfig | undefined | any;
  tableData: {
    pageNum?: number | undefined;
    pageSize?: number | undefined;
    total?: number | undefined;
    dataSource?: any[];
  };
  loading?: boolean;
}
function useSearchTable({
  requestFn,
  form,
  extraParams,
  dispatchParams,
  serviceProps,
}: useSearchTableProps): useSearchTableReturnType {
  const {
    run: getListData,
    data: resultData = {} as any,
    loading,
  } = useRequest(requestFn, {
    manual: true,
    ...serviceProps,
  });

  // 获取页面数据
  const getPageData = useCallback(
    (params = {}) => {
      const options = form?.getFieldsValue() ?? {};

      const paramsData = {
        pageNum: 1,
        pageSize: 10,
        ...(extraParams || {}),
        ...options,
        ...params,
      };

      const requestParams = dispatchParams
        ? dispatchParams?.(paramsData)
        : paramsData;

      getListData(requestParams);
    },
    [form, extraParams, dispatchParams, getListData],
  );

  // 重置数据
  const handleReset = () => {
    form.resetFields();
    getPageData();
  };

  useEffect(() => {
    getPageData();
  }, [serviceProps?.ready]);

  /**
   * @deprecated 已废弃，已拆解为 dataSource, pagination,
   */
  const tableData = useMemo(() => {
    if (!resultData) return {};

    return {
      pageNum: resultData?.pageNum,
      pageSize: resultData?.pageSize,
      total: resultData?.totalSize,
      dataSource: resultData?.dataList,
    };
  }, [resultData]);

  // 表格相关数据
  const dataSource = useMemo(() => {
    if (!resultData) return [];

    return resultData?.dataList ?? [];
  }, [resultData]);

  const onChange = (pageNum: number, pageSize: number) => {
    getPageData({ pageNum, pageSize });
  };

  // 分页相关配置
  const pagination = useMemo(() => {
    if (!resultData) return false;

    return {
      pageNum: resultData?.pageNum,
      pageSize: resultData?.pageSize,
      total: resultData?.totalSize,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number) => `共 ${total} 条`,
      onChange,
    };
  }, [resultData]);

  return {
    getPageData,
    dataSource,
    handleReset,
    pagination,
    tableData,
    loading,
  };
}

export default useSearchTable;
