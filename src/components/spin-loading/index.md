---
toc: content
group:
  title: 基础组件
  order: 2
---

# TechSpinLoading 局部加载

## 介绍

### 局部加载組件

```jsx
/**
 * title: 基本使用
 * description: 标题与返回功能
 */
import { Space } from 'antd';
import { TechSpinLoading } from '@szhz/tech-pc';

export default () => {
  return (
    <Space>
      <TechSpinLoading size="middle" />
    </Space>
  );
};
```

<code src='./demos/spin-loading-state.tsx'></code>
