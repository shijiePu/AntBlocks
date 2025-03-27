import { LoginUserModel } from '@szhz/tech-pc/service/user';
import { ReactNode } from 'react';

export type TechConfigProviderType = {
  // 全部的字典
  dictionaryMap?: Record<string, any>;
  // 自定义字典请求方法
  dictCustomFetch?: () => Promise<any>;
  // 是否为子系统获取数据
  useLocal?: boolean;
  // 上传组件接口地址地址
  uploadUrl?: string;

  children?: ReactNode;
};

export interface ConfigContextProps {
  globalDict?: Record<string, Record<string, any> | any>;
  globalUserInfo?: LoginUserModel;
  uploadUrl?: string;
}
