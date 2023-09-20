import { useState } from 'react';

import { InitPagination } from '@constants';

export default function useTablePage(
  initPageSize = InitPagination.INIT_PAGE_SIZE,
  initPage = InitPagination.INIT_PAGE
) {
  const [page, setPage] = useState<number>(initPage);
  const [pageSize, setPageSize] = useState<number>(initPageSize);

  const onTableChange = (newPage: number, newSize: number) => {
    if (page === newPage) {
      setPage(1);
    } else {
      setPage(newPage);
    }
    setPageSize(newSize);
  };

  const refreshTable = (initData: () => void, isUpdate = false) => {
    if (page !== 1 && !isUpdate) {
      setPage(1);
      return;
    }
    initData();
  };

  return { page, pageSize, onTableChange, setPage, refreshTable };
}
