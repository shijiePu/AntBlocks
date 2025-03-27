import {
  Cascader,
  Checkbox,
  ColProps,
  DatePicker,
  FormItemProps,
  FormProps,
  Input,
  InputNumber,
  Radio,
  RowProps,
  Slider,
  Switch,
  Table,
  TimePicker,
  TreeSelect,
  Upload
} from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { ComponentProps, HTMLAttributes, ReactNode } from 'react';

import TechCascader from '../cascader';
import TechCheckGroup from '../check-group';
import TechDatePicker from '../date-picker';
import TechDatePickerRange from '../date-picker-range';
import TechDependency from '../dependency';
import { RenderChildren } from '../dependency/types';
import TechRadioGroup from '../radio-group';
import TechSelect from '../select';
import TechUpload from '../upload';
import InternalUpload from '../upload/instance';

import { RegKeyType } from '@szhz/tech-pc/types/reg';

type ColSpanType = number | string;

export type FormFieldMapType = {
  input: typeof Input;
  inputNumber: typeof InputNumber;
  password: typeof Input.Password;
  textarea: typeof Input.TextArea;
  select: typeof TechSelect;
  slider: typeof Slider;
  radio: typeof Radio;
  radioGroup: typeof TechRadioGroup;
  switch: typeof Switch;
  treeSelect: typeof TreeSelect;
  upload: typeof Upload;
  TechUpload: typeof InternalUpload;
  TechUploadDragger: typeof TechUpload.Dragger;
  TechUploadPicture: typeof TechUpload.Picture;
  datePicker: typeof DatePicker;
  TechDatePicker: typeof TechDatePicker;
  datePickerRange: typeof DatePicker.RangePicker;
  TechDatePickerRange: typeof TechDatePickerRange;
  timePicker: typeof TimePicker;
  timePickerRange: typeof TimePicker.RangePicker;
  checkbox: typeof Checkbox;
  checkGroup: typeof TechCheckGroup;
  cascader: typeof Cascader;
  TechCascader: typeof TechCascader;
  table: typeof Table;
  dependency: typeof TechDependency;
};

export type FormComType = keyof FormFieldMapType;

export type FormComPropsType = HTMLAttributes<object> &
  ComponentProps<FormFieldMapType[FormComType]>;

export type FormItemType = FormComType | 'placeholder';
export interface ItemsProps
  extends Omit<FormItemProps, 'label | name' | 'required'> {
  label?: ReactNode;
  name?: NamePath;
  style?: React.CSSProperties;
  // 组件的类型
  type?: FormItemType;
  // 依赖的字段，只在type为dependency时生效
  depNames?: string[];
  /**
   * @deprecated 不推荐使用itemProps进行属性传递，建议直接在配置项中直接传递属性
   */
  itemProps?: Omit<FormItemProps, 'label | name'>;
  // 组件的配置项
  fieldProps?: FormComPropsType;
  // 自定义组件
  customCom?: ReactNode | RenderChildren<any>;
  // 校验规则
  regKey?: RegKeyType;
  // 自定义渲染
  render?: RenderChildren<any>;
  // 是否为必填
  required?: string | boolean;
  // 只读模式
  readonly?: boolean;
  // 嵌套的数据结构
  formName?: string;
  children?: ReactNode;
  // 栅格
  span?: ColSpanType;
}

export interface TechFormItems extends ItemsProps {
  colProps?: ColProps;
  hidden?: boolean;
}

export interface TechFormProps extends FormProps {
  rowProps?: RowProps;
  children?: ReactNode;
  items?: TechFormItems[];
  columns?: number;
  actionNode?: ReactNode;
  // 是否为必填,提示文字
  required?: string | boolean;
  onFinish?: (e: any) => void;
  onReset?: (e: any) => void;
  /** @description  只读模式 */
  readonly?: boolean;
  // 嵌套的数据结构
  formName?: string;
}

export type GroupItemsType = {
  container?: ReactNode;
  columns?: number;
  title?: ReactNode;
  items?: TechFormItems[];
  rowProps?: RowProps;
  // 嵌套的数据结构
  formName?: string;
  titleDesc?: ReactNode;
  hidden?: boolean;
};

// 分组表单
export interface TechFormGroupProps extends FormProps {
  groupItems?: GroupItemsType[];
  onFinish?: (e: any) => void;
  onReset?: (e: any) => void;
  // 嵌套的数据结构
  formName?: string;
  /** @description  只读模式 */
  readonly?: boolean;
  children?: ReactNode;
}

export interface SearchProps extends TechFormProps {
  // 默认是否展开
  defaultExpand?: boolean;
  showExpand?: boolean;
  // 展开收起的回调函数
  onExpand?: (expand: boolean) => void;
  // 展开的行数
  expandLine?: number;
  // 是否显示卡片背景
  hasCardBg?: boolean;
  // 自定义操作栏的位置
  actionCol?: (expand?: boolean) => ColProps;
}
