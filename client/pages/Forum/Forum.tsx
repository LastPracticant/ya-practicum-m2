import './Forum.css';

import React from 'react';
import { ROUTES } from 'client/routing';
import { Route, Switch } from 'react-router-dom';
import { ErrorPage } from '../ErrorPage';
import { ForumBoard } from './ForumBoard';
import { ForumTopic } from './ForumTopic';

export const Forum: React.FC = () => (
    <Switch>
        <Route path={`${ROUTES.FORUM_TOPIC.path}/:id`}>
            <ForumTopic title={ROUTES.FORUM_TOPIC.title} />
        </Route>

        <Route path={ROUTES.FORUM.path}>
            <ForumBoard title={ROUTES.FORUM.title} />
        </Route>

        <Route>
            <ErrorPage errorCode="404" />
        </Route>
    </Switch>
);
