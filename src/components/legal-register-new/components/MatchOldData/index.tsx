import { TechDetail } from "@szhz/tech-pc";
import { LEGAL_UNIT_INFO, getLEGAL_UNIT_INFO_COLUMNS } from '@szhz/tech-pc/components/com-pages-utils/register';
import { Alert, Button } from "antd";
import React, { useState } from "react";
import FormStep from './Steps';

export interface IndexProps {
  message?: string;
  className?: string;
  oldSystemUserInfoMap?: any;
  isRegistry?: boolean;
  refresh?: () => void
}

const Index: React.FC<IndexProps> = ({ message, oldSystemUserInfoMap, isRegistry = true, refresh }) => {
  const [showStep, setShowStep] = useState(false)

  const infoItems = getLEGAL_UNIT_INFO_COLUMNS();

  return <>
    {/* <p className={styles.title}>老用户关联历史账号</p> */}
    {showStep ? <FormStep refresh={refresh} isRegistry={isRegistry} oldSystemUserInfoMap={oldSystemUserInfoMap} ></FormStep> : <div>
      <TechDetail
        title=""
        labelStyle={{ minWidth: 140, maxWidth: 140 }}
        dataSource={LEGAL_UNIT_INFO}
        // @ts-ignore
        items={infoItems}
        column={1}
      ></TechDetail>
      <Alert type="info" closable={false} message={message}></Alert>
      <div style={{ marginTop: 24, textAlign: 'right' }}>
        <Button type="primary" onClick={() => setShowStep(true)}>下一步</Button></div>
    </div>
    }
  </>
}

export default Index
