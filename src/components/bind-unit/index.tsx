import { TechCard, TechConfirm, TechNoData, TechPageTitle, TechSpinLoading } from '@szhz/tech-pc';
import AssociateHistoryAccount from '@szhz/tech-pc/components/person-register/components/associateHistoryAccount';
import { bindUnit, getBindList, setDefaultUnit, unbindUnit } from '@szhz/tech-pc/service/bind-unit';
import { Button, Col, Collapse, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

import Modal from './Modal';

const STATUS_MAP: any = {
  1: {
    color: 'success',
    text: '已加入'
  },
  2: {
    color: 'processing',
    text: '申请中'
  },
  3: {
    color: 'error',
    text: '已拒绝'
  }
}

const Items = ({ list, run, status }: any) => {
  const [loading_exit, setLoading_exit] = useState(false);
  const [loading_again, setLoading_again] = useState(false);
  const [loading_default, setLoading_default] = useState(false);
  return <Row gutter={16}>
    {
      list?.length ? list?.map((item: any) => {
        return <Col className="gutter-row" span={12}>
          <TechCard style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>
              {item?.ifDefault && <Tag style={{ position: 'absolute', top: 0, left: 0 }} color='purple'>默认单位</Tag>}
              <div style={{ marginLeft: 0, display: 'flex', gap: 12, flexDirection: 'column' }}>
                <a>{item?.orgName || '--'}</a>
                <div>{item?.unifiedSocialCreditCode || '--'}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Tag color={STATUS_MAP?.[item?.status]?.color}>{STATUS_MAP?.[item?.status]?.text}</Tag>
                <div style={{ display: 'flex', gap: 4 }}>
                  {item?.status === 1 && !item?.ifDefault &&
                    <TechConfirm
                      title="确认设为默认单位吗"
                      description={null}
                      confirm={async () => {
                        try {
                          setLoading_default(true);
                          await setDefaultUnit({ id: item.id });
                          run();
                        } finally {
                          setLoading_default(false);
                        }
                      }}
                    >
                      <Button type="link" style={{ padding: 0 }} loading={loading_default}>设为默认</Button>
                    </TechConfirm>
                  }
                  {item?.status === 1 && (!item?.ifDefault || list?.length === 1) &&
                    <TechConfirm
                      title="确认退出吗"
                      description={null}
                      confirm={async () => {
                        try {
                          setLoading_exit(true);
                          await unbindUnit({ unitId: item.unitId });
                          run();
                          sessionStorage.removeItem('currentUnitInfo');
                          window.location.reload();
                        } finally {
                          setLoading_exit(false);
                        }
                      }}
                    >
                      <Button type="link" style={{ color: 'red', padding: 0 }} loading={loading_exit}>退出</Button>
                    </TechConfirm>
                  }
                  {item?.status === 3 &&
                    <TechConfirm
                      title="确认再次申请吗"
                      description={null}
                      confirm={async () => {
                        try {
                          setLoading_again(true);
                          await bindUnit({ unitId: item.unitId, position: item.position, dept: item.dept });
                          run();
                        } finally {
                          setLoading_again(false);
                        }
                        run();
                      }}
                    >
                      <Button type="link" style={{ padding: 0 }} loading={loading_again}>再次申请</Button>
                    </TechConfirm>
                  }
                </div>
              </div>
            </div>
          </TechCard>
        </Col>
      })
        : <TechNoData
          text={`暂无${STATUS_MAP?.[status]?.text}单位`}
          style={{ height: '100px' }}
          type="middle"
        />
    }
  </Row>
}

type Props = {
  firstBind: any
  onFinish?: any
}
const VerificationModal = ({ firstBind, onFinish }: Props) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await Promise.all([getBindList({ bindRelStatus: [1] }), getBindList({ bindRelStatus: [2] }), getBindList({ bindRelStatus: [3] })])
      setData(res)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const items = [
    {
      key: '1',
      label: '已加入单位',
      children: <Items list={data[0] || []} run={getData} status={1} />,
    },
    {
      key: '2',
      label: '申请中单位',
      children: <Items list={data[1] || []} run={getData} status={2} />,
    },
    {
      key: '3',
      label: '已拒绝单位',
      children: <Items list={data[2] || []} run={getData} status={3} />,
    },
  ];

  return firstBind ? (
    <Modal onFinish={onFinish} firstBind={true} />
  ) : (
    <TechSpinLoading spinning={loading} tip="加载中">
      <TechPageTitle
        goBack={false}
        actionNode={<div style={{ display: 'flex', justifyContent: 'end', gap: 12 }}>
          <Modal
            firstBind={false}
            onFinish={getData} />
          <AssociateHistoryAccount userType="person">
            <Button type="primary">关联历史账号</Button>
          </AssociateHistoryAccount>
        </div>}>
        绑定单位
      </TechPageTitle>
      <div style={{ marginTop: '16px' }}>
        <Collapse items={items} defaultActiveKey={['1']} />
      </div>
    </TechSpinLoading>
  )
};

export default VerificationModal;
