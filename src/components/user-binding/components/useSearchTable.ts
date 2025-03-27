import { useRequest } from 'ahooks';
import { FormInstance } from 'antd';
import { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';

interface useSearchTableProps {
  requestFn: (data?: any) => Promise<any>;
  form: FormInstance<any>;
  extraParams?: Record<string, any>;
  manual?: boolean;
  dispatchParams?: (params?: any) => any;
}
export default function useSearchTable({
  requestFn,
  form,
  extraParams,
  manual = true,
  dispatchParams,
}: useSearchTableProps) {
  const { run: getListData, data: dataSource = {} as any,loading } = useRequest(
    requestFn,
    {
      manual,
    },
  );

  const getPageData = (params = {}) => {
    const options = form.getFieldsValue();
    // options.bindDate = options.bindDate ? dayjs(options.bindDate).format('YYYY-MM-DD') : '';
    
    console.log('options',options)
    const paramsData = {
      pageNum: 1,
      pageSize: 10,
      ...(extraParams || {}),
      ...options,
      ...params,
    };

    if( paramsData.bindDate){
      paramsData.bindDate = dayjs(paramsData.bindDate).format('YYYY-MM-DD')
    }

    const requestParams = dispatchParams
      ? dispatchParams?.(paramsData)
      : paramsData;

    getListData(requestParams);
  };

  const handleReset = () => {
    form.resetFields();
    getPageData();
  };

  useEffect(() => {
    getPageData();
  }, []);

  const tableData = useMemo(() => {
    if (!dataSource) return {};

    return {
      pageNum: dataSource?.pageNum,
      pageSize: dataSource?.pageSize,
      total: dataSource?.totalSize,
      dataSource: dataSource?.dataList,
    };
  }, [dataSource]);

  return {
    getPageData,
    tableData,
    handleReset,
    loading
  };
}
