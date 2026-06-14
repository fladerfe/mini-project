import { Navigate } from 'react-router';

import { AppRoute } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

type Properties = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Properties> = ({ children }) => {
  const { isAuthChecked, user } = useAppSelector(({ auth }) => auth);

  if (!isAuthChecked) {
    return null;
  }

  if (!user) {
    return <Navigate to={AppRoute.SIGN_IN} />;
  }

  return <>{children}</>;
};

export { ProtectedRoute };
