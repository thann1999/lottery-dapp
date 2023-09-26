/* eslint-disable no-unused-vars */
import { Dispatch, ReactNode, SetStateAction } from 'react';

import { TableProps } from 'antd';
import { ColumnType } from 'antd/es/table';

import { ColumnTableType } from '@root/constants';

export interface MoreActionProps<T> {
  selectedRowData: T[];
}

export interface DataTableProps extends Omit<TableProps<any>, 'columns' | 'sorter'> {
  total: number;
  current: number;
  pageSize: number;
  onTableChange: (page: number, pageSize: number) => void;
  onRefresh?: () => void;
  onExportFile?: (index: number) => void;
  onDelete?: (row: any) => void;
  onEdit?: (row: Record<string, any>) => void;
  onSearch?: () => void;
  hasSettingColumns?: boolean;
  isPagination?: boolean;
  columns: DataTableColumn[];
  searchBar?: JSX.Element;
  resetTable?: boolean;
  setResetTable?: Dispatch<SetStateAction<boolean>>;
  isNotSelection?: boolean;
  isShowActionBar?: boolean;
  onHistories?: (row: Record<string, any>) => void;
  moreAction?: (props: MoreActionProps<any>) => JSX.Element;
}

export interface AudioProps {
  src: string | undefined;
  type?: string;
}

export type ColumnDataType = `${ColumnTableType}`;

export interface DataTableColumn extends Omit<ColumnType<any>, 'sorter'> {
  isHidden?: boolean;
  isDefaultColumn?: boolean;
  linkTitle?: string;
  customSort?: boolean;
  columnProps?: {
    type: ColumnDataType;
    generateTagInfo?: (value: Record<string, any>) => { color: string; label?: string }; // Use this props when type=tag
    danger?: boolean; // Set the danger status of button
    actionButtonText?: string;
    actionIcon?: ReactNode;
    dateTimeFormat?: string; // Use this props when type=dateTime
    handleClickText?: (value: Record<string, any>) => void; // type=copyable
    // Use this props when type=customize
    renderColumn?: (
      column: DataTableColumn,
      value: Record<string, any>,
      index: number
    ) => JSX.Element;
    handleActionRow?: (value: Record<string, any>) => void;
    // onEditRow?: (value: Record<string, any>) => void;
    isLoading?: boolean; // loading for button
    createLink?: (value: Record<string, any>) => string;
    target?: string;
    timeZone?: number;
  };
  sorter?: boolean;
  children?: DataTableColumn[];
}

export interface SettingWebProps {
  handleClose: () => void;
}
