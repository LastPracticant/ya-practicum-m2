import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UiKit } from 'client/shared/UiKit';
import {
    Forum,
    Game,
    Leaderboard,
    Profile,
    Signin,
    Signup,
    ErrorPage,
    Home,
} from '../pages';

import { ROUTES } from './Routing.config';

export const Routing: React.FC = () => (
    <Switch>
        <Route exact path={ROUTES.HOME.path}>
            <Home title={ROUTES.HOME.title} />
        </Route>

        <Route path={ROUTES.SIGNIN.path}>
            <Signin title={ROUTES.SIGNIN.title} />
        </Route>

        <Route path={ROUTES.SIGNUP.path}>
            <Signup title={ROUTES.SIGNUP.title} />
        </Route>

        <Route path={ROUTES.PROFILE.path}>
            <Profile title={ROUTES.PROFILE.title} />
        </Route>

        <Route path={ROUTES.FORUM.path}>
            <Forum title={ROUTES.FORUM.title} />
        </Route>

        <Route path={ROUTES.GAME.path}>
            <Game title={ROUTES.GAME.title} />
        </Route>

        <Route path={ROUTES.LEADERBOARD.path}>
            <Leaderboard title={ROUTES.LEADERBOARD.title} />
        </Route>

        <Route path={ROUTES.UIKIT.path}>
            <UiKit title={ROUTES.UIKIT.title} />
        </Route>
        <Route>
            <ErrorPage errorCode="404" />
        </Route>
    </Switch>
);
