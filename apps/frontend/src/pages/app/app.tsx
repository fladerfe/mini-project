import { useEffect } from 'react';

import { RouterProvider } from '~/libs/components/components.js';
import { AppRoute, StorageKey } from '~/libs/enums/enums.js';
import { useAppDispatch } from '~/libs/hooks/hooks.js';
import { getCurrentUser } from '~/modules/auth/slices/actions.js';
import { storageApi } from '~/modules/storage/storage.js';

import { Auth } from '../auth/auth.js';
import { Root } from '../root/root.js';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (storageApi.has(StorageKey.TOKEN)) {
      void dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <RouterProvider
      routes={[
        {
          children: [
            {
              element: <Root />,
              path: AppRoute.ROOT
            },
            {
              element: <Auth />,
              path: AppRoute.SIGN_IN
            },
            {
              element: <Auth />,
              path: AppRoute.SIGN_UP
            }
          ],
          path: AppRoute.ROOT
        }
      ]}
    />
  );
};

export { App };
