<!-- ---
toc: menu
--- -->

<!--
🐞 Bug fix
🚀 New feature
💄 Perf
📝 Docs
⚡️ Code style
🛠 refactor
-->

# 更新日志

## 2.4.83

### TechDetail

- 🚀 添加身份证脱敏  maskKey: 'idCard'

## 2.4.66

### PersonRegister

- 🚀 注册页面调整

## 2.4.65

### PersonRegister

- 🚀 注册页面组件调整

## 2.4.64

### TechUpload

- 🚀 支持修改按钮文案

## 2.4.56

### Order-Center

- 🚀 待办搜索框默认展开

## 2.4.52

### TechFormItem

- 🚀 textarea 区域文本框默认添加一个 autoSize showCount 属性

## 2.4.51

### TechDetail

- 🚀 详情组件 Title 添加属性 hasBottomMargin={false} 之前的 style={{ marginBottom: '0' }}优先级不够

## 2.4.5

### TechTable

- 🚀 表格翻页器默认不展示

### TechForm

- 🚀 items 新增 span 属性，自定义栅格更方便
- 🚀 search 新增 actionCol 自定义操作按钮位置

## 2.4.4

### useSearchTable

## 2.4.33

### TechSelect

- 🚀 优先接收 props 的 option 再 字典

## 2.4.32

### TechUpload

- 🐞 删除上传文件触发文件查看

## 2.4.31

### TechUpload

- 🚀 新增上传后支持查看

## 2.4.3

### TechUpload

- 🐞 修复 single 时，数组数据回显异常问题

### useSearchTable

- 🐞 修复 ready 依赖更新问题

## 2.4.2

### useGetDict

- 🐞 修复 useGetDict hook dict 字段 响应问题

## 2.4.0

### TechSearchTable

- 🚀 新增 搜索表单组件

## 2.3.4

### TechTable

- 🐞 优化 table 组件渲染字典异常问题
- 🐞 修复 upload 异常数据回显问题
- 🐞 修复工单中心查询异常问题

## 2.3.2

### TechOrderCenter

- 🐞 修复回显与筛选异常问题

## 2.3.2

### TechOrderCenter

- 🚀 TechWorkSpace 改为 TechOrderCenter

## 2.3.1

### TechWorkSpace

- 🚀 新增业务组件

## 2.3.0

### TechDetail

- 🚀 组件 detail 组件新增 detailName 属性，支持嵌套数据的回显

### TechUpload

- 🚀 组件 upload 相关新增 single 字段，支持单个数据的设置与回显。
- 🐞 修复回显数据的回显异常问题

### utils

- 🚀 新增 prettyLog 相关方法
- 🚀 新增校验规则的类型中文说明

### TechForm

- 💄 优化 form 组件分发渲染逻辑
- 🚀 組件 form.group 与 form.search 支持 readonly 字段

### TechCheckGroup

- 🚀 新增 数据处理相关逻辑
- 📝 完善多选框组相关文档

## 2.2.0

### TechForm

- 💄 优化 item 的渲染逻辑
- 🐞 修复 fieldProps 类型提示问题

### HOOK

- 🚀 新增 useStepForm 函数
- 💄 优化 useSearchTable 函数

### 开发模板

- 🚀 新增分布表单开发模板
- 🐞 优化列表开发模板

## 2.1.0

### TechForm.Item

- 🚀 新增 children 属性

### TechDetail.Group

- 🚀 新增 itemProps 支持对 items 的基础配置基础属性

### TechNoData

- 🚀 text 属性支持自定义传入 dom

## 2.0.1

### TechLoading

- 🐞 修复动态容器引起的 bug

## 2.0.0

### antd 依赖版本升级

- 5.8.0-》5.16.0

### dumi 版本升级

- 升级到 2.2.17 版本

### configProvide

- 🚀 新增 uploadUrl 全局配置

### TechDetail

- 🚀 新增 hidden 属性
- 🚀 group 下可以直接配置 items 与 dataSource
- 🚀 groupItem 新增 hidden 属性
- 🚀 新增 detail.Item 组件支持单个功能回显

### TechBottomContainer

- 🚀 新增组件

### TechDatePicker

- 💄 兼容多选

### TechDatePickerRange

- 💄 兼容 5.16.0 版本

### TechFile.List

- 🐞 修复传入值异常时，譬如[null,null]回显异常问题

### TechForm.Search

- 🚀 新增 hidden 属性

### TechForm

- 🚀 新增 hidden 配置
- 🚀 新增 readOnly 字段，提供详情类型
- 🚀 新增 formName 属性，封装 object，将表单字段放入传入的对象中
- 🐞 修复不传 type 组件异常问题
- 💄 去除 itemProps 配置项
- 🚀 新增 type 类型 TechCascader

### TechForm.Group

- 🚀 支持整体与局部的 formName 传递

### TechForm.Item

- 🚀 新增组件

### TechTable

- 🐞 修复 columns 类型异常问题

### TechUpload

- 🚀 请求地址从全局配置

### TechUpload.dragger

- 🚀 请求地址从全局配置

### TechUpload.picture

- 🚀 请求地址可从全局配置

- 🚀 新增在表单中限制上传个数时，达到上限隐藏上传按钮功能

- 🚀 上传图片默认添加上传图标

### TechCascader

- 🚀 封装 Cascader 组件，避免数据二次处理问题

## 1.4.0

### TechUpload

- 💄 默认文件名称 _nameLimit_ 为 40，

### TechForm

- 🚀 为 _input_、_textarea_、_select_、_datePicker_、_datePickerRange_、_TechDatePicker_、_TechDatePickerRange_、_inputNumber_、_treeSelect_、_timePicker_、_timePickerRange_、_cascader_ 等添加 _placeholder_ 与 _allowClear_ 等属性

- 💄 优化 type 类型渲染相关逻辑

### 数字校验

- 🚀 完善数字相关校验 目前支持：
- maxTwoDecimals(保持两位小数)、number(数字)、intNumber(正整数)、negativeInteger（负整数）、percentage（百分比 0-100）

### TechTable

- 🐞 修复 ColumnType 组件类型报错问题

### TechHistoryInput

- 🐞 删除该组件

### TechDetail

- 💄 _items_ 配置中 _key_ 属性替换为 _name_ ，*key*属性将在下个大版本只作为 _dom_ 标识符使用
- 💄 _items_ 配置中，优化 _label_ 属性可传入自定义 _dom_
- 🐞 修复 _render_ 方法 _dataSource_ 为 null 问题
- 🚀 新增 _type_ _rangeTime_ 用于回显时间范围
- 🚀 新增 _type_ _checkbox_ 回显多选框组
- 🚀 新增 _type_ _placeholder_ 标题占位，_label_ 宽度默认 100%
- 🐞 修复 _layout_ 为 _vertical_ 时 label 宽度异常问题
- 🐞 修复 _column_ 为 1 时 label 宽度过小问题

### TechSelect

- 💄 _allowClear_ 默认为 true
- 💄 _placeholder_ 默认为 请选择

### TechDatePickerRange

- 🛠 优化默认值判断逻辑
- 💄 _allowClear_ 默认为 true

### TechDatePicker

- 🛠 重构组件代码，避免 form 状态下动态设值时抖动问题
- 💄 _allowClear_ 默认为 true

### TechPageTitle

- 💄 替换 _clickEvent_ 事件为 _onBackClick_ 事件，_clickEvent_ 属性将在下个大版本删除
- 💄 替换 _title_ 属性为 _children_ 传入，_title_ 属性将在下个大版本删除
- 💄 替换 _titleType_ 属性为 _type_ 传入，_titleType_ 属性将在下个大版本删除
- 🚀 新增 _fontSize_ 属性
- 🚀 可传入 div 所有相关属性

## 1.3.5

- 🐞 修复 form.search 无法动态更新问题

## 1.3.4

### TechTable

- 🐞 修復 ts 校验问题，新增 ColumnType +++ const columns: ColumnType<>[]

## 1.3.3

### TechDatePickerRange

- 🐞 修復清空时数据异常问题

## 1.3.2

### TechDatePickerRange

- 🐞 修復清空时数据异常问题

### TechDatePicker

- 🐞 修復無法动态设置默认值问题

### TechDatePickerRange

- 🐞 修復無法动态设置默认值问题

## 1.3.1

### TechDetail

### 封装 group 组件

## 1.3.0

### TechDatePicker

- 🚀 新增时间选择组件

### TechDatePickerRange

- 🚀 新增时间范围选择组件

### TechTable

- 🐞 修复 table cell 为空字符串时默认展示 '-'

## 1.2.3

### TechTable

- 🐞 修复 table cell 为空字符串时默认展示 '-'

## 1.2.2

### TechForm

- 💄 优化子项渲染逻辑

## 1.2.1

### TechForm

- 🚀 新增 required 字段

### 新增代码模板相关示例文档

## 1.2.0

### TechPageTitle

- 🚀 新增 type 字段

### TechForm.Search

- 🚀 新增动态计算列数功能

## 1.1.7

### TechUpload

- 🐞 修改上传组件的接口地址

## 1.1.6

### TechTable

- 🐞 修复设置宽度还被挤压问题，支持单独设置 table 列宽

## 1.1.5

### TechForm.Search

- 💄 默认隐藏 hasCardBg 属性

## 1.1.4

### TechUpload

- 🐞 修复自定义渲染 bug

## 1.1.3

### TechTable

- 🐞 修复 table 序号字段宽度太小

## 1.1.2

### TechForm

- 🚀 search 组件新增白色背景，hasCardBg

### TechTable

- 🐞 修复 table Columns 字段，支持字典值会显

## 1.1.1

### TechTable

- 🚀 新增 table Columns 字段，支持字典值会显

## 1.1.0

### TechForm

- 🚀 新增 group 组件及其相关文档

### TechUpload

## 1.0.4

### TechUpload

- 🚀 新增 uploadUrl 字段，可自定义上传地址
- 🚀 新增 fileIconMapField 字段，可自定义文件 icon 回显字段

### TechFile

- 🚀 新增 fileIconMapField 字段，可自定义文件 icon 回显字段

### TechPageTitle

- 🚀 新增 hasBottomMargin 字段, 控制标题底部样式

## 1.0.3

### TechUpload

- 💄 新增 nameList 属性

### TechDetail

- 💄 修改 label 字体颜色

## 1.0.2

### TechUpload

- 💄 修改 upload 上传组件的地址

## 1.0.1

### TechFlow

- 💄 删除无用组件

### TechForm

- 📝 完善文档
- 🚀 新增占位类型
