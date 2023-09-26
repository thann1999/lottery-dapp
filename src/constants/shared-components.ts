import { SelectOption } from '@root/interfaces';

export enum ColumnTableType {
  STT = 'stt',
  DATE_TIME = 'dateTime',
  NUMBER = 'number',
  LINK = 'link',
  TAG = 'tag',
  CUSTOMIZE = 'customize',
  AUDIO = 'audio',
  ARRAY_VERTICAL = 'arrayVertical',
  COPYABLE = 'copyable',
  STATUS = 'status',
  ACTION = 'action',
  ROUTER_LINK = 'routerLink',
}

export enum InitPagination {
  INIT_PAGE = 1,
  INIT_PAGE_SIZE = 20,
}

export enum ModalSize {
  XS = 420,
  SM = 500,
  MD = 700,
  LG = 1000,
}

export const LANGUAGE_OPTIONS = [
  // TODO: Vietnam is future
  // {
  //   label: 'Việt Nam',
  //   value: 'vi',
  //   icon: 'twemoji:flag-vietnam',
  // },
  {
    label: 'English',
    value: 'en',
    icon: 'twemoji:flag-us-outlying-islands',
  },
];

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}
