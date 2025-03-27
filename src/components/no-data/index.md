---
toc: content
group:
  title: 图标
  order: 3
---

# TechNoData 暂无数据

## 介绍

### 暂无数据组件

```jsx
/**
 * title: 基本使用
 * description: 默认type 为 lager
 */

import { TechNoData } from '@szhz/tech-pc';

export default () => {
  return <TechNoData />;
};
```

```jsx
/**
 * title: 设置类型
 * description: 可设置为 large  default small
 */

import { TechNoData } from '@szhz/tech-pc';

export default () => {
  return <TechNoData type="middle" />;
};
```

```jsx
/**
 * title: componentName
 * description: 当该字段为Dropdown，AutoComplete，Cascader，Select等渲染文案
 */

import { TechNoData } from '@szhz/tech-pc';

export default () => {
  return <TechNoData componentName="Select" type="middle" />;
};
```

## API

| 属性名        | 描述       | 类型               | 默认值 |
| ------------- | ---------- | ------------------ | ------ |
| type          | 组件大小   | small middle large | large  |
| text          | 自定义文案 | string             | ''     |
| componentName | 组件名称   | string             | ''     |
