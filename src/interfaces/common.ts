import { ReactElement } from 'react';

import { MenuProps } from 'antd';

export type ObjectOrArray = { [key: string]: any } | any[];

export interface RouteItem {
  path?: string;
  guard?: (props: any) => JSX.Element;
  layout?: (value: RouteItem) => JSX.Element;
  component?: () => JSX.Element;
  handle?: Record<string, any>;
  routes?: RouteItem[];
  noMargin?: boolean;
}

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

export interface HeaderMenuItem {
  label: string;
  key: string;
  href: string;
  isDisabled?: boolean;
}

export interface ThemeState {
  appTheme: string;
  setTheme: (appTheme: string) => void;
}
