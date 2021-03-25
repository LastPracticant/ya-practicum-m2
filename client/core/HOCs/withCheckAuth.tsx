import React, { useEffect } from 'react';
import {
    Redirect, useLocation, useRouteMatch,
} from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { PageComponentProps } from 'client/shared/types';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { Loader } from 'client/shared/components';
import {
    getCurrentUserInfoThunk,
    authSelector,
    signinWithYandexThunk,
} from '../store';

export function withCheckAuth<T = any>(
    Component: React.FC<T & PageComponentProps>,
) {
    const WrappedComponent: React.FC<T> = (props) => {
        const dispatch = useDispatch();
        const location = useLocation();

        const signRoutes = [ROUTES.SIGNIN.path, ROUTES.SIGNUP.path];
        const isSignPageThere = signRoutes.some(useRouteMatch);
        const { isAuth } = useSelector(authSelector);

        useEffect(() => {
            const urlParams = new URLSearchParams(location.search);
            const oauthCode = urlParams.get('code');

            if (oauthCode) {
                dispatch(signinWithYandexThunk(oauthCode));

                return;
            }

            if (!isAuth) {
                dispatch(getCurrentUserInfoThunk());
            }
        }, [dispatch]);

        if (isAuth === null) return <Loader isVisible />;

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
