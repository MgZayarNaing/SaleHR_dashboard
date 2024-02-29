import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const Logout = Loadable(lazy(() => import('pages/authentication/Logout')));


const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: 'login',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    },
    {
      path: 'logout',
      element: <Logout />
    }
  ]
};

export default LoginRoutes;
