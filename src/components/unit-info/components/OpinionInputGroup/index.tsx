import { Input } from 'antd';
import { isString } from 'antd/es/button';
import { isArray, keys } from 'lodash-es';
import React, { FC, memo, useContext, useEffect, useMemo, useState } from 'react';
// import { useSnapshot } from 'valtio';

// import appStore from '@/store/app';

import { ConfigContext } from '@szhz/tech-pc/components/config-provider/contexts';

interface OpinionInputGroupProps {
  value?: string;
  onChange?: (value: any) => void;
  entData?: string[] | string;
  edit?: boolean;
}

const OpinionInputGroup: FC<OpinionInputGroupProps> = (props) => {
  const { value, onChange, entData: entOpinionData, edit } = props;
  const { globalDict } = useContext(ConfigContext);
  // const appState = useSnapshot(appStore.state);
  // const { globalDict } = appState;

  const [inputValue, setInputValue] = useState<any>({});

  const entData = useMemo(() => {
    if (!entOpinionData) return [];

    if (isArray(entOpinionData)) return entOpinionData;

    return entOpinionData.split(',');

    // if (entOpinionData?.includes(',')) return entOpinionData.split(',');

    // return [];
  }, [entOpinionData]);

  const opinionsList = useMemo(() => {
    return keys(globalDict?.enterRecognizeSituation) ?? [];
  }, [globalDict]);

  const handleInputChange = (value: string, key: string) => {
    const inputData = { ...inputValue, [key]: value };

    setInputValue(inputData);

    const inputValList = entData?.map((key: string) => {
      return inputData[key];
    });

    const result = inputValList?.length ? inputValList.join(',') : '';

    onChange?.(result);
  };

  const initData = () => {
    if (!value?.length) return;
    let data: any = value;
    let d: any = [];
    let o: any = {};

    if (isString(value) && value.includes(',')) {
      data = value.split(',');
    }

    entData?.forEach((key: string, index: number) => {
      if (Object.keys(inputValue).length !== 0) {
        d?.push(inputValue[key])
        o[key] = inputValue[key];
      } else {
        o[key] = data[index];
      }
    });
    setInputValue(o);
    if (Object.keys(inputValue).length !== 0) {
      onChange?.(d.join(','));
    }
  };

  useEffect(() => {
    console.log(value, entData, 'value');
    initData();
  }, [entData]);

  const renderInput = useMemo(() => {
    return (
      <>
        {opinionsList.map((item) => {
          if (!entData?.includes(item)) {
            return <div key={item} style={{ width: '22%' }}></div>;
          }

          return (edit ?
            <Input
              maxLength={50}
              key={item}
              value={inputValue[item]}
              onChange={(e) => handleInputChange(e.target.value, item)}
              placeholder="请输入认定证书编号"
              style={{ width: '22%' }}
            ></Input>
            : <span style={{ color: 'rgba(0, 0, 0, 0.25)', width: '22%' }}>{inputValue[item]}</span>
          )
        })}
      </>
    );
  }, [entData, inputValue]);

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'inline-flex',
          justifyContent: 'space-around',
        }}
      >
        {opinionsList?.length ? renderInput : ''}
      </div>
    </>
  );
};

export default memo(OpinionInputGroup);
