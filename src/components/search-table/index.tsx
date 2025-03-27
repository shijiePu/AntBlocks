import { Form } from 'antd';
import React, { FC, useMemo } from 'react';

import TechCard from '../card';
import TechForm from '../form';
import TechPageTitle from '../page-title';
import TechTable from '../table';

import { SearchTableProps } from './types';

import useSearchTable from '@szhz/tech-pc/hooks/useSearchTable';

const mockRequest = async () => {
  return {
    dataSource: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
  };
};

const TechSearchTable: FC<SearchTableProps> = ({
  title,
  titleAction,
  titleProps,
  service,
  form,
  searchItems,
  columns,
  serviceProps,
  tableTitle,
  tableTitleProps,
  tableProps,
  tableTitleAction,
  dispatchParams,
  handleDataSource,
  formProps,
}) => {
  const [searchForm] = Form.useForm();

  const formInstance = useMemo(() => {
    return form ?? searchForm;
  }, [searchForm, form]);

  const serviceInstance = useMemo(() => {
    return service ?? mockRequest;
  }, [service]);

  const { getPageData, dataSource, handleReset, pagination } = useSearchTable({
    // 接口地址需自定义
    requestFn: serviceInstance,
    form: formInstance,
    serviceProps,
    dispatchParams,
  });

  const tableData = useMemo(() => {
    return handleDataSource ? handleDataSource(dataSource) : dataSource;
  }, [handleDataSource, dataSource]);

  return (
    <>
      <TechPageTitle {...titleProps} actionNode={titleAction}>
        {title}
      </TechPageTitle>
      <TechForm.Search
        items={searchItems}
        form={form}
        onFinish={getPageData}
        onReset={handleReset}
        {...formProps}
      ></TechForm.Search>

      <TechCard>
        <TechPageTitle
          type="table"
          {...tableTitleProps}
          actionNode={tableTitleAction}
        >
          {/** @ts-ignore */}
          {tableTitle ?? `查询结果（共${pagination?.total || 0}条）`}
        </TechPageTitle>
        <TechTable
          isSeq
          columns={columns}
          dataSource={tableData}
          pagination={pagination}
          {...tableProps}
        ></TechTable>
      </TechCard>
    </>
  );
};

export default TechSearchTable;
