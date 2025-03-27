import { SearchOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Input, Select, Table } from "antd";
import React, { useState } from "react";

import { querySystem } from "@szhz/tech-pc/service/register";

import "./index.less";


export interface HelpCenterProps {
  gotoDetail?: (info: any) => void;
  state: any
  showSearchSelect?: boolean
  system?: string
}

const HelpCenter: React.FC<HelpCenterProps> = ({ gotoDetail, state, showSearchSelect = false, system }) => {
  const { project } = state || {};
  const [belongSystem, setBelongSystem] = useState(project ? project.split(',') : []);
  const [searchWord, setSearchWord] = useState('');
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10
  });

  // 政策咨询查询
  const { data } = useRequest(
    async () => {
      setLoading(true)
      const res = await querySystem({
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
        title: searchWord,
        associatedSystem: system ?? (belongSystem.length
          ? belongSystem.join(',')
          : '1,2,3,4,5')
      }).finally(() => setLoading(false))

      return res;
    },
    {
      refreshDeps: [searchWord, belongSystem, pagination, system],
      debounceWait: 300,
    },
  );

  const belongSystemLabel = {
    1: '科技计划',
    2: '高新技术企业',
    3: '科学技术奖励',
    4: '科技咨询专家库',
    5: '高企专家库',
  }

  // 搜索查询前缀
  const selectBefore = (
    <Select
      onChange={(v) => {
        setBelongSystem(v)
      }}
      allowClear
      value={belongSystem}
      style={{ minWidth: 296 }}
      popupMatchSelectWidth={false}
      mode="multiple"
      placeholder="请选择"
    >
      {/* <Select.Option value="">全部</Select.Option> */}
      <Select.Option value="1">{belongSystemLabel['1']}</Select.Option>
      <Select.Option value="2">{belongSystemLabel['2']}</Select.Option>
      <Select.Option value="3">{belongSystemLabel['3']}</Select.Option>
      <Select.Option value="4">{belongSystemLabel['4']} </Select.Option>
      <Select.Option value="5">{belongSystemLabel['5']}</Select.Option>
    </Select>
  );


  return <div className={'help-center-wrapper'}>
    <div className={'content'}>
      <div className={'search'}>
        <Input
          onChange={(val) => {
            setSearchWord(val?.target?.value);
          }}
          allowClear
          placeholder="请输入文档名称关键词"
          addonBefore={showSearchSelect ? selectBefore : null}
          style={{ minWidth: 500 }}
          suffix={
            <SearchOutlined
              style={{
                color: '#4759c5',
              }}
            />
          }
        />
      </div>
      <Table
        pagination={{
          current: pagination.pageNum,
          pageSize: pagination.pageSize,
          total: (data as any)?.totalSize,
          showSizeChanger: true,
          showTotal: (total: number) => `共 ${total} 条`,
          onChange: (pageNum: any, pageSize: any) => {
            setPagination((pre) => {
              return { ...pre, ...{ pageNum, pageSize } };
            });
          },
          showQuickJumper: true,
        }}
        loading={loading}
        dataSource={(data as any)?.dataList ?? []}
        className={'table'}
        showHeader={false}
        columns={[
          {
            title: '标题',
            key: 'title',
            dataIndex: 'title',
            render: (val, record: any) => {
              return <a onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                gotoDetail && gotoDetail({
                  id: record.id,
                  searchWord,
                  project: system ?? (belongSystem.length
                    ? belongSystem.join(',')
                    : '1,2,3,4,5')
                })
              }
              }>{val}</a>
            }
          },
          {
            title: '系统',
            key: 'associatedSystemName',
            dataIndex: 'associatedSystemName',
          },
          {
            title: '发布时间',
            key: 'publishTime',
            dataIndex: 'publishTime',
          },
        ]}>
      </Table>
    </div>
  </div>
}

export default HelpCenter