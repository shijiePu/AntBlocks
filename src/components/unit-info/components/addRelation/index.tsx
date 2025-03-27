import { Button, Modal } from "antd";
import React, { Children, cloneElement, isValidElement, useState } from "react";

import {
  TechCard,
  TechLoading
} from '@szhz/tech-pc';
import MatchDesc from '@szhz/tech-pc/components/com-pages-componnets/MatchDesc';
import { extractOrgCode, userLegalInfo } from '@szhz/tech-pc/components/com-pages-utils/register';
import MatchOldData from "@szhz/tech-pc/components/legal-register-new/components/MatchOldData";
import OldSteps from '@szhz/tech-pc/components/legal-register-new/components/OldSteps';
import { queryOldSysLegalUserInfo } from '@szhz/tech-pc/service/register';
import './index.less';

export interface AddRelationProps {
  children: React.ReactNode;
  refresh: () => void;
  unifiedSocialCreditCode: string;
}

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

const AddRelation: React.FC<AddRelationProps> = ({ children, refresh, unifiedSocialCreditCode }) => {
  const [open, setOpen] = useState(false)
  const [match, setMatch] = useState(''); // true 匹配到老数据 false 未匹配到老数据
  const [oldUserTipsMsg, setOldUserTipsMsg] = useState('');
  const [oldSystemUserInfoMap, setOldSystemUserInfoMap] = useState({});

  const getOldLegalUserInfo = () => {
    queryOldSysLegalUserInfo({ creditCode: userLegalInfo?.creditCode || unifiedSocialCreditCode, institutionCode: extractOrgCode(userLegalInfo?.creditCode || unifiedSocialCreditCode) }).then((res: any) => {
      setMatch(res?.hasOld);
      setOldUserTipsMsg(res?.tipsMsg)
      setOldSystemUserInfoMap(res?.oldSystemUserInfoMap)
    })
  }

  const handleClick = () => {
    // 判断是否匹配上老数据
    getOldLegalUserInfo()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRefresh = () => {
    handleClose()
    refresh()
  }

  return <>
    {Children.map(children, (child) => {
      // 不是 react 元素，原样返回
      if (!isValidElement(child)) {
        return child
      }

      return cloneElement(child, { onClick: handleClick, ...child.props })
    })}
    <Modal destroyOnClose open={open} width={1050} title={"关联历史账号"} onCancel={handleRefresh} footer={<Button onClick={handleRefresh}>关闭</Button>}>
      {
        match === ''
          ? <TechLoading>匹配数据中</TechLoading>
          : match
            ? <Shell title="老用户关联历史账号" descStatus="old"><MatchOldData isRegistry={false} message={oldUserTipsMsg} oldSystemUserInfoMap={oldSystemUserInfoMap} refresh={handleRefresh} /></Shell>
            : <Shell title="老用户关联历史账号" descStatus="old"><OldSteps isRegistry={false} refresh={handleRefresh} /></Shell>
      }

    </Modal>
  </>
}

export default AddRelation
