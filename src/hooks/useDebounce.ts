import { useCallback, useState } from 'react';

import _ from 'lodash';

import { DEBOUNCE_TIME } from '@root/constants';

export default function useDebounce(initSearch = '') {
  const [searchValues, setSearchValues] = useState<string>(initSearch);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchDebounce = useCallback(
    _.debounce((search: string) => setSearchValues(search), DEBOUNCE_TIME),
    []
  );

  return { searchValues, searchDebounce };
}
