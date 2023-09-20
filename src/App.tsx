import '@translation/i18n';
import { Suspense } from 'react';

import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';

import { LoadingScreen } from '@components';

import { renderRoutes, routes } from './routes/routes';

function App() {
  return (
    <ConfigProvider>
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={renderRoutes(routes)} />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
