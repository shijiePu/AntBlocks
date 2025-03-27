import { InfoCircleOutlined } from "@ant-design/icons";
import { getDeptListByName } from "@szhz/tech-pc/service/register";
import { Modal, Select } from "antd";
import React, { useEffect, useState } from "react";

export interface UnitSelectProps {

}

const UnitSelect: React.FC<UnitSelectProps> = (props) => {
  const [deptData, setDeptData] = useState([])

  const getDeptData = async (value: string) => {
    let res = await getDeptListByName({ unitName: value });
    let data = (res || []).map((i: any) => ({
      value: `${i.id}`,
      label: `${i.unitName}`,
    }));
    setDeptData(data);
  };

  useEffect(() => {
    getDeptData('')
  }, [])

  return <>

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
      <Select
        {...props}
        showSearch={true}
        placeholder="请选择账号所在单位"
        options={deptData}
        optionFilterProp="label"
        // onSearch={(val) => {
        //   getDeptData(val);
        // }}
      /><span style={{ minWidth: 184 }}><InfoCircleOutlined /><a style={{ marginLeft: 6 }} onClick={() => {
        Modal.confirm({
          width: 600,
          title: '搜索不到单位怎么办？',
          // okText: '知道了',
          closable: true,
          // cancelText: '',
          footer: null,
          content: <>
            <div>
              <p>1、联系公司管理员注册苏服码并登录科技计划系统。</p>
              苏服码注册地址： <a target='_blank' href="https://jms.jszwfw.gov.cn/jpaas-jis-peruser-server/static/coruser/register/pages/registermethod.html" rel="noreferrer">https://jms.jszwfw.gov.cn/jpaas-jis-peruser-server/static/coruser/register/pages/registermethod.html</a></div>
            <p></p>
            <div>2、单位登录后，可通过成员管理功能添加个人用户。个人用户也可独立登录系统并申请绑定至目标单位，但该绑定请求需经企业审核通过后方能生效。</div>
          </>,
        })
      }}>搜索不到单位怎么办？</a></span>
    </div>
  </>
}

export default UnitSelect
