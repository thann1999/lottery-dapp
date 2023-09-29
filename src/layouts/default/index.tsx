import { Suspense } from 'react';

import clsx from 'clsx';
import { Helmet } from 'react-helmet';
import { Outlet, useMatches } from 'react-router-dom';

import { HeaderComponent, LoadingScreen } from '@root/components';
import { ThemeMode } from '@root/constants';
import { useThemeStore } from '@root/services/store';

import './default-layout.scss';

export default function EmptyLayout() {
  const matches = useMatches();
  const crumbs = matches.filter((match) => !!match.handle);
  const pageTitle = (crumbs?.at(-1)?.handle as any)?.pageTitle;
  const appTheme = useThemeStore((state) => state.appTheme);
  const isDarkTheme = appTheme === ThemeMode.Dark;

  return (
    <div className={clsx('min-h-screen', { 'bg-dark': isDarkTheme, 'bg-light': !isDarkTheme })}>
      <Helmet>
        <title>Web3 Defi - {pageTitle}</title>
      </Helmet>

      <HeaderComponent />

      <div className="mx-[50px] xl:mx-32">
        <Outlet />
      </div>
    </div>
  );
}
