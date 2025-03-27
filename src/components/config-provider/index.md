---
  toc: content
  group:
    title: 配置
    order: 1
---

# TechConfigProvider 全局化配置

### 为组件提供统一的全局化配置，目前支持全局配置字典

<code src="./demos/detail.tsx"></code>

### 全局配置 upload 组件的请求地址

<code src="./demos/uploadUrl.tsx"></code>

## API

| 属性名          | 描述                         | 类型               | 默认值 |
| --------------- | ---------------------------- | ------------------ | ------ |
| dictionaryMap   | 全部字典值                   | Record<string,any> |        |
| dictCustomFetch | 自定义字典请求方法           | Promise<any>       |        |
| uploadUrl       | 自定义文件上传路径           | string             |        |
| useLocal        | 自动请求字典接口无需外部传入 | boolean            | false  |
