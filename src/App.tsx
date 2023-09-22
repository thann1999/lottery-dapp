import '@translation/i18n';
import { Suspense } from 'react';

import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';

import { LoadingScreen } from '@components';

import { renderRoutes, routes } from './routes/routes';

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            borderRadius: 10,
            borderRadiusLG: 10,
            borderRadiusSM: 10,
          },
        },
      }}
    >
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={renderRoutes(routes)} />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
