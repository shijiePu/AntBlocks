export const validateNonNegativeInteger = (_: any, value: any) => {
  if (!value && value !== 0) {
    if (_?.required) {
      // return Promise.reject('请输入有效的非负整数');
    }
  } else {
    const isNonNegativeInteger = /^(0|[1-9]\d*)$/.test(value); // 正则匹配0和正整数
    if (!isNonNegativeInteger) {
      return Promise.reject('请输入有效的非负整数');
    }
  }
  return Promise.resolve();
};
