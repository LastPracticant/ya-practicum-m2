import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { PageComponentProps } from 'client/shared/types';
import { useDispatch } from 'react-redux';
import { checkAuth, getCurrentUserInfoThunk } from '../store';

export function withCheckAuth<T = any>(
    Component: React.FC<T & PageComponentProps>,
) {
    const WrappedComponent: React.FC<T> = (props) => {
        const dispatch = useDispatch();

        const isAuth = checkAuth();

        useEffect(() => {
            dispatch(getCurrentUserInfoThunk());
        }, []);

        if (!isAuth) {
            return <Redirect to={ROUTES.SIGNIN.path} />;
        }

        return <Component {...props} />;
    };

    return WrappedComponent;
}
