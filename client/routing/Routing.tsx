import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ROUTES, RoutesProps } from './Routing.config';

interface RoutingProps {
    routes?: RoutesProps
}

export const Routing: React.FC<RoutingProps> = React.memo(({ routes = ROUTES }) => {
    const pages = Object.values(routes).map(({
        component: Page,
        title,
        path,
        exact,
    }) => (
        <Route key={path} exact={exact} path={path}>
            <Page title={title} />
        </Route>
    ));

    return (
        <Switch>
            {pages}
        </Switch>
    );
});
