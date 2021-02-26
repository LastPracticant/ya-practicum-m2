import React from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { connect } from 'react-redux';

import { StoreProps } from '../store';

export const HokAuth = (Component: React.ComponentType) => {
    const mapStateToProps = (state: StoreProps) => ({
        isAuth: state.auth,
        profile: state.profile,
    });

    const WrapperContainer = (props: any) => {
        const { isAuth, profile } = props;
        if (isAuth && profile) {
            return <Component {...props} />;
        }
        return <Redirect to={ROUTES.SIGNIN.path} />;
    };

    return connect(mapStateToProps)(WrapperContainer);
};
