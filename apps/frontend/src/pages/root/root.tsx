import { Navigate } from 'react-router';

import { AppRoute } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

const Root: React.FC = () => {
  const user = useAppSelector(({ auth }) => auth.user);

  if (!user) {
    return <Navigate to={AppRoute.SIGN_IN} />;
  }

  return <div>Home Page</div>;
};

export { Root };
