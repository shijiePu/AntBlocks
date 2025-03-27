import { Checkbox } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import pt1 from './img/1.png';
import pt2 from './img/2.png';
import pt3 from './img/3.png';
import checked from './img/checked.png';
import unchecked from './img/unchecked.png';

import useGetDict from '@szhz/tech-pc/hooks/useGetDictData';
import './index.less';

// const DICT = {
//   legal: {
//     '1': '江苏省科技计划管理信息平台',
//     '2': '科学技术奖励',
//     '3': '高新企业技术认定'
//   },
//   person: {
//     '1': '江苏省科技计划管理信息平台',
//     '2': '科学技术奖励',
//   }
// }

// value 已选系统的数据 onChange 选项选中状态变化时回跳函数 type: 'legal' | 'person'
export default forwardRef(({
  value = [],
  onChange,
  type
}: any, ref) => {
  const { dictData: BizSystemTypeEnum } = useGetDict({ dictKey: 'BizSystemTypeEnum' });
  const { dictData: BizSystemTypeForUserEnum } = useGetDict({ dictKey: 'BizSystemTypeForUserEnum' });
  console.log(BizSystemTypeEnum, BizSystemTypeForUserEnum);
  const DICT: any = {
    legal: BizSystemTypeEnum ||
    {
      '1': '江苏省科技计划管理信息平台',
      '2': '科学技术奖励',
      '3': '高新企业技术认定'
    },
    person: BizSystemTypeForUserEnum ||
    {
      '1': '江苏省科技计划管理信息平台',
      '2': '科学技术奖励',
    },
  }
  const BIZS = DICT[type]

  const [data, setData] = useState<any>([]);
  const imgs: any = {
    1: pt1,
    2: pt3,
    3: pt2
  }

  console.log(data);
  useImperativeHandle(ref, () => ({
    hasSelect: () => {
      return data?.filter((i: any) => (i?.checked)).some((dataItem: any) => Object.keys(BIZS).some(item => item === dataItem.id))
    }
  }));

  useEffect(() => {
    // isNew为false表示匹配上历史数据，不能取消选中，其他情况可以取消选中
    setData(Object.keys(BIZS)?.map((item) => { return { id: item, name: BIZS[item], img: imgs[item], disabled: value?.some((dataItem: any) => dataItem?.id === item && !dataItem.isNew), checked: value?.some((dataItem: any) => dataItem.id === item) } }))
  }, [])

  return (
    <div className={'choose-system-container'}>
      <p className={'title-tip'}>若您拥有多个系统的老账号，请勾选所有对应的系统</p>
      <div className={'items'} style={{ gap: data?.length === 2 ? 120 : 32 }}>
        {
          data?.map((item: any) => {
            return (
              <div className={'item'} key={item.value}>
                <Checkbox
                  disabled={item.disabled}
                  onChange={(e) => {
                    // 更新当前选中/取消选项的checked状态
                    const updatedData = data.map((i: any) => ({
                      ...i,
                      checked: i.id === item.id ? e.target.checked : i.checked
                    }));
                    setData(updatedData);

                    // 1 过滤出选中的选项 2 将新增的选项加入value中
                    const updatedData2 = updatedData?.filter((i: any) => (i?.checked)).map((x: any) => {
                      if (value?.find((k: any) => k.id === x.id)) {
                        return value.find((k: any) => k.id === x.id)
                      } else {
                        return x
                      }
                    });
                    onChange(updatedData2)
                  }}
                  checked={item?.checked}
                >
                  <div className={['card', item?.checked ? 'card_active' : ''].join(' ')} >
                    <div style={{ backgroundImage: `url(${item?.img})`, backgroundSize: 'cover' }} className={'img'}></div>
                    <img src={item?.checked ? checked : unchecked} alt="" className='checked-icon' />
                  </div>
                </Checkbox>
                <div className={'name'}>
                  {item?.name}
                </div>
              </div>
            )
          })
        }
      </div>
    </div >
  )
})
