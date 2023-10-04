import dayjs from 'dayjs';

import { CHAINS, DateTimeFormat } from '@root/constants';
import { SelectOption } from '@root/interfaces';

export const generateDataSource = <T>(data: T[], disableConditional?: (record: T) => boolean) => {
  return (
    data.map((item) => ({
      ...item,
      key: (item as any)?.id,
      disabled: disableConditional?.(item),
    })) || []
  );
};

export const convertDate = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  format = DateTimeFormat.CROSS_DATE
) => {
  return dayjs(date).isValid() ? dayjs(date).format(format) : '';
};

export const translateOptions = (data: SelectOption): SelectOption => {
  return data?.map((item) => ({ ...item, label: item.label as string }));
};

export const formatAddress = (addr = '') => {
  return `${addr.substring(0, 8)}...${addr.substring(addr.length - 4)}`;
};

// Get chain info
export const getChainInfo = (id: number) => {
  return CHAINS[id];
};
