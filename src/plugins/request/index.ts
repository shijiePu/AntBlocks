import { loginOut } from '@szhz/tech-pc/utils/common';
import { message } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { set } from 'lodash-es';
import { requestForm, requestGet, requestPost, requestUpload } from './request';
import { ResponseStructure } from './types';

// 获取页面的token，前置拦截器中使用
const getToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = localStorage?.getItem('token') || '';

  if (token) {
    set(config, 'headers.Authorization', token);
  }

  return config;
};

// token过期之后的方法
const tokenFailure = (response: ResponseStructure<any>) => {
  message.error(response.msg);
  message.destroy();
  return loginOut()
};

export {
  getToken, requestForm, requestGet, requestPost, requestUpload, tokenFailure
};
