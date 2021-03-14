import './Forum.css';

import React from 'react';
import { ROUTES } from 'client/routing';
import { Route, Switch } from 'react-router-dom';
import { withCheckAuth } from 'client/core/HOCs';
import { PageComponentProps } from 'client/shared/types';
import { ErrorPage } from '../ErrorPage';
import { ForumBoard } from './ForumBoard';
import { ForumTopic } from './ForumTopic';

const ForumComponent: React.FC<PageComponentProps> = () => (
    <Switch>
        <Route path={`${ROUTES.FORUM_TOPIC.path}/:id`}>
            <ForumTopic title={ROUTES.FORUM_TOPIC.title} />
        </Route>

        <Route path={ROUTES.FORUM.path}>
            <ForumBoard title={ROUTES.FORUM.title} />
        </Route>

        <Route>
            <ErrorPage title="404" />
        </Route>
    </Switch>
);

export const Forum = withCheckAuth(ForumComponent);
