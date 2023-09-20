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
