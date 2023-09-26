import { useLocation, Navigate } from 'react-router-dom';

import { ParentComponentProps } from '@root/interfaces';
import { getMintPath } from '@root/utils';

export default function DefaultGuard({ children }: ParentComponentProps) {
  const { pathname } = useLocation();

  if (pathname === '/') {
    return <Navigate to={getMintPath()} />;
  }

  return children;
}
