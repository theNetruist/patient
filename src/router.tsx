import { useInjection } from 'inversify-react';
import React from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import RouteLibrary from './components/routeLibrary';
import DIContainer from './diContainer';
import CreateAccount from './pages/createAccount';
import CreateAccountForm from './pages/createAccountForm';
import Login from './pages/login';
import AuthService from './services/authService.interface';

const Router: React.FC = (props) => {
    const authService: AuthService = useInjection(DIContainer.types.AuthService);

    const authRedirectLoader = async () => {
        if (!authService.isLoggedIn) {
            return redirect('/login');
        }
        return null;
    };

    const router = createBrowserRouter([
        { path: 'newUser', element: <CreateAccount /> },
        { path: 'newUserForm', element: <CreateAccountForm /> },
        { path: 'login', element: <Login /> },
        {
            path: '/',
            loader: authRedirectLoader,
            children: Object.getOwnPropertyNames(RouteLibrary).map((id) => {
                return { path: RouteLibrary[id].path, element: RouteLibrary[id].component };
            }),
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
