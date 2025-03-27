import { Button, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';

import ChooseSystem from '../ChooseSystem';

export default ({ type, onOk, value }: any) => {
  const [vis, setVis] = useState(false);
  const [d, setD] = useState([])
  const chooseSystemRef = useRef<any>()
  const disabledNum = type === 'legal' ? 3 : 2
  return (
    <>
      <Button
        disabled={value?.length === disabledNum}
        type="primary"
        style={{ marginBottom: 10 }}
        onClick={() => { setVis(true) }}
      // onClick={() => addGroup({ name: '系统2', isNew: true, members: [] })}
      >
        添加关联系统
      </Button>
      {
        vis && <Modal
          width={640}
          open={vis}
          onOk={() => {
            const hasSelect = chooseSystemRef.current?.hasSelect()
            if (!hasSelect) {
              message.warning('请选择关联系统')
              return
            }
            // d.length === 0表示本次未进行任何选择操作，但上一次可能已经选择过
            if (d.length === 0) {
              setVis(false)
              return
            }

            onOk(d);

            setD([]);
            setVis(false)
          }}
          onCancel={() => { setD([]); setVis(false) }}
          title="添加关联系统"
        >
          <ChooseSystem
            ref={chooseSystemRef}
            onChange={(d: any) => { setD(d) }}
            // value={[{ value: '1', label: '系统1' }]}
            value={value}
            type={type}
          ></ChooseSystem>
        </Modal>
      }

    </>

  )
}
