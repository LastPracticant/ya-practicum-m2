import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { PageComponentProps } from 'client/shared/types';
import { useSelector } from 'react-redux';
import { authSelector } from '../store';

export const HOKAuth = (Component: React.ComponentType<PageComponentProps>) => (
    props: PageComponentProps,
) => {
    const { pathname } = useLocation();
    const { isAuth } = useSelector(authSelector);

    if (pathname === ROUTES.SIGNIN.path || pathname === ROUTES.SIGNUP.path) {
        if (isAuth) {
            return <Redirect to={ROUTES.HOME.path} />;
        }
        return <Component {...props} />;
    }
    if (isAuth) {
        return <Component {...props} />;
    }

    return <Redirect to={ROUTES.SIGNIN.path} />;
};
