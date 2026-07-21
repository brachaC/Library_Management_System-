import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useContext, type ReactNode } from 'react';
import App from './App';
import UserProvider, { UserContext } from './contexts/userContext';
import SignUp from './components/SignUp';
import BooksDisplay from './components/BooksDisplay';
import Login from './components/Login';
import Home from './components/Home';
import Admin from './components/Admin';
import AddNewBook from './components/AddNewBook';
import AddNewAdmin from './components/AddNewAdmin';
import AddComment from './components/AddComment';
import UsersDisplay from './components/UsersDisplay';
import ShowMyLends from './components/ShowMyLends';

const RouteRoles = ({ roles, children }: { roles: boolean[]; children: ReactNode }) => {
  const { user } = useContext(UserContext);
  if (!user) return <Navigate to="/" />;
  if (!roles.includes(user.status)) return <Navigate to="/" />;
  return <>{children}</>;
};

const routes = createBrowserRouter([
  {
    path: '',
    element: <UserProvider><App /></UserProvider>,
    children: [
      { path: 'Login', element: <Login /> },
      { path: 'Home', element: <Home /> },
      {
        path: 'BooksDisplay',
        element: <RouteRoles roles={[true, false]}><BooksDisplay /></RouteRoles>,
        children: [{ path: 'AddComment', element: <AddComment /> }],
      },
      { path: 'ShowMyLends', element: <RouteRoles roles={[true, false]}><ShowMyLends /></RouteRoles> },
      {
        path: 'Admin',
        element: <RouteRoles roles={[true]}><Admin /></RouteRoles>,
        children: [
          { path: 'AddNewBook', element: <AddNewBook /> },
          { path: 'UsersDisplay', element: <UsersDisplay /> },
          { path: 'AddNewAdmin', element: <AddNewAdmin /> },
        ],
      },
    ],
  },
  { path: 'SignUp', element: <SignUp /> },
]);

export default routes;
