import './Forum.css';

import React from 'react';
import { ROUTES, Routing } from 'client/routing';
import { withCheckAuth } from 'client/core/HOCs';
import { PageComponentProps } from 'client/shared/types';

const ForumComponent: React.FC<PageComponentProps> = () => (
    <>
        {ROUTES.FORUM.children && <Routing routes={ROUTES.FORUM.children} />}
    </>
);

export const Forum = withCheckAuth(ForumComponent);
