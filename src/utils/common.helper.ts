import { CHAINS } from '@root/constants';
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
  return data?.map((item) => ({ ...item, label: item.label as string }));
};

export const formatChainAsNum = (chainIdHex = '') => {
  return parseInt(chainIdHex);
};

export const formatAddress = (addr = '') => {
  return `${addr.substring(0, 8)}...${addr.substring(addr.length - 4)}`;
};

// Get chain info
export const getChainInfo = (id: number) => {
  return CHAINS[id];
};
