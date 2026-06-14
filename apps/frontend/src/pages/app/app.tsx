import { useEffect } from 'react';

import {
  ProtectedRoute,
  PublicRoute,
  RouterProvider
} from '~/libs/components/components.js';
import { AppRoute, StorageKey } from '~/libs/enums/enums.js';
import { useAppDispatch } from '~/libs/hooks/hooks.js';
import { authActions } from '~/modules/auth/auth.js';
import { getCurrentUser } from '~/modules/auth/slices/actions.js';
import { storageApi } from '~/modules/storage/storage.js';

import { Auth } from '../auth/auth.js';
import { Root } from '../root/root.js';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (storageApi.has(StorageKey.TOKEN)) {
      void dispatch(getCurrentUser());
    } else {
      dispatch(authActions.setAuthChecked());
    }
  }, [dispatch]);

  return (
    <RouterProvider
      routes={[
        {
          children: [
            {
              element: (
                <ProtectedRoute>
                  <Root />
                </ProtectedRoute>
              ),
              path: AppRoute.ROOT
            },
            {
              element: (
                <PublicRoute>
                  <Auth />
                </PublicRoute>
              ),
              path: AppRoute.SIGN_IN
            },
            {
              element: (
                <PublicRoute>
                  <Auth />
                </PublicRoute>
              ),
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
