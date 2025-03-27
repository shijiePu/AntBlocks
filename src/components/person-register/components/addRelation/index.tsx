import { Button, Modal } from "antd";
import React, { Children, cloneElement, isValidElement, useState } from "react";

import {
  TechCard
} from '@szhz/tech-pc';
import MatchDesc from '@szhz/tech-pc/components/com-pages-componnets/MatchDesc';
import OldSteps from '@szhz/tech-pc/components/person-register-new/components/OldSteps';
import './index.less';

export interface AddRelationProps {
  children: React.ReactNode;
  refresh: () => void
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

const AddRelation: React.FC<AddRelationProps> = ({ children, refresh }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
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
      <Shell title="老用户关联历史账号" descStatus="old"><OldSteps refresh={handleRefresh} isRegistry={false} /></Shell>
    </Modal>
  </>
}

export default AddRelation