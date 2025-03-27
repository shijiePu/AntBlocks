import {
  TechCard,
  TechTabs
} from '@szhz/tech-pc';
import MatchDesc from '@szhz/tech-pc/components/com-pages-componnets/MatchDesc';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

import NewSteps from './components/NewSteps';
import OldSteps from './components/OldSteps';
import './index.less';

const Shell = ({ title, children, descStatus }: any) => {
  return <div className={'center'}>
    <TechCard>
      <p className={title}>{title}</p>
      {children}
    </TechCard>
    <div className={'tip'}>
      <MatchDesc status={descStatus} type="person"></MatchDesc>
    </div>
  </div>
};

const PersonRegisterNew = () => {
  const [activeKey, setActiveKey] = useState('old');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [targetKey, setTargetKey] = useState<any>(null);

  useEffect(() => {
  }, []);

  const handleTabChange = (key: any) => {
    if (activeKey !== key) {
      // 如果目标是【我是新用户，完善信息】并且当前不是这个tab，则显示确认对话框
      setTargetKey(key);
      setIsModalVisible(true);
    } else {
      // 否则直接切换tab
      setActiveKey(key);
    }
  };

  const handleConfirm = () => {
    // 用户点击确认后，关闭对话框并切换到目标tab
    setIsModalVisible(false);
    setActiveKey(targetKey);
  };

  const handleCancel = () => {
    // 用户点击取消后，仅关闭对话框
    setIsModalVisible(false);
  };

  const items = [
    {
      key: 'old',
      label: '我是平台老用户，关联历史账号',
      children: <Shell title="老用户关联历史账号" descStatus="old"><OldSteps /></Shell>
    },
    {
      key: 'new',
      label: '我是新用户，完善信息',
      children: <Shell title="新用户补充信息" descStatus="new"><NewSteps /></Shell>,
    }
  ];

  return (
    <div className={'person-register-new-container'}>
      <TechTabs destroyInactiveTabPane items={items} type="card" activeKey={activeKey} onChange={handleTabChange}></TechTabs>
      <Modal
        title="温馨提示"
        visible={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <p>是否离开当前填写页面，切换后当前填写信息将不会被保留。</p>
      </Modal>
    </div>
  );
};

export default PersonRegisterNew;
