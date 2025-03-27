import { Dropdown, Menu, Tag } from "antd";
import React from 'react';

import { CaretDownOutlined } from '@ant-design/icons';
import "./index.less";

function SwitchProducts({ unitList, color = '#fff' }: any) {
  const currentUnitCode = JSON.parse(sessionStorage.getItem("currentUnitInfo") || '{}')?.orgCode;
  const currentUnitName = JSON.parse(sessionStorage.getItem("currentUnitInfo") || '{}')?.orgName;

  const menu = (
    <Menu
      defaultSelectedKeys={[currentUnitCode]}
      style={{ maxHeight: 300, minWidth: 150, overflow: "auto" }}
    >
      {
        unitList.map((item: any) => {
          return (
            <Menu.Item key={item.orgCode}>
              <a
                style={{ display: 'flex' }}
                onClick={() => {
                  if (item.orgCode !== currentUnitCode) {
                    window.sessionStorage.setItem("currentUnitInfo", JSON.stringify(item));
                    window.location.href = `${window.location.origin}/${window.location.pathname?.split('/')[1]}/home`;
                  }
                }}
              >
                <div style={{ width: 50 }}>{item?.ifDefault && <Tag color="success">默认</Tag>}</div>{item.orgName || "--"}
              </a>
            </Menu.Item>
          );
        })
      }
    </Menu>
  );

  return (
    <>
      <div className="lib-change-unit">
        <Dropdown
          overlay={menu}
          placement="bottomRight"
          overlayStyle={{ minWidth: 100, marginTop: 50 }}
        >
          <span style={{ height: '60px', display: 'flex', alignItems: 'center' }}>
            <span className="margin-left-8 text" style={{ color: color }}>
              {currentUnitName || "--"}
            </span>
            <CaretDownOutlined style={{ color: color }} />
          </span>
        </Dropdown>
      </div>
    </>
  );
}

export default SwitchProducts;
