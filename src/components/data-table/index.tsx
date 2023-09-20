import React, { useEffect, useMemo, useState } from 'react';

import { SyncOutlined } from '@ant-design/icons';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  HistoryOutlined,
  LoadingOutlined,
  SettingOutlined,
} from '@ant-design/icons/lib/icons';
import { Button, Checkbox, Dropdown, Space, Table, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ColumnType, DateTimeFormat, DayjsUnit, InitPagination, TimeZone } from '@constants';
import { DataTableColumn, DataTableProps } from '@interfaces';

import Audio from '../audio';

import './data-table.scss';

function DataTable({
  onRefresh,
  onExportFile,
  onDelete,
  onEdit,
  onTableChange,
  onHistories,
  total,
  current,
  pageSize,
  columns,
  searchBar,
  locale = { emptyText: 'No data' },
  moreAction,
  showSorterTooltip = false,
  hasSettingColumns = false,
  isPagination = true,
  resetTable = false,
  loading = false,
  setResetTable,
  isNotSelection = false,
  isShowActionBar = true,
  ...props
}: DataTableProps) {
  const { t } = useTranslation();
  const [currentColumns, setCurrentColumns] = useState<DataTableColumn[]>(columns);
  const [selectedRowData, setSelectedRowData] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const filterColumns = useMemo(
    () => currentColumns.filter((item) => !item.isHidden),
    [currentColumns]
  );
  const MoreAction = moreAction || React.Fragment;

  useEffect(() => {
    if (resetTable && setResetTable) {
      setSelectedRowData([]);
      onTableChange(InitPagination.INIT_PAGE, pageSize);
      setResetTable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetTable, setResetTable]);

  useEffect(() => {
    setSelectedRowData([]);
  }, [props?.dataSource]);

  const handleMenuClick = (index: number) => {
    setCurrentColumns((prev) =>
      prev.map((col, colIndex) => (colIndex === index ? { ...col, isHidden: !col.isHidden } : col))
    );
  };

  const items = useMemo(() => {
    return currentColumns.map((item, index) => ({
      label: (
        <Space direction="horizontal">
          <Checkbox checked={!item.isHidden} disabled={item.isDefaultColumn} />
          {t(item.title as string)}
        </Space>
      ),
      key: index,
      onClick: () => handleMenuClick(index),
    }));
  }, [currentColumns, t]);

  const handleOpenChange = (flag: boolean) => {
    setIsOpen(flag);
  };

  const handleRowSelection = (newSelectedRowKeys: React.Key[], selectedRows: any) => {
    setSelectedRowData(selectedRows);
  };

  const renderColumnData = (
    column: DataTableColumn,
    value: any,
    record: Record<string, any>,
    index: number
  ) => {
    switch (column.columnProps?.type) {
      case ColumnType.STT:
        return (current - 1) * pageSize + (index + 1);
      case ColumnType.DATE_TIME:
        return dayjs(value).isValid()
          ? dayjs(value)
              .add(column?.columnProps?.timeZone || TimeZone.UTC, DayjsUnit.HOURS)
              .format(column?.columnProps?.dateTimeFormat || DateTimeFormat.DATE_TIME)
          : '';
      case ColumnType.NUMBER:
        return new Intl.NumberFormat('vi-VN').format(value);
      case ColumnType.LINK:
        return (
          <Typography.Link
            href={column?.columnProps?.createLink ? column?.columnProps?.createLink(record) : value}
            target={column?.columnProps?.target || '_blank'}
            rel="noreferrer"
          >
            {column.linkTitle || value}
          </Typography.Link>
        );
      case ColumnType.ROUTER_LINK:
        return (
          <Link
            to={column?.columnProps?.createLink ? column?.columnProps?.createLink(record) : value}
          >
            {column.linkTitle || value}
          </Link>
        );
      case ColumnType.TAG:
        // eslint-disable-next-line no-case-declarations
        const tagInfo = column?.columnProps?.generateTagInfo?.(record);
        return <Tag color={tagInfo?.color}>{tagInfo?.label || value}</Tag>;
      case ColumnType.CUSTOMIZE:
        return column.columnProps?.renderColumn?.(column, record, index);
      case ColumnType.ACTION:
        return (
          <Button
            type="primary"
            onClick={() => column.columnProps?.handleActionRow?.(record)}
            icon={column.columnProps?.actionIcon ?? <EditOutlined />}
            danger={column.columnProps?.danger}
            className="no-border"
          >
            {t(column.columnProps?.actionButtonText ?? 'common.button.edit')}
          </Button>
        );
      case ColumnType.AUDIO:
        return <Audio src={value} />;
      case ColumnType.ARRAY_VERTICAL:
        return <div>{value?.join(', ')}</div>;
      case ColumnType.STATUS:
        return value ? (
          <CheckCircleOutlined className="check-circle-outlined" />
        ) : (
          <CloseCircleOutlined className="close-circle-outlined" />
        );
      default:
        return <Typography.Text>{value}</Typography.Text>;
    }
  };

  const renderColumns = (columnList: DataTableColumn[]): ColumnsType<any> =>
    columnList.map((column) => ({
      ...column,
      title: t(column.title as string),
      render: (value: any, record: Record<string, any>, index: number) =>
        renderColumnData(column, value, record, index),
      sorter:
        column.customSort ||
        (column.sorter
          ? {
              compare: (a: Record<string, any>, b: Record<string, any>) => {
                const value1 = a?.[column?.dataIndex as string] || '';
                const value2 = b?.[column?.dataIndex as string] || '';
                switch (column.columnProps?.type) {
                  case 'dateTime':
                    return new Date(value1).getTime() - new Date(value2).getTime();
                  case 'arrayVertical':
                    return (value1 as any[]).length - (value2 as any[]).length;
                  case 'number':
                    return value1 - value2;
                  default:
                    return value1?.localeCompare(value2, 'vi', {
                      sensitivity: 'base',
                    });
                }
              },
              multiple: 1,
            }
          : null),
      children: renderColumns(column.children || []),
    })) as ColumnsType<any>;

  return (
    <div className="data-table">
      {isShowActionBar && (
        <Space direction="horizontal" className="action-bar" align="center">
          <Space direction="horizontal">
            {Boolean(onDelete) && selectedRowData?.length > 0 && (
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onDelete && onDelete(selectedRowData)}
              >
                {t('common.button.delete', 'Delete')}
              </Button>
            )}
            {Boolean(onEdit) && selectedRowData?.length === 1 && (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => onEdit && onEdit(selectedRowData)}
              >
                {t('common.button.edit', 'Edit')}
              </Button>
            )}
            {Boolean(onHistories) && selectedRowData?.length === 1 && (
              <Button
                type="dashed"
                icon={<HistoryOutlined />}
                onClick={() => onHistories && onHistories(selectedRowData)}
              >
                {t('table.histories', 'Histories')}
              </Button>
            )}
            {moreAction && <MoreAction selectedRowData={selectedRowData} />}
          </Space>

          <Space direction="horizontal" style={{ alignItems: 'center' }}>
            {!!searchBar && searchBar}
            {!!onRefresh && <Button icon={<SyncOutlined />} onClick={onRefresh} />}
            {!!hasSettingColumns && (
              <Dropdown
                menu={{
                  items,
                }}
                trigger={['click']}
                open={isOpen}
                onOpenChange={handleOpenChange}
              >
                <Button icon={<SettingOutlined />} />
              </Dropdown>
            )}
            {!!onExportFile && <Button icon={<ExportOutlined />} />}
          </Space>
        </Space>
      )}

      <Table
        {...props}
        locale={locale}
        loading={{
          spinning: loading as boolean,
          indicator: <LoadingOutlined className="loading-data" spin />,
          tip: t('common.loadingData', 'Loading data...'),
        }}
        rowSelection={
          isNotSelection
            ? undefined
            : props.rowSelection || {
                getCheckboxProps: (record: Record<string, any>) => ({
                  disabled: record.disabled,
                }),
                onChange: handleRowSelection,
                selectedRowKeys: selectedRowData.map((item: any) => item?.key),
              }
        }
        columns={renderColumns(filterColumns)}
        scroll={{ x: 768 }}
        showSorterTooltip={showSorterTooltip}
        pagination={
          isPagination
            ? {
                total,
                pageSize,
                current,
                showSizeChanger: true,
                onChange: onTableChange,
                onShowSizeChange: onTableChange,
                showTotal: (totalRecord) => `${t('common.totalRecords')}: ${totalRecord}`,
              }
            : false
        }
      />
    </div>
  );
}

export default DataTable;
