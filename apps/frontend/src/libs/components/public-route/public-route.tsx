import { Navigate } from 'react-router';

import { AppRoute } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

type Properties = {
  children: React.ReactNode;
};

const PublicRoute: React.FC<Properties> = ({ children }) => {
  const { isAuthChecked, user } = useAppSelector(({ auth }) => auth);

  if (!isAuthChecked) {
    return null;
  }

  if (user) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  return <>{children}</>;
};

export { PublicRoute };
