import { ReactElement } from 'react';

import { MenuProps } from 'antd';

export type ObjectOrArray = { [key: string]: any } | any[];

export interface ParentComponentProps {
  children: JSX.Element;
}

export type MenuItem = Required<MenuProps>['items'][number];

export interface Option {
  label: string | ReactElement;
  value?: string | number;
  options?: Option[];
}

export interface PaginationParams {
  page?: number;
  size?: number;
  q?: string;
}

export type SelectOption = Option[];
