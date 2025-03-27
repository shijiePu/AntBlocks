import dayjs from 'dayjs';
import { isString } from 'lodash-es';
import { RangeValueType } from '../components';

export function getDateVal(data: RangeValueType | undefined) {
  if (!data) return null;

  if (isString(data)) {
    if (!dayjs(data)?.isValid()) return null;

    return dayjs(data);
  }

  if (Array.isArray(data) && data?.length) {
    return data?.map((item: string | null) => {
      if (!dayjs(item)?.isValid()) return null;
      return dayjs(item);
    });
  }
}
