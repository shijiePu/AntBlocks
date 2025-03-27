import { Button, Modal, Popconfirm } from 'antd';
import React, { FC } from 'react';
import { TechConfirmProps } from './types';

const TechConfirm: FC<TechConfirmProps> = (props) => {
  const {
    confirm,
    cancel,
    popConfirmProps,
    buttonProps,
    children,
    type = 'pop',
    text = '删除',
    title = '删除提示',
    description = '是否确认删除该条信息',
    disable = false,
  } = props;

  const confirmFn = () => {
    if (confirm) {
      confirm();
    }
  };

  const cancelFn = () => {
    if (cancel) {
      cancel();
    }
  };

  const handleButtonClick = () => {
    if (disable) return;

    Modal.confirm({
      title,
      okText: '确认',
      cancelText: '取消',
      content: description,
      onOk: confirmFn,
      onCancel: cancelFn,
    });
  };

  if (type === 'modal') {
    return (
      <>
        <div onClick={handleButtonClick}>
          {children ? (
            children
          ) : (
            <Button disabled={disable} type="link" {...buttonProps}>
              {text}
            </Button>
          )}
        </div>
      </>
    );
  }

  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={confirmFn}
      onCancel={cancelFn}
      okText="是"
      cancelText="否"
      disabled={disable}
      {...popConfirmProps}
    >
      {children ? (
        children
      ) : (
        <Button disabled={disable} type="link" {...buttonProps}>
          {text}
        </Button>
      )}
    </Popconfirm>
  );
};

export default TechConfirm;
