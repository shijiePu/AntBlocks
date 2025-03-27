import {
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Slider,
  Switch,
  Table,
  TimePicker,
  TreeSelect,
  Upload,
} from 'antd';
import 'dayjs';
import TechCascader from '../cascader';
import TechCheckGroup from '../check-group';
import TechDatePicker from '../date-picker';
import TechDatePickerRange from '../date-picker-range';
import TechDependency from '../dependency';
import TechRadioGroup from '../radio-group';
import TechSelect from '../select';
import TechUpload from '../upload';
import InternalUpload from '../upload/instance';

import { FormFieldMapType } from './types';

export const FORM_ITEM_COM_MAP: FormFieldMapType = {
  input: Input,
  inputNumber: InputNumber,
  select: TechSelect,
  textarea: Input.TextArea,
  password: Input.Password,
  slider: Slider,
  radio: Radio,
  radioGroup: TechRadioGroup,
  switch: Switch,
  treeSelect: TreeSelect,
  upload: Upload,
  datePicker: DatePicker,
  TechDatePicker: TechDatePicker,
  datePickerRange: DatePicker.RangePicker,
  timePicker: TimePicker,
  timePickerRange: TimePicker.RangePicker,
  checkbox: Checkbox,
  checkGroup: TechCheckGroup,
  cascader: Cascader,
  TechCascader: TechCascader,
  table: Table,
  dependency: TechDependency,
  TechUpload: InternalUpload,
  TechUploadDragger: TechUpload.Dragger,
  TechUploadPicture: TechUpload.Picture,
  TechDatePickerRange: TechDatePickerRange,
};
