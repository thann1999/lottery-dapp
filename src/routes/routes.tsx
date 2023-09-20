import React, { Fragment } from 'react';

import { RouteObject, createBrowserRouter } from 'react-router-dom';

import { RouteItem } from '@interfaces';
import { EmptyLayout } from '@layouts';

import { PATH } from './path';

const NotFoundPage = React.lazy(() => import('@pages/not-found'));
const HomePage = React.lazy(() => import('@pages/home'));

export const routes: RouteItem[] = [
  {
    path: '*',
    component: NotFoundPage,
  },
  {
    path: PATH.home,
    component: HomePage,
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
