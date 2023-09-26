import React, { Fragment } from 'react';

import { RouteObject, createBrowserRouter } from 'react-router-dom';

import { RouteItem } from '@interfaces';
import { DefaultLayout, EmptyLayout } from '@layouts';
import { RouteKey } from '@root/constants';
import { DefaultGuard } from '@root/guards';

import { PATH } from './path';

const NotFoundPage = React.lazy(() => import('@pages/not-found'));
const MintPage = React.lazy(() => import('@root/pages/mint'));

export const routes: RouteItem[] = [
  {
    path: '*',
    component: NotFoundPage,
    guard: DefaultGuard,
  },
  {
    path: PATH.mint,
    component: MintPage,
    layout: DefaultLayout,
    guard: DefaultGuard,
    handle: {
      pageTitle: 'Mint NFT',
      key: RouteKey.MintNFT,
    },
  },
];

export const renderChildren = (children: RouteItem[]): RouteObject[] => {
  return children.reduce((prev: RouteObject[], current) => {
    const RouteComponent = current.component || Fragment;
    const GuardComponent = current.guard || Fragment;
    const LayoutComponent = current.layout || Fragment;
    const LayoutOutlet = current.layout || EmptyLayout;

    if (current.component) {
      prev.push({
        path: current.path,
        handle: current.handle,
        element: (
          <GuardComponent>
            <LayoutComponent>
              <RouteComponent />
            </LayoutComponent>
          </GuardComponent>
        ),
      });
    }

    if (current.routes?.length) {
      prev.push({
        path: current.path,
        handle: current.handle,
        element: (
          <GuardComponent>
            <LayoutOutlet />
          </GuardComponent>
        ),
        children: renderChildren(current.routes),
      });
    }

    return prev;
  }, []);
};

export const renderRoutes = (routesData: RouteItem[] = []) =>
  createBrowserRouter(renderChildren(routesData));
