import '@translation/i18n';
import { Suspense, useEffect } from 'react';

import { ConfigProvider, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';

import { LoadingScreen } from '@components';
import { ThemeMode } from '@constants';
import { useLotteryContract, useMetaMask } from '@hooks';
import { useLotteryStore, useThemeStore } from '@services/store';
import variables from '@styles/_variables.module.scss';

import { renderRoutes, routes } from './routes/routes';

function App() {
  const appTheme = useThemeStore((state) => state.appTheme);
  const getContractInfo = useLotteryStore((state) => state.getContractInfo);
  const { lotteryContract } = useLotteryContract();
  const { isCorrectChain } = useMetaMask();

  useEffect(() => {
    const root = window.document.documentElement;
    const prevTheme = appTheme === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
    root.classList.remove(prevTheme);
    root.classList.add(appTheme);
  }, [appTheme]);

  useEffect(() => {
    if (isCorrectChain) {
      getContractInfo(lotteryContract);
    }
  }, [getContractInfo, lotteryContract, isCorrectChain]);

  return (
    <ConfigProvider
      theme={{
        algorithm: appTheme === ThemeMode.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        components: {
          Button: {
            borderRadius: 10,
            borderRadiusLG: 12,
            borderRadiusSM: 10,
            controlHeight: 40,
            controlHeightLG: 50,
          },
        },
        token: {
          colorPrimary: variables.colorPrimary,
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
