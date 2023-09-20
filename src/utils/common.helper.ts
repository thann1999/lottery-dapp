import { t } from 'i18next';

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

export const translateOptions = (data: SelectOption): SelectOption => {
  return data?.map((item) => ({ ...item, label: t(item.label as string) }));
};

export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string) => {
  return `${addr.substring(0, 8)}...${addr.substring(addr.length - 4)}`;
};
