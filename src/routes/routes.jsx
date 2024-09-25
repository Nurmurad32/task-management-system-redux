import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PrivateRoute from '../components/layouts/PrivateRoute';
import { lazy, Suspense } from 'react';
import Loading from '../components/layouts/Loading';

const Tasks = lazy(() => import('../pages/Tasks'));
const Profile = lazy(() => import('../pages/Profile'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const NotFound = lazy(() => import('../pages/NotFound'));



const routes = createBrowserRouter([
  {
    path: '/', element: <PrivateRoute> <Suspense fallback={<Loading />}> <App /> </Suspense> </PrivateRoute>,
    children:
      [
        {
          index: true, element: <Suspense fallback={<Loading />}> <Tasks /> </Suspense>,
        },
        {
          path: '/profile', element: <Suspense fallback={<Loading />}> <Profile /> </Suspense>
        },
      ],
  },
  {
    path: '/login', element: <Suspense fallback={<Loading />}> <Login /> </Suspense>,
  },
  {
    path: '/signup', element: <Suspense fallback={<Loading />}> <Signup /> </Suspense>,
  },
  {
    path: '*', element: <Suspense fallback={<Loading />}> <NotFound /> </Suspense>,
  },
]);

export default routes;
