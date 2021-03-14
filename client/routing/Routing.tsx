import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ROUTES } from './Routing.config';

export const Routing: React.FC = React.memo(() => {
    const pages = Object.values(ROUTES).map(({
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
