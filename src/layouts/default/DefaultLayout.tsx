import { Outlet } from 'react-router-dom';

import { HeaderComponent } from '@root/components';

export default function EmptyLayout() {
  return (
    <>
      <HeaderComponent />

      <Outlet />
    </>
  );
}
