import { irsDicQueryAllByGet } from '@szhz/tech-pc/service/user';
import { keys } from 'lodash-es';
import React, { FC, useEffect, useState } from 'react';
import { ConfigContext } from './contexts';
import { TechConfigProviderType } from './types';

/**
 * 获取异步的数据
 * @param fetch
 * @returns
 */
async function getFetchData<T>(fetch: () => Promise<any>): Promise<T> {
  const result = await fetch();
  if (!result) return {} as any;

  return result;
}

const TechConfigProvider: FC<TechConfigProviderType> = ({
  dictionaryMap,
  useLocal,
  dictCustomFetch,
  uploadUrl,
  children,
}) => {
  const [globalDict, setGlobalDict] = useState<any>({});

  // 获取全局字典值
  const getGlobalDict = async () => {
    if (useLocal) {
      const result = await getFetchData(dictCustomFetch ?? irsDicQueryAllByGet);

      setGlobalDict(result);
      return;
    }

    if (!dictionaryMap) return;

    if (keys(dictionaryMap)?.length) {
      setGlobalDict(dictionaryMap);
      return;
    }

    setGlobalDict({});
  };

  useEffect(() => {
    getGlobalDict();
  }, [dictionaryMap, useLocal]);

  return (
    <ConfigContext.Provider value={{ globalDict, uploadUrl }}>
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigContext };

export default TechConfigProvider;
