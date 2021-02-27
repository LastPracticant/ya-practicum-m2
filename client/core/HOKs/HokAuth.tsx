import React from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { PageComponentProps } from 'client/shared/types';

export const HOKAuth = (Component: React.ComponentType<PageComponentProps>) => (
    props: PageComponentProps,
) => {
    const { title } = props;
    const isAuth = Boolean(localStorage.getItem('isAuth'));

    console.log(isAuth, title);
    if (title === ROUTES.SIGNIN.title) {
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
