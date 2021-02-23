import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    Forum,
    Game,
    Leaderboard,
    Profile,
    Signin,
    Signup,
    ErrorPage,
    Home,
    GameStart,
    GameOver,
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
            <Forum />
        </Route>

        <Route path={ROUTES.GAME_START.path}>
            <GameStart title={ROUTES.GAME_START.title} />
        </Route>

        <Route path={ROUTES.GAME_OVER.path}>
            <GameOver title={ROUTES.GAME_OVER.title} />
        </Route>

        <Route path={ROUTES.GAME.path}>
            <Game title={ROUTES.GAME.title} />
        </Route>

        <Route path={ROUTES.LEADERBOARD.path}>
            <Leaderboard title={ROUTES.LEADERBOARD.title} />
        </Route>

        <Route>
            <ErrorPage errorCode="404" />
        </Route>
    </Switch>
);
