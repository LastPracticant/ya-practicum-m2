import React, { useEffect } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { PageComponentProps } from 'client/shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserInfoThunk, authSelector } from '../store';

export function withCheckAuth<T = any>(
    Component: React.FC<T & PageComponentProps>,
) {
    const WrappedComponent: React.FC<T> = (props) => {
        const dispatch = useDispatch();

        const signRoutes = [ROUTES.SIGNIN.path, ROUTES.SIGNUP.path];
        const isSignPageThere = signRoutes.some(useRouteMatch);
        const { isAuth } = useSelector(authSelector);

        useEffect(() => {
            if (isAuth === null) {
                dispatch(getCurrentUserInfoThunk());
            }
        }, [dispatch]);

        if (!isAuth && !isSignPageThere) {
            return <Redirect to={ROUTES.SIGNIN.path} />;
        }

        if (isAuth && isSignPageThere) {
            return <Redirect to={ROUTES.HOME.path} />;
        }

        return <Component {...props} />;
    };

    return WrappedComponent;
}
