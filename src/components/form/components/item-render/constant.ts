import { FormComType, REG_KEY_MAP } from '@szhz/tech-pc';
import { RegKeyType } from '@szhz/tech-pc/types/reg';
import { Rule } from 'antd/es/form';
// @ts-ignore
import { Variant } from 'antd/es/form/hooks/useVariants';
import { isBoolean } from 'lodash-es';

const InputPlaceholder = '请输入';
const selectPlaceholder = '请选择';

const textareaDefaultConfig = {
  autoSize: { minRows: 4, maxRows: 4 },
  showCount: true,
}

type Config = {
  default: {
    placeholder?: string | string[];
    allowClear?: boolean;
  };
  detail: {
    disabled?: boolean;
    variant?: Variant;
  };
};

// 用于生成默认配置的函数
function generateDefaultConfig(
  placeholder?: string | string[],
  isAllowClear?: boolean,
): Config['default'] {
  const config: Config['default'] = {
    ...(placeholder && { placeholder }),
    ...(isAllowClear && { allowClear: true }),
  };

  return config;
}

function generateDetailConfig(
  variant?: Variant,
  disabled?: boolean,
): Config['detail'] {
  const config: Config['detail'] = {
    ...(variant && { variant }),
    ...(disabled && { disabled: true }),
  };

  return config;
}

export const DEFAULT_CONFIG_MAP: Record<
  Partial<FormComType>,
  Config | undefined
> = {
  input: {
    default: generateDefaultConfig(InputPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  inputNumber: {
    default: generateDefaultConfig(InputPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  password: {
    default: generateDefaultConfig(InputPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  textarea: {
    default: {
      ...textareaDefaultConfig,
      ...generateDefaultConfig(InputPlaceholder, true),
    },
    detail: generateDetailConfig('borderless', true),
  },
  select: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  datePicker: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  datePickerRange: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  TechDatePicker: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  TechDatePickerRange: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  treeSelect: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  timePicker: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  timePickerRange: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  cascader: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  TechCascader: {
    default: generateDefaultConfig(selectPlaceholder, true),
    detail: generateDetailConfig('borderless', true),
  },
  radioGroup: undefined,
  slider: undefined,
  radio: undefined,
  switch: undefined,
  upload: undefined,
  TechUpload: undefined,
  TechUploadDragger: undefined,
  TechUploadPicture: undefined,
  checkbox: undefined,
  checkGroup: undefined,
  table: undefined,
  dependency: undefined,
};

export function getDefaultConfig(
  type: FormComType = 'input',
  readonly?: boolean,
) {
  if (!type) return {};

  if (!DEFAULT_CONFIG_MAP?.[type]) return {};

  if (!readonly) return DEFAULT_CONFIG_MAP?.[type]?.default ?? {};

  return DEFAULT_CONFIG_MAP[type]?.detail ?? {};
}

/**
 * 根据规则键获取规则数据
 * @param regKey 规则键
 * @returns 规则数据数组或null
 */
export const getRegData = (regKey: RegKeyType): Rule[] | null => {
  const curReg = REG_KEY_MAP?.[regKey];

  if (!curReg) return null;

  return [{ pattern: curReg.pattern, message: `请输入${curReg.message}` }];
};

/**
 * 生成必填规则
 * @param required 可选参数，表示必填字段
 * @returns 返回必填规则数组或null
 */
export const genRequiredRule = (
  required?: string | boolean | undefined,
  type: string | undefined = 'input',
  label: string = '',
): Rule[] | null => {
  if (!required) return null;

  // @ts-ignore
  if (isBoolean(required)) return [{ required: true, message: `${DEFAULT_CONFIG_MAP?.[type]?.default?.placeholder}${label}`}];

  return [{ required: true, message: required }];
};
