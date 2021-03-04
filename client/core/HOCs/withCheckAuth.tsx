import React, { useEffect } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { PageComponentProps } from 'client/shared/types';
import { useDispatch } from 'react-redux';
import { checkAuth, getCurrentUserInfoThunk } from '../store';

export function withCheckAuth<T = any>(
    Component: React.FC<T & PageComponentProps>,
) {
    const WrappedComponent: React.FC<T> = (props) => {
        const dispatch = useDispatch();

        const isSignin = useRouteMatch(ROUTES.SIGNIN.path);
        const isSignup = useRouteMatch(ROUTES.SIGNUP.path);
        const isAuth = checkAuth();

        useEffect(() => {
            if (!isAuth) dispatch(getCurrentUserInfoThunk());
        }, []);

        if (!isAuth && !isSignin && !isSignup) {
            return <Redirect to={ROUTES.SIGNIN.path} />;
        }

        if (isAuth && (isSignin || isSignup)) {
            return <Redirect to={ROUTES.HOME.path} />;
        }

        return <Component {...props} />;
    };

    return WrappedComponent;
}
